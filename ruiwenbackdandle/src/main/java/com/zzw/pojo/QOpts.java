package com.zzw.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
// 题目选项表
public class QOpts {
    // 选项自增主键 id
    private Integer oid;
    // 选项描述（图片链接）
    private String odes;

    // 选项 对  题目：多对一（可有可无）
    // private Ques ques;
}
