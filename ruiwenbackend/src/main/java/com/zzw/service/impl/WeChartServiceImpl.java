package com.zzw.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.kevinsawicki.http.HttpRequest;
import com.zzw.mapper.UserMapper;
import com.zzw.pojo.User;
import com.zzw.service.WeChatService;
import com.zzw.utils.JsonUtil;
import com.zzw.utils.RedisUtil;
import com.zzw.vo.UserCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class WeChartServiceImpl implements WeChatService {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserMapper userMapper;

    @Override
    public String getOpenid(String code, String mykey) {
        boolean b = redisUtil.hasKey(mykey);
        // 若查询到 key，说明缓存没有过期，直接返回传来的 UUID
        if(b) return mykey;
        // 否则构造请求条件
        Map<String, String> data = new HashMap<>();
        // 这2个要修改
        data.put("appid", "wwwwwwwwwwwwxxxxxx"); // 开发者小程序的 appid，这里自己修改
        data.put("secret", "yyyyyyyyyyyyyyyyy"); // 开发者小程序的密钥，这里自己修改
        data.put("js_code", code);
        data.put("grant_type", "authorization_code");

        // 小程序官方接口：发送请求获取 openid 和 session_key
        String res = HttpRequest.get("https://api.weixin.qq.com/sns/jscode2session").form(data).body();

        // 将 json 字符串转换为 json 对象
        JSONObject obj = JSON.parseObject(res);

        // 查询用户是否已注册，没有则自动插入一条 openid
        UserCode userCode = null;
        try {
            userCode = (UserCode) JsonUtil.json2Object(obj, UserCode.class);
            User user = userMapper.findUser(userCode.getOpenid());
            if(null == user) {
                user = new User();
                user.setOnid(userCode.getOpenid());
                userMapper.addUser(user);
                // System.out.println("添加后返回的主键为：" + user.getUid());
            }
            // 添加当前用户的主键id
            obj.put("uid", user.getUid());
            // System.out.println("现在的json对象有：" + obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 然后随机生成一个 UUID 作为 redis 中的 key，用户的 openid 和 session_key 作为 redis 中的 value
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");

        // redis 操作：注意记得设置key的缓存过期：这里设置为一周(604800L)，每次用户发送请求时都先检查一下前端是否有缓存
        // 若缓存过期则重新请求后端登录获取新的自定义的 key。另外，每次请求时都携带这个key到后端
        // 后端主要用这个key进行用户识别查询信息，这里要改成1周
        redisUtil.set(uuid, obj, 604800L);

        // System.out.println("生成的 UUID 为：" + uuid);

        return uuid;
    }
}
