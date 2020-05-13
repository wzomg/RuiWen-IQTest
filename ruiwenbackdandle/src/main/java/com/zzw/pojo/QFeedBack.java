package com.zzw.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
// 反馈实体类
public class QFeedBack {
    private String content;
    private String contact;
}
