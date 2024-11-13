package com.nexus.chat.dto;

import com.nexus.chat.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String email;
    private String displayName;
    private boolean online;
    private String lastSeen;

    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setUsername(user.getUsername());
        dto.setDisplayName(user.getDisplayName());
        dto.setEmail(user.getEmail());
        dto.setOnline(user.isOnline());
        dto.setLastSeen(user.getLastSeen() != null ? 
            user.getLastSeen().toString() : null);
        return dto;
    }
} 