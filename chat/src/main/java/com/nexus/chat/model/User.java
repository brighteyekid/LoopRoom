package com.nexus.chat.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column
    private String email;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "last_seen")
    private LocalDateTime lastSeen;

    @Column(name = "is_online")
    private boolean online;

    @Column(nullable = true)
    private String password;

    @Column(name = "session_id")
    private String sessionId;
} 