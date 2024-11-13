package com.nexus.chat.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.nexus.chat.dto.MessageDTO;

@Data
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(name = "sender_username", nullable = false)
    private String senderUsername;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageType type;

    @Column(name = "sent_at", nullable = false)
    private LocalDateTime sentAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @Column(name = "unique_id")
    private String uniqueId;

    public MessageDTO toDTO() {
        MessageDTO dto = new MessageDTO();
        dto.setContent(this.content);
        dto.setSenderUsername(this.senderUsername);
        dto.setType(this.type.toString());
        dto.setSentAt(this.sentAt.toString());
        dto.setUniqueId(this.uniqueId);
        return dto;
    }
} 