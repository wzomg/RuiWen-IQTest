package com.zzw;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@MapperScan("com.zzw.mapper")
@EnableCaching
public class RuiwenbackdandleApplication {
    public static void main(String[] args) {
        SpringApplication.run(RuiwenbackdandleApplication.class, args);
    }
}
