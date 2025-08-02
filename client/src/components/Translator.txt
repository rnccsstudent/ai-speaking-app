import React, { useState, useRef } from 'react';
import axios from 'axios';

const Translator = () => {
  const videoRef = useRef();
  const audioRef = useRef();

  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tld, setTld] = useState('com');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter text");
      return;
    }

    setLoading(true);
    setError(null);
    setAudioUrl('');
    setTranslatedText('');
    setShowTranslation(false);

    try {
      const processedText = text.replace(/\./g, '. ...');
      const response = await axios.post('http://localhost:5000/speak', {
        text: processedText,
        accent: tld,
      });

      setTranslatedText(response.data.translation);
      setAudioUrl(`http://localhost:5000${response.data.audio_url}`);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.warn("Auto-play failed: ", err);
          });
        }
      }, 500);
    } catch (err) {
      setError("Error communicating with backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <div style={{
      maxWidth: 700,
      margin: 'auto',
      padding: 20,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>🌍 Text-to-Speech Translator</h2>

      <label>🌐 Voice Region (gTTS)</label>
      <select
        value={tld}
        onChange={(e) => setTld(e.target.value)}
        style={{ marginBottom: 10, padding: 6 }}
      >
        <option value="com">US English</option>
        <option value="co.uk">UK English</option>
        <option value="co.in">Indian English</option>
        <option value="com.au">Australian</option>
        <option value="co.za">South African</option>
      </select>

      <textarea
        rows={4}
        style={{
          width: '100%',
          padding: 10,
          fontSize: 16,
          marginTop: 10,
          boxSizing: 'border-box'
        }}
        placeholder="Enter English text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p style={{ fontSize: 14, color: '#555' }}>
        Words: {wordCount} | Characters: {charCount}
      </p>

      {charCount > 200 && (
        <p style={{ color: 'orange' }}>
          ⚠️ Keep text under 200 characters for faster speech.
        </p>
      )}

      <button
        onClick={handleTranslate}
        style={{
          marginTop: 10,
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Speak'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {translatedText && audioUrl && (
        <div style={{
          marginTop: 30,
          textAlign: 'center',
          animation: 'fadeIn 1s ease'
        }}>
          {/* ✅ Video first */}
          <video
            ref={videoRef}
            width="330"
            muted
            playsInline
            key={isSpeaking ? 'talking' : 'idle'}
            onCanPlay={() => {
              videoRef.current?.play().catch(err =>
                console.warn("Video autoplay failed:", err)
              );
            }}
            style={{
              borderRadius: 10,
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <source
              src={isSpeaking ? "/talking_video.mp4" : "/idle_video.mp4"}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <br>
          </br>
          {/* 🔈 Audio below video */}
          <audio
            controls
            src={audioUrl}
            ref={audioRef}
            onPlay={() => setIsSpeaking(true)}
            onPause={() => setIsSpeaking(false)}
            onEnded={() => {
              setIsSpeaking(false);
              setShowTranslation(true);
            }}
            style={{ marginTop: 10 }}
          />

          <p style={{ fontSize: 16, marginTop: 10 }}>
            {isSpeaking ? '🔊 Speaking...' : ''}
          </p>

          {showTranslation && (
            <div style={{
              marginTop: 20,
              backgroundColor: '#f5f5f5',
              padding: 15,
              borderRadius: 8,
              animation: 'fadeIn 0.8s ease'
            }}>
              <h3>🔁 Bengali Translation:</h3>
              <p>{translatedText}</p>
            </div>
          )}
        </div>
      )}

      {/* ✅ Basic fade animation */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default Translator;
