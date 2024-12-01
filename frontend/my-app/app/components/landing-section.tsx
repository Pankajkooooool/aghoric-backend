import { Button } from "@/components/ui/button"
import { useRef } from "react";

export function LandingSection() {
  const scrollableRef = useRef(null); 

  const scrollToPosition = (position:any) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        top: position, // Position to scroll to
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };
  return (
    <section className="py-20 px-4 text-center relative overflow-hidden">
      {/* Background vector elements */}
      <div className="absolute inset-0 z-0"  ref={scrollableRef}>
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" opacity="0.1" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 bottom-0 h-64 w-64 transform translate-x-1/3 translate-y-1/3" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad2)" strokeWidth="0.5" opacity="0.2" />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Unlock Your Potential in the Web3 World
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover high-paying blockchain projects, showcase your skills, and connect with innovative teams. Your next big opportunity is just a click away.
        </p>
        <Button onClick={()=>{scrollToPosition(200)}} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg">
          Start Earning Now
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-4 top-1/4 w-12 h-12 border-2 border-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute right-8 bottom-1/3 w-8 h-8 bg-pink-500 rounded-full opacity-20 animate-ping"></div>
    </section>
  )
}

