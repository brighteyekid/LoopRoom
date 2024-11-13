package com.nexus.chat.repository;

import com.nexus.chat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findBySessionId(String sessionId);
    List<User> findByOnlineTrue();
    long countByOnlineTrue();
    @Modifying
    @Query("UPDATE User u SET u.online = false")
    void setAllUsersOffline();
    boolean existsByUsername(String username);
} 