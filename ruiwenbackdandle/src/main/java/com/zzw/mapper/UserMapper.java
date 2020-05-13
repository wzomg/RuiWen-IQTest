package com.zzw.mapper;


import com.zzw.pojo.User;

public interface UserMapper {

    public User findUser(String onid);

    public int addUser(User user);

}
