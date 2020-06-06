package com.zzw.controller;

import com.zzw.pojo.QFeedBack;
import com.zzw.pojo.QReply;
import com.zzw.pojo.Ques;
import com.zzw.service.QuesService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class QuesController {

    @Autowired
    private QuesService quesService;

    @GetMapping("/ques/all")
    @ResponseBody
    public List<Ques> getAllQues() {
        List<Ques> allQues = quesService.queryAllQues();
        return allQues;
    }

    @PostMapping("/feedback/add")
    @ResponseBody
    public String addFeedBack(QFeedBack qFeedBack) {
        System.out.println("来反馈了");
        // System.out.println(qFeedBack);
        // 插入一条建议
        int ok = quesService.addFeedBack(qFeedBack);
        String res = ok > 0 ? "ok" : "fail";
        return "ok";
    }

    @PostMapping("/testRecord/add")
    @ResponseBody
    public String addTestRecord(QReply qReply, @Param("mykey") String mykey) {
        System.out.println("来插入记录了：" + qReply + "，自定义的 session_key：" + mykey);
        // 通过 session_key 查询openid 和uid 插入一条记录即可
        int record = quesService.addTestRecord(qReply, mykey);
        return record > 0 ? "ok" : "fail";
    }

    @GetMapping("/getLeftCnt")
    @ResponseBody
    public String getLeftTestCnt(String mykey) {
        System.out.println("查看剩余测试次数，自定义的 session_key：" + mykey);
        int res = quesService.getLeftTestCnt(mykey);
        return res <= 0 ? "no" : "yes";
    }

    @GetMapping("/testRecord/all")
    @ResponseBody
    public List<QReply> getAllTestRecord(String mykey) {
        System.out.println("查询所有测试记录，自定义的 session_key：" + mykey);
        List<QReply> res = quesService.getAllTestRecord(mykey);
        return res;
    }

    @GetMapping("/sharepics/all")
    @ResponseBody
    public List<QShares> getAllSharePics() {
        List<QShares> res = quesService.getAllSharePics();
        return res;
    }
}
