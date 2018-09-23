package com.vprep.codeprep.dao;

import com.vprep.codeprep.converter.DomainToVOConverter;
import com.vprep.codeprep.entities.CodeQuestion;
import com.vprep.codeprep.repositories.CodeQuestionRepository;
import com.vprep.codeprep.vo.ProblemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProblemDAO {

    @Autowired
    private CodeQuestionRepository codeQuestionRepository;


    public ProblemVO fetchProblemById(Long id){
        return DomainToVOConverter.convertCodeQuestion(codeQuestionRepository.findOne(id));
    }

    public List<ProblemVO> fetchAllProblems(){
        List<CodeQuestion> codeQuestionList = codeQuestionRepository.findAll();
        List<ProblemVO> problemVOList = new ArrayList<>();
        for(CodeQuestion codeQuestion: codeQuestionList){
            problemVOList.add(DomainToVOConverter.convertCodeQuestion(codeQuestion));
        }
        return problemVOList;
    }
}
