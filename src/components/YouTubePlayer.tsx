import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Youtube } from "lucide-react";

interface YouTubePlayerProps {
  initialVideo?: {
    title: string;
    description: string;
    videoUrl: string;
  };
}

const YouTubePlayer = ({ initialVideo }: YouTubePlayerProps) => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(
    initialVideo ? getVideoIdFromUrl(initialVideo.videoUrl) : null
  );
  const [searchTerm, setSearchTerm] = useState('');

  function getVideoIdFromUrl(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  // Search function that redirects to YouTube
  const searchYouTube = (query: string) => {
    if (!query.trim()) return;
    
    // Redirect to YouTube with search query
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' mental health meditation')}`;
    window.open(youtubeSearchUrl, '_blank');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchYouTube(searchTerm);
    }
  };

  const playVideo = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Youtube className="h-5 w-5 mr-2 text-red-600" />
              Video Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentVideo ? (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube video player"
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video w-full bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a video to start watching</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search and Info */}
      <div className="space-y-4">
        {/* Search Bar */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Search Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search mental health topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Info */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Search Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the search button to find mental health videos on YouTube. 
              This will open YouTube in a new tab with your search query.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YouTubePlayer;