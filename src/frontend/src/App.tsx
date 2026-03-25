import { AnimatePresence } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Eagerly loaded (critical path)
import AuthSplash from "./components/AuthSplash";
import CustomCursor from "./components/CustomCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";

// Lazily loaded (below the fold or conditionally shown)
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const BookTestDriveSection = lazy(
  () => import("./components/BookTestDriveSection"),
);
const CarCustomizationSection = lazy(
  () => import("./components/CarCustomizationSection"),
);
const DesignShowcase = lazy(() => import("./components/DesignShowcase"));
const EngineSoundSection = lazy(
  () => import("./components/EngineSoundSection"),
);
const Footer = lazy(() => import("./components/Footer"));
const GallerySection = lazy(() => import("./components/GallerySection"));
const PerformanceSection = lazy(
  () => import("./components/PerformanceSection"),
);
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const TechSection = lazy(() => import("./components/TechSection"));
const ThreeDSection = lazy(() => import("./components/ThreeDSection"));
const TrackSection = lazy(() => import("./components/TrackSection"));

// Gallery images to prefetch after hero loads
const GALLERY_IMAGES = [
  "/assets/generated/bmw-gallery-drive.dim_1400x900.jpg",
  "/assets/generated/bmw-gallery-front.dim_1400x900.jpg",
  "/assets/generated/bmw-gallery-brake.dim_1400x900.jpg",
  "/assets/generated/bmw-exterior-side.dim_1200x800.jpg",
  "/assets/generated/bmw-engine.dim_1200x800.jpg",
  "/assets/generated/bmw-interior.dim_1200x800.jpg",
  "/assets/generated/bmw-track.dim_1200x800.jpg",
];

function prefetchImages(urls: string[]) {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

function SectionFallback() {
  return <div style={{ minHeight: "200px", backgroundColor: "#0B0F14" }} />;
}

function AppInner() {
  const [loading, setLoading] = useState(true);
  const [authDone, setAuthDone] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [customizationSpec, setCustomizationSpec] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Prefetch all gallery + design images after auth splash closes
  useEffect(() => {
    if (authDone) {
      // Small delay so we don't compete with the initial render
      const t = setTimeout(() => prefetchImages(GALLERY_IMAGES), 1500);
      return () => clearTimeout(t);
    }
  }, [authDone]);

  function handleSignOut() {
    logout();
    setAuthDone(false);
    setAdminPanelOpen(false);
    setProfileOpen(false);
  }

  function handleConfigChange(spec: string, _total: number) {
    setCustomizationSpec(spec);
  }

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#0B0F14", color: "#F2F5F7" }}
    >
      <CustomCursor />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <AnimatePresence>
        {!loading && !authDone && (
          <AuthSplash onClose={() => setAuthDone(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminPanelOpen && (
          <Suspense fallback={null}>
            <AdminPanel onClose={() => setAdminPanelOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && authDone && !loading && (
          <Suspense fallback={null}>
            <ProfilePage
              onClose={() => setProfileOpen(false)}
              onOpenAdmin={() => {
                setProfileOpen(false);
                setAdminPanelOpen(true);
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {!loading && authDone && (
        <>
          <Navbar
            onOpenAdmin={() => setAdminPanelOpen(true)}
            onSignOut={handleSignOut}
            onOpenProfile={() => setProfileOpen(true)}
          />
          <main>
            <HeroSection />
            <ErrorBoundary>
              <Suspense fallback={<SectionFallback />}>
                <ThreeDSection />
              </Suspense>
            </ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <PerformanceSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <TrackSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <DesignShowcase />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <TechSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <EngineSoundSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <GallerySection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <CarCustomizationSection onConfigChange={handleConfigChange} />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <BookTestDriveSection customizationSpec={customizationSpec} />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
