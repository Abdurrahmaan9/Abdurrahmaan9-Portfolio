import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, delay = 1000, className = '', color = '#ffffff' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    // Initial delay before starting
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText('');
    }, delay);
    
    return () => clearTimeout(initialDelay);
  }, [delay]);

  return (
    <span className={className} style={{ color: color }}>
      {displayText}
      {isTyping && <span className="typewriter-cursor" style={{ color: color }}>|</span>}
    </span>
  );
};

export default Typewriter; 