"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Camera, Printer, RefreshCw, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { templates } from "@/lib/templates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function CapturePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(1)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Get template from URL or use default
  useEffect(() => {
    const templateId = searchParams.get("template")
    if (templateId) {
      setSelectedTemplateId(Number.parseInt(templateId))
    }
  }, [searchParams])

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsCameraActive(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        toast({
          title: "Kamera tidak tersedia",
          description: "Pastikan browser Anda memiliki akses ke kamera laptop.",
          variant: "destructive",
        })
      }
    }

    startCamera()

    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        setIsCameraActive(false)
      }
    }
  }, [toast])

  const capturePhoto = () => {
    // Start countdown
    setCountdown(3)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          takeSnapshot()
          return null
        }
        return prev ? prev - 1 : null
      })
    }, 1000)
  }

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/png")
        setCapturedImage(imageDataUrl)
      }
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
  }

  const downloadImage = () => {
    if (!capturedImage) return

    const link = document.createElement("a")
    link.href = capturedImage
    link.download = `photobox-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Berhasil diunduh!",
      description: "Foto photobox telah disimpan ke perangkat Anda.",
    })
  }

  const printImage = () => {
    if (!capturedImage) return

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print PhotoBox</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; }
              img { max-width: 100%; height: auto; }
              @media print {
                @page { size: auto; margin: 0mm; }
              }
            </style>
          </head>
          <body>
            <img src="${capturedImage}" />
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // Get the selected template
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Ambil Foto Photobox</h1>

        <Tabs defaultValue="camera" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera">Kamera</TabsTrigger>
            <TabsTrigger value="template" disabled={!isCameraActive}>
              Template
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="mt-4">
            <div className="bg-card rounded-xl p-4 shadow-md">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Kamera Photobox</h2>
                <p className="text-sm text-muted-foreground">
                  Posisikan diri Anda di depan kamera dan klik tombol ambil foto
                </p>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-4">
                {!capturedImage ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    {countdown !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-white text-7xl font-bold animate-pulse">{countdown}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none border-4 border-dashed border-white/30 m-4 rounded"></div>
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={capturedImage || "/placeholder.svg"}
                      alt="Captured photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex justify-center gap-4">
                {!capturedImage ? (
                  <Button size="lg" onClick={capturePhoto} disabled={!isCameraActive || countdown !== null}>
                    <Camera className="mr-2 h-5 w-5" />
                    Ambil Foto
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="lg" onClick={resetCapture}>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Ambil Ulang
                    </Button>
                    <Button size="lg" onClick={downloadImage}>
                      <Save className="mr-2 h-5 w-5" />
                      Simpan Foto
                    </Button>
                    <Button variant="secondary" size="lg" onClick={printImage}>
                      <Printer className="mr-2 h-5 w-5" />
                      Cetak
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="mt-4">
            <div className="bg-card rounded-xl p-4 shadow-md">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Pilih Template</h2>
                <p className="text-sm text-muted-foreground">Pilih template photobox yang ingin digunakan</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      selectedTemplateId === template.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                    }`}
                    onClick={() => setSelectedTemplateId(template.id)}
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                      {selectedTemplateId === template.id && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-center">
                      <p className="text-xs font-medium truncate">{template.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Petunjuk Penggunaan</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Pastikan Anda berada di ruangan dengan pencahayaan yang baik</li>
            <li>Posisikan wajah Anda di tengah frame kamera</li>
            <li>Pilih template photobox yang diinginkan</li>
            <li>Klik tombol "Ambil Foto" dan tunggu hitungan mundur</li>
            <li>Setelah foto diambil, Anda dapat menyimpan atau mencetak hasilnya</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
