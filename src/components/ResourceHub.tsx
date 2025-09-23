
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ResourceHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery);
    }
  };

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
              Can't find a specific topic? Use the search bar below to find and watch helpful videos from YouTube directly on our site.
            </p>
          </div>

          {/* Independent Search Bar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto items-center space-x-2 mb-12">
            <Input
              type="text"
              placeholder="Search YouTube... (e.g., 'how to manage anxiety')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          {/* Embedded YouTube Player */}
          {searchTerm && (
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl border border-border/50 bg-black">
              <iframe
                src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchTerm)}`}
                title="YouTube video search results"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
