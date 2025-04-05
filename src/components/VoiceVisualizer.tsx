import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface VoiceVisualizerProps {
  isListening: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isListening }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!isListening) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
          if (!analyserRef.current || !dataArrayRef.current || !canvas || !ctx) return;

          animationFrameRef.current = requestAnimationFrame(draw);
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          const width = canvas.width;
          const height = canvas.height;
          const barWidth = 2;
          const gap = 1;
          const centerX = width / 2;
          const maxBarHeight = height / 2;

          ctx.clearRect(0, 0, width, height);

          // Draw center line
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, height);
          ctx.stroke();

          // Draw bars on both sides
          const halfBars = Math.floor((width / 2) / (barWidth + gap));
          for (let i = 0; i < halfBars; i++) {
            const barHeight = (dataArrayRef.current[i] / 255) * maxBarHeight;
            
            // Left side bars
            ctx.fillStyle = 'rgba(25, 118, 210, 0.6)';
            ctx.fillRect(
              centerX - (i + 1) * (barWidth + gap),
              height / 2 - barHeight / 2,
              barWidth,
              barHeight
            );

            // Right side bars
            ctx.fillStyle = 'rgba(156, 39, 176, 0.6)';
            ctx.fillRect(
              centerX + i * (barWidth + gap),
              height / 2 - barHeight / 2,
              barWidth,
              barHeight
            );
          }
        };

        draw();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    setupAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: '100px',
        mx: 'auto',
        mb: 4,
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& canvas': {
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default VoiceVisualizer; 