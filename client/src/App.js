import React, { useEffect, useRef } from 'react';
import TranslatorLink from './components/TranslatorLink';
import Translator from './components/Translator';
import './App.css'; // Style file remains

function App() {
  const cartoonRef = useRef(null);

  useEffect(() => {
    const handleWordHighlight = (text) => {
      if (!cartoonRef.current) return;

      const words = text.split(' ');
      let index = 0;

      const interval = setInterval(() => {
        if (index >= words.length) {
          clearInterval(interval);
          cartoonRef.current.textContent = '';
          return;
        }

        cartoonRef.current.textContent = words[index];
        index++;
      }, 400); // adjust speed
    };

    window.addEventListener('highlightWord', (e) => handleWordHighlight(e.detail));
    return () => window.removeEventListener('highlightWord', (e) => handleWordHighlight(e.detail));
  }, []);

  return (
    <div className="App">
      {/* <h1>🎙️ English Speaking Practice</h1> */}
      {/* <div className="cartoon-wrapper">
        <img src="/speaking-cartoon.gif" alt="Speaking Cartoon" className="cartoon-image" />
        <div className="word-highlight" ref={cartoonRef}></div>
      </div> */}
      <Translator />
      <TranslatorLink />
    </div>
  );
}

export default App;
