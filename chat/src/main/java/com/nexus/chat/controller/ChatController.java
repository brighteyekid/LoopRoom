package com.nexus.chat.controller;

import com.nexus.chat.model.Message;
import com.nexus.chat.model.MessageType;
import com.nexus.chat.model.User;
import com.nexus.chat.dto.JoinRequest;
import com.nexus.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    
    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public Message handleUserJoined(JoinRequest joinRequest, SimpMessageHeaderAccessor headerAccessor) {
        String username = joinRequest.getUsername();
        String sessionId = headerAccessor.getSessionId();
        headerAccessor.getSessionAttributes().put("username", username);
        headerAccessor.getSessionAttributes().put("sessionId", sessionId);
        
        // Handle user join logic
        chatService.handleUserJoin(username, sessionId);
        
        // Send chat history to the user's private queue
        List<Message> history = chatService.getChatHistory();
        messagingTemplate.convertAndSendToUser(
            username,
            "/queue/history",
            history,
            createHeaders(sessionId)  // Add session headers
        );
        
        // Broadcast user list update
        messagingTemplate.convertAndSend("/topic/users", chatService.getOnlineUsers());
        
        // Create join message
        Message joinMessage = new Message();
        joinMessage.setType(MessageType.JOIN);
        joinMessage.setContent(username + " joined the chat");
        joinMessage.setSenderUsername(username);
        joinMessage.setSentAt(LocalDateTime.now());
        joinMessage.setUniqueId(UUID.randomUUID().toString());
        
        return joinMessage;
    }
    
    private MessageHeaders createHeaders(String sessionId) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("simpSessionId", sessionId);
        return new MessageHeaders(headers);
    }
    
    @MessageMapping("/chat.send")
    @Transactional
    public void handleChatMessage(Message message) {
        // Set message metadata
        message.setType(MessageType.CHAT);
        message.setSentAt(LocalDateTime.now());
        message.setUniqueId(UUID.randomUUID().toString());
        
        // Save and broadcast the message
        Message savedMessage = chatService.saveMessage(message);
        messagingTemplate.convertAndSend("/topic/public", savedMessage);
    }
    
    @MessageMapping("/chat.leave")
    @Transactional
    public void handleUserLeft(String username) {
        chatService.handleUserDisconnect(username);
    }
    
    @EventListener
    @Transactional
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        chatService.handleUserDisconnect(sessionId);
    }
    
    @MessageMapping("/chat.history")
    public void requestHistory(SimpMessageHeaderAccessor headerAccessor) {
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String sessionId = headerAccessor.getSessionId();
        
        if (username != null) {
            List<Message> history = chatService.getChatHistory();
            messagingTemplate.convertAndSendToUser(
                username,
                "/queue/history",
                history,
                createHeaders(sessionId)
            );
        }
    }
} 