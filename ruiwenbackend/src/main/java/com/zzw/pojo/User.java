package com.zzw.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
// 用户信息表
public class User implements Serializable {
    // 用户自增 id
    private Integer uid;

    // 微信用户的 openid
    private String onid;

    // 用户对测试记录：一对多
    private List<QReply> qReplies;
}
