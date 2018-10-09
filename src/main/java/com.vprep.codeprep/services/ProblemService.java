package com.vprep.codeprep.services;

import com.vprep.codeprep.aws.s3.S3Component;
import com.vprep.codeprep.dao.ProblemDAO;
import com.vprep.codeprep.dao.SolutionDAO;
import com.vprep.codeprep.vo.ProblemVO;
import com.vprep.codeprep.vo.SubmissionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemDAO problemDAO;

    @Autowired
    private SolutionDAO solutionDAO;


    @Autowired
    private S3Component s3Component;

    private String QUE_S3_LOCATION = "com.codeprep.questions/que_";

    private String key = "details_";


    public ProblemVO getProblemById(Long id) throws IOException {
        ProblemVO problemVO = problemDAO.fetchProblemById(id);
        if(problemVO != null) {
            String queLocation= QUE_S3_LOCATION+String.valueOf(problemVO.getCodeQuestionId());
            String queKey = key+String.valueOf(problemVO.getCodeQuestionId())+".txt";
                  problemVO.setQueContent(s3Component.readFromS3(queLocation,queKey));
         //   problemVO.setQueContent("mocked que");
        }
        return problemVO;
    }



    /*public ProblemVO getProblemByEmail(String email) throws IOException {
        ProblemVO problemVO = null;
        if(problemVO != null) {
            problemVO = problemDAO.fetchProblemById(id);
            String queLocation= QUE_S3_LOCATION+String.valueOf(problemVO.getCodeQuestionId());
            String queKey = key+String.valueOf(problemVO.getCodeQuestionId())+".txt";
            //      problemVO.setQueContent(s3Component.readFromS3(queLocation,queKey));
            problemVO.setQueContent("mocked que");
        }
        return problemVO;
    }*/

    public List<ProblemVO> getAllProblems() throws IOException{
       List<ProblemVO> problemVOList =  problemDAO.fetchAllProblems();
       for (ProblemVO problemVO: problemVOList){
           String queLocation= QUE_S3_LOCATION+String.valueOf(problemVO.getCodeQuestionId());
           String queKey = key+String.valueOf(problemVO.getCodeQuestionId())+".txt";
           problemVO.setQueContent(s3Component.readFromS3(queLocation,queKey));
         //  problemVO.setQueContent("mocked content");
           String url = "/problem?id="+String.valueOf(problemVO.getCodeQuestionId());
           problemVO.setPageUrl(url);
       }
       return problemVOList;
    }

    public List<SubmissionVO> getAllSubmissionByUserId(Long userId) throws IOException {
        return solutionDAO.fetchAllSubmissionByUserId(userId);
    }

    public String readS3File() throws IOException {
       return s3Component.readFromS3(QUE_S3_LOCATION,key);
    }

    public SubmissionVO getSubmissionbyId(Long subId) throws IOException {

        return solutionDAO.fetchSubmissionById(subId);
    }

}
