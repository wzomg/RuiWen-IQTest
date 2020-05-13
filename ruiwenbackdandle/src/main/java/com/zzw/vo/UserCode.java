package com.zzw.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserCode implements Serializable {
    // 用户所在行的主键
    private Integer uid;
    // 用于封装 redis 中的 value 以读取用户的 openid
    private String openid;
    private String session_key;
}
