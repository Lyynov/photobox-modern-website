import Link from "next/link"
import { Camera } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Camera className="h-5 w-5 text-primary" />
            <span>PhotoBox Studio</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} PhotoBox Studio. Semua hak dilindungi.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Beranda
          </Link>
          <Link href="/#gallery" className="text-sm text-muted-foreground hover:text-foreground">
            Template
          </Link>
          <Link href="/capture" className="text-sm text-muted-foreground hover:text-foreground">
            Ambil Foto
          </Link>
        </div>
      </div>
    </footer>
  )
}
