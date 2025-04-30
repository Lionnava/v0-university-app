"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, FileDown, Printer, Eye } from "lucide-react"

export default function ReportsPage() {
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
            <h1 className="text-2xl font-bold">Reportes</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Listado de Estudiantes"
            description="Genera un listado completo de estudiantes activos en el sistema."
            options={[
              { label: "Todos los estudiantes", value: "all" },
              { label: "Por carrera", value: "career" },
              { label: "Por estado", value: "status" },
            ]}
          />

          <ReportCard
            title="Acta de Notas"
            description="Genera el acta de notas por materia y sección."
            options={[
              { label: "Por materia", value: "subject" },
              { label: "Por sección", value: "section" },
              { label: "Por profesor", value: "professor" },
            ]}
          />

          <ReportCard
            title="Constancia de Estudios"
            description="Genera constancias de estudio para estudiantes activos."
            options={[
              { label: "Constancia simple", value: "simple" },
              { label: "Con carga académica", value: "academic" },
              { label: "Con notas", value: "grades" },
            ]}
          />

          <ReportCard
            title="Estadísticas de Rendimiento"
            description="Genera reportes estadísticos de rendimiento académico."
            options={[
              { label: "Por materia", value: "subject" },
              { label: "Por carrera", value: "career" },
              { label: "Por período", value: "period" },
            ]}
          />

          <ReportCard
            title="Horarios"
            description="Genera horarios de clases por sección, profesor o aula."
            options={[
              { label: "Por sección", value: "section" },
              { label: "Por profesor", value: "professor" },
              { label: "Por aula", value: "classroom" },
            ]}
          />

          <ReportCard
            title="Censo Estudiantil"
            description="Genera reportes estadísticos del censo estudiantil."
            options={[
              { label: "Distribución por carrera", value: "career" },
              { label: "Distribución por género", value: "gender" },
              { label: "Distribución por edad", value: "age" },
            ]}
          />
        </div>
      </main>

      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          Sistema de Gestión Universitaria © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

function ReportCard({ title, description, options }) {
  const [selectedOption, setSelectedOption] = useState("")

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

          <div className="flex flex-col space-y-2">
            <Button disabled={!selectedOption} className="w-full">
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
