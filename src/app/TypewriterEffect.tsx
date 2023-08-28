import React, { useState, useEffect } from 'react';


const TypewriterEffect = ({ text }: { text: string }) => {

    const [showCursor, setShowCursor] = useState(true);
  
    useEffect(() => {
      const cursorInterval = setInterval(() => {
        setShowCursor(prevShowCursor => !prevShowCursor);
      }, 500);
  
      return () => clearInterval(cursorInterval);
    }, []);
  
    return (       
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flex: 1,
            width: 219, 
            height: 50, 
            marginTop: 12, 
            borderBottomColor: '#fff',
            borderBottomWidth: '0.5px',
            borderBottomStyle: 'dotted',
        }}>
        <h1 style={{ fontSize: '42px' }}>
            {text}
        </h1>
        {showCursor && <span style={{ fontSize: '42px' }}>|</span>}
        </div>      
    );
}

export { TypewriterEffect }