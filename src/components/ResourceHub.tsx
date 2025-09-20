import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Download, BookOpen, Headphones, Video, FileText, Clock, Star } from "lucide-react";

const ResourceHub = () => {
  const resourceCategories = [
    {
      id: "videos",
      title: "Educational Videos",
      icon: Video,
      count: 24,
      color: "primary",
    },
    {
      id: "audio",
      title: "Relaxation Audio",
      icon: Headphones,
      count: 18,
      color: "secondary",
    },
    {
      id: "guides",
      title: "Wellness Guides",
      icon: BookOpen,
      count: 15,
      color: "accent",
    },
    {
      id: "exercises",
      title: "Mindfulness Exercises",
      icon: FileText,
      count: 12,
      color: "success",
    },
  ];

  const featuredResources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Student's Guide",
      type: "Video",
      duration: "12 min",
      rating: 4.8,
      views: "2.3k",
      thumbnail: "🧠",
      category: "Mental Health Education",
      description: "Learn about anxiety symptoms, triggers, and practical coping strategies designed specifically for college students.",
      language: "English, Hindi, Tamil",
    },
    {
      id: 2,
      title: "Deep Sleep Meditation for Students",
      type: "Audio",
      duration: "25 min",
      rating: 4.9,
      views: "5.1k",
      thumbnail: "🌙",
      category: "Sleep & Relaxation",
      description: "Guided meditation to help you unwind after long study sessions and achieve restful sleep.",
      language: "English, Hindi",
    },
    {
      id: 3,
      title: "Managing Academic Stress Effectively",
      type: "Guide",
      duration: "8 min read",
      rating: 4.7,
      views: "1.8k",
      thumbnail: "📚",
      category: "Academic Wellness",
      description: "Practical strategies for managing deadlines, exam pressure, and academic expectations.",
      language: "English, Hindi, Telugu",
    },
    {
      id: 4,
      title: "5-Minute Breathing Exercise",
      type: "Exercise",
      duration: "5 min",
      rating: 4.8,
      views: "3.2k",
      thumbnail: "🫁",
      category: "Quick Relief",
      description: "Simple breathing technique you can do anywhere to reduce stress and anxiety instantly.",
      language: "English, Hindi, Bengali",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return Video;
      case "Audio": return Headphones;
      case "Guide": return BookOpen;
      case "Exercise": return FileText;
      default: return Play;
    }
  };

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              📚 Psychoeducational Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mental Wellness Resource Hub
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access our curated collection of videos, guided meditations, wellness guides, and 
              mindfulness exercises - all available in multiple regional languages.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {resourceCategories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-soft transition-all duration-300 border-border/50 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} resources</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Resources */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Featured Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <Card key={resource.id} className="shadow-soft border-border/50 hover:shadow-medium transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{resource.thumbnail}</div>
                          <div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {resource.category}
                            </Badge>
                            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                              {resource.title}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            <span>{resource.rating}</span>
                          </div>
                          <span>{resource.views} views</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Available in:</p>
                        <div className="flex flex-wrap gap-1">
                          {resource.language.split(", ").map((lang, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                          <TypeIcon className="h-4 w-4 mr-2" />
                          {resource.type === "Guide" ? "Read" : "Play"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Browse All */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/5">
              Browse All Resources
            </Button>
          </div>

          {/* Language Support Notice */}
          <Card className="mt-8 bg-secondary/5 border-secondary/20">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold text-secondary mb-2">
                🌏 Regional Language Support
              </h4>
              <p className="text-sm text-muted-foreground">
                Our resources are available in multiple Indian languages including Hindi, Tamil, Telugu, Bengali, 
                Marathi, and more to ensure cultural relevance and accessibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;