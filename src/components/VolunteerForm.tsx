import React, { useState } from "react";
import { UserCheck, Phone, Mail, Building, Send, Heart, Calendar, Clock, Smile, Sparkles } from "lucide-react";
import { SiteConfig } from "../types";

interface VolunteerFormProps {
  config: SiteConfig;
  onRegisterVolunteer: (volunteer: { fullName: string; phone: string; email: string; city: string; message: string }) => Promise<void>;
}

export default function VolunteerForm({ config, onRegisterVolunteer }: VolunteerFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !city) {
      alert("Please execute all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await onRegisterVolunteer({ fullName, phone, email, city, message });
      setSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setCity("");
      setMessage("");
    } catch (e) {
      console.error(e);
      alert("Failed to submit subscription request. Connect with us via WhatsApp on our sticky footer.");
    } finally {
      setSubmitting(false);
    }
  };

  const activities = [
    {
      title: "Central Kitchen Packing",
      hours: "Morning: 04:30 AM - 08:30 AM",
      desc: "Roll fresh wheat rotis, assist cooks, pack hot thermal boxes, and label relief hampers under hygienic supervisions.",
      badge: "Urgent need",
      icon: <Clock className="text-orange-600" size={20} />
    },
    {
      title: "Mobile Van Food Distribution",
      hours: "Day hours: 10:30 AM - 02:30 PM",
      desc: "Drive or join distribution vehicles around highway intersections, municipal slums, and rickshaw terminals to pass hot plates respectfully.",
      badge: "Highly rewarding",
      icon: <Smile className="text-emerald-700" size={20} />
    },
    {
      title: "Emergency Disaster Response",
      hours: "Active when monsoon disasters occur",
      desc: "Assemble instantly when Surat faces torrential flooding, prepare high-energy ration kits, and assist local rescue personnel with operations.",
      badge: "On-call response",
      icon: <Sparkles className="text-yellow-700" size={20} />
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-16">
      
      {/* Header section */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Give back to society</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Become a Field Volunteer
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Join a family of 350+ active volunteers who manage ground logistics, kitchen rolls, and respectful distributions across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Supporting activities block listings */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h3 className="font-display font-black text-slate-800 text-2xl">
              Active Volunteer Rotations & schedules
            </h3>
            <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
              We operate three major service divisions. You can choose any rotation matching your academic schedules, weekly holidays, or personal preference.
            </p>
          </div>

          <div className="space-y-6">
            {activities.map((act, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative flex flex-col sm:flex-row gap-5 items-start hover:shadow-md transition-shadow"
              >
                <div className="bg-orange-50 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                  {act.icon}
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-display font-bold text-slate-800 text-sm">{act.title}</h4>
                    <span className="bg-orange-100/60 text-brand-orange text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {act.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5 font-bold uppercase">
                    <Calendar size={12} className="text-brand-orange" />
                    <span>Rotation: {act.hours}</span>
                  </p>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6 flex items-start gap-4">
            <Heart size={20} className="text-brand-orange fill-current stroke-[2] flex-shrink-0 animate-pulse mt-0.5" />
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              *NOTE: There is absolutely no registration fee. We provide clean aprons, hand sanitizer bundles, face masks, and a travel volunteer convenience card. Certificates are issued upon completing 48 aggregate kitchen shifts.
            </p>
          </div>
        </div>

        {/* Form panel sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-black text-slate-800 text-xl flex items-center gap-2">
                <UserCheck className="text-brand-orange" size={22} />
                <span>Volunteer Registration</span>
              </h3>
              <p className="text-slate-400 text-xs text-left">Provide accurate phone contacts to connect with managers</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6.5 rounded-2xl space-y-4 text-center">
                <Smile className="text-emerald-700 mx-auto" size={42} />
                <h4 className="font-display font-bold text-slate-800 text-base">Congratulations!</h4>
                <p className="text-slate-700 text-xs font-medium leading-relaxed">
                  Congratulations! You are officially registered as a pending volunteer. Our local field supervisor will reach you on Whatsapp within 36 hours.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Register Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
                
                {/* Full name */}
                <div className="space-y-1">
                  <label htmlFor="volunteerFullName" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <UserCheck size={16} />
                    </span>
                    <input 
                      id="volunteerFullName"
                      type="text"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. Ramesh Patil"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label htmlFor="volunteerPhone" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Mobile Number (WhatsApp preferred)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone size={16} />
                    </span>
                    <input 
                      id="volunteerPhone"
                      type="tel"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. +91 95103 66694"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="volunteerEmail" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input 
                      id="volunteerEmail"
                      type="email"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
                      placeholder="ramesh@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label htmlFor="volunteerCity" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Your City</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building size={16} />
                    </span>
                    <input 
                      id="volunteerCity"
                      type="text"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. Surat, Gujarat"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="volunteerMsg" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Brief Statement of Intent (Optional)</label>
                  <textarea 
                    id="volunteerMsg"
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                    placeholder="Tell us what draws you to join the Ek Roti Foundation team..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{submitting ? "Joining..." : "Join Us"}</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
