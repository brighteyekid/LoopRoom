package com.nexus.chat.service;

import com.nexus.chat.model.Message;
import com.nexus.chat.model.MessageType;
import com.nexus.chat.model.User;
import com.nexus.chat.repository.MessageRepository;
import com.nexus.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public User handleUserJoin(String username, String sessionId) {
        User user = userRepository.findByUsername(username)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername(username);
                newUser.setJoinedAt(LocalDateTime.now());
                return newUser;
            });
        
        user.setOnline(true);
        user.setSessionId(sessionId);
        user.setLastSeen(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<User> getOnlineUsers() {
        return userRepository.findByOnlineTrue();
    }

    public List<Message> getChatHistory() {
        return messageRepository.findAllByOrderBySentAtAsc();
    }

    @Transactional
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public void handleUserDisconnect(String identifier) {
        User user;
        if (identifier.contains("-")) {
            // It's a session ID
            user = userRepository.findBySessionId(identifier).orElse(null);
        } else {
            // It's a username
            user = userRepository.findByUsername(identifier).orElse(null);
        }

        if (user != null) {
            user.setOnline(false);
            user.setLastSeen(LocalDateTime.now());
            userRepository.save(user);

            // Send leave message
            Message leaveMessage = new Message();
            leaveMessage.setType(MessageType.LEAVE);
            leaveMessage.setContent(user.getUsername() + " left the chat");
            leaveMessage.setSenderUsername(user.getUsername());
            leaveMessage.setSentAt(LocalDateTime.now());
            leaveMessage.setUniqueId(UUID.randomUUID().toString());
            
            messagingTemplate.convertAndSend("/topic/public", leaveMessage);
            messagingTemplate.convertAndSend("/topic/users", getOnlineUsers());
        }
    }
} 