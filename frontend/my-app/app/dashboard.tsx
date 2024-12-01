"use client"

import { useEffect, useState } from "react"
import { bounties, Bounty } from "@/lib/data"
import { BountyCard } from "./components/bounty-card"
import { BountyModal } from "./components/bounty-modal"
import { LandingSection } from "./components/landing-section"
import { FreelancerPortfolio } from "./components/freelancer-portfolio"
import { Navbar } from "./components/navbar"

export default function Dashboard() {
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null)
  const [curBounties,setBounties] = useState([]);
  const handleBountyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty)
  }

  const handleCloseModal = () => {
    setSelectedBounty(null)
  }

  const [gigs, setGigs] = useState<any>(bounties); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch data
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:3000/gigs"); // Fetch data from the endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
        }
        const data = await response.json();
        let newData:any = data.gigs
        newData.append(data.gigs)
        setGigs(data.gigs); 
        setLoading(false); 
      } catch (err:any) {
        setError(err.message); // Set error state
        setLoading(false); // Stop loading even on error
      }
    };

    fetchGigs(); // Trigger the fetch function when the component mounts
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <LandingSection />
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Available Bounties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((bounty:any) => (
            <BountyCard
              key={bounty?.id}
              bounty={bounty}
              onClick={() => handleBountyClick(bounty)}
            />
          ))}
        </div>
        <BountyModal
          bounty={selectedBounty}
          isOpen={!!selectedBounty}
          onClose={handleCloseModal}
        />
      </div>
      <FreelancerPortfolio />
    </div>
  )
}

