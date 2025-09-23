
import React from 'react';
import { X } from 'lucide-react';
import YouTubePlayer from './YouTubePlayer';

interface VideoPlayerModalProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoId, onClose }) => {
  // Handle Escape key to close the modal
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close modal on overlay click
    >
      <div 
        className="relative bg-black rounded-lg shadow-xl w-full max-w-7xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the player
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close video player"
        >
          <X size={32} />
        </button>
        <div className="aspect-w-16 aspect-h-8">
            <YouTubePlayer videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
