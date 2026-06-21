import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, ShieldAlert, KeyRound, Building2, UserCircle, 
  Utensils, Files, Image, Library, Settings, RefreshCw, 
  Trash2, HeartHandshake, UserPlus, CirclePlus, Sparkles, Check, CheckCircle
} from "lucide-react";
import { 
  SiteConfig, SiteStats, DonationTier, Review, 
  Volunteer, GalleryItem, NGOEvent, ImpactStory 
} from "../types";

interface AdminPanelProps {
  isLoggedIn: boolean;
  onLogin: (u: string, p: string) => boolean;
  onLogout: () => void;
  config: SiteConfig;
  stats: SiteStats;
  donationTiers: DonationTier[];
  reviews: Review[];
  volunteers: Volunteer[];
  gallery: GalleryItem[];
  events: NGOEvent[];
  transactions: any[];
  stories: ImpactStory[];
  onUpdateConfig: (c: SiteConfig) => Promise<void>;
  onUpdateStats: (s: SiteStats) => Promise<void>;
  onUpdateTiers: (t: DonationTier[]) => Promise<void>;
  onSaveStory: (story: Partial<ImpactStory>) => Promise<void>;
  onDeleteStory: (id: number) => Promise<void>;
  onUpdateVolunteerStatus: (id: number, status: string) => Promise<void>;
  onDeleteVolunteer: (id: number) => Promise<void>;
  onToggleReviewApproval: (id: number, isApproved: boolean) => Promise<void>;
  onDeleteReview: (id: number) => Promise<void>;
  onSaveGallery: (item: Partial<GalleryItem>) => Promise<void>;
  onDeleteGallery: (id: number) => Promise<void>;
  onSaveEvent: (event: Partial<NGOEvent>) => Promise<void>;
  onDeleteEvent: (id: number) => Promise<void>;
}

export default function AdminPanel({
  isLoggedIn, onLogin, onLogout,
  config, stats, donationTiers, reviews, volunteers, gallery, events, transactions, stories,
  onUpdateConfig, onUpdateStats, onUpdateTiers,
  onSaveStory, onDeleteStory, onUpdateVolunteerStatus, onDeleteVolunteer,
  onToggleReviewApproval, onDeleteReview, onSaveGallery, onDeleteGallery,
  onSaveEvent, onDeleteEvent
}: AdminPanelProps) {
  
  // Login form status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Admin section navigation status
  const [activeAdminTab, setActiveAdminTab] = useState<"site" | "tiers" | "stories" | "volunteers" | "reviews" | "gallery" | "transactions">("site");

  // Site Config form parameters
  const [headline, setHeadline] = useState(config.headline);
  const [subheading, setSubheading] = useState(config.subheading);
  const [phone, setPhone] = useState(config.phone);
  const [email, setEmail] = useState(config.email);
  const [address, setAddress] = useState(config.address);
  const [upiId, setUpiId] = useState(config.upiId || "8319692429@paytm");
  const [upiName, setUpiName] = useState(config.upiName || "Praveen Rajesh Purohit");
  const [customQrImage, setCustomQrImage] = useState(config.customQrImage || "");
  const [dragActive, setDragActive] = useState(false);

  // Custom photo variables
  const [heroImage, setHeroImage] = useState(config.heroImage || "");
  const [introImage, setIntroImage] = useState(config.introImage || "");
  const [aboutImage, setAboutImage] = useState(config.aboutImage || "");
  const [teamImage1, setTeamImage1] = useState(config.teamImage1 || "");
  const [teamImage2, setTeamImage2] = useState(config.teamImage2 || "");
  const [teamImage3, setTeamImage3] = useState(config.teamImage3 || "");
  const [teamImage4, setTeamImage4] = useState(config.teamImage4 || "");

  useEffect(() => {
    if (config.headline !== undefined) setHeadline(config.headline);
    if (config.subheading !== undefined) setSubheading(config.subheading);
    if (config.phone !== undefined) setPhone(config.phone);
    if (config.email !== undefined) setEmail(config.email);
    if (config.address !== undefined) setAddress(config.address);
    if (config.upiId !== undefined) setUpiId(config.upiId || "8319692429@paytm");
    if (config.upiName !== undefined) setUpiName(config.upiName || "Praveen Rajesh Purohit");
    if (config.customQrImage !== undefined) setCustomQrImage(config.customQrImage || "");
    if (config.heroImage !== undefined) setHeroImage(config.heroImage || "");
    if (config.introImage !== undefined) setIntroImage(config.introImage || "");
    if (config.aboutImage !== undefined) setAboutImage(config.aboutImage || "");
    if (config.teamImage1 !== undefined) setTeamImage1(config.teamImage1 || "");
    if (config.teamImage2 !== undefined) setTeamImage2(config.teamImage2 || "");
    if (config.teamImage3 !== undefined) setTeamImage3(config.teamImage3 || "");
    if (config.teamImage4 !== undefined) setTeamImage4(config.teamImage4 || "");
  }, [config]);

  // Statistics inputs
  const [mealsServed, setMealsServed] = useState(stats.mealsServed);
  const [activeVolunteers, setActiveVolunteers] = useState(stats.activeVolunteers);
  const [beneficiariesHelped, setBeneficiariesHelped] = useState(stats.beneficiariesHelped);
  const [citiesReached, setCitiesReached] = useState(stats.citiesReached);

  // Stories forms parameters
  const [storyId, setStoryId] = useState<number | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDesc, setStoryDesc] = useState("");
  const [storyLocation, setStoryLocation] = useState("");
  const [storyCategory, setStoryCategory] = useState<"Disaster Relief" | "Daily Feeding" | "Festival Camp" | "Elderly Support" | "Children Wellness">("Daily Feeding");
  const [storyImpact, setStoryImpact] = useState("");
  const [storyImage, setStoryImage] = useState("");

  // Gallery item form params
  const [galleryId, setGalleryId] = useState<number | null>(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState<"Kids" | "Distribution" | "Kitchen" | "Elderly" | "Volunteers">("Kids");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");

  // Saving states feedback tickers
  const [savesLog, setSavesLog] = useState("");

  const clearStoryForm = () => {
    setStoryId(null);
    setStoryTitle("");
    setStoryDesc("");
    setStoryLocation("");
    setStoryCategory("Daily Feeding");
    setStoryImpact("");
    setStoryImage("");
  };

  const clearGalleryForm = () => {
    setGalleryId(null);
    setGalleryTitle("");
    setGalleryCategory("Kids");
    setGalleryUrl("");
    setGalleryDesc("");
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    if (ok) {
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid Administrator credentials. Try again.");
    }
  };

  const triggerConfigSave = async () => {
    setSavesLog("Saving configuration...");
    try {
      await onUpdateConfig({ 
        headline, subheading, phone, email, address, upiId, upiName, customQrImage,
        heroImage, introImage, aboutImage, teamImage1, teamImage2, teamImage3, teamImage4 
      });
      await onUpdateStats({ mealsServed, activeVolunteers, beneficiariesHelped, citiesReached });
      setSavesLog("Site configuration saved successfully.");
      setTimeout(() => setSavesLog(""), 3000);
    } catch (e) {
      setSavesLog("Failed to update configurations.");
    }
  };

  const triggerTiersAmountSave = async (tierIdx: number, newAmount: number, persons: number) => {
    setSavesLog("Saving support tiers...");
    const revisedTiers = donationTiers.map((tier, idx) => 
      idx === tierIdx ? { ...tier, amount: newAmount, personsFed: persons } : tier
    );
    try {
      await onUpdateTiers(revisedTiers);
      setSavesLog("Donation sponsorship amounts updated successfully.");
      setTimeout(() => setSavesLog(""), 3000);
    } catch (e) {
      setSavesLog("Failed to write revised support amounts.");
    }
  };

  const triggerStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle || !storyDesc || !storyLocation) {
      alert("Please enter title, description and location coordinates.");
      return;
    }
    setSavesLog("Saving story report...");
    try {
      await onSaveStory({
        id: storyId || undefined,
        title: storyTitle,
        description: storyDesc,
        location: storyLocation,
        category: storyCategory,
        impact: storyImpact || "Community nourishment",
        image: storyImage || "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400"
      });
      setSavesLog(`Story #${storyId || "New"} saved successfully.`);
      clearStoryForm();
      setTimeout(() => setSavesLog(""), 3000);
    } catch (e) {
      setSavesLog("Failed to save narrative.");
    }
  };

  const triggerGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryUrl) {
      alert("Title and image URL are required.");
      return;
    }
    setSavesLog("Saving gallery photo...");
    try {
      await onSaveGallery({
        id: galleryId || undefined,
        title: galleryTitle,
        category: galleryCategory,
        url: galleryUrl,
        description: galleryDesc
      });
      setSavesLog("Media index updated successfully.");
      clearGalleryForm();
      setTimeout(() => setSavesLog(""), 3000);
    } catch (e) {
      setSavesLog("Failed to append media.");
    }
  };

  const loadStoryToForm = (story: ImpactStory) => {
    setStoryId(story.id);
    setStoryTitle(story.title);
    setStoryDesc(story.description);
    setStoryLocation(story.location);
    setStoryCategory(story.category);
    setStoryImpact(story.impact);
    setStoryImage(story.image);
    // Smooth scroll to form element anchor
    document.getElementById("story-composer-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isLoggedIn) {
    /* 1. SECURE AUTHENTICATION credential checking portal */
    return (
      <div className="py-20 flex bg-earth-bg items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-orange-100 max-w-sm w-full shadow-2xl p-8 space-y-6 animate-zoomIn pb-10">
          
          <div className="text-center space-y-2">
            <div className="bg-orange-50 text-brand-orange w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-inner mb-4">
              <KeyRound className="animate-spin-slow text-brand-orange" size={26} />
            </div>
            <h1 className="font-display font-black text-2xl text-slate-800">Admin Login</h1>
            <p className="text-xs text-slate-400">Restricted secure portal for Ek Roti Foundation trustees.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600 font-medium font-sans flex items-start gap-2 select-none">
              <ShieldAlert size={14} className="flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label htmlFor="adminUsernameInput" className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Username</label>
              <input 
                id="adminUsernameInput"
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-1 text-left">
              <label htmlFor="adminPasswordInput" className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Password</label>
              <input 
                id="adminPasswordInput"
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
            >
              Unlock Dashboard Controls
            </button>
          </form>

          <div className="text-[10px] text-slate-400 font-sans leading-relaxed text-center pt-2 border-t border-slate-50">
            For evaluation, use specified login details:<br/>
            Username: <strong className="text-slate-500 font-mono">Ekrotifoundation</strong><br/>
            Password: <strong className="text-slate-500 font-mono">Ekroti@123</strong>
          </div>

        </div>
      </div>
    );
  }

  return (
    /* 2. ADMIN BOARD SYSTEM WORKSPACE */
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-10">
      
      {/* Dashboard Top banner */}
      <div className="bg-white rounded-3xl border border-orange-50/70 p-6.5 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-emerald-100 text-emerald-800 w-12 h-12 rounded-full flex items-center justify-center shadow-inner">
            <ShieldCheck size={26} className="stroke-[2.5]" />
          </div>
          <div className="text-left font-sans">
            <span className="text-emerald-800 font-extrabold text-[10px] uppercase tracking-widest block bg-emerald-50 px-2.5 py-0.5 rounded-full w-max">Active Admin Session</span>
            <h1 className="text-xl md:text-2xl font-display font-black text-slate-800">Ek Roti Management Panel</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onLogout}
            className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Log Out Session
          </button>
        </div>
      </div>

      {/* Floating saving notification popup ticker */}
      {savesLog && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white text-xs font-semibold rounded-xl px-5 py-3 shadow-2xl flex items-center space-x-3.5 z-50 animate-bounce">
          <RefreshCw size={14} className="animate-spin text-brand-orange-light" />
          <span>{savesLog}</span>
        </div>
      )}

      {/* Main double split grid divider */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column options board navigation bars */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl shadow-md p-4 space-y-1.5 overflow-x-auto lg:overflow-x-visible flex flex-row lg:flex-col scrollbar-none">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest p-2 border-b border-slate-50/50 mb-2 hidden lg:block text-left">Control Tabs</p>
          
          <button
            onClick={() => setActiveAdminTab("site")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "site" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Settings size={14} />
            <span>Site & Stats</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("tiers")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "tiers" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Utensils size={14} />
            <span>Sponsor Tiers</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("stories")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "stories" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Files size={14} />
            <span> stories ({stories.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("volunteers")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "volunteers" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <UserCircle size={14} />
            <span>Volunteers ({volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("reviews")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "reviews" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Library size={14} />
            <span>Testimonial Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("gallery")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "gallery" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Image size={14} />
            <span>Gallery index ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("transactions")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors flex items-center space-x-3 cursor-pointer flex-shrink-0 ${
              activeAdminTab === "transactions" ? "bg-orange-50 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ShieldCheck size={14} />
            <span>Paytm Trans ({transactions.length})</span>
          </button>
        </div>

        {/* Right column active panels Stage workspaces */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-orange-50 p-6 md:p-8 shadow-lg min-h-[50vh]">
          
          {/* TAB 1: SITE SYSTEM INFO CONFIG PANEL */}
          {activeAdminTab === "site" && (
            <div className="space-y-6 text-left">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <Settings className="text-brand-orange" size={18} />
                <span>Homepage Title & Coordinates</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Hero Headline</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    value={headline}
                    onChange={(e)=>setHeadline(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Contact Mobile</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Hero Subheading</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                  value={subheading}
                  onChange={(e)=>setSubheading(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Office Email ID</label>
                  <input 
                    type="email"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Office Headquarters Address</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>
              </div>

              <h4 className="font-display font-bold text-slate-700 text-sm border-t border-slate-50 pt-5 mt-4">Paytm UPI QR Code Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Paytm Merchant UPI ID (VPA)</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none font-mono"
                    placeholder="e.g., 8319692429@paytm"
                    value={upiId}
                    onChange={(e)=>setUpiId(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold uppercase tracking-wider block">Verified Payee Name</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    placeholder="e.g., Praveen Rajesh Purohit"
                    value={upiName}
                    onChange={(e)=>setUpiName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3.5 border-t border-slate-50 pt-5 mt-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-bold text-slate-700 text-sm">Upload Custom Merchant QR Code Image (Optional)</h4>
                  {customQrImage && (
                    <button
                      type="button"
                      onClick={() => setCustomQrImage("")}
                      className="text-xs font-extrabold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                    >
                      Clear Uploaded QR
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-medium">
                  By default, the platform dynamically generates a UPI-compliant QR code based on your <strong>Merchant UPI ID</strong> and <strong>Verified Payee Name</strong> parameters. If you prefer to display a fixed, custom merchant QR image, drag/drop or browse to upload it here.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                  {/* Upload Drop Zone / Input */}
                  <div className="md:col-span-2">
                    <div 
                      onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCustomQrImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className={`relative border-2 border-dashed rounded-3xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[160px] cursor-pointer ${
                        dragActive 
                          ? "border-brand-orange bg-amber-50/40" 
                          : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <input 
                        type="file"
                        accept="image/*"
                        id="customQrUpload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCustomQrImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <div className="space-y-2">
                        <div className="bg-slate-200/60 p-3 rounded-full inline-flex text-slate-600">
                          <Image size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-700">Drag & drop your custom QR code, or <span className="text-[#002e6e] underline">browse files</span></p>
                          <p className="text-[10px] text-slate-400 font-medium font-sans">Supports PNG, JPG, JPEG, or SVG. Sized nicely in square format.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Live Preview Area */}
                  <div className="bg-white border border-slate-200/60 p-4 rounded-3xl flex flex-col items-center justify-center text-center shadow-xs">
                    <span className="text-[10px] bg-sky-50 border border-sky-100/60 text-[#002e6e] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider mb-3">Live QR Preview</span>
                    {customQrImage ? (
                      <div className="space-y-2.5">
                        <img 
                          src={customQrImage} 
                          alt="Custom QR Preview" 
                          className="w-[120px] h-[120px] object-contain rounded-xl border border-slate-100 select-none mx-auto"
                        />
                        <p className="text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                          <CheckCircle size={12} />
                          <span>Custom Upload Active</span>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 flex flex-col items-center">
                        <div className="relative bg-slate-150 p-2.5 rounded-xl border border-slate-100">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=0&cu=INR&tn=EkRotiDonation`)}`}
                            alt="Dynamic QR Code Preview"
                            className="w-[100px] h-[100px] opacity-75 grayscale select-none"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans font-semibold">Using Dynamically Generated QR</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION: Creative Content Banners & Team Photos */}
              <div className="border-t border-slate-100 pt-6 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Image className="text-orange-500" size={18} />
                  <h4 className="font-display font-medium text-slate-800 text-sm">Site Banners & Core Team Photos</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-medium mb-4">
                  Fully customize the imagery used on the homepage and about section. You can paste any high-resolution public photo web URL (e.g., from Unsplash) or select/upload a local file.
                </p>

                <div className="space-y-6">
                  {/* Subsection 1: Main Platform Banners */}
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Main Banners</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Hero Banner */}
                      <div className="space-y-1.5">
                        <label className="text-slate-600 text-xs font-semibold block">Homepage Hero Cover</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 focus:border-brand-orange rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-400"
                          placeholder="Unsplash / Web URL link"
                          value={heroImage}
                          onChange={(e) => setHeroImage(e.target.value)}
                        />
                        <div className="flex items-center gap-1.5">
                          <label className="text-[10px] text-[#002e6e] font-bold cursor-pointer hover:underline flex items-center gap-1 bg-sky-50 border border-sky-100 px-2 py-1 rounded-md shrink-0">
                            <span>Upload Cover</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => setHeroImage(reader.result as string);
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[9px] text-slate-400 font-sans truncate">Max 3MB</span>
                        </div>
                        {heroImage && (
                          <div className="mt-2 relative group w-full h-[64px] rounded-lg overflow-hidden border border-slate-200">
                            <img src={heroImage} alt="Hero banner" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setHeroImage("")}
                              className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Intro Banner */}
                      <div className="space-y-1.5">
                        <label className="text-slate-600 text-xs font-semibold block">Homepage Intro Photo</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 focus:border-brand-orange rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-400"
                          placeholder="Unsplash / Web URL link"
                          value={introImage}
                          onChange={(e) => setIntroImage(e.target.value)}
                        />
                        <div className="flex items-center gap-1.5">
                          <label className="text-[10px] text-[#002e6e] font-bold cursor-pointer hover:underline flex items-center gap-1 bg-sky-50 border border-sky-100 px-2 py-1 rounded-md shrink-0">
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => setIntroImage(reader.result as string);
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[9px] text-slate-400 font-sans truncate">Max 3MB</span>
                        </div>
                        {introImage && (
                          <div className="mt-2 relative group w-full h-[64px] rounded-lg overflow-hidden border border-slate-200">
                            <img src={introImage} alt="Intro support banner" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setIntroImage("")}
                              className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* About Mission Banner */}
                      <div className="space-y-1.5">
                        <label className="text-slate-600 text-xs font-semibold block">About Mission Photo</label>
                        <input 
                          type="text"
                          className="w-full bg-white border border-slate-200 focus:border-brand-orange rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-400"
                          placeholder="Unsplash / Web URL link"
                          value={aboutImage}
                          onChange={(e) => setAboutImage(e.target.value)}
                        />
                        <div className="flex items-center gap-1.5">
                          <label className="text-[10px] text-[#002e6e] font-bold cursor-pointer hover:underline flex items-center gap-1 bg-sky-50 border border-sky-100 px-2 py-1 rounded-md shrink-0">
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => setAboutImage(reader.result as string);
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[9px] text-slate-400 font-sans truncate">Max 3MB</span>
                        </div>
                        {aboutImage && (
                          <div className="mt-2 relative group w-full h-[64px] rounded-lg overflow-hidden border border-slate-200">
                            <img src={aboutImage} alt="About mission banner" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setAboutImage("")}
                              className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Subsection 2: Team Member Photos */}
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Trustees & Operational Leads</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Leader 1 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <UserCircle size={14} className="text-[#002e6e]" />
                          <span className="text-xs font-semibold text-slate-700 truncate">Praveen R. Purohit</span>
                        </div>
                        <input 
                          type="text"
                          className="w-full bg-slate-50/50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none placeholder-slate-400"
                          placeholder="Paste image link"
                          value={teamImage1}
                          onChange={(e) => setTeamImage1(e.target.value)}
                        />
                        <label className="text-[9.5px] text-[#002e6e] font-extrabold cursor-pointer hover:underline flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded w-max">
                          <span>Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onloadend = () => setTeamImage1(reader.result as string);
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {teamImage1 && (
                          <img src={teamImage1} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200 mt-1" />
                        )}
                      </div>

                      {/* Leader 2 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <UserCircle size={14} className="text-[#002e6e]" />
                          <span className="text-xs font-semibold text-slate-700 truncate">Sunil Verma</span>
                        </div>
                        <input 
                          type="text"
                          className="w-full bg-slate-50/50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none placeholder-slate-400"
                          placeholder="Paste image link"
                          value={teamImage2}
                          onChange={(e) => setTeamImage2(e.target.value)}
                        />
                        <label className="text-[9.5px] text-[#002e6e] font-extrabold cursor-pointer hover:underline flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded w-max">
                          <span>Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onloadend = () => setTeamImage2(reader.result as string);
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {teamImage2 && (
                          <img src={teamImage2} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200 mt-1" />
                        )}
                      </div>

                      {/* Leader 3 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <UserCircle size={14} className="text-[#002e6e]" />
                          <span className="text-xs font-semibold text-slate-700 truncate">Dr. Ajay Mehta</span>
                        </div>
                        <input 
                          type="text"
                          className="w-full bg-slate-50/50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none placeholder-slate-400"
                          placeholder="Paste image link"
                          value={teamImage3}
                          onChange={(e) => setTeamImage3(e.target.value)}
                        />
                        <label className="text-[9.5px] text-[#002e6e] font-extrabold cursor-pointer hover:underline flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded w-max">
                          <span>Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onloadend = () => setTeamImage3(reader.result as string);
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {teamImage3 && (
                          <img src={teamImage3} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200 mt-1" />
                        )}
                      </div>

                      {/* Leader 4 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <UserCircle size={14} className="text-[#002e6e]" />
                          <span className="text-xs font-semibold text-slate-700 truncate">Smt. Priya Patel</span>
                        </div>
                        <input 
                          type="text"
                          className="w-full bg-slate-50/50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none placeholder-slate-400"
                          placeholder="Paste image link"
                          value={teamImage4}
                          onChange={(e) => setTeamImage4(e.target.value)}
                        />
                        <label className="text-[9.5px] text-[#002e6e] font-extrabold cursor-pointer hover:underline flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded w-max">
                          <span>Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onloadend = () => setTeamImage4(reader.result as string);
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {teamImage4 && (
                          <img src={teamImage4} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200 mt-1" />
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-display font-bold text-slate-700 text-sm border-t border-slate-50 pt-5 mt-4">Homepage Statistics Counter Targets</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] font-bold block uppercase">Meals Served</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none font-bold"
                    value={mealsServed}
                    onChange={(e)=>setMealsServed(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] font-bold block uppercase">Active Volunteers</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none font-bold"
                    value={activeVolunteers}
                    onChange={(e)=>setActiveVolunteers(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] font-bold block uppercase font-sans text-xs">Beneficiaries Saved</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none font-bold"
                    value={beneficiariesHelped}
                    onChange={(e)=>setBeneficiariesHelped(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] font-bold block uppercase">Cities Reached</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none font-bold"
                    value={citiesReached}
                    onChange={(e)=>setCitiesReached(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <button 
                  onClick={triggerConfigSave}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DONATION SPONSORSHIP TIERS PANEL */}
          {activeAdminTab === "tiers" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <Utensils className="text-brand-orange" size={18} />
                <span>E-Donation Sponsorship Prices</span>
              </h3>

              <div className="space-y-4">
                {donationTiers.map((tier, idx) => (
                  <div key={tier.id} className="bg-slate-50 border border-slate-150 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Tier #{tier.id}: Feed {tier.personsFed} Persons</h4>
                      <p className="text-xs text-slate-400 font-sans italic">{tier.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="space-y-1 w-24">
                        <label className="text-slate-400 text-[10px] font-bold block">Cost (INR)</label>
                        <input 
                          type="number"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold"
                          value={tier.amount}
                          onChange={(e) => triggerTiersAmountSave(idx, parseInt(e.target.value) || 0, tier.personsFed)}
                        />
                      </div>
                      
                      <div className="space-y-1 w-24">
                        <label className="text-slate-400 text-[10px] font-bold block">Feeds</label>
                        <input 
                          type="number"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold"
                          value={tier.personsFed}
                          onChange={(e) => triggerTiersAmountSave(idx, tier.amount, parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IMPACT STORIES (supports composing, updating, pagination lists) */}
          {activeAdminTab === "stories" && (
            <div className="space-y-8 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <Files className="text-brand-orange" size={18} />
                <span>Composition Desk - 100 Impact Stories</span>
              </h3>

              {/* Composition form */}
              <form id="story-composer-form" onSubmit={triggerStorySubmit} className="bg-slate-50 border border-slate-150 rounded-2xl p-6 space-y-4">
                <h4 className="font-display font-bold text-slate-800 text-sm">
                  {storyId ? `Modify Story #${storyId}` : "Compose New Impact Story Thali"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block">Story Title</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Flood camp meals at Bardoli"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      value={storyTitle}
                      onChange={(e)=>setStoryTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block">Location (Town/City)</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Surat, Gujarat"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      value={storyLocation}
                      onChange={(e)=>setStoryLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block font-sans">Category</label>
                    <select 
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                      value={storyCategory}
                      onChange={(e) => setStoryCategory(e.target.value as any)}
                    >
                      <option value="Disaster Relief">Disaster Relief</option>
                      <option value="Daily Feeding">Daily Feeding</option>
                      <option value="Festival Camp">Festival Camp</option>
                      <option value="Elderly Support">Elderly Support</option>
                      <option value="Children Wellness">Children Wellness</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block">Impact metrics (e.g. 500+ Fed)</label>
                    <input 
                      type="text"
                      placeholder="e.g. 850+ Warm plates served"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      value={storyImpact}
                      onChange={(e)=>setStoryImpact(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block font-sans">Image URL</label>
                    <input 
                      type="text"
                      placeholder="Unsplash image URL Link"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      value={storyImage}
                      onChange={(e)=>setStoryImage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold block">Detailed Story Narrative Text</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Describe how volunteers Prepared meals, distribution location atmosphere..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none"
                    value={storyDesc}
                    onChange={(e)=>setStoryDesc(e.target.value)}
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit"
                    className="bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold px-6 py-3 rounded-lg cursor-pointer"
                  >
                    {storyId ? "Update Story Log" : "Append New Story Item"}
                  </button>
                  <button 
                    type="button" 
                    onClick={clearStoryForm}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-3 rounded-lg cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </form>

              {/* Scrolling compact list of stories for editing */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-slate-800 text-sm">Listed Impact Stories Index ({stories.length})</h4>
                <div className="max-h-[350px] overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100">
                  {stories.map((story) => (
                    <div key={story.id} className="p-4 flex justify-between items-center bg-white hover:bg-orange-50/20 transition-colors">
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">
                          #{story.id}: {story.title} <span className="text-[10px] text-brand-orange px-2 bg-orange-50 rounded-full font-mono font-bold align-middle ml-2">{story.category}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-sans flex items-center gap-1.5 pt-0.5">
                          <span>{story.location}</span> | <span>Impact: {story.impact}</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => loadStoryToForm(story)}
                          className="bg-sky-50 text-sky-700 hover:bg-sky-100 text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          Modify Parameters
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Erase story #${story.id} permanently?`)) {
                              onDeleteStory(story.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg cursor-pointer"
                          title="Delete Story"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOLUNTEERS MANAGEMENT PANEL */}
          {activeAdminTab === "volunteers" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <UserCircle className="text-brand-orange" size={18} />
                <span>Volunteers Registrations</span>
              </h3>

              <div className="max-h-[500px] overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100 font-sans">
                {volunteers.length > 0 ? (
                  volunteers.map((vol) => (
                    <div key={vol.id} className="p-5 space-y-4 bg-white hover:bg-orange-50/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm tracking-tight">{vol.fullName}</h4>
                          <p className="text-xs text-slate-400 flex items-center gap-2 pt-1 font-mono">
                            <span>Phone: {vol.phone}</span>
                            <span>| Email: {vol.email}</span>
                            <span>| Location: {vol.city}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <select
                            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold"
                            value={vol.status}
                            onChange={(e) => onUpdateVolunteerStatus(vol.id, e.target.value)}
                          >
                            <option value="Pending">Pending Approval</option>
                            <option value="Approved">Approve Spot</option>
                            <option value="Contacted">Contacted / Call OK</option>
                          </select>
                          
                          <button 
                            onClick={() => {
                              if (confirm(`Erase registration from ${vol.fullName}?`)) {
                                onDeleteVolunteer(vol.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-xl transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 font-sans leading-relaxed">
                        <strong className="text-slate-800 block text-[10px] uppercase font-bold tracking-wider mb-1">Message statement:</strong>
                        "{vol.message}"
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-450 italic">No registrations submitted. Try filling the Become a Volunteer form in other views.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DONOR REVIEWS APPROVAL/DELETE PANEL */}
          {activeAdminTab === "reviews" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <Library className="text-brand-orange" size={18} />
                <span>Manage Donor Reviews</span>
              </h3>

              <div className="max-h-[500px] overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100 font-sans">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white hover:bg-orange-50/10 transition-colors">
                    <div className="space-y-1.5 text-left flex-1 font-sans">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          rev.isApproved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800 animate-pulse"
                        }`}>
                          {rev.isApproved ? "Live" : "Pending Audit"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">"{rev.text}"</p>
                      <p className="text-[10px] text-slate-400 font-mono">Rating: {rev.rating} Stars | Date logged: {rev.date}</p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button 
                        onClick={() => onToggleReviewApproval(rev.id, !rev.isApproved)}
                        className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          rev.isApproved 
                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                            : "bg-emerald-700 text-white hover:bg-emerald-800 shadow-md"
                        }`}
                      >
                        {rev.isApproved ? "Takedown Review" : "Approve & Go Live"}
                      </button>
                      
                      <button 
                        onClick={() => {
                          if (confirm(`Erase feedback from ${rev.name} permanently?`)) {
                            onDeleteReview(rev.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-750 bg-red-50 p-2 rounded-lg cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA GALLERY PANEL */}
          {activeAdminTab === "gallery" && (
            <div className="space-y-8 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <Image className="text-brand-orange" size={18} />
                <span>Media Gallery Directories</span>
              </h3>

              <form onSubmit={triggerGallerySubmit} className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-4">
                <h4 className="font-display font-bold text-slate-800 text-sm">Add New Photo Card</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block">Photo Title</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Cooking hot whole wheat rotis"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm"
                      value={galleryTitle}
                      onChange={(e)=>setGalleryTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 text-xs font-bold block">Media categorization</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-sm"
                      value={galleryCategory}
                      onChange={(e)=>setGalleryCategory(e.target.value as any)}
                    >
                      <option value="Kids">Kids</option>
                      <option value="Distribution">Distribution</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Elderly">Elderly</option>
                      <option value="Volunteers">Volunteers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold block">Unsplash / Image URL Link</label>
                  <input 
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono text-xs"
                    value={galleryUrl}
                    onChange={(e)=>setGalleryUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 text-xs font-bold block">Visual Description Text</label>
                  <input 
                    type="text"
                    placeholder="Describe context of photo..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm"
                    value={galleryDesc}
                    onChange={(e)=>setGalleryDesc(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer"
                >
                  Append Photo Index
                </button>
              </form>

              {/* List of images */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-slate-800 text-sm">Listed Photos ({gallery.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1.5">
                  {gallery.map((item) => (
                    <div key={item.id} className="border border-slate-100 p-2.5 rounded-xl flex items-center space-x-3 bg-white">
                      <img src={item.url} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" referrerPolicy="no-referrer" />
                      <div className="text-left flex-1 min-w-0 font-sans">
                        <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-brand-orange">{item.category}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => onDeleteGallery(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TRANSACTIONS LIST BOARD PANEL */}
          {activeAdminTab === "transactions" && (
            <div className="space-y-6 text-left animate-fadeIn">
              <h3 className="font-display font-black text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <ShieldCheck className="text-brand-orange" size={18} />
                <span>Simulated Paytm Transaction Audits</span>
              </h3>

              {/* Paytm API gateway credential context info card inside transactions manager */}
              <div className="bg-slate-50 border border-slate-100/70 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                    <span>Paytm Integration Credential Parameters</span>
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#002e6e] bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-lg w-max">ACTIVE (SECURE SANDBOX)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Paytm Merchant ID (MID)</span>
                    <input 
                      type="text" 
                      readOnly 
                      className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-mono text-[11px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner" 
                      value="zEGDie39558786797357" 
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Paytm Secret Merchant Key (MKEY)</span>
                    <input 
                      type="password" 
                      readOnly 
                      className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl font-mono text-[11px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner" 
                      value="MKEY_SECRET_SHIELDED_SESSION" 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans max-w-2xl font-medium">
                  We register and protect checkout signatures using the environment keys set during startup. Standard Paytm settlement rules feed statistics live into the Ek Roti home counters automatically.
                </p>
              </div>

              <div className="max-h-[500px] overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100 font-sans text-xs">
                {transactions.length > 0 ? (
                  transactions.map((txn, idx) => (
                    <div key={txn.id || idx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3.5 bg-slate-50/40">
                      <div className="text-left space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800">{txn.name}</span>
                          <span className="text-emerald-800 bg-emerald-100 font-extrabold text-[8px] uppercase px-2 py-0.5 rounded-full">Success</span>
                        </div>
                        <p className="text-slate-400 font-mono text-[9px]">ID: {txn.id} | Contact: {txn.phone} | email: {txn.email}</p>
                        <p className="text-slate-400 font-mono text-[9px]">Settled Date: {new Date(txn.date).toLocaleString()}</p>
                      </div>
                      
                      <div className="text-right font-mono font-extrabold text-base text-emerald-800 flex-shrink-0">
                        +₹{txn.amount}.00
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 italic">No transaction audits found. Try making a simulated Paytm payment in the Donate Tab!</div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
