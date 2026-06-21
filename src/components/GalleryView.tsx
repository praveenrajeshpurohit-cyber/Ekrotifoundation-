import React, { useState } from "react";
import { Maximize2, Tag, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { GalleryItem } from "../types";

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function GalleryView({ gallery }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = ["All", "Kids", "Distribution", "Kitchen", "Elderly", "Volunteers"];

  const filteredItems = gallery.filter((item) => {
    return activeFilter === "All" || item.category === activeFilter;
  });

  const handleOpenLightbox = (itemId: number) => {
    const idx = filteredItems.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-12">
      
      {/* Header section */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">Service moments</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Visual Memories of Service
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Browse raw, authentic moments of joy, devotion, and hard work captured at our central kitchens and relief shelters.
        </p>
      </div>

      {/* Filter items pilled bar */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-orange-50 pb-6 max-w-2xl mx-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === filter 
                ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" 
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter === "All" ? "Show All Galleries" : filter}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleOpenLightbox(item.id)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-xl transition-all duration-300 cursor-pointer relative"
            >
              {/* Image container */}
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details appearing on hover */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 text-slate-800 p-3 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 size={16} className="text-brand-orange stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Text details Card */}
              <div className="p-5.5 space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="bg-orange-50 border border-orange-100/50 text-brand-orange text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-slate-300 font-mono text-[10px]">Photo #{item.id}</span>
                </div>
                
                <h4 className="font-display font-bold text-slate-800 text-sm tracking-tight group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-slate-500 font-sans text-xs line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl">
          <p className="text-slate-400 text-sm">No pictures currently linked to this category filter.</p>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODE MODAL OVERLAY */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fadeIn">
          
          {/* Header Close button */}
          <div className="flex justify-between items-center text-white pb-4 border-b border-white/10">
            <div className="text-left">
              <span className="bg-brand-orange text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-display font-bold text-base mt-1 tracking-tight text-slate-100">{filteredItems[lightboxIndex].title}</h3>
            </div>
            <button 
              onClick={handleClose}
              className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Media Stage */}
          <div className="flex-1 flex items-center justify-between gap-4 max-h-[70vh] my-auto">
            {/* Prev button */}
            <button 
              onClick={handlePrev}
              className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Visual Screen frame wrapper */}
            <div className="max-w-4xl max-h-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={filteredItems[lightboxIndex].url} 
                alt={filteredItems[lightboxIndex].title} 
                className="w-full h-full object-contain max-h-[65vh]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next button */}
            <button 
              onClick={handleNext}
              className="bg-white/10 hover:bg-white/20 p-3.5 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Next gallery image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Description banner text footer description */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left text-slate-300 text-xs md:text-sm font-sans max-w-3xl mx-auto space-y-1 w-full">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Historical distribution details log:</p>
            <p className="leading-relaxed">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
