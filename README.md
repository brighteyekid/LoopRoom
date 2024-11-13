Here's your README in a structured and well-formatted layout:

```markdown
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/9073/9073032.png" alt="LOOPROOM Logo" width="200"/>
  <h1>LOOPROOM</h1>
  <p>A modern real-time chat application built with Spring Boot and React</p>
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-brightgreen.svg)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
</div>

## ✨ Features

- **💬 Real-time Messaging**: Instant communication with WebSocket.
- **🎨 Modern UI**: Responsive design with smooth animations.
- **👥 User Presence**: Online/offline status indicators.
- **📜 Message History**: Persistent chat history.
- **🌓 Theme Support**: Dark/light modes available.
- **📱 Mobile-Friendly**: Optimized for all devices.
- **🔒 Secure Connections**: Encrypted WebSocket handling.
- **🔄 Automatic Reconnection**: Seamless reconnection for stability.
- **💾 Database Integration**: PostgreSQL for reliable data storage.

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.3** with WebSocket, Data JPA, and Security
- **PostgreSQL** for message persistence
- **Gradle** for project management
- **Flyway** for database migrations
- **Lombok** for reducing boilerplate code
- **JUnit & Mockito** for testing

### Frontend
- **React 18** with TypeScript
- **Styled Components** for CSS
- **STOMP WebSocket client** for real-time functionality
- **React Context** for state management
- **Modern CSS** animations and transitions

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 13 or higher
- Gradle 7.x or higher

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/brighteyekid/LoopRoom.git

# Navigate to the project directory
cd LoopRoom

# Run the Spring Boot application
./gradlew bootRun
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd chat

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

## 📦 Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE nexus_chat;
   ```

2. Configure the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/nexus_chat
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Migrations will run automatically on application startup.

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following configurations:

```env
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/nexus_chat
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# Application Configuration
SERVER_PORT=8080
CLIENT_ORIGIN=http://localhost:3000
```

## 🌟 Feature Highlights

### Real-Time Chat
- **Instant Messaging**: Real-time message delivery via WebSocket.
- **Persistence**: Messages are stored in the PostgreSQL database.
- **User Typing Indicators**: Visual feedback for user typing status.
- **Read Receipts**: Acknowledge when messages are read.

### User Experience
- **Smooth Transitions**: Enhanced animations for UI flow.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Error Handling**: Provides reliable error handling and reconnection.

### Theme Support
- **Dark/Light Mode**: Switch between themes for visual comfort.
- **Custom Scrollbars**: Matches the theme for a consistent look.
- **Modern UI**: Clean and intuitive components.

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

## 📝 Development Guidelines

### Commit Messages
- Use conventional commit format.
- Keep messages clear and concise.
- Reference issues when relevant.

### Code Style
- Follow Java coding standards.
- Use ESLint for JavaScript/TypeScript.
- Write meaningful comments and keep functions focused.

## 🧪 Testing

### Backend Tests
Run backend tests with:
```bash
./gradlew test
```

### Frontend Tests
Run frontend tests with:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

Special thanks to:
- The Spring Boot team for their fantastic framework.
- The React team for the frontend library.
- All contributors to this project.

## 📞 Contact

Your Name - [@brighteyekid](https://github.com/brighteyekid)

Project Link: [https://github.com/brighteyekid/LoopRoom](https://github.com/brighteyekid/LoopRoom)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/brighteyekid">brighteyekid</a>
</div>
```
