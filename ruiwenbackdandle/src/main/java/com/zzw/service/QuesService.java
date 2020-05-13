package com.zzw.service;

import com.zzw.pojo.QReply;
import com.zzw.pojo.QFeedBack;
import com.zzw.pojo.Ques;

import java.util.List;

public interface QuesService {
    public List<Ques> queryAllQues();

    public int addFeedBack(QFeedBack qFeedBack);
    public int addTestRecord(QReply qReply, String mykey);

    public int getLeftTestCnt(String mykey);

    public List<QReply>  getAllTestRecord(String mykey);
}
