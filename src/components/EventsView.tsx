import React, { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle, Ticket, Heart, Send } from "lucide-react";
import { NGOEvent } from "../types";

interface EventsProps {
  events: NGOEvent[];
}

export default function EventsView({ events }: EventsProps) {
  const [bookingEvent, setBookingEvent] = useState<NGOEvent | null>(null);
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleOpenBooking = (event: NGOEvent) => {
    setBookingEvent(event);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vPhone) {
      alert("Name and phone number are required to secure your reservation.");
      return;
    }
    // Simulate booking storage
    setBookingSuccess(true);
    setVName("");
    setVPhone("");
    setTimeout(() => {
      setBookingEvent(null);
      setBookingSuccess(false);
    }, 3500);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-12">
      
      {/* Header section */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Active relief drives</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Upcoming events & camps
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Join, track, and witness seasonal distributions, disaster recovery camps, and high-nutrition drives organised around Gujarat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((evt) => (
          <div 
            key={evt.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Media banner cover */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img 
                  src={evt.image} 
                  alt={evt.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active status bubble pill */}
                <span className={`absolute top-4 left-4 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md ${
                  evt.status === "Upcoming" ? "bg-amber-500 text-white" :
                  evt.status === "Ongoing" ? "bg-emerald-600 text-white animate-pulse" :
                  "bg-slate-500 text-white"
                }`}>
                  {evt.status} Drive
                </span>
                
                {/* Visual time bubble watermark details */}
                <div className="absolute bottom-3 left-4 bg-slate-950/70 p-2.5 rounded-xl backdrop-blur-md flex items-center space-x-2 text-white font-mono text-[10px] font-bold">
                  <Clock size={11} className="text-brand-orange-light" />
                  <span>{evt.time}</span>
                </div>
              </div>

              {/* Text description thali info Card */}
              <div className="p-6 space-y-4 text-left">
                <h3 className="font-display font-bold text-slate-800 text-base leading-snug tracking-tight group-hover:text-brand-orange transition-colors">
                  {evt.title}
                </h3>

                <div className="space-y-1.5">
                  <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Footer listing coordinate metrics */}
            <div className="p-6 border-t border-slate-50 bg-slate-50/40 space-y-4">
              <div className="space-y-2 text-left">
                <p className="text-slate-600 font-sans text-xs flex items-center space-x-2">
                  <Calendar size={12} className="text-brand-orange" />
                  <span className="font-medium">Date Scheduled: <strong className="text-slate-800">{evt.date}</strong></span>
                </p>
                <p className="text-slate-600 font-sans text-xs flex items-start space-x-2">
                  <MapPin size={12} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Venue: <strong className="text-slate-800">{evt.location}</strong></span>
                </p>
              </div>

              {evt.status !== "Completed" ? (
                <button
                  onClick={() => handleOpenBooking(evt)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-brand-orange hover:bg-brand-orange hover:text-white text-slate-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Ticket size={14} />
                  <span>Join as Volunteer</span>
                </button>
              ) : (
                <div className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 py-3.5 bg-slate-100/60 rounded-xl select-none">
                  ✔ Event drive completed successfully
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* TICKET SLOT SELECTION DIALOG BOX OVERLAY */}
      {bookingEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 border border-slate-100 shadow-2xl relative space-y-6">
            
            <button 
              onClick={() => setBookingEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-sans text-xs font-bold"
            >
              Close [X]
            </button>

            {bookingSuccess ? (
              <div className="space-y-4 text-center py-4">
                <CheckCircle className="text-emerald-700 mx-auto stroke-[2.5]" size={42} />
                <h4 className="font-display font-black text-slate-800 text-lg">Duty Slotted Successfully!</h4>
                <p className="text-slate-500 text-xs font-sans leading-relaxed">
                  Wonderful! Your volunteer spot is secured for the <strong>{bookingEvent.title}</strong> drive. Report on-time with your legal convenience aprons.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5 text-left">
                <div className="space-y-1">
                  <span className="text-brand-orange font-extrabold text-[9px] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">Secure Spot slot</span>
                  <h3 className="font-display font-bold text-slate-800 text-base mt-2">{bookingEvent.title}</h3>
                  <p className="text-slate-400 text-xs font-mono">{bookingEvent.date} @ {bookingEvent.time}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-slate-700 text-xs font-bold uppercase block tracking-wider">Your Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      value={vName}
                      onChange={(e)=>setVName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 text-xs font-bold uppercase block tracking-wider">Mobile Contact</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                      value={vPhone}
                      onChange={(e)=>setVPhone(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Send size={12} />
                  <span>Secure Duty Spot</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
