"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Template } from "@/lib/templates"

interface TemplateGalleryProps {
  templates: Template[]
  onSelect: (id: number) => void
}

export default function TemplateGallery({ templates, onSelect }: TemplateGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleSelect = (id: number) => {
    setSelectedId(id)
    onSelect(id)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className={`relative rounded-xl overflow-hidden border-2 transition-all ${
            selectedId === template.id ? "border-primary ring-2 ring-primary/20" : "border-border"
          }`}
        >
          <div className="aspect-[3/4] relative">
            <Image src={template.thumbnail || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
            {selectedId === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium mb-1">{template.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
            <Button
              size="sm"
              variant={selectedId === template.id ? "default" : "outline"}
              className="w-full"
              onClick={() => handleSelect(template.id)}
            >
              {selectedId === template.id ? "Terpilih" : "Pilih Template"}
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
