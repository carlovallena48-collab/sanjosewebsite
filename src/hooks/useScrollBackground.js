import { useState, useEffect } from 'react';

export const useScrollBackground = (backgroundImages, mainRef) => {
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const sectionCount = backgroundImages.length;
      const sectionHeight = docHeight / sectionCount;
      const currentSection = Math.floor(scrollTop / sectionHeight);
      
      setActiveBgIndex(Math.min(currentSection, backgroundImages.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [backgroundImages.length, mainRef]);

  return activeBgIndex;
};  