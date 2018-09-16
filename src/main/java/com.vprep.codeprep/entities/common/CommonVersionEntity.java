package com.vprep.codeprep.entities.common;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class CommonVersionEntity implements BaseEntity {
    @Transient
    public static final String DATE_CREATED = "dateCreated";
    @Transient
    public static final String LAST_UPDATED = "lastUpdated";

    @CreatedDate
    @Column(nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @Column(nullable = true)
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdated;

    @Column
    private Long createdBy;

    @Column
    private Long updatedBy;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    @Version
    private Long version;



    /**
     * Sets new version.
     *
     * @param version New value of version.
     */
    public void setVersion(Long version) {
        this.version = version;
    }

    /**
     * Sets new lastUpdated.
     *
     * @param lastUpdated New value of lastUpdated.
     */
    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    /**
     * Gets createdBy.
     *
     * @return Value of createdBy.
     */
    public Long getCreatedBy() {
        return createdBy;
    }

    /**
     * Gets version.
     *
     * @return Value of version.
     */
    public Long getVersion() {
        return version;
    }

    /**
     * Gets LAST_UPDATED.
     *
     * @return Value of LAST_UPDATED.
     */
    public static String getLAST_UPDATED() {
        return LAST_UPDATED;
    }

    /**
     * Sets new DATE_CREATED.
     *
     * @param DATE_CREATED New value of DATE_CREATED.
     */
    public static void setDATE_CREATED(String DATE_CREATED) {
        DATE_CREATED = DATE_CREATED;
    }

    /**
     * Sets new createdBy.
     *
     * @param createdBy New value of createdBy.
     */
    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Sets new LAST_UPDATED.
     *
     * @param LAST_UPDATED New value of LAST_UPDATED.
     */
    public static void setLAST_UPDATED(String LAST_UPDATED) {
        LAST_UPDATED = LAST_UPDATED;
    }

    /**
     * Sets new updatedBy.
     *
     * @param updatedBy New value of updatedBy.
     */
    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    /**
     * Gets dateCreated.
     *
     * @return Value of dateCreated.
     */
    public Date getDateCreated() {
        return dateCreated;
    }

    /**
     * Gets lastUpdated.
     *
     * @return Value of lastUpdated.
     */
    public Date getLastUpdated() {
        return lastUpdated;
    }

    /**
     * Gets updatedBy.
     *
     * @return Value of updatedBy.
     */
    public Long getUpdatedBy() {
        return updatedBy;
    }

    /**
     * Sets new dateCreated.
     *
     * @param dateCreated New value of dateCreated.
     */
    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    /**
     * Gets DATE_CREATED.
     *
     * @return Value of DATE_CREATED.
     */
    public static String getDATE_CREATED() {
        return DATE_CREATED;
    }
}
