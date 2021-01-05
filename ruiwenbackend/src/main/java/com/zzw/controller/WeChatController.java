package com.zzw.controller;

import com.zzw.service.WeChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
public class WeChatController {

    @Autowired
    private WeChatService wc;

    @GetMapping("/cert")
    @ResponseBody
    public Object getOpenId(@RequestParam("code") String code, @RequestParam("mykey") String mykey) {
        System.out.println("从前端传来的自定义 session_key：" + mykey);
        String res = wc.getOpenid(code, mykey);
        // 用 map 封装数据，并自动转成 json 返回给前端
        Map<String, String> op = new HashMap<>();
        op.put("ukey", res);
        return op;
    }
}
