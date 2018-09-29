package com.vprep.codeprep.dao;

import com.vprep.codeprep.aws.s3.S3Component;
import com.vprep.codeprep.converter.DomainToVOConverter;
import com.vprep.codeprep.entities.CodeSubmission;
import com.vprep.codeprep.repositories.CodeSubmissionRepository;
import com.vprep.codeprep.vo.SubmissionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SolutionDAO {


    @Autowired
    private CodeSubmissionRepository codeSubmissionRepository;

    @Autowired
    private S3Component s3Component;

    private String SOL_S3_LOCATION = "com.codeprep.solutions/user_";

    private String key = "solution_";


    public List<SubmissionVO> fetchAllSubmissionByUserId(Long userId) throws IOException {
        List<CodeSubmission> codeSubmissionList = codeSubmissionRepository.findByUserId(userId);
        List<SubmissionVO> submissionVOList = new ArrayList<>();
        for(CodeSubmission codeSubmission: codeSubmissionList){
            String solLocation= SOL_S3_LOCATION+String.valueOf(codeSubmission.getCodeQuestionId());
            String solKey = key+String.valueOf(userId)+".txt";
            submissionVOList.add(DomainToVOConverter.convertCodeSubmission(codeSubmission,s3Component.readFromS3(solLocation,solKey)));
        }
        return submissionVOList;
    }
}
