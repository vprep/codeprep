package com.vprep.codeprep.entities;

import com.vprep.codeprep.entities.common.CommonDataEntity;

import javax.persistence.*;

@Entity
@Table(name = "code_submission")
@SequenceGenerator(name = "code_submission_id", sequenceName = "code_submission_id_sequence", initialValue = 10, allocationSize = 1)
public class CodeSubmission extends CommonDataEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "code_submission_id")
    @Column(name = "id")
    private Long id;

    private Long codeQuestionId;

    private String submittedUrl;

    private Long userId;

    public Long getId() {
        return id;
    }

    public CodeSubmission setId(Long id) {
        this.id = id;
        return this;
    }

    public Long getCodeQuestionId() {
        return codeQuestionId;
    }

    public CodeSubmission setCodeQuestionId(Long codeQuestionId) {
        this.codeQuestionId = codeQuestionId;
        return this;
    }

    public String getSubmittedUrl() {
        return submittedUrl;
    }

    public CodeSubmission setSubmittedUrl(String submittedUrl) {
        this.submittedUrl = submittedUrl;
        return this;
    }

    public Long getUserId() {
        return userId;
    }

    public CodeSubmission setUserId(Long userId) {
        this.userId = userId;
        return this;
    }
}
