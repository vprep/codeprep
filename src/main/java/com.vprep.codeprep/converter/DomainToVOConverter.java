package com.vprep.codeprep.converter;

import com.vprep.codeprep.entities.CodeQuestion;
import com.vprep.codeprep.entities.CodeSubmission;
import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.vo.ProblemVO;
import com.vprep.codeprep.vo.ProfileVO;
import com.vprep.codeprep.vo.SubmissionVO;

import java.text.SimpleDateFormat;

public class DomainToVOConverter {



    public static ProblemVO convertCodeQuestion(CodeQuestion codeQuestion) {
        ProblemVO problemVO = null;
        if(codeQuestion != null) {
            problemVO = new ProblemVO();

            problemVO.setCodeQuestionId(codeQuestion.getId());
            problemVO.setTitle(codeQuestion.getTitle());
            problemVO.setDetail(codeQuestion.getDetail());
            problemVO.setStartDate(codeQuestion.getStartDate());
            problemVO.setEndDate(codeQuestion.getEndDate());
            problemVO.setInputFile(codeQuestion.getInputFile());
            problemVO.setOutputFile(codeQuestion.getOutputFile());
        }
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

    public static ProfileVO convertUserProfile(User user) {
        ProfileVO profileVO = new ProfileVO();
        profileVO.setId(user.getId());
        profileVO.setUsername(user.getUsername());
        profileVO.setPhone(user.getPhone());
        profileVO.setActive(user.isActive());
        profileVO.setEmail(user.getEmail());
        profileVO.setPassword(user.getPassword());
        profileVO.setRoles(user.getRoles());
        profileVO.setPaymentType(user.getPaymentType());
        profileVO.setOathProvider(user.getOathProvider());
        profileVO.setOauthUid(user.getOauthUid());
        profileVO.setName(user.getName());
        profileVO.setRollNo(user.getRollNo());
        profileVO.setYearOfAdm(user.getYearOfAdm());
        profileVO.setBranch(user.getBranch());
        profileVO.setGroup(user.getGroup());
        profileVO.setSubGroup(user.getSubGroup());
        profileVO.setAddress(user.getAddress());
        profileVO.setCity(user.getCity());
        profileVO.setEngineeringCollegeId(user.getEngineeringCollegeId());
        profileVO.setState(user.getState());
        profileVO.setZip(user.getZip());
        profileVO.setGender(user.getGender());
        profileVO.setDob(user.getDob());
        profileVO.setImage(user.getImage());
        profileVO.setUserType(user.getUserType());
        profileVO.setIsTutor(user.getIsTutor());
        return profileVO;

    }
}
