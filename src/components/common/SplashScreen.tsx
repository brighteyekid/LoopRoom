import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

interface ContainerProps {
  isVisible: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  z-index: 1000;
  animation: ${(props: ContainerProps) => props.isVisible ? fadeIn : fadeOut} 0.5s ease-in-out;
`;

const Logo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: #fff;
    border-radius: 2px;
    animation: loading 1.5s infinite ease-in-out;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }
`;

const Version = styled.div`
  color: rgba(255, 255, 255, 0.5);
  margin-top: 1rem;
  font-size: 0.8rem;
`;

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinished, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <Container isVisible={isVisible}>
      <Logo>LOOPROOM</Logo>
      <LoadingBar />
      <Version>v1.0.0</Version>
    </Container>
  );
};

export default SplashScreen; 