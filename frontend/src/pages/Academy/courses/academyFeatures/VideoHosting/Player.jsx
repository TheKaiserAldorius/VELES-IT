// Player.jsx
import { useEffect, useRef, useState } from 'react';
import { useVideoUrl } from './useVideoHosting';

export default function VideoPlayer({ lessonId, onProgressUpdate }) {
  const { url, isLoading } = useVideoUrl(lessonId);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
      onProgressUpdate?.(percent);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [url]);

  if (isLoading) return <div className="video-loading">Loading video...</div>;

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={url}
        controls
        className="w-full h-auto rounded-lg"
      />
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}