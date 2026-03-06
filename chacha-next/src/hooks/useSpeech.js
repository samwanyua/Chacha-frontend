import { useState, useRef } from 'react';
import { blobToWav } from '../utils/audioHelper';

const API_URL = "http://localhost:8000/api";

export function useSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const playTTS = async (text) => {
    try {
      setIsPlaying(true);
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS Failed");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = (e) => {
        console.error("Audio Playback Error:", e);
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
      
      await audio.play().catch(err => {
        console.error("Audio Promise Rejection:", err);
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      });

    } catch (err) {
      console.error("TTS Error:", err);
      setIsPlaying(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
    }
  };

  const stopRecordingAndEvaluate = (targetText) => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current) return reject("No active recorder");

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false);
        const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        try {
          const wavBlob = await blobToWav(webmBlob);

          const formData = new FormData();
          formData.append("audio", wavBlob, "recording.wav");
          formData.append("target_text", targetText);

          // Find active user
          try {
            const rawUser = localStorage.getItem("chacha_user");
            if (rawUser) {
              const u = JSON.parse(rawUser);
              const uid = u.user_id || u.id || 1;
              formData.append("user_id", uid);
            }
          } catch(e) {}

          const res = await fetch(`${API_URL}/recordings/evaluate`, {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) throw new Error("Evaluation Failed");
          
          const data = await res.json();
          resolve(data);

        } catch (err) {
          console.error("Evaluation Error:", err);
          reject(err);
        }
      };
      
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    });
  };

  return { isRecording, isPlaying, playTTS, startRecording, stopRecordingAndEvaluate };
}
