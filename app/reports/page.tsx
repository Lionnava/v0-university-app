"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, FileDown, Printer, Eye, FileText, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { ReportPreview } from "@/components/reports/report-preview"
import { DocumentEditor } from "@/components/reports/document-editor"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("reportes")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewData, setPreviewData] = useState({
    title: "",
    type: "",
    format: "pdf",
  })

  const handlePreview = (title: string, type: string, format = "pdf") => {
    setPreviewData({ title, type, format })
    setPreviewOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Reportes y Documentos</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="reportes" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="reportes">Reportes Generales</TabsTrigger>
            <TabsTrigger value="constancias">Constancias y Cartas</TabsTrigger>
            <TabsTrigger value="editor">Editor de Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="reportes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Listado de Estudiantes"
                description="Genera un listado completo de estudiantes activos en el sistema."
                options={[
                  { label: "Todos los estudiantes", value: "all" },
                  { label: "Por carrera", value: "career" },
                  { label: "Por estado", value: "status" },
                ]}
                formats={["pdf", "excel", "doc"]}
                onPreview={handlePreview}
              />

              <ReportCard
                title="Acta de Notas"
                description="Genera el acta de notas por materia y sección."
                options={[
                  { label: "Por materia", value: "subject" },
                  { label: "Por sección", value: "section" },
                  { label: "Por profesor", value: "professor" },
                ]}
                formats={["pdf", "excel"]}
                onPreview={handlePreview}
              />

              <ReportCard
                title="Constancia de Estudios"
                description="Genera constancias de estudio para estudiantes activos."
                options={[
                  { label: "Constancia simple", value: "simple" },
                  { label: "Con carga académica", value: "academic" },
                  { label: "Con notas", value: "grades" },
                ]}
                formats={["pdf", "doc"]}
                onPreview={handlePreview}
              />

              <ReportCard
                title="Estadísticas de Rendimiento"
                description="Genera reportes estadísticos de rendimiento académico."
                options={[
                  { label: "Por materia", value: "subject" },
                  { label: "Por carrera", value: "career" },
                  { label: "Por período", value: "period" },
                ]}
                formats={["pdf", "excel"]}
                onPreview={handlePreview}
              />

              <ReportCard
                title="Horarios"
                description="Genera horarios de clases por sección, profesor o aula."
                options={[
                  { label: "Por sección", value: "section" },
                  { label: "Por profesor", value: "professor" },
                  { label: "Por aula", value: "classroom" },
                ]}
                formats={["pdf", "excel"]}
                onPreview={handlePreview}
              />

              <ReportCard
                title="Censo Estudiantil"
                description="Genera reportes estadísticos del censo estudiantil."
                options={[
                  { label: "Distribución por carrera", value: "career" },
                  { label: "Distribución por género", value: "gender" },
                  { label: "Distribución por edad", value: "age" },
                ]}
                formats={["pdf", "excel"]}
                onPreview={handlePreview}
              />
            </div>
          </TabsContent>

          <TabsContent value="constancias">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocumentCard
                title="Constancia de Estudios"
                description="Genera constancias de estudio para estudiantes activos."
                icon={<FileText className="h-12 w-12 text-blue-600" />}
                link="/reports/documents/certificate"
              />

              <DocumentCard
                title="Constancia de Notas"
                description="Genera constancias de notas para estudiantes."
                icon={<FileText className="h-12 w-12 text-green-600" />}
                link="/reports/documents/grades"
              />

              <DocumentCard
                title="Carta de Recomendación"
                description="Genera cartas de recomendación para estudiantes."
                icon={<FileText className="h-12 w-12 text-purple-600" />}
                link="/reports/documents/recommendation"
              />

              <DocumentCard
                title="Constancia de Culminación"
                description="Genera constancias de culminación de estudios."
                icon={<FileText className="h-12 w-12 text-amber-600" />}
                link="/reports/documents/graduation"
              />

              <DocumentCard
                title="Carga Académica"
                description="Genera constancias de carga académica para estudiantes."
                icon={<FileText className="h-12 w-12 text-red-600" />}
                link="/reports/documents/schedule"
              />

              <DocumentCard
                title="Solicitud de Equivalencia"
                description="Genera solicitudes de equivalencia de materias."
                icon={<FileText className="h-12 w-12 text-teal-600" />}
                link="/reports/documents/transfer"
              />
            </div>
          </TabsContent>

          <TabsContent value="editor">
            <DocumentEditor />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          Sistema de Gestión Universitaria © {new Date().getFullYear()}
        </div>
      </footer>

      {previewOpen && (
        <ReportPreview
          title={previewData.title}
          type={previewData.type}
          format={previewData.format}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  )
}

// ReportCard component definition
function ReportCard({ title, description, options, formats, onPreview }) {
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const handlePreview = () => {
    if (selectedOption) {
      onPreview(title, selectedOption, selectedFormat)
    }
  }

  const getFormatIcon = (format) => {
    switch (format) {
      case "pdf":
        return <FilePdf className="h-4 w-4" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />
      case "doc":
        return <FileText className="h-4 w-4" />
      default:
        return <FileDown className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="space-y-4">
          <div>
            <Select onValueChange={setSelectedOption}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedOption && (
            <div>
              <label className="text-sm font-medium block mb-2">Formato de exportación</label>
              <div className="flex space-x-2 mb-4">
                {formats.map((format) => (
                  <Button
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(format)}
                    className="flex-1"
                  >
                    {getFormatIcon(format)}
                    <span className="ml-2 uppercase">{format}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button disabled={!selectedOption} className="w-full" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" disabled={!selectedOption}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" disabled={!selectedOption}>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// DocumentCard component definition
function DocumentCard({ title, description, icon, link }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Link href={link} className="w-full">
            <Button className="w-full mt-2">Generar Documento</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

