
import React from 'react';
import YouTubePlayer from '@/components/YouTubePlayer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlayCircle, ExternalLink } from 'lucide-react';

const resources = {
  "Mental Health Awareness": [
    {
      title: "College Student Mental Health 101",
      description: "Explores common student mental health issues and resources.",
      videoId: "2XFzBRSsrWU",
    },
    {
      title: "Your Mental Health in College | How to College | Crash Course",
      description: "Balancing emotional, physical, and mental health in college life.",
      videoId: "l_9PchV6PIc",
    },
    {
      title: "Mental Health and Resilience - The Secrets of Inner Strength",
      description: "Building inner strength and resilience for mental wellness.",
      videoId: "YdMCL9_UTE4",
    },
    {
      title: "Mental Health Struggles for Students",
      description: "Open discussion on common mental health struggles among students.",
      videoId: "biuhorYFpYk",
    },
    {
      title: "Breaking the Silence - Mental Health @ UCL Engineering",
      description: "Mental health awareness campaign at UCL.",
      videoId: "lB-u7TH7t4w",
    },
    {
      title: "The 5 Lifestyle Habits That Make or Break College Mental Health",
      description: "Evidence-based lifestyle changes critical for student mental health.",
      videoId: "VR0YejBcZfA",
    },
    {
      title: "Mental health tips for new college students",
      description: "Practical advice for new students adjusting to college life.",
      videoId: "kQoylN17_dw",
    },
  ],
  "Stress and Anxiety Management": [
    {
      title: "Student Anxiety & Stress Management",
      description: "Techniques to manage anxiety and stress effectively.",
      videoId: "U7gE5mHRLcA",
    },
    {
      title: "4 Best Stress Management Techniques for Students",
      description: "Proven stress relief methods tailored for students.",
      videoId: "2vadgxFhiuE",
    },
    {
      title: "How to Manage Stress as a Student",
      description: "Breakdown of stress types and coping strategies.",
      videoId: "Bk2-dKH2Ta4",
    },
    {
      title: "Stress Relief For Kids - 9 Stress Management Techniques",
      description: "Simple stress relief methods applicable to young adults too.",
      videoId: "h2zWopNUUJE",
    },
    {
      title: "Stress Management Tips for Kids and Teens!",
      description: "Basic stress coping tools for younger audiences including teens.",
      videoId: "3Nf2Pzcketg",
    },
    {
      title: "5 Proven Strategies to Boost Your Mental Health Today",
      description: "Practical, evidence-based tips to improve mental wellness now.",
      videoId: "vGgDIPMyP2g",
    },
  ],
  "Relationship & Social Wellbeing": [
    {
      title: "Best College Dating Advice for Long-Lasting Relationships",
      description: "Tips for maintaining strong relationships in college.",
      videoId: "7dqlaHiXT3Y",
    },
    {
      title: "Honest Love Relationship Advice for Students",
      description: "Discusses emotional satisfaction and relationship dynamics.",
      videoId: "peq6lYlOCjE",
    },
    {
      title: "The Best Relationship Advice No One Ever Told You",
      description: "Core relationship truths for building healthy bonds.",
      videoId: "6Kycn43KNOE",
    },
    {
      title: "Healthy Relationships and College Students",
      description: "How to build and maintain social connections and healthy relationships.",
      videoId: "Xv5UaVuXuTw",
    },
    {
      title: "Advice on Relationships, College, Work, and Mental Health",
      description: "Practical life advice across core college concerns.",
      videoId: "V3M1-8bpBKY",
    },
    {
      title: "The Best Relationship Advice No One Tells You",
      description: "Insights for sustaining healthy romantic relationships.",
      videoId: "nxQYKNqZB70",
    },
  ],
};

const channels = {
    "Motivation & Support Channels": [
        {
            title: "Psych Hub",
            description: "Expert advice on mental health and therapy approaches.",
            url: "https://www.youtube.com/c/PsychHub",
        },
        {
            title: "Kati Morton",
            description: "Licensed therapist providing mental health education and support.",
            url: "https://www.youtube.com/user/KatiMorton",
        },
        {
            title: "Psych2Go",
            description: "Engaging animated videos on psychological concepts.",
            url: "https://www.youtube.com/@Psych2Go",
        },
        {
            title: "How to ADHD",
            description: "Evidence-based help and community for ADHD management.",
            url: "https://www.youtube.com/@HowToADHD",
        },
        {
            title: "Infinite Waters",
            description: "Motivational talks on mental and emotional wellness.",
            url: "https://www.youtube.com/@InfiniteWaters",
        },
        {
            title: "Therapy in a Nutshell",
            description: "Scientific breakdowns of mental health and coping tools.",
            url: "https://www.youtube.com/@TherapyInANutshell",
        },
    ],
};

const ResourceHubPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Resource Hub
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
          Your central place for curated videos and channels to support your mental wellbeing.
        </p>
      </div>

      {Object.entries(resources).map(([category, items]) => (
        <div key={category} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{category}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative group">
                   <YouTubePlayer videoId={item.videoId} />
                   <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <PlayCircle className="h-20 w-20 text-white" />
                   </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {Object.entries(channels).map(([category, items]) => (
        <div key={category} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{category}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-2">{item.description}</p>
                </CardHeader>
                <CardFooter>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Channel
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceHubPage;
