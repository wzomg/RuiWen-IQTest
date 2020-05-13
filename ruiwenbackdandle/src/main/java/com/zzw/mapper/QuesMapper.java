package com.zzw.mapper;

import com.zzw.pojo.QFeedBack;
import com.zzw.pojo.QReply;
import com.zzw.pojo.Ques;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface QuesMapper {
    public List<Ques> queryAllQues();

    public int addFeedBack(QFeedBack qFeedBack);

    public int addTestRecord(@Param("qa") QReply qReply, @Param("uid")  Integer uid);

    public List<QReply> getAllTestRecord(Integer uid);
}
