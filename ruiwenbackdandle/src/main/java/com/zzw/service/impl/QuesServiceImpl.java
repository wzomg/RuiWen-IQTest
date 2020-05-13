package com.zzw.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.zzw.mapper.QuesMapper;
import com.zzw.pojo.QFeedBack;
import com.zzw.pojo.QReply;
import com.zzw.pojo.Ques;
import com.zzw.service.QuesService;
import com.zzw.utils.JsonUtil;
import com.zzw.utils.RedisUtil;
import com.zzw.vo.UserCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuesServiceImpl implements QuesService {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private QuesMapper quesMapper;

    @Override
    @Cacheable(cacheNames = "ques:all", keyGenerator = "myKeyGenerator")
    public List<Ques> queryAllQues() {
        List<Ques> quesList = quesMapper.queryAllQues();
        return quesList;
    }

    @Override
    public int addFeedBack(QFeedBack qFeedBack) {
        int res = quesMapper.addFeedBack(qFeedBack);
        return res;
    }

    @Override
    public int addTestRecord(QReply qReply, String mykey) {
        // 先去 redis 缓冲中查找对应的 uid
        JSONObject jsonval = (JSONObject) redisUtil.get(mykey);
        if (jsonval == null) return 0;
        System.out.println("缓存中的值为：" + mykey);
        UserCode userCode;
        Integer uid = 0;
        try {
            userCode = (UserCode) JsonUtil.json2Object(jsonval, UserCode.class);
            System.out.println("用户的主键为：" + userCode.getUid());
            uid = userCode.getUid();
            // 先将 redis 中的key值加1，并且设置过期时间为1周，每次点击开始时就请求后台查看是否已达到测试次数
            boolean b = redisUtil.hasKey(userCode.getUid() + "");
            if (!b) redisUtil.set(userCode.getUid() + "", 1, 604800L); // 这里要设置为1周
            else redisUtil.incr(userCode.getUid() + "", 1L);

        } catch (Exception e) {
            e.printStackTrace();
        }
        int num = quesMapper.addTestRecord(qReply, uid);
        return num;
    }

    @Override
    public int getLeftTestCnt(String mykey) {
        JSONObject jsonval = (JSONObject) redisUtil.get(mykey);
        // 这里要判断 key 是否失效，拦截器已修改，一般不会过期
        if (jsonval == null) return 2; // 还可测试2次
        // System.out.println("缓存中的值为：" + mykey);
        UserCode userCode;
        int res = 0;
        try {
            userCode = (UserCode) JsonUtil.json2Object(jsonval, UserCode.class);
            // 获取已经测试的次数，要判断是否有 key
            boolean b = redisUtil.hasKey(userCode.getUid() + "");
            if (!b) res = 0;
            else res = (int) redisUtil.get(userCode.getUid() + "");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 2 - res;
    }

    @Override
    public List<QReply> getAllTestRecord(String mykey) {
        JSONObject jsonval = (JSONObject) redisUtil.get(mykey);
        // 这里要判断 key 是否已失效，拦截器已处理，一般不会失效
        if (jsonval == null) return null;
        UserCode userCode;
        List<QReply> res = null;
        try {
            userCode = (UserCode) JsonUtil.json2Object(jsonval, UserCode.class);
            // 通过 uid 获取该用户所有的测试记录
            res = quesMapper.getAllTestRecord(userCode.getUid());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }
}
