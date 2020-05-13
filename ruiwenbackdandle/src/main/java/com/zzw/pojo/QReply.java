package com.zzw.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
// 答题结果表
public class QReply {
    private Long rid;
    private Integer rA;
    private Integer rB;
    private Integer rC;
    private Integer rD;
    private Integer rE;
    private String rtime;
    private String iqrank;
    private String iqrange;
}
