package com.nexus.chat.repository;

import com.nexus.chat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(value = "SELECT m FROM Message m ORDER BY m.sentAt DESC LIMIT :limit")
    List<Message> findLatestMessages(@Param("limit") int limit);

    List<Message> findTop100ByOrderBySentAtDesc();

    List<Message> findAllByOrderBySentAtAsc();
} 