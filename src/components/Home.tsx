import React, { useState, useEffect } from "react";
import { Heart, Users, Utensils, Globe, Sparkles, MoveRight, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SiteConfig, SiteStats, DonationTier } from "../types";

// Animated counter hook
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1200; // ms
    const incrementTime = Math.max(Math.floor(totalDuration / (end / 100)), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString('en-IN')}{suffix}</span>;
}

interface HomeProps {
  setActiveTab: (tab: string) => void;
  config: SiteConfig;
  stats: SiteStats;
  donationTiers: DonationTier[];
  setSelectedDonationAmount: (amount: number) => void;
}

export default function Home({ setActiveTab, config, stats, donationTiers, setSelectedDonationAmount }: HomeProps) {
  
  // Custom quick support tier selection
  const handleSupportSelect = (amount: number) => {
    setSelectedDonationAmount(amount);
    setActiveTab("donate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      {/* 1. Emotional Hero Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-slate-950 flex items-center justify-center text-white px-4 py-16">
        {/* Overlay with indian community background image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={config?.heroImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920"} 
            alt="Indian poverty feeding" 
            className="w-full h-full object-cover object-center opacity-30 scale-105 filter contrast-125 saturate-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
          {/* Subtle overlay grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto z-10 text-center flex flex-col items-center">
          {/* Cute tag with orange star icon */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-brand-orange/20 border border-brand-orange-light/25 px-4.5 py-1.5 rounded-full mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-brand-orange-light animate-spin-slow" />
            <span className="text-brand-orange-light text-xs font-bold uppercase tracking-wider">A Registered verified Indian Charity NGO</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl tracking-tight text-white"
          >
            "One Roti Can <span className="text-brand-orange underline decoration-orange-500/50 underline-offset-8">Change a Life</span>"
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-sans"
          >
            {config.subheading} Over <span className="text-white font-bold inline-flex items-center gap-1"><Utensils size={16} className="text-brand-orange" />1.2 Million+</span> freshly cooked chapatis have been served to the immediate needy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto"
          >
            <button
              onClick={() => { setActiveTab("donate"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 shadow-2xl shadow-brand-orange/40 hover:shadow-brand-orange/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <Heart className="fill-white" size={18} />
              <span>Donate A Meal Now</span>
            </button>
            <button
              onClick={() => { setActiveTab("volunteer"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2 hover:-translate-y-1 cursor-pointer"
            >
              <span>Become a Volunteer</span>
              <MoveRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Diagonal Wave Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-earth-bg" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      {/* 2. Counters Statistics Section Section */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-50/50 p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-orange-100">
          <div className="pt-4 lg:pt-0">
            <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Utensils className="text-brand-orange" size={26} />
            </div>
            <div className="text-2xl md:text-4xl font-display font-black text-slate-800">
              <Counter value={stats.mealsServed} />
            </div>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1 uppercase tracking-wider block">Meals Served</p>
          </div>

          <div className="pt-4 lg:pt-0 lg:pl-4">
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-yellow-600" size={26} />
            </div>
            <div className="text-2xl md:text-4xl font-display font-black text-slate-800">
              <Counter value={stats.activeVolunteers} suffix="+" />
            </div>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1 uppercase tracking-wider block">Volunteers Active</p>
          </div>

          <div className="pt-6 lg:pt-0 lg:pl-4">
            <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-brand-green" size={26} />
            </div>
            <div className="text-2xl md:text-4xl font-display font-black text-slate-800">
              <Counter value={stats.beneficiariesHelped} suffix="+" />
            </div>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1 uppercase tracking-wider block">Beneficiaries Helped</p>
          </div>

          <div className="pt-6 lg:pt-0 lg:pl-4">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="text-blue-600" size={26} />
            </div>
            <div className="text-2xl md:text-4xl font-display font-black text-slate-800">
              <Counter value={stats.citiesReached} />
            </div>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1 uppercase tracking-wider block">Cities Reached</p>
          </div>
        </div>
      </section>

      {/* 3. Core Call Quote Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-200/40 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-200/40 rounded-full blur-3xl z-0"></div>
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] object-cover">
            <img 
              src={config?.introImage || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800"} 
              alt="Poor child smiling" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Visual banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-6 text-white text-left">
              <p className="text-brand-orange-light font-display text-sm font-bold uppercase tracking-wider mb-1">Every Plate Counts</p>
              <h4 className="text-xl font-bold leading-snug">"Joy begins the exact second you distribute meals to someone who truly hasn't eaten."</h4>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-2 text-brand-orange">
            <span className="w-8 h-[2px] bg-brand-orange"></span>
            <span className="text-sm font-bold uppercase tracking-widest font-display">Who We Are</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
            Nourishing One Hungry Family At a Time Across Surat and Beyond
          </h2>
          <p className="text-slate-600 leading-relaxed font-sans text-base md:text-lg">
            At <strong>Ek Roti Foundation</strong>, we realize that extreme hunger isn't just about food shortage — it ruins human dignity, deprives children of their natural growth, and isolates the elderly. 
          </p>
          <p className="text-slate-600 leading-relaxed font-sans">
            Our teams operate clean central community kitchens that bake nutritious chapatis, boil wholesome dal, and distribution packets directly on highway construction locations, slum belts, and remote outskirts where seasonal migrants commute.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-orange-50 shadow-sm">
              <div className="bg-orange-100 text-brand-orange p-1.5 rounded-lg">
                <Utensils size={18} />
              </div>
              <div>
                <h4 className="text-slate-800 font-bold text-sm">Hygienic Preparation</h4>
                <p className="text-slate-500 text-xs">Meals cooked in RO-water systems under strict cleanliness controls.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-orange-50 shadow-sm">
              <div className="bg-emerald-100 text-emerald-700 p-1.5 rounded-lg">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-slate-800 font-bold text-sm">Targeted Distribution</h4>
                <p className="text-slate-500 text-xs">Direct field tracking to reach widows, orphaned kids, and elders first.</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-orange-light font-bold text-sm tracking-wide group"
            >
              <span>Learn more about our organizational structure</span>
              <MoveRight size={16} className="transform transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Quick Support Cards Grid section */}
      <section className="bg-brand-orange/[0.02] py-20 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-brand-orange mb-3">
            <span className="w-8 h-[2px] bg-brand-orange"></span>
            <span className="text-sm font-bold uppercase tracking-widest font-display">Instant Support tiers</span>
            <span className="w-8 h-[2px] bg-brand-orange"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">
            How Many People Will You Nourish Today?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-12">
            Small amounts feed entire families. Select an option below to initiate a secure transaction simulation instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donationTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`relative bg-white rounded-3xl p-8 shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block text-center ${
                  tier.popular ? "border-brand-orange ring-1 ring-brand-orange/30" : "border-slate-100"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Most Popular Choice
                  </span>
                )}
                
                <h3 className="font-display font-black text-slate-800 text-lg mb-2">Feed {tier.personsFed} Persons</h3>
                <div className="my-6">
                  <span className="text-slate-400 font-sans text-xl align-top">₹</span>
                  <span className="text-5xl font-display font-black text-slate-900 tracking-tight">{tier.amount}</span>
                  <span className="text-slate-400 text-sm italic font-medium block mt-1">One-time donation</span>
                </div>
                
                <p className="text-slate-500 text-xs md:text-sm mb-8 leading-relaxed">
                  {tier.description}
                </p>

                <button
                  onClick={() => handleSupportSelect(tier.amount)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    tier.popular 
                      ? "bg-brand-orange text-white hover:bg-brand-orange/95" 
                      : "bg-slate-50 text-slate-800 hover:bg-brand-orange hover:text-white"
                  }`}
                >
                  Sponsor Meal
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => { setActiveTab("donate"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center space-x-2 border border-slate-300 hover:border-brand-orange bg-white text-slate-700 hover:text-brand-orange font-bold text-sm px-7 py-3 rounded-xl transition-all cursor-pointer"
            >
              <span>Custom Donation Amount</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Heartwarming quote strip */}
      <section className="bg-brand-orange text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-brand-orange-light font-display font-bold uppercase tracking-wide text-xs">Help Indian Poor Families</span>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold italic text-amber-50">
            "You have not lived today until you have done something for someone who can never repay you."
          </h3>
          <p className="text-slate-100 text-sm tracking-widest uppercase font-medium">
            — Ek Roti Foundation ground team
          </p>
        </div>
      </section>
    </div>
  );
}
