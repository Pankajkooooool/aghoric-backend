import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Bounty } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"

interface BountyModalProps {
  bounty: Bounty | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BountyModal({ bounty, isOpen, onClose }: BountyModalProps) {
  if (!bounty) return null;

  const [bidAmount, setBidAmount] = useState('');
  const [timeToDeliver, setTimeToDeliver] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleApplyProject = async () => {
    if (!bidAmount || !timeToDeliver) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/apply-for-gig/${bounty._id}`, {
        timeToDeliver,
      });

      // Handle successful application
      if (response.data.status === 'success') {
        setSuccess('Application submitted successfully');
        setBidAmount('');
        setTimeToDeliver('');
        setError('');
      }
    } catch (err) {
      console.error('Error applying for gig:', err);
      setError('There was an error submitting your application');
      setSuccess('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100">{bounty?.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Posted on {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Image
            src={bounty.image}
            alt={bounty.title}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-64"
          />
          <p className="text-gray-300">{bounty.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-100">{bounty.price} {bounty.cryptoType}</span>
            <span className="text-gray-400">Deadline: {bounty.time}</span>
          </div>
          <div>
            
            {/* <h4 className="font-semibold mb-2 text-gray-100">Required Skills:</h4> */}
            {/* <div className="flex flex-wrap gap-2">
              {bounty.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-200">{skill}</Badge>
              ))}
            </div> */}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">
              Close
            </Button>
          </DialogClose>
          <Button onClick={()=>{alert("Applied For Bounty!")
            handleApplyProject()
          }} type="button" variant="default" className="bg-blue-600 text-white hover:bg-blue-500">
            Apply for Bounty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

