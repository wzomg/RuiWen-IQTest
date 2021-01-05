package com.zzw.service;

import com.zzw.pojo.User;

public interface UserService {

    public User findUser(String onid);

    public int addUser(User user);
}
