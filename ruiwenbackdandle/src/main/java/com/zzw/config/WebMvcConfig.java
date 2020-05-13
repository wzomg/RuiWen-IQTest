package com.zzw.config;

import com.zzw.interceptor.WebHandleInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 实现WebMvcConfigurer接口用来扩展SpringMVC的功能，注意要在这个类上加上注解配置
@Configuration
public class WebMvcConfig  implements WebMvcConfigurer {

    // 使用 @Bean 方式装配
    @Bean
    public WebHandleInterceptor webHandleInterceptor() {
        return new WebHandleInterceptor();
    }

    // 注册自定义的拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(webHandleInterceptor()).addPathPatterns("/**");
    }
}
