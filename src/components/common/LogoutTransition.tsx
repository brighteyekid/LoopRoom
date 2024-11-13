import React from 'react';
import styled, { keyframes } from 'styled-components';

const circleExpand = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  90% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
`;

const Circle = styled.div`
  width: 100vmax;
  height: 100vmax;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 50%;
  transform: scale(0);
  animation: ${circleExpand} 0.8s ease-in-out forwards;
`;

const LogoutText = styled.div`
  position: absolute;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  font-size: 2rem;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
  animation-delay: 0.2s;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

interface LogoutTransitionProps {
  onAnimationComplete: () => void;
}

const LogoutTransition: React.FC<LogoutTransitionProps> = ({ onAnimationComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onAnimationComplete, 800);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <Container>
      <Circle />
      <LogoutText>Logging out...</LogoutText>
    </Container>
  );
};

export default LogoutTransition; 