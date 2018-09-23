package com.vprep.codeprep.converter;

import com.vprep.codeprep.entities.CodeQuestion;
import com.vprep.codeprep.vo.ProblemVO;

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
}
