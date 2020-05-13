package com.zzw.service.impl;

import com.zzw.mapper.UserMapper;
import com.zzw.pojo.User;
import com.zzw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public User findUser(String onid) {
        User user = userMapper.findUser(onid);
        return user;
    }

    @Override
    public int addUser(User user) {
        int num = userMapper.addUser(user);
        return num;
    }
}
