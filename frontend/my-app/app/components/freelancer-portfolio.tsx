"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const performanceData = [
  { name: "Completed", value: 75 },
  { name: "In Progress", value: 15 },
  { name: "Cancelled", value: 10 },
]

const COLORS = ["#8B5CF6", "#EC4899", "#6B7280"]

export function FreelancerPortfolio() {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Freelancer Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Performance Overview</h3>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Stats</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Total Projects:</span>
                <span className="font-bold">42</span>
              </li>
              <li className="flex justify-between">
                <span>Completed Projects:</span>
                <span className="font-bold">32</span>
              </li>
              <li className="flex justify-between">
                <span>In Progress:</span>
                <span className="font-bold">6</span>
              </li>
              <li className="flex justify-between">
                <span>Cancelled:</span>
                <span className="font-bold">4</span>
              </li>
              <li className="flex justify-between">
                <span>Average Rating:</span>
                <span className="font-bold">4.8/5.0</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

