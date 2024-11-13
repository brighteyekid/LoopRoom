package com.nexus.chat.dto;

import lombok.Data;

@Data
public class MessageDTO {
    private String content;
    private String senderUsername;
    private String type;
    private String sentAt;
    private String uniqueId;
} 