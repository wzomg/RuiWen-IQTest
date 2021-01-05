package com.zzw.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.zzw.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WebHandleInterceptor implements HandlerInterceptor {

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String mykey = request.getParameter("mykey");
        // System.out.println("拦截得到自定义的key为：" + mykey);
        // 如果请求参数中有key，还要查看redis 中的key是否存在，如果存在的话就查看一下过期时间，时间小于等于30 mins，就重新设置过期时间为1周
        if (mykey != null) {
            JSONObject jsonObject2 = (JSONObject) redisUtil.get(mykey);
            // System.out.println("redis中存在key对应的值为：" + jsonObject2);
            if (jsonObject2 != null) {
                // 得到过期时间，这里要设置为一周时间：604800L
                long expire = redisUtil.getExpire(mykey);
                if (expire <= 1800L) redisUtil.set(mykey, jsonObject2, 604800L);
            }
        }
        // 注意要放行
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }


}
