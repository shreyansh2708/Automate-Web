import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import WavEncoder from 'wav-encoder'; 
import "./SpeechToText.css"
function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = () => {
    setIsRecording(true);
    setAudioChunks([]); // Clear audio chunks when starting a new recording
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = async (recordedBlob) => {
    // Convert the recordedBlob to PCM WAV format
    try {
      const wavBlob = await convertToPCM(recordedBlob.blob);
      sendAudioToServer(wavBlob);
    } catch (error) {
      console.error('Error converting audio:', error);
    }
  };

  //function to convert the blob file to pcm wav 
  const convertToPCM = async (blob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Encode audioBuffer as PCM WAV
    const wavData = WavEncoder.encode.sync({
      sampleRate: audioBuffer.sampleRate,
      channelData: [audioBuffer.getChannelData(0)],
    });

    return new Blob([wavData], { type: 'audio/wav' });
  };

  const sendAudioToServer = async (wavBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', wavBlob);

      const response = await fetch('http://localhost:5000/speech-to-text',{
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data=await response.json()
        setExtractedText(data.extracted_text)
        console.log("file received");
      } else {
        console.error('Error during audio processing:', response.data.error);
      }
    } 
    catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  return (
    <div className='container'>
      <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
      <ReactMic record={isRecording} onStop={onStop} mimeType="audio/wav" />
      <p>{extractedText}</p>
    </div>
  );
}

export default SpeechToText;
