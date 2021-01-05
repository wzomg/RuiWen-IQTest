package com.zzw.controller;

import com.zzw.service.UserService;
import com.zzw.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HandleController {


    @Autowired
    private UserService userService;

    @Autowired
    private RedisUtil redisUtil;

    // 使用页面跳转需要加上模板引擎，否则会渲染错误
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/toSuccess")
    public String toSuccessPage() {
        return "success";
    }

    @GetMapping("/toFailure")
    public String toFailurePage() {
        return "failure";
    }

}
