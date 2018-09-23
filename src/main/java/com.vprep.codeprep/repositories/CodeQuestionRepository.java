package com.vprep.codeprep.repositories;

import com.vprep.codeprep.entities.CodeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeQuestionRepository  extends JpaRepository<CodeQuestion, Long> {


}
