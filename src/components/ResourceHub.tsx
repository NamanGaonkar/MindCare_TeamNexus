import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Youtube } from "lucide-react";

const ResourceHub = () => {
  const resourceTopics = [
    {
      title: "Managing Anxiety",
      description: "Find guided exercises and expert advice on coping with anxiety.",
      searchQuery: "managing+anxiety+for+students",
    },
    {
      title: "Improving Sleep",
      description: "Listen to guided meditations and find tips for a restful night's sleep.",
      searchQuery: "guided+meditation+for+sleep+for+students",
    },
    {
      title: "Handling Academic Stress",
      description: "Learn effective techniques to manage exam pressure and deadlines.",
      searchQuery: "handling+academic+stress+for+college+students",
    },
    {
      title: "Mindfulness & Meditation",
      description: "Practice mindfulness exercises to improve focus and reduce stress.",
      searchQuery: "mindfulness+meditation+for+beginners",
    },
    {
      title: "Coping with Depression",
      description: "Access resources on understanding and managing symptoms of depression.",
      searchQuery: "coping+strategies+for+depression+for+young+adults",
    },
    {
      title: "Building Resilience",
      description: "Discover how to build mental and emotional strength to navigate challenges.",
      searchQuery: "how+to+build+resilience+in+young+adults",
    },
    {
      title: "Quick Relaxation Techniques",
      description: "Find short, effective exercises for immediate stress relief.",
      searchQuery: "5+minute+relaxation+exercise",
    },
     {
      title: "Study & Focus Tips",
      description: "Improve your study habits and concentration with these proven methods.",
      searchQuery: "effective+study+techniques+for+college+students",
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
              Explore a wide range of mental wellness topics. Clicking a topic will take you to a curated YouTube search for videos on that subject.
            </p>
          </div>

          {/* Resource Topic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceTopics.map((topic) => (
              <a
                key={topic.title}
                href={`https://www.youtube.com/results?search_query=${topic.searchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 hover:border-primary/50">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>{topic.title}</CardTitle>
                    <Youtube className="h-6 w-6 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
