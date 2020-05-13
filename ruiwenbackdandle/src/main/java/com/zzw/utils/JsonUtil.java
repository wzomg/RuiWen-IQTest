package com.zzw.utils;

import com.alibaba.fastjson.JSONObject;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;

public class JsonUtil {
    public static Object json2Object(JSONObject json, Class bean) throws Exception {
        // 首先得到pojo所定义的字段
        Field[] fields = bean.getDeclaredFields();
        // 根据传入的Class动态生成pojo对象
        Object obj = bean.newInstance();
        for (Field field : fields) {
            // 设置字段可访问（必须，否则报错）
            field.setAccessible(true);
            // 得到字段的属性名
            String name = field.getName();
            // 这一段的作用是如果字段在JSONObject中不存在会抛出异常，如果出异常，则跳过。
            try {
                json.get(name);
            } catch (Exception ex) {
                continue;
            }
            if (json.get(name) != null && !"".equals(json.getString(name))) {
                // 根据字段的类型将值转化为相应的类型，并设置到生成的对象中。
                if (field.getType().equals(Long.class) || field.getType().equals(long.class)) {
                    field.set(obj, Long.parseLong(json.getString(name)));
                } else if (field.getType().equals(String.class)) {
                    field.set(obj, json.getString(name));
                } else if (field.getType().equals(Double.class) || field.getType().equals(double.class)) {
                    field.set(obj, Double.parseDouble(json.getString(name)));
                } else if (field.getType().equals(Integer.class) || field.getType().equals(int.class)) {
                    field.set(obj, Integer.parseInt(json.getString(name)));
                } else if (field.getType().equals(java.util.Date.class)) {
                    field.set(obj, new SimpleDateFormat("yyyy/MM/dd").parse(json.getString(name)));
                } else {
                    continue;
                }
            }
        }
        return obj;
    }
}
