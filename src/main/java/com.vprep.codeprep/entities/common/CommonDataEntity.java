package com.vprep.codeprep.entities.common;

import javax.persistence.MappedSuperclass;
import java.util.Calendar;

@MappedSuperclass
public abstract class CommonDataEntity extends CommonVersionEntity {

    public CommonDataEntity() {
        this.setDateCreated(Calendar.getInstance().getTime());
        this.setLastUpdated(Calendar.getInstance().getTime());
    }
}
