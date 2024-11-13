package com.nexus.chat.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequest {
    private String username;
    private String displayName;
    private String email;
} 