import React, { useState } from "react";
import { Star, MessageSquareCode, Quote, Heart, Send, CheckCircle } from "lucide-react";
import { Review } from "../types";

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: { name: string; text: string; rating: number }) => Promise<void>;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) {
      alert("Please provide both your name and feedback message.");
      return;
    }
    setSubmitting(true);
    try {
      await onAddReview({ name, text, rating });
      setSuccessMsg("Submitting success! Your helpful comment has been received and will load once approved by our administrators.");
      setName("");
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback. Check your local internet alignments.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-16">
      
      {/* Header section */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Donor Feedback</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Heartwarming Reviews from Supporting Donors
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Read emotional words from generous Indian families, corporate sponsors, and local volunteers who fund Ek Roti Foundation drives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Reviews columns grids */}
        <div className="lg:col-span-8 space-y-6">
          <div className="text-slate-800 text-xs font-extrabold uppercase tracking-widest bg-slate-100 p-2.5 rounded-lg inline-block select-none mb-2">
            Approved Endorsements ({reviews.length})
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((v) => (
              <div 
                key={v.id}
                className="bg-white rounded-3xl p-6.5 border border-slate-100 shadow-md relative hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Large visual quote vector */}
                <Quote size={40} className="absolute top-4 right-4 text-orange-200/40 transform rotate-180 pointer-events-none" />
                
                <div className="space-y-4">
                  {/* Star ratings */}
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < v.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 font-sans text-sm italic leading-relaxed relative z-10">
                    "{v.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-6 mt-4 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-orange-100 flex-shrink-0">
                    <img 
                      src={v.avatar} 
                      alt={v.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 text-sm">{v.name}</h4>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{v.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share your layout feedback form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-orange-150 shadow-xl p-8 space-y-6 sticky top-28">
            <div className="space-y-1">
              <h3 className="font-display font-black text-slate-800 text-xl flex items-center gap-1.5">
                <MessageSquareCode className="text-brand-orange" size={20} />
                <span>Write a Review</span>
              </h3>
              <p className="text-slate-400 text-xs">Share your experience to encourage others to join</p>
            </div>

            {successMsg ? (
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-3">
                <CheckCircle className="text-emerald-700 mx-auto" size={32} />
                <p className="text-slate-700 text-xs font-semibold leading-relaxed">{successMsg}</p>
                <button 
                  onClick={() => setSuccessMsg("")}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Write another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="reviewerName" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Your Name</label>
                  <input 
                    id="reviewerName"
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none"
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Star Rating</label>
                  <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-150 p-2.5 rounded-xl justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="text-slate-300 hover:text-amber-400 transition-colors p-1 cursor-pointer"
                      >
                        <Star 
                          size={24} 
                          className={num <= rating ? "text-amber-500 fill-amber-500 animate-pulse" : "text-slate-200"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="reviewMessage" className="text-slate-700 text-xs font-bold uppercase tracking-wider block">Your Endorsement Feedback</label>
                  <textarea 
                    id="reviewMessage"
                    required
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                    placeholder="Describe how Ek Roti Foundation's on-ground activities felt to you..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5 disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>{submitting ? "Submitting..." : "Submit Review"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
