"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">PhotoBox</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/#gallery"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/#gallery" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Template
          </Link>
          <Link
            href="/capture"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/capture" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Ambil Foto
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/capture">
            <Button size="sm" className="hidden md:flex">
              <Camera className="mr-2 h-4 w-4" />
              Mulai Foto
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
