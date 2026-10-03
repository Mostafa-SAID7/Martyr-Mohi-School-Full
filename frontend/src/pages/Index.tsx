import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <PublicNavbar />
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <CoursesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
