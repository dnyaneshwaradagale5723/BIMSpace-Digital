import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video, Eye, X, ExternalLink } from 'lucide-react';
import { GALLERY_ITEMS, MediaItem } from '../data/projectData';

export const MediaWalkthroughGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'render_3d' | 'video_walkthrough' | 'site_photo'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.type === activeFilter);

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="badge-cyan text-xs mb-2">Cinematic Visualization</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            3D Elevation & 4K Video Walkthrough
          </h2>
          <p className="text-sm text-slate-400">
            Photorealistic daylight and twilight ambient renders alongside live aerial drone recordings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setActiveFilter('render_3d')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeFilter === 'render_3d' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Renders
          </button>
          <button
            onClick={() => setActiveFilter('site_photo')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeFilter === 'site_photo' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drone Photos
          </button>
        </div>
      </div>

      {/* Featured Video Walkthrough Player Mock */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 mb-6 group">
        <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Patil Residence 4K Walkthrough Cover"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Central Play Trigger */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 cursor-pointer hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 fill-slate-950 ml-1" />
            </div>
            <span className="mt-4 text-xs md:text-sm font-semibold text-white tracking-wide uppercase bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
              Launch 4K Ultra-HD Architectural Walkthrough (03:45)
            </span>
          </div>

          {/* Video Metadata Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
            <div>
              <span className="badge-gold text-xs mb-1">Lumion 2026 Ray-Traced</span>
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                Patil Residence • Complete Exterior & Interior Immersion
              </h3>
              <p className="text-xs text-slate-300 drop-shadow">
                Sound design with natural ambient acoustics, wind modeling, and sun trajectory simulation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Other Perspectives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="group relative rounded-xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

              <div className="absolute top-2 left-2">
                <span className="badge-cyan text-[10px] py-0.5 px-2 bg-slate-950/80 backdrop-blur-md">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3">
              <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
              {item.date && (
                <div className="mt-2 text-[10px] font-mono text-cyan-400">{item.date}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedMedia.url}
              alt={selectedMedia.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-5 bg-slate-900">
              <span className="badge-cyan text-xs mb-1">{selectedMedia.tag}</span>
              <h3 className="text-xl font-bold text-white">{selectedMedia.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
