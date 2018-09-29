package com.vprep.codeprep.services;

import com.vprep.codeprep.dao.SolutionDAO;
import com.vprep.codeprep.vo.SubmissionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SolutionService {


    @Autowired
    private SolutionDAO solutionDAO;

    public List<SubmissionVO> getAllSubmissionByUserId(Long userId) throws IOException {
        return solutionDAO.fetchAllSubmissionByUserId(userId);
    }


}
