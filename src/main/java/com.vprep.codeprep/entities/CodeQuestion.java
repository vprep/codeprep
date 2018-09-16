package com.vprep.codeprep.entities;

import com.vprep.codeprep.entities.common.CommonDataEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "code_question")
@SequenceGenerator(name = "code_question_id", sequenceName = "code_question_id_sequence", initialValue = 10, allocationSize = 1)
public class CodeQuestion extends CommonDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "code_question_id")
    @Column(name = "id")
    private Long id;

    private String title;

    private String detail;

    private Date startDate;

    private Date endDate;

    private String inputFile;

    private String outputFile;

    public Long getId() {
        return id;
    }

    public CodeQuestion setId(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public CodeQuestion setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDetail() {
        return detail;
    }

    public CodeQuestion setDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public Date getStartDate() {
        return startDate;
    }

    public CodeQuestion setStartDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getEndDate() {
        return endDate;
    }

    public CodeQuestion setEndDate(Date endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getInputFile() {
        return inputFile;
    }

    public CodeQuestion setInputFile(String inputFile) {
        this.inputFile = inputFile;
        return this;
    }

    public String getOutputFile() {
        return outputFile;
    }

    public CodeQuestion setOutputFile(String outputFile) {
        this.outputFile = outputFile;
        return this;
    }
}
