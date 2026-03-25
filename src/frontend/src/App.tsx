import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import AuthSplash from "./components/AuthSplash";
import BookTestDriveSection from "./components/BookTestDriveSection";
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
import ProfilePage from "./components/ProfilePage";
import TechSection from "./components/TechSection";
import ThreeDSection from "./components/ThreeDSection";
import TrackSection from "./components/TrackSection";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppInner() {
  const [loading, setLoading] = useState(true);
  const [authDone, setAuthDone] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  function handleSignOut() {
    logout();
    setAuthDone(false);
    setAdminPanelOpen(false);
    setProfileOpen(false);
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
          <AdminPanel onClose={() => setAdminPanelOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && authDone && !loading && (
          <ProfilePage
            onClose={() => setProfileOpen(false)}
            onOpenAdmin={() => {
              setProfileOpen(false);
              setAdminPanelOpen(true);
            }}
          />
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
              <ThreeDSection />
            </ErrorBoundary>
            <PerformanceSection />
            <TrackSection />
            <DesignShowcase />
            <TechSection />
            <EngineSoundSection />
            <GallerySection />
            <BookTestDriveSection />
          </main>
          <Footer />
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
