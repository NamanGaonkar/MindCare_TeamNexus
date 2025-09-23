import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Play } from "lucide-react";
import YouTubePlayer from "./YouTubePlayer";

const ResourceHub = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    description: string;
    videoUrl: string;
  } | null>(null);

  const resourceTopics = [
    {
      title: "Managing Anxiety",
      description: "A 10-minute guided meditation for anxiety relief.",
      videoUrl: "https://www.youtube.com/watch?v=1Evwgu369Jw",
    },
    {
      title: "Improving Sleep",
      description: "Fall asleep quickly with this guided sleep meditation.",
      videoUrl: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
    },
    {
      title: "Handling Academic Stress",
      description: "Practical tips for managing stress during exam season.",
      videoUrl: "https://www.youtube.com/watch?v=Nw-ksE2PeMA",
    },
    {
      title: "Mindfulness & Meditation",
      description: "A beginner's guide to mindfulness meditation.",
      videoUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    },
    {
      title: "Coping with Depression",
      description: "Understanding and coping with feelings of depression.",
      videoUrl: "https://www.youtube.com/watch?v=4-079YIasck",
    },
    {
      title: "Building Resilience",
      description: "Develop mental strength and bounce back from adversity.",
      videoUrl: "https://www.youtube.com/watch?v=R18O8bRwGls",
    },
    {
      title: "Quick Relaxation Techniques",
      description: "A 5-minute breathing exercise to calm your mind.",
      videoUrl: "https://www.youtube.com/watch?v=inhb04-Yc_g",
    },
     {
      title: "Study & Focus Tips",
      description: "The Pomodoro Technique for effective studying.",
      videoUrl: "https://www.youtube.com/watch?v=VFW3Ld7JO0w",
    },
  ];

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Resource Gateway
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a curated collection of videos to support your mental wellness journey. Each video has been selected to provide practical guidance and support.
            </p>
          </div>

          {/* Video Player Section */}
          {selectedVideo && (
            <div className="mb-12">
              <YouTubePlayer initialVideo={selectedVideo} />
            </div>
          )}

          {/* Resource Topic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceTopics.map((topic) => (
              <div key={topic.title} className="block group">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 hover:border-primary/50 cursor-pointer"
                      onClick={() => setSelectedVideo(topic)}>
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="flex-1">{topic.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo(topic);
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <a
                        href={topic.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube className="h-6 w-6 text-red-600 hover:opacity-75 transition-opacity" />
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
