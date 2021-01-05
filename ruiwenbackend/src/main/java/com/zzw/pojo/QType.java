package com.zzw.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
// 题目分类表
public class QType {
    private Integer tid;
    private String tname;

    // 题目分类 对 题目：一对多（可有可无）
    // private List<Ques> quesList;
}
