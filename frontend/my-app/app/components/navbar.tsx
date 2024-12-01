"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, User } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const navItems = [
  { name: "Find Work", href: "/find-work" },
  { name: "Find Talent", href: "/find-talent" },
  { name: "Community", href: "/community" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="sr-only">DeFree Logo</span>
              <div className="h-8 w-8 bg-pink-600 rounded-full" aria-hidden="true" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      pathname === item.href
                        ? "bg-pink-800 text-white"
                        : "text-gray-300 hover:bg-pink-700 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-pink-700 hover:text-white"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 text-gray-300 hover:bg-pink-700 hover:text-white">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-gray-100" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-pink-700">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-pink-700">Dashboard</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-pink-700">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-pink-700">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="ml-4 bg-pink-600 hover:bg-pink-700 text-white">Find a Job</Button>
            </div>
          </div>
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-pink-700 hover:text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100">
                <DialogHeader>
                  <DialogTitle>Menu</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Navigate through our decentralized freelance marketplace.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-pink-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">Post a Job</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  )
}

