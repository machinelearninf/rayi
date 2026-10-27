import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function VinylPlayer({ audioSrc = "/assets/sal.mp3", autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio autoplay prevented by browser policy:", err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Play error:", err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className={`vinyl-widget ${isPlaying ? 'is-playing' : ''}`}>
        <div className="vinyl-disc-wrap" onClick={togglePlay} title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}>
          <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
            <div className="vinyl-center">
              <span className="vinyl-song">HAPPY</span>
              <span className="vinyl-artist">BIRTHDAY</span>
            </div>
          </div>
          <div className="vinyl-tonearm"></div>
        </div>

        <div className="vinyl-info" onClick={togglePlay}>
          <div className="vinyl-text-col">
            <span className="track-title flex items-center gap-1">
              <Music size={12} className="inline text-rose-300" /> Happy Birthday to you
            </span>
            <span className="track-artist">Pamungkas ♡</span>
          </div>

          <div className="vinyl-ctrl-btns">
            <button
              type="button"
              className="vinyl-ctrl-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Jeda" : "Putar"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <button
              type="button"
              className="vinyl-ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
