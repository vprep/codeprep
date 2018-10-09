package com.vprep.codeprep.repositories;

import com.vprep.codeprep.entities.CodeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeSubmissionRepository  extends JpaRepository<CodeSubmission, Long> {

    List<CodeSubmission> findByUserId(Long userId);


}
