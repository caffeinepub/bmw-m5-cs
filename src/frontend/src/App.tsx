import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import DesignShowcase from "./components/DesignShowcase";
import EngineSoundSection from "./components/EngineSoundSection";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import PerformanceSection from "./components/PerformanceSection";
import TechSection from "./components/TechSection";
import ThreeDSection from "./components/ThreeDSection";
import TrackSection from "./components/TrackSection";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#0B0F14", color: "#F2F5F7" }}
    >
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <ErrorBoundary>
              <ThreeDSection />
            </ErrorBoundary>
            <PerformanceSection />
            <TrackSection />
            <DesignShowcase />
            <TechSection />
            <EngineSoundSection />
            <GallerySection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
