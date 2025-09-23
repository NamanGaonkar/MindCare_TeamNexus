import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Youtube, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

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
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  function getVideoIdFromUrl(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  // Mock search function - in real app, this would use YouTube API
  const searchYouTube = async (query: string) => {
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock results based on mental health topics
    const mockResults: Video[] = [
      {
        id: "O-6f5wQXSu8",
        title: `${query} - Guided Meditation`,
        description: `10-minute guided meditation for ${query.toLowerCase()}`,
        thumbnail: `https://img.youtube.com/vi/O-6f5wQXSu8/mqdefault.jpg`
      },
      {
        id: "F28MGLlpP90",
        title: `${query} - Sleep Meditation`,
        description: `Relaxing sleep meditation for ${query.toLowerCase()}`,
        thumbnail: `https://img.youtube.com/vi/F28MGLlpP90/mqdefault.jpg`
      },
      {
        id: "R-4i26s_7sY",
        title: `${query} - Coping Strategies`,
        description: `Practical tips for managing ${query.toLowerCase()}`,
        thumbnail: `https://img.youtube.com/vi/R-4i26s_7sY/mqdefault.jpg`
      }
    ];
    
    setSearchResults(mockResults);
    setIsSearching(false);
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

      {/* Search and Results */}
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
                <Button type="submit" size="icon" disabled={isSearching}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {(searchResults.length > 0 || isSearching) && (
          <Card className="shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Search Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isSearching ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-3 animate-pulse">
                      <div className="w-20 h-14 bg-muted rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchResults.map((video) => (
                  <div
                    key={video.id}
                    className="flex space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => playVideo(video.id)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{video.description}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;