import React from "react";
import { Compass, Flame, ShieldAlert, Award, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteConfig } from "../types";

interface AboutProps {
  config: SiteConfig;
  setActiveTab: (tab: string) => void;
}

export default function About({ config, setActiveTab }: AboutProps) {
  
  const teamMembers = [
    {
      name: "Praveen Rajesh Purohit",
      role: "Founder & Managing Trustee",
      bio: "Dedicated social reformist who left a corporate path in Surat to ensure no immediate neighbor goes to sleep on an empty stomach.",
      image: config?.teamImage1 || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
      linkedin: "#"
    },
    {
      name: "Sunil Verma",
      role: "Operations Coordinator & Kitchen Lead",
      bio: "Oversees resource audits, clean cooking pipelines, and prompt morning highway logistics transitions.",
      image: config?.teamImage2 || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
      linkedin: "#"
    },
    {
      name: "Dr. Ajay Mehta",
      role: "Trustee & Healthcare Adviser",
      bio: "Guides health and vitamin fortify initiatives, coordinating balanced diets for kids and elderly programs.",
      image: config?.teamImage3 || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300",
      linkedin: "#"
    },
    {
      name: "Smt. Priya Patel",
      role: "Community Relations Lead",
      bio: "Maintains close linkages with municipal school staff, rural pradhans, and families to audit genuine hunger hubs.",
      image: config?.teamImage4 || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
      linkedin: "#"
    }
  ];

  const values = [
    {
      title: "Absolute Transparency",
      description: "Every single rupee donated is logged, tracked, and mapped. We maintain open-source registers accessible by any donor.",
      icon: <ShieldCheck className="text-emerald-700" size={24} />,
      bg: "bg-emerald-50"
    },
    {
      title: "Maximum Humility",
      description: "We do not 'feed the poor'; we serve our extended human families. Respect and grace are paramount in our distribution lines.",
      icon: <Heart className="text-brand-orange" size={24} />,
      bg: "bg-orange-50"
    },
    {
      title: "Hygienic Standards",
      description: "Our ingredients undergo multi-step quality washing. Food preparation is strictly standardized to preserve high protein values.",
      icon: <CheckCircle2 className="text-amber-800" size={24} />,
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="py-12 space-y-24">
      
      {/* About Description Block */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2 text-brand-orange">
              <span className="w-8 h-[2px] bg-brand-orange"></span>
              <span className="text-sm font-bold uppercase tracking-widest font-display">Who we are</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
              About Ek Roti Foundation
            </h1>
            
            <p className="text-base md:text-lg text-slate-700 leading-relaxed font-semibold">
              Ek Roti Foundation is one of India's trusted NGOs verified by various organizations. We work for hunger relief, food distribution, emergency support, and helping underprivileged communities.
            </p>
            
            <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base">
              Starting from humble volunteer kitchen tables in Surat, Gujarat, we have expanded our support channels to form an automated daily supply grid. Today, we target roadside wage clusters, slum schools, and neglected retirement communities to eradicate absolute hunger.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button 
                onClick={() => setActiveTab("donate")}
                className="bg-brand-orange text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-brand-orange/95 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Join Our Supporters
              </button>
              <button 
                onClick={() => setActiveTab("contact")}
                className="bg-white border border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Inquire For Partnership
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-brand-orange/10 transform rotate-3 rounded-3xl -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img 
                src={config?.aboutImage || "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800"} 
                alt="Volunteers in deep action cooking" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision Bento Cards */}
      <section className="bg-brand-orange/[0.02] py-16 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-3xl border border-orange-50 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="bg-orange-100 text-brand-orange w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Compass size={24} />
              </div>
              <h3 className="font-display font-black text-slate-800 text-2xl mb-3">Our Dedicated Mission</h3>
              <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base">
                To eliminate hunger and malnutrition among helpless Indian populations by providing daily access to pure, hot, hygienic meals with deep dignity. We build self-sustainable community structures that bridge excess food surplus directly to starvation zones.
              </p>
            </div>
            <div className="text-brand-orange font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5 pt-4">
              <span>● Serving Surat & expanding nation-wide</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-3xl border border-orange-50 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Flame size={24} />
              </div>
              <h3 className="font-display font-black text-slate-800 text-2xl mb-3">Our Shared Vision</h3>
              <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base">
                An India free from starvation, where no daily kid drops school to labor for food, no senior citizen is abandoned to starve in silence, and emergency relief distribution operates with instantaneous, automated, and seamless ground precision.
              </p>
            </div>
            <div className="text-emerald-700 font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5 pt-4">
              <span>● Building a zero-hunger society</span>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Values */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-brand-orange mb-3">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Our Anchoring Ethos</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">Values We Live By</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-12">
          Verified benchmarks guiding our field volunteers, coordinators, and directors daily inside community kitchens.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <div className={`${v.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {v.icon}
              </div>
              <h4 className="font-display font-bold text-slate-800 text-base mb-2">{v.title}</h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Board Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2 text-brand-orange mb-3">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">On Ground Stewardship</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-12 leading-tight">
          Pioneering Leaders & Trustees
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-xl transition-all duration-300">
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2 text-left">
                <h4 className="font-display font-bold text-slate-900 text-base tracking-tight">{member.name}</h4>
                <p className="text-brand-orange font-semibold text-xs uppercase tracking-wider">{member.role}</p>
                <div className="w-8 h-[2px] bg-slate-200 my-2"></div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
