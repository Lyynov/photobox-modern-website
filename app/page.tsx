"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Camera, Download, ImageIcon, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { templates } from "@/lib/templates"
import TemplateGallery from "@/components/template-gallery"

export default function Home() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id)
    router.push(`/capture?template=${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">PhotoBox Studio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pilih template, ambil foto dengan kamera laptop Anda, dan dapatkan hasil photobox yang menakjubkan dalam
          sekejap.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <ImageIcon className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">Pilih Template</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Pilih dari berbagai template photobox yang menarik untuk momen spesial Anda.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            Lihat Template
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Camera className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">Ambil Foto</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Gunakan kamera laptop Anda untuk mengambil foto langsung di browser.
          </p>
          <Button
            variant="outline"
            className="w-full"
            disabled={selectedTemplate === null}
            onClick={() => router.push("/capture")}
          >
            Mulai Kamera
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold">1</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Pilih Template</h3>
          <p className="text-sm text-muted-foreground">Pilih template photobox favorit Anda dari galeri kami.</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold">2</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Ambil Foto</h3>
          <p className="text-sm text-muted-foreground">Gunakan kamera laptop untuk mengambil foto terbaik Anda.</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold">3</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Unduh & Cetak</h3>
          <p className="text-sm text-muted-foreground">Unduh hasil photobox atau cetak langsung dari browser.</p>
        </div>
      </motion.div>

      <motion.div
        id="gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Galeri Template</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih template yang sesuai dengan gaya dan momen Anda
          </p>
        </div>

        <TemplateGallery templates={templates} onSelect={handleTemplateSelect} />
      </motion.div>

      <div className="text-center mt-16 mb-8">
        <h2 className="text-3xl font-bold mb-4">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Berbagai Template</h3>
            <p className="text-sm text-muted-foreground">Pilihan template photobox yang beragam dan menarik</p>
          </div>

          <div className="p-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Integrasi Kamera</h3>
            <p className="text-sm text-muted-foreground">Gunakan kamera laptop untuk mengambil foto secara langsung</p>
          </div>

          <div className="p-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Printer className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Cetak Langsung</h3>
            <p className="text-sm text-muted-foreground">Cetak hasil photobox langsung dari browser</p>
          </div>

          <div className="p-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Unduh Hasil</h3>
            <p className="text-sm text-muted-foreground">
              Simpan hasil photobox dalam format gambar berkualitas tinggi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
