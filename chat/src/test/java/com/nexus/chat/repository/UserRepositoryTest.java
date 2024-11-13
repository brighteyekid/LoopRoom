package com.nexus.chat.repository;

import com.nexus.chat.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void whenSaveUser_thenRetrieveSame() {
        // given
        User user = new User();
        user.setUsername("testuser");
        user.setDisplayName("Test User");
        user.setEmail("test@example.com");
        user.setOnline(true);

        // when
        User savedUser = userRepository.save(user);

        // then
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo("testuser");
        assertThat(savedUser.getJoinedAt()).isNotNull();
        assertThat(savedUser.isOnline()).isTrue();
    }

    @Test
    public void whenFindByUsername_thenReturnUser() {
        // given
        User user = new User();
        user.setUsername("testuser");
        user.setDisplayName("Test User");
        user.setEmail("test@example.com");
        entityManager.persist(user);
        entityManager.flush();

        // when
        User found = userRepository.findByUsername(user.getUsername()).orElse(null);

        // then
        assertThat(found).isNotNull();
        assertThat(found.getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    public void whenFindBySessionId_thenReturnUser() {
        // given
        User user = new User();
        user.setUsername("testuser");
        user.setSessionId("test-session-id");
        entityManager.persist(user);
        entityManager.flush();

        // when
        User found = userRepository.findBySessionId(user.getSessionId()).orElse(null);

        // then
        assertThat(found).isNotNull();
        assertThat(found.getSessionId()).isEqualTo(user.getSessionId());
    }
} 