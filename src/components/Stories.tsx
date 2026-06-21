import React, { useState, useMemo } from "react";
import { Search, Calendar, MapPin, Tag, HeartHandshake, Eye, Sparkles, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { ImpactStory } from "../types";

interface StoriesProps {
  stories: ImpactStory[];
}

export default function Stories({ stories }: StoriesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 9 stories per page to keep it beautifully clean

  const categories = ["All", "Disaster Relief", "Daily Feeding", "Festival Camp", "Elderly Support", "Children Wellness"];

  // Filter and search
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
      const matchesKeyword = 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesKeyword;
    });
  }, [stories, selectedCategory, searchTerm]);

  // Handle page resets on filters toggling
  const resetPageAndCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Paginated elements
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage) || 1;
  const paginatedStories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStories, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to stories grid container anchor
      const element = document.getElementById("stories-grid-top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-12">
      
      {/* Page Header Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-brand-orange">
          <span className="w-8 h-[2px] bg-brand-orange"></span>
          <span className="text-sm font-bold uppercase tracking-widest font-display">100 Impact Narratives</span>
          <span className="w-8 h-[2px] bg-brand-orange"></span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Lives Changed Globally
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Read any of our 100 historical on-ground reports mapping flood recovery, seasonal feeding camps, highway kitchens, and elderly shelter supports.
        </p>
      </div>

      {/* Filter and search bar layout */}
      <div className="bg-white p-6 rounded-3xl border border-orange-50 shadow-md space-y-4 flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0 gap-4">
        
        {/* Search Search input input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </span>
          <input 
            type="text"
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
            placeholder="Search stories by town, city, description..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Categories Pills scrollable bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
          <div className="flex-shrink-0 text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 pr-2">
            <Filter size={12} className="text-brand-orange" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => resetPageAndCategory(cat)}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer flex-shrink-0 ${
                selectedCategory === cat 
                  ? "bg-brand-orange text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      <div id="stories-grid-top" className="hidden"></div>

      {/* Grid listing */}
      {paginatedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Story header/image */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category label */}
                  <span className="absolute top-4 left-4 bg-brand-orange/95 text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                    {story.category}
                  </span>
                  
                  {/* Map / Date banner overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-4 flex justify-between text-white text-[10px] font-bold">
                    <span className="flex items-center space-x-1"><MapPin size={10} className="text-orange-300" /><span>{story.location}</span></span>
                    <span className="flex items-center space-x-1"><Calendar size={10} className="text-orange-300" /><span>{story.date}</span></span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-bold text-slate-800 text-lg leading-tight tracking-tight group-hover:text-brand-orange transition-colors">
                      {story.title}
                    </h3>
                    <span className="bg-slate-100 border border-slate-150 text-slate-500 font-extrabold text-[9px] px-2.5 py-1 rounded-md flex-shrink-0">
                      #{story.id}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 font-sans text-xs md:text-sm leading-relaxed line-clamp-4">
                    {story.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Metric block */}
              <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <span className="flex items-center space-x-1.5 text-xs font-semibold text-brand-green">
                  <HeartHandshake size={14} className="text-brand-green" />
                  <span>{story.impact}</span>
                </span>
                
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Verified Report
                </span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm font-medium">No impact stories matched your search filters. Try typing another city name or category.</p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex space-x-1.5 text-xs font-bold text-slate-700">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              // Only display first few, current, and last pages to keep neat
              if (
                pageNum === 1 || 
                pageNum === totalPages || 
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl transition-colors cursor-pointer ${
                      currentPage === pageNum 
                        ? "bg-brand-orange text-white" 
                        : "bg-white border border-slate-200 hover:bg-slate-100 animate-pulse-short"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === 2 || 
                pageNum === totalPages - 1
              ) {
                return <span key={pageNum} className="w-9 h-9 flex items-center justify-center text-slate-400 text-[10px]">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
