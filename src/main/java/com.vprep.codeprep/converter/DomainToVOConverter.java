package com.vprep.codeprep.converter;

import com.vprep.codeprep.entities.CodeQuestion;
import com.vprep.codeprep.entities.CodeSubmission;
import com.vprep.codeprep.vo.ProblemVO;
import com.vprep.codeprep.vo.SubmissionVO;
import org.omg.PortableInterceptor.ServerRequestInfo;

import java.text.SimpleDateFormat;

public class DomainToVOConverter {



    public static ProblemVO convertCodeQuestion(CodeQuestion codeQuestion) {

        ProblemVO problemVO = new ProblemVO();

        problemVO.setCodeQuestionId(codeQuestion.getId());
        problemVO.setTitle(codeQuestion.getTitle());
        problemVO.setDetail(codeQuestion.getDetail());
        problemVO.setStartDate(codeQuestion.getStartDate());
        problemVO.setEndDate(codeQuestion.getEndDate());
        problemVO.setInputFile(codeQuestion.getInputFile());
        problemVO.setOutputFile(codeQuestion.getOutputFile());
        return problemVO;

    }

    public static SubmissionVO convertCodeSubmission(CodeSubmission codeSubmission, String submittedCode){

        SubmissionVO submissionVO = new SubmissionVO();
        submissionVO.setCodeQuestionId(codeSubmission.getCodeQuestionId());
        submissionVO.setCodeSubmissionId(codeSubmission.getId());
        submissionVO.setSubmittedUrl(codeSubmission.getSubmittedUrl());
        submissionVO.setUserId(codeSubmission.getUserId());
        submissionVO.setSubmittedCode(submittedCode);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-mm-yyyy");
        submissionVO.setSubmittedDate(simpleDateFormat.format(codeSubmission.getDateCreated()));
        return submissionVO;
    }
}
