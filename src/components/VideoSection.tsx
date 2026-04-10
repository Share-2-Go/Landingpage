import React from 'react';
import { Play } from 'lucide-react';

export function VideoSection() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Guarda come funziona in 2 minuti</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-xl group cursor-pointer">
            {/* Placeholder Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
            
            {/* Fake UI elements to look like a video player */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-primary" />
              </div>
              <div className="flex justify-between items-center mt-2 text-white text-sm font-medium">
                <span>0:42 / 2:00</span>
                <span>Share2Go Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
