import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bounty } from "@/lib/data"

interface BountyCardProps {
  bounty: Bounty;
  onClick: () => void;
}

export function BountyCard({ bounty, onClick }: BountyCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 overflow-hidden" onClick={onClick}>
      <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-600"></div>
      <CardHeader>
        <CardTitle className="text-gray-100">{bounty.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{bounty?.description?.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-100">{bounty?.price} {bounty.cryptoType}</span>
          <span className="text-sm text-gray-400">Deadline: {bounty?.time}</span>
        </div>
      </CardContent>
      <CardFooter>
        {/* <div className="flex flex-wrap gap-2">
          {bounty.skills.map((skill:any) => (
            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-200">{skill}</Badge>
          ))}
        </div> */}
      </CardFooter>
    </Card>
  )
}

