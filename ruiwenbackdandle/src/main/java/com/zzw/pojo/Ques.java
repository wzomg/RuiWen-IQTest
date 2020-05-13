package com.zzw.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
// 题目表
public class Ques {
    // 题目自增主键 id
    private Integer qid;
    // 题目描述（图片链接）
    private String qdes;
    // 题目答案（正确的图片名）
    private String qans;

    // 题目 对 题目分类：多 对 一（查询需要绑定一方的信息）
    private QType qtype;

    // 题目 对 选项：一 对 多
    private List<QOpts> qOptsList;

}
