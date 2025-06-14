import React, { useState, useEffect, useRef } from 'react';

const SimpleGridTest = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      console.log('Mouse move:', { x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      console.log('Mouse enter');
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      console.log('Mouse leave');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)',
        border: '2px solid blue',
        zIndex: 1,
        cursor: 'crosshair'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        Mouse: {mousePos.x}, {mousePos.y} | Hovering: {isHovering ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default SimpleGridTest; 