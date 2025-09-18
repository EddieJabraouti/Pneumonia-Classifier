import { clear } from 'console';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnimatedHero = () => {
    const headingText = "Clarity";
    const [displayedText, setDisplayedText]= useState(" ");
    const [showUser, setShowUser] = useState(true);
    const [showCursor, setShowShowCursor] = useState(false); 
    const [fadeInDesc, setFadeInDescription] = useState(false); 
    const [fadeInButtons, setFadeInButtons] = useState(false);

    useEffect = (() => { 
        let i = 0; 
        const typingTimer = setInterval(() => { 
            if(i < headingText.length) { 
                setDisplayedText(prev => prev + headingText.charAt(i)); 
                i++
            } else { 
                clearInterval(typingTimer); 
                setFadeInDescription(true); 

                setTimeout(() => { 
                    setFadeInButtons(true); 

                    setTimeout(() => { 
                        setShowShowCursor(false); 
                    }, 500);
                },500);
            }
        }, 100); 
        return () => clearInterval(typingTimer);
    }, []); 
  return (
    <div>AnimatedHero</div>
  )
}

export default AnimatedHero