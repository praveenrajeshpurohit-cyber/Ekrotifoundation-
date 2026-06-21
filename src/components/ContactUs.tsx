import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Copy, Check } from "lucide-react";
import { SiteConfig } from "../types";

interface ContactProps {
  config: SiteConfig;
}

export default function ContactUs({ config }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert("All fields are required to route your message seamlessly.");
      return;
    }

    setSubmitting(true);
    // Simulate SMTP network delays
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    setSubmitting(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setTimeout(() => setSuccess(false), 5000);
  };

  // Google Maps Iframe compiled with precise Surat, Gujarat coordinate target
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2687102170327!2d72.8841445!3d21.141673899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0516dd549fd2d%3A0xe212c4cddaecb4b!2sHARE%20KRISHNA%20VILLA!5e0!3m2!1sen!2sin!4v1718800000000!5m2!1sen!2sin";

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-16">
      
      {/* Page Header Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Get in touch</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Connect With Our Desk Offices
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Have food donations, corporate support questions, or NGO tie-ups? Reach out immediately. Our office desk processes responses within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Coordinates Cards columns */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Address */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4 shadow-sm relative group">
            <div className="bg-orange-50 text-brand-orange p-3.5 rounded-2xl flex-shrink-0">
              <MapPin size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1 text-left flex-1 select-all pr-8">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Office Address</span>
              <h4 className="font-display font-bold text-slate-800 text-sm">Main Headquarters Room</h4>
              <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed">
                {config.address}
              </p>
            </div>
            <button 
              onClick={() => handleCopy(config.address, "addr")}
              className="absolute top-6 right-6 text-slate-300 hover:text-brand-orange transition-colors"
              title="Copy Address"
            >
              {copiedField === "addr" ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
            </button>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4 shadow-sm relative group">
            <div className="bg-orange-50 text-brand-orange p-3.5 rounded-2xl flex-shrink-0">
              <Phone size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1 text-left flex-1 select-all pr-8">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Phone Hotlines</span>
              <h4 className="font-display font-bold text-slate-800 text-sm">Direct Support Lines</h4>
              <p className="text-slate-950 font-mono text-base font-extrabold tracking-tight">
                {config.phone}
              </p>
              <p className="text-slate-400 text-[10px]">Calls available from Monday: 09:00 AM - 07:00 PM</p>
            </div>
            <button 
              onClick={() => handleCopy(config.phone, "phone")}
              className="absolute top-6 right-6 text-slate-300 hover:text-brand-orange transition-colors"
              title="Copy Phone"
            >
              {copiedField === "phone" ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
            </button>
          </div>

          {/* Card 3: Mail */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4 shadow-sm relative group">
            <div className="bg-orange-50 text-brand-orange p-3.5 rounded-2xl flex-shrink-0">
              <Mail size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1 text-left flex-1 select-all pr-8 font-sans">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Email Channels</span>
              <h4 className="font-display font-bold text-slate-800 text-sm">Complaints & Accounts support</h4>
              <p className="text-slate-800 text-sm font-semibold break-all">
                {config.email}
              </p>
            </div>
            <button 
              onClick={() => handleCopy(config.email, "email")}
              className="absolute top-6 right-6 text-slate-300 hover:text-brand-orange transition-colors"
              title="Copy Email"
            >
              {copiedField === "email" ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
            </button>
          </div>

        </div>

        {/* Dynamic Support message form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl p-8 space-y-6">
            <div className="space-y-1 border-b border-orange-50 pb-4">
              <h3 className="font-display font-black text-slate-800 text-xl flex items-center gap-2">
                <MessageSquare className="text-brand-orange" size={20} />
                <span>Message Desks Form</span>
              </h3>
              <p className="text-slate-400 text-xs text-left">Your private comments will connect with trustees directly</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle className="text-emerald-700 mx-auto" size={32} />
                <h4 className="font-display font-bold text-slate-800 text-sm">Message routed successfully!</h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  Your inquiry th message has successfully recorded. We have notified our on-duty administrative lead in Surat. We will contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contactName" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Full Name</label>
                    <input 
                      id="contactName"
                      type="text"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. Ramesh Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contactEmail" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Email Address</label>
                    <input 
                      id="contactEmail"
                      type="email"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      placeholder="e.g. ramesh@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contactPhone" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Phone Number</label>
                  <input 
                    id="contactPhone"
                    type="tel"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    placeholder="e.g. +91 99999 99999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contactMessage" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Inquiry Message</label>
                  <textarea 
                    id="contactMessage"
                    required
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                    placeholder="Describe how Ek Roti Foundation can assist or partner with you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-55"
                >
                  <Send size={14} />
                  <span>{submitting ? "Routing..." : "Transmit Message"}</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>

      {/* 4. GOOGLE MAP INTEGRATION GRID FRAME BLOCK */}
      <section className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-slate-400 font-mono text-[10px] font-bold uppercase pl-2">
          <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
          <span>Google Map Satellite Coordinates - Surat, Gujarat</span>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-video max-h-[420px] shadow-inner border border-slate-50 relative bg-slate-100">
          <iframe 
            src={mapUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ek Roti Foundation Office Location Map"
            className="w-full h-full min-h-[300px]"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
