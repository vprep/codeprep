package com.vprep.codeprep.vo;

import java.util.Date;

public class ProblemVO {

    private Long codeQuestionId;

    private String title;

    private String detail;

    private Date startDate;

    private Date endDate;

    private String inputFile;

    private String outputFile;

    private String queContent;

    private String pageUrl;

    public String getPageUrl() {
        return pageUrl;
    }

    public ProblemVO setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
        return this;
    }

    public String getQueContent() {
        return queContent;
    }

    public ProblemVO setQueContent(String queContent) {
        this.queContent = queContent;
        return this;
    }

    public Long getCodeQuestionId() {
        return codeQuestionId;
    }

    public ProblemVO setCodeQuestionId(Long codeQuestionId) {
        this.codeQuestionId = codeQuestionId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ProblemVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDetail() {
        return detail;
    }

    public ProblemVO setDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public Date getStartDate() {
        return startDate;
    }

    public ProblemVO setStartDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getEndDate() {
        return endDate;
    }

    public ProblemVO setEndDate(Date endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getInputFile() {
        return inputFile;
    }

    public ProblemVO setInputFile(String inputFile) {
        this.inputFile = inputFile;
        return this;
    }

    public String getOutputFile() {
        return outputFile;
    }

    public ProblemVO setOutputFile(String outputFile) {
        this.outputFile = outputFile;
        return this;
    }
}
