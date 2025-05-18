export interface Template {
  id: number
  name: string
  description: string
  thumbnail: string
}

export const templates: Template[] = [
  {
    id: 1,
    name: "Klasik",
    description: "Template photobox klasik dengan bingkai sederhana",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Vintage",
    description: "Tampilan retro dengan efek film klasik",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Modern",
    description: "Desain minimalis dengan aksen geometris",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Ulang Tahun",
    description: "Bingkai spesial untuk perayaan ulang tahun",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    name: "Pernikahan",
    description: "Template elegan untuk momen pernikahan",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    name: "Liburan",
    description: "Tema liburan dengan ornamen musim panas",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    name: "Profesional",
    description: "Tampilan formal untuk foto profil profesional",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    name: "Kartun",
    description: "Bingkai lucu dengan karakter kartun",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
]
