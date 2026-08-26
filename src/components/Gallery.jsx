import React, { useState, useEffect, useRef } from 'react';



const galleryData = [
  { id: 1, title: "Classroom Session", category: "Classroom", src: "/Classroom.jpeg" },
  { id: 2, title: "Annual Function", category: "Events", src: "/Functions.jpeg" },
  { id: 3, title: "Topper Felicitation", category: "Achievements", src: "/Topperpicture.jpeg" },
  { id: 4, title: "Weekly Test", category: "Classroom", src: "/Weeklytest.jpeg" },
  { id: 5, title: "Annual Function", category: "Events", src: "/Functions1.jpeg" },
  { id: 6, title: "Prize Distribution", category: "Achievements", src: "/Medal.jpeg" },
  { id: 7, title: "Prize Distribution", category: "Achievements", src: "/Medal2.jpeg" },
  { id: 8, title: "Prize Distribution", category: "Achievements", src: "/Medal3.jpeg" },
  { id: 9, title: "Prize Distribution", category: "Achievements", src: "/Medal4.jpeg" },
  { id: 10, title: "Class 10th batch", category: "Batches", src: "/Class10bactch.jpeg" },
  { id: 11, title: "batch 1", category: "Batches", src: "/batch1.jpeg" },
  { id: 12, title: "batch 2", category: "Batches", src: "/Batch2.jpeg" },
  { id: 13, title: "batch 3", category: "Batches", src: "/batch3.jpeg" },
  { id: 14, title: "batch 4", category: "Batches", src: "/batch4.jpeg" },
  // Nayi photos aane par bas yahan naya object jodna hai
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const thumbnailContainerRef = useRef(null);

  const categories = ['All', 'Classroom', 'Events', 'Achievements', "Batches"];

  // Filter photos
  const filteredPhotos = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  const activePhoto = filteredPhotos[activeIndex] || filteredPhotos[0];

  // Auto-Play Timer (4 seconds)
  useEffect(() => {
    if (isPaused || filteredPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, filteredPhotos.length]);

  // Thumbnail auto-scroll on active change
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[activeIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeIndex]);

  // Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
    }
    if (distance < -50) {
      setActiveIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
  };

  return (
    <section className="py-8 sm:py-16 px-3 sm:px-6 max-w-5xl mx-auto font-sans select-none">
      {/* Section Header */}
      <div className="text-center sm:text-left mb-6">
        <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-2">
          Campus Life & Moments
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Institute Activities & Gallery
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
          Hamare batches, smart classrooms aur events ki ek jhalak.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="space-y-3">
          {/* Main Visual Showcase (Tall on Mobile) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50"
          >
            {/* Main Clean Image */}
            <img
              key={activePhoto.id}
              src={activePhoto.src}
              alt={activePhoto.title}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Top Animated Progress Indicators */}
            <div className="absolute top-4 left-4 right-4 flex items-center gap-1.5 z-20">
              {filteredPhotos.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="h-1.5 flex-1 rounded-full bg-black/25 overflow-hidden backdrop-blur-sm cursor-pointer"
                >
                  <div
                    className={`h-full bg-white transition-all ${
                      idx === activeIndex
                        ? 'w-full duration-[4000ms] ease-linear'
                        : idx < activeIndex
                        ? 'w-full duration-0'
                        : 'w-0 duration-0'
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Subtle Bottom Gradient for Text Contrast */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 max-w-[80%]">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                  {activePhoto.category}
                </span>
                <p className="text-sm sm:text-base font-bold text-gray-900 truncate mt-0.5">
                  {activePhoto.title}
                </p>
              </div>

              {/* Counter */}
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10">
                {activeIndex + 1}/{filteredPhotos.length}
              </span>
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl items-center justify-center transition cursor-pointer"
            >
              ❮
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % filteredPhotos.length)}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl items-center justify-center transition cursor-pointer"
            >
              ❯
            </button>
          </div>

          {/* Filmstrip Mini Thumbnails */}
          <div
            ref={thumbnailContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto py-2 scrollbar-none scroll-smooth"
          >
            {filteredPhotos.map((item, index) => {
              const isCurrent = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 3000);
                  }}
                  className={`relative flex-shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                    isCurrent
                      ? 'border-blue-600 ring-2 ring-blue-200 scale-105 opacity-100 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 text-sm">
          No photos available.
        </div>
      )}
    </section>
  );
};

export default Gallery;