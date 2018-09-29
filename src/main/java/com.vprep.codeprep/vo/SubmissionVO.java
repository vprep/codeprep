package com.vprep.codeprep.vo;

public class SubmissionVO {

    private Long codeSubmissionId;

    private Long codeQuestionId;

    private String submittedUrl;

    private Long userId;

    private String submittedCode;

    private String submittedDate;

    public String getSubmittedDate() {
        return submittedDate;
    }

    public SubmissionVO setSubmittedDate(String submittedDate) {
        this.submittedDate = submittedDate;
        return this;
    }

    public String getSubmittedCode() {
        return submittedCode;
    }

    public SubmissionVO setSubmittedCode(String submittedCode) {
        this.submittedCode = submittedCode;
        return this;
    }

    public Long getCodeSubmissionId() {
        return codeSubmissionId;
    }

    public SubmissionVO setCodeSubmissionId(Long codeSubmissionId) {
        this.codeSubmissionId = codeSubmissionId;
        return this;
    }

    public Long getCodeQuestionId() {
        return codeQuestionId;
    }

    public SubmissionVO setCodeQuestionId(Long codeQuestionId) {
        this.codeQuestionId = codeQuestionId;
        return this;
    }

    public String getSubmittedUrl() {
        return submittedUrl;
    }

    public SubmissionVO setSubmittedUrl(String submittedUrl) {
        this.submittedUrl = submittedUrl;
        return this;
    }

    public Long getUserId() {
        return userId;
    }

    public SubmissionVO setUserId(Long userId) {
        this.userId = userId;
        return this;
    }
}
