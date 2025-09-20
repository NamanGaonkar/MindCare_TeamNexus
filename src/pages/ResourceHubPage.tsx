import ResourceHub from "@/components/ResourceHub";
import Header from "@/components/Header";

const ResourceHubPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ResourceHub />
      </main>
    </div>
  );
};

export default ResourceHubPage;
