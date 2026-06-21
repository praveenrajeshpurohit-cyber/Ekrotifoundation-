import React, { useState, useEffect } from "react";
import { Heart, Menu, X, Phone, Mail, MapPin, UserCheck, Shield } from "lucide-react";
import { SiteConfig } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config: SiteConfig;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ activeTab, setActiveTab, config, isLoggedIn, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "donate", label: "Donate Food" },
    { id: "stories", label: "Our Stories" },
    { id: "gallery", label: "Gallery" },
    { id: "events", label: "Events" },
    { id: "reviews", label: "Reviews" },
    { id: "volunteer", label: "Volunteer" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Banner Contact Strip */}
      <div className="bg-brand-brown text-amber-50 text-xs py-2 px-4 shadow-inner hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${config.phone.replace(/\s+/g, "")}`} className="flex items-center space-x-1 hover:text-brand-orange transition-colors">
              <Phone size={12} className="text-brand-orange-light" />
              <span>{config.phone}</span>
            </a>
            <a href={`mailto:${config.email}`} className="flex items-center space-x-1 hover:text-brand-orange transition-colors">
              <Mail size={12} className="text-brand-orange-light" />
              <span>{config.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-300">
              <MapPin size={12} className="text-brand-orange-light" />
              <span className="truncate max-w-[280px]">Surat, Gujarat, India</span>
            </span>
            {isLoggedIn ? (
              <button 
                onClick={() => { onLogout(); handleNavClick("home"); }}
                className="flex items-center space-x-1 text-brand-orange-light hover:text-white transition-colors border-l border-amber-800/60 pl-4 font-medium"
              >
                <Shield size={12} />
                <span>Logout Admin</span>
              </button>
            ) : (
              <button 
                onClick={() => handleNavClick("admin")}
                className={`flex items-center space-x-1 hover:text-brand-orangetransition-colors border-l border-amber-800/60 pl-4 font-medium ${activeTab === 'admin' ? 'text-brand-orange' : 'text-slate-300'}`}
              >
                <Shield size={12} />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header Header */}
      <header id="main-header" className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 shrink-nav" 
          : "bg-earth-bg border-b border-orange-100 py-4"
        }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-brand-orange text-white p-2.5 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-12">
              <Heart className="fill-white animate-pulse" size={20} />
            </div>
            <div>
              <span className="font-display font-bold text-lg md:text-xl text-slate-800 tracking-tight block">
                Ek Roti <span className="text-brand-orange">Foundation</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase -mt-1 block font-medium">
                One Roti Can Change a Life
              </span>
            </div>
          </div>

          {/* Nav items for Desktop Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? "text-brand-orange bg-orange-50 font-semibold" 
                    : "text-slate-600 hover:text-brand-orange hover:bg-slate-100/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Call for Desktop Call-to-action */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick("donate")}
              className="bg-brand-green hover:bg-opacity-90 text-white text-sm font-semibold px-6 py-2.5 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart size={16} className="fill-current animate-pulse" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Right Controls Right Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => handleNavClick("donate")}
              className="bg-brand-green hover:bg-opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Heart size={14} className="fill-current" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-brand-orange p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-orange-100 shadow-xl py-4 px-4 transition-all duration-300 ease-in-out z-40 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                    activeTab === item.id 
                      ? "bg-orange-50 text-brand-orange border-l-4 border-brand-orange font-bold pl-3" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col space-y-2">
                {isLoggedIn ? (
                  <button 
                    onClick={() => { onLogout(); setIsMenuOpen(false); handleNavClick("home"); }}
                    className="w-full text-center py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Logout Admin Session
                  </button>
                ) : (
                  <button 
                    onClick={() => handleNavClick("admin")}
                    className="w-full text-center py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Admin Panel Login
                  </button>
                )}
                <div className="text-center text-xs text-slate-400 pt-2">
                  Call & Email Support:<br/>
                  <strong className="text-slate-500">{config.phone}</strong> | {config.email}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
