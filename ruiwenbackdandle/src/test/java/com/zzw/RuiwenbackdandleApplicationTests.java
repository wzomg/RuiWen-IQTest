package com.zzw;

import com.zzw.pojo.User;
import com.zzw.service.UserService;
import com.zzw.utils.RedisUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

@SpringBootTest
class RuiwenbackdandleApplicationTests {


//    @Autowired
//    private UserService userService;

//    @Autowired
//    private RedisUtil redisUtil;

    @Test
    void contextLoads() {
        // List<User> allUser = userService.getAllUser();
        // redisUtil.set("user:all", allUser);
//        System.out.println(redisUtil.get("user:all"));
    }
}
