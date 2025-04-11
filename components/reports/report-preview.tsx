"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Printer, X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"

type ReportPreviewProps = {
  title: string
  type: string
  format: string
  onClose: () => void
}

export function ReportPreview({ title, type, format, onClose }: ReportPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3) // Simulación de múltiples páginas
  const [zoom, setZoom] = useState(100)
  const [activeTab, setActiveTab] = useState("preview")

  // Función para generar contenido de ejemplo basado en el tipo de reporte
  const getPreviewContent = () => {
    switch (type) {
      case "all":
        return (
          <div className="p-8 bg-white shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">Listado de Estudiantes</h1>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                <strong>Fecha:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Período:</strong> 2023 - Trimestre III
              </p>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Nombre</th>
                  <th className="border p-2 text-left">Cédula</th>
                  <th className="border p-2 text-left">Carrera</th>
                  <th className="border p-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border p-2">EST-{(i + 1).toString().padStart(3, "0")}</td>
                    <td className="border p-2">Estudiante Ejemplo {i + 1}</td>
                    <td className="border p-2">V-{Math.floor(10000000 + Math.random() * 90000000)}</td>
                    <td className="border p-2">{["Ingeniería Informática", "Administración", "Contaduría"][i % 3]}</td>
                    <td className="border p-2">{["Activo", "Inactivo"][i % 2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>
                Página {currentPage} de {totalPages}
              </p>
            </div>
          </div>
        )
      case "subject":
        return (
          <div className="p-8 bg-white shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">Acta de Notas</h1>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                <strong>Materia:</strong> Introducción a la Programación (INF-101)
              </p>
              <p className="text-sm text-gray-500">
                <strong>Sección:</strong> SEC-001
              </p>
              <p className="text-sm text-gray-500">
                <strong>Profesor:</strong> Juan Pérez
              </p>
              <p className="text-sm text-gray-500">
                <strong>Período:</strong> 2023 - Trimestre III
              </p>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Nombre</th>
                  <th className="border p-2 text-left">Cédula</th>
                  <th className="border p-2 text-center">Eval 1 (20%)</th>
                  <th className="border p-2 text-center">Eval 2 (30%)</th>
                  <th className="border p-2 text-center">Eval 3 (50%)</th>
                  <th className="border p-2 text-center">Final</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => {
                  const eval1 = Math.floor(10 + Math.random() * 10)
                  const eval2 = Math.floor(10 + Math.random() * 10)
                  const eval3 = Math.floor(10 + Math.random() * 10)
                  const final = (eval1 * 0.2 + eval2 * 0.3 + eval3 * 0.5).toFixed(2)

                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="border p-2">EST-{(i + 1).toString().padStart(3, "0")}</td>
                      <td className="border p-2">Estudiante Ejemplo {i + 1}</td>
                      <td className="border p-2">V-{Math.floor(10000000 + Math.random() * 90000000)}</td>
                      <td className="border p-2 text-center">{eval1}</td>
                      <td className="border p-2 text-center">{eval2}</td>
                      <td className="border p-2 text-center">{eval3}</td>
                      <td className="border p-2 text-center font-bold">{final}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>
                Página {currentPage} de {totalPages}
              </p>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-8 bg-white shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
            <p className="text-center text-gray-500">Vista previa del reporte seleccionado</p>
            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>
                Página {currentPage} de {totalPages}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Vista Previa: {title}</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preview" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 overflow-auto border rounded-md">
            <div
              className="min-h-full"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                transition: "transform 0.2s",
              }}
            >
              {getPreviewContent()}
            </div>
          </TabsContent>

          <TabsContent value="data" className="flex-1 overflow-auto p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Origen de datos</h3>
            <p className="mb-4">Seleccione los filtros para el reporte:</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Período académico</label>
                <Select defaultValue="2023-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-1">2023 - Trimestre I</SelectItem>
                    <SelectItem value="2023-2">2023 - Trimestre II</SelectItem>
                    <SelectItem value="2023-3">2023 - Trimestre III</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {type === "career" && (
                <div>
                  <label className="text-sm font-medium">Carrera</label>
                  <Select defaultValue="informatica">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informatica">Ingeniería Informática</SelectItem>
                      <SelectItem value="administracion">Administración</SelectItem>
                      <SelectItem value="contaduria">Contaduría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {type === "subject" && (
                <div>
                  <label className="text-sm font-medium">Materia</label>
                  <Select defaultValue="inf101">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar materia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inf101">INF-101 - Introducción a la Programación</SelectItem>
                      <SelectItem value="mat201">MAT-201 - Cálculo I</SelectItem>
                      <SelectItem value="adm301">ADM-301 - Administración de Empresas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button className="w-full">Actualizar datos</Button>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 overflow-auto p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Configuración del reporte</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Orientación</label>
                <Select defaultValue="portrait">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar orientación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Vertical</SelectItem>
                    <SelectItem value="landscape">Horizontal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tamaño de papel</label>
                <Select defaultValue="letter">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">Carta (8.5" x 11")</SelectItem>
                    <SelectItem value="legal">Legal (8.5" x 14")</SelectItem>
                    <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Mostrar encabezado y pie de página</label>
                <Select defaultValue="both">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Ambos</SelectItem>
                    <SelectItem value="header">Solo encabezado</SelectItem>
                    <SelectItem value="footer">Solo pie de página</SelectItem>
                    <SelectItem value="none">Ninguno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Aplicar configuración</Button>
            </div>
          </TabsContent>
        </Tabs>

        {activeTab === "preview" && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm py-2">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cerrar
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar como {format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

