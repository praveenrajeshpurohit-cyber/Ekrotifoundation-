import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Mail, Phone, MapPin, ExternalLink, ArrowUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Donate from "./components/Donate";
import Stories from "./components/Stories";
import GalleryView from "./components/GalleryView";
import EventsView from "./components/EventsView";
import Reviews from "./components/Reviews";
import VolunteerForm from "./components/VolunteerForm";
import ContactUs from "./components/ContactUs";
import AdminPanel from "./components/AdminPanel";

// Types
import { 
  SiteConfig, SiteStats, DonationTier, Review, 
  Volunteer, GalleryItem, NGOEvent, ImpactStory 
} from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  // Core global state matrices
  const [config, setConfig] = useState<SiteConfig>({
    headline: "One Roti Can Change a Life",
    subheading: "Join Ek Roti Foundation in feeding hungry people and supporting needy families across India.",
    phone: "+91 95103 66694",
    email: "ekrotifoundation@gmail.com",
    address: "Plot No-28, Hare Krishna Villa, Near Sky-9, Godadra Moje, Dindoli, Surat, Gujarat 394210, India"
  });

  const [stats, setStats] = useState<SiteStats>({
    mealsServed: 124580,
    activeVolunteers: 350,
    beneficiariesHelped: 45000,
    citiesReached: 12
  });

  const [donationTiers, setDonationTiers] = useState<DonationTier[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<NGOEvent[]>([]);
  
  // Admin-only parameters state
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // On Mount: load public values and check cached login sessions
  useEffect(() => {
    fetchPublicData();
    const isSessionLive = localStorage.getItem("erf_admin_logged") === "true";
    if (isSessionLive) {
      setIsLoggedIn(true);
      fetchAdminData();
    }

    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData();
    }
  }, [isLoggedIn]);

  const fetchPublicData = async () => {
    try {
      const res = await fetch("/api/data");
      const datasets = await res.json();
      setConfig(datasets.config);
      setStats(datasets.stats);
      setDonationTiers(datasets.donationTiers);
      setReviews(datasets.reviews);
      setStories(datasets.stories);
      setGallery(datasets.gallery);
      setEvents(datasets.events);
      setDataLoaded(true);
    } catch (e) {
      console.error("Local fullstack API failed on load, preparing state with defaults.", e);
      setDataLoaded(true);
    }
  };

  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const adminSets = await res.json();
      setConfig(adminSets.config);
      setStats(adminSets.stats);
      setDonationTiers(adminSets.donationTiers);
      setAllReviews(adminSets.reviews);
      setStories(adminSets.stories);
      setVolunteers(adminSets.volunteers);
      setGallery(adminSets.gallery);
      setEvents(adminSets.events);
      setTransactions(adminSets.transactions);
    } catch (e) {
      console.error("Failed to load secure admin datasets", e);
    }
  };

  // Auth triggers
  const handleLogin = (u: string, p: string): boolean => {
    if (u === "Ekrotifoundation" && p === "Ekroti@123") {
      setIsLoggedIn(true);
      localStorage.setItem("erf_admin_logged", "true");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("erf_admin_logged");
  };

  const syncStatsData = async () => {
    // Reload dynamically on transaction settlements
    await fetchPublicData();
    if (isLoggedIn) {
      await fetchAdminData();
    }
  };

  // CALLBACK TRIGGERS FOR WRITING DYNAMIC CONTENT CHANNELS LIVE
  const handleUpdateConfig = async (newConfig: SiteConfig) => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig)
      });
      if (res.ok) {
        setConfig(newConfig);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleUpdateStats = async (newStats: SiteStats) => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStats)
      });
      if (res.ok) {
        setStats(newStats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleUpdateTiers = async (revisedTiers: DonationTier[]) => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/donation-tiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tiers: revisedTiers })
      });
      if (res.ok) {
        setDonationTiers(revisedTiers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveStory = async (story: Partial<ImpactStory>) => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story)
      });
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleDeleteStory = async (id: number) => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const onRegisterVolunteer = async (vData: { fullName: string; phone: string; email: string; city: string; message: string }) => {
    const res = await fetch("/api/volunteers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vData)
    });
    if (!res.ok) {
      throw new Error("Register failed");
    }
    await syncStatsData();
  };

  const handleUpdateVolunteerStatus = async (id: number, status: string) => {
    const res = await fetch("/api/admin/volunteers/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    if (res.ok) {
      const d = await res.json();
      setVolunteers(d.volunteers);
    }
  };

  const handleDeleteVolunteer = async (id: number) => {
    const res = await fetch(`/api/admin/volunteers/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      const d = await res.json();
      setVolunteers(d.volunteers);
    }
  };

  const onAddPublicReview = async (rev: { name: string; text: string; rating: number }) => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rev)
    });
    if (!res.ok) {
      throw new Error("Add review failed");
    }
    await syncStatsData();
  };

  const handleToggleReviewApproval = async (id: number, isApproved: boolean) => {
    const res = await fetch("/api/admin/reviews/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved })
    });
    if (res.ok) {
      const d = await res.json();
      setAllReviews(d.reviews);
      setReviews(d.reviews.filter((r: any) => r.isApproved));
    }
  };

  const handleDeleteReview = async (id: number) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      const d = await res.json();
      setAllReviews(d.reviews);
      setReviews(d.reviews.filter((r: any) => r.isApproved));
    }
  };

  const handleSaveGallery = async (item: Partial<GalleryItem>) => {
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    if (res.ok) {
      const d = await res.json();
      setGallery(d.gallery);
    }
  };

  const handleDeleteGallery = async (id: number) => {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      const d = await res.json();
      setGallery(d.gallery);
    }
  };

  const handleSaveEvent = async (evt: Partial<NGOEvent>) => {
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evt)
    });
    if (res.ok) {
      const d = await res.json();
      setEvents(d.events);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const res = await fetch(`/api/admin/events/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      const d = await res.json();
      setEvents(d.events);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WhatsApp chat generator
  const getWhatsAppLink = () => {
    const textMsg = encodeURIComponent(
      "Hello Ek Roti Foundation team, I would like to support your noble work of distributing foods to underprivileged populations! Please let me know how I can contribute."
    );
    return `https://wa.me/${config.phone.replace(/[^0-9]/g, "")}?text=${textMsg}`;
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home 
            setActiveTab={setActiveTab} 
            config={config} 
            stats={stats} 
            donationTiers={donationTiers} 
            setSelectedDonationAmount={setSelectedDonationAmount}
          />
        );
      case "about":
        return <About config={config} setActiveTab={setActiveTab} />;
      case "donate":
        return (
          <Donate 
            config={config} 
            donationTiers={donationTiers} 
            selectedDonationAmount={selectedDonationAmount} 
            setSelectedDonationAmount={setSelectedDonationAmount}
          />
        );
      case "stories":
        return <Stories stories={stories} />;
      case "gallery":
        return <GalleryView gallery={gallery} />;
      case "events":
        return <EventsView events={events} />;
      case "reviews":
        return <Reviews reviews={reviews} onAddReview={onAddPublicReview} />;
      case "volunteer":
        return <VolunteerForm config={config} onRegisterVolunteer={onRegisterVolunteer} />;
      case "contact":
        return <ContactUs config={config} />;
      case "admin":
        return (
          <AdminPanel 
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
            config={config}
            stats={stats}
            donationTiers={donationTiers}
            reviews={allReviews}
            volunteers={volunteers}
            gallery={gallery}
            events={events}
            transactions={transactions}
            stories={stories}
            onUpdateConfig={handleUpdateConfig}
            onUpdateStats={handleUpdateStats}
            onUpdateTiers={handleUpdateTiers}
            onSaveStory={handleSaveStory}
            onDeleteStory={handleDeleteStory}
            onUpdateVolunteerStatus={handleUpdateVolunteerStatus}
            onDeleteVolunteer={handleDeleteVolunteer}
            onToggleReviewApproval={handleToggleReviewApproval}
            onDeleteReview={handleDeleteReview}
            onSaveGallery={handleSaveGallery}
            onDeleteGallery={handleDeleteGallery}
            onSaveEvent={handleSaveEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} config={config} stats={stats} donationTiers={donationTiers} setSelectedDonationAmount={setSelectedDonationAmount} />;
    }
  };

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-earth-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="animate-spin text-brand-orange mx-auto" size={40} />
          <p className="text-sm font-sans font-bold text-slate-500 uppercase tracking-widest">Nourishing Web Platforms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-bg flex flex-col justify-between selection:bg-brand-orange/20">
      
      {/* Dynamic persistent strip & header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        config={config}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Primary view viewport with transition effects */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Bottom Footer Brand */}
      <footer className="bg-slate-900 text-slate-400 font-sans border-t-8 border-brand-orange pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange text-white p-2.5 rounded-full">
                <Heart size={16} className="fill-current animate-pulse" />
              </div>
              <span className="font-display font-bold text-lg text-white">Ek Roti Foundation</span>
            </div>
            
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Serving our underprivileged Indian communities with direct warm whole-meals, flood rescues, widow supports, and nutritional campaigns since inception.
            </p>
            
            <p className="text-[10px] text-slate-500 tracking-wider font-extrabold uppercase pt-2">
              Govt Registered NGO | Verified
            </p>
          </div>

          {/* Col 2: Fast navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-display">Fast Navigations</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <button onClick={() => { setActiveTab("home"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Home</button>
              <button onClick={() => { setActiveTab("about"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">About Us</button>
              <button onClick={() => { setActiveTab("donate"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Donate Food</button>
              <button onClick={() => { setActiveTab("stories"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Our Stories</button>
              <button onClick={() => { setActiveTab("gallery"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Gallery</button>
              <button onClick={() => { setActiveTab("events"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Events</button>
              <button onClick={() => { setActiveTab("reviews"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Reviews</button>
              <button onClick={() => { setActiveTab("volunteer"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">Volunteer</button>
            </div>
          </div>

          {/* Col 3: Coordinates block */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-display">Office Headquarters</h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="flex items-start space-x-2">
                <MapPin size={14} className="text-brand-orange-light flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">{config.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={14} className="text-brand-orange-light flex-shrink-0" />
                <span className="font-mono text-slate-300">{config.phone}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={14} className="text-brand-orange-light flex-shrink-0" />
                <span className="text-slate-400 select-all">{config.email}</span>
              </p>
            </div>
          </div>

          {/* Col 4: India coordinates map */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-display">Indian Service Reach</h4>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl relative overflow-hidden aspect-video">
              {/* Styled Vector mapping target pointing Surat, Gujarat */}
              <div className="absolute inset-0 bg-[#0c1322] flex flex-col justify-center items-center text-center font-sans space-y-2">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">E-Kitchen Sector</span>
                <span className="text-brand-orange font-extrabold text-xs">Surat Hub Active</span>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-orange pulse-heart border border-white"></div>
                <span className="text-[9px] text-slate-400">Plot No-28, Hare Krishna Villa</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyrights strip copyright */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ek Roti Foundation Charitable Trust. All rights reserved globally across India.</p>
          <div className="flex space-x-4">
            <button onClick={() => { setActiveTab("admin"); scrollToTop(); }} className="hover:text-slate-400 transition-colors cursor-pointer">Admin Gate</button>
            <span>•</span>
            <a href="https://paytm.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <span>Paytm Secured</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </footer>

      {/* FLOAT WIDGETS FLOATING CONTROLS: WHATSAPP TRIGGER & SCROLL ON TOP */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-3">
        {/* WhatsApp Floating Floating Button */}
        <a 
          href={getWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 shrink-0 transform animate-pulse-short"
          title="Chat directly via Whatsapp"
        >
          <MessageSquare className="fill-current animate-bounce" size={26} />
        </a>
      </div>

      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40">
          <button 
            onClick={scrollToTop}
            className="bg-brand-orange text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            title="Scroll to main header"
          >
            <ArrowUp size={20} className="stroke-[2.5]" />
          </button>
        </div>
      )}

    </div>
  );
}
