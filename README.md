# 🎤 AI Speaking App

A cool **full-stack app** with React (frontend) & Flask (backend) that converts English text to speech with different accents 🎧 and shows Bengali translation 🇧🇩 using Google Translate and gTTS.

---

## ✨ Features

- 📝 Input English text and select voice region (US, UK, India, Australia, South Africa)
- 🔊 Convert text to natural speech with pauses for better flow
- 🔁 Shows Bengali translation of the input text
- 🎥 Plays audio with smooth animations (speaking & idle states)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm (React frontend)
- Python 3 & pip (Flask backend)

---

### 🖥️ Backend Setup

    cd server

# (Optional) create & activate virtual environment
    python -m venv venv
    source venv/bin/activate       # Windows: venv\Scripts\activate

    pip install -r requirements.txt

    python app.py
  API will run at http://localhost:5000

---

### 🌐 Frontend Setup

     cd client
     npm start
  API will run at http://localhost:3000

--- 

### 🎬Idle Animation

[![Idle Animation](https://img.icons8.com/ios-filled/50/000000/play--v1.png)](https://github.com/rnccsstudent/ai-speaking-app/blob/main/client/public/idle_video.mp4)

### 🎬Speaking Animation

[![Speaking Video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

### 📝 Usage

- Type English text 🎤 in the box

- Select voice accent 🌎

- Click Speak ▶️ to listen and see Bengali translation 🇧🇩

- Keep text under 200 characters ⏳ for best performance

---

### ⚠️ Notes
- Run Flask backend before using frontend

- Ensure ports 5000 (backend) and 3000 (frontend) are free

---

### 📜 License

- Open-source and free to use! 🚀






