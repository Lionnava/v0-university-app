"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Upload, Save } from "lucide-react"

export default function TeachersPage() {
  const [activeTab, setActiveTab] = useState("evaluacion")

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
            <h1 className="text-2xl font-bold">Portal Docente</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="evaluacion" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="evaluacion">Sistema de Evaluación</TabsTrigger>
            <TabsTrigger value="planificacion">Planificación de Clases</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluacion">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Evaluaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Select defaultValue="inf101-sec001">
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Seleccionar materia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inf101-sec001">INF-101 - Introducción a la Programación (SEC-001)</SelectItem>
                      <SelectItem value="inf202-sec005">INF-202 - Estructura de Datos (SEC-005)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="2023-1">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-1">2023 - Trimestre I</SelectItem>
                      <SelectItem value="2023-2">2023 - Trimestre II</SelectItem>
                      <SelectItem value="2023-3">2023 - Trimestre III</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cédula</TableHead>
                        <TableHead>Evaluación 1 (20%)</TableHead>
                        <TableHead>Evaluación 2 (30%)</TableHead>
                        <TableHead>Evaluación 3 (50%)</TableHead>
                        <TableHead>Nota Final</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesData.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.cedula}</TableCell>
                          <TableCell>
                            <Input type="number" min="0" max="20" defaultValue={student.grades[0]} className="w-16" />
                          </TableCell>
                          <TableCell>
                            <Input type="number" min="0" max="20" defaultValue={student.grades[1]} className="w-16" />
                          </TableCell>
                          <TableCell>
                            <Input type="number" min="0" max="20" defaultValue={student.grades[2]} className="w-16" />
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{calculateFinalGrade(student.grades)}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar Notas
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planificacion">
            <Card>
              <CardHeader>
                <CardTitle>Planificación de Clases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Materia</Label>
                      <Select defaultValue="inf101">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar materia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inf101">INF-101 - Introducción a la Programación</SelectItem>
                          <SelectItem value="inf202">INF-202 - Estructura de Datos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sección</Label>
                      <Select defaultValue="sec001">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sección" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sec001">SEC-001 (Lun-Mie 8:00-10:00)</SelectItem>
                          <SelectItem value="sec005">SEC-005 (Vie 8:00-12:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Semana 1</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tema</Label>
                        <Input defaultValue="Introducción a los algoritmos" />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" defaultValue="2023-05-02" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        rows={3}
                        defaultValue="Conceptos básicos de algoritmos. Definición y características. Representación mediante pseudocódigo y diagramas de flujo."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Recursos</Label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Agregar recurso o material de clase" />
                        <Button variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Semana 2</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tema</Label>
                        <Input defaultValue="Variables y tipos de datos" />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" defaultValue="2023-05-09" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        rows={3}
                        defaultValue="Definición de variables. Tipos de datos básicos. Operadores aritméticos y lógicos. Expresiones y asignaciones."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Recursos</Label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Agregar recurso o material de clase" />
                        <Button variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Planificación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          Sistema de Gestión Universitaria © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

// Función para calcular la nota final
function calculateFinalGrade(grades) {
  const weights = [0.2, 0.3, 0.5]
  let finalGrade = 0

  for (let i = 0; i < grades.length; i++) {
    finalGrade += grades[i] * weights[i]
  }

  return finalGrade.toFixed(2)
}

// Datos de ejemplo
const gradesData = [
  { id: "EST-001", name: "Ana María Rodríguez", cedula: "V-25.789.456", grades: [18, 17, 19] },
  { id: "EST-002", name: "Carlos Eduardo Pérez", cedula: "V-26.123.789", grades: [15, 16, 14] },
  { id: "EST-003", name: "María Fernanda López", cedula: "V-24.567.890", grades: [12, 14, 15] },
  { id: "EST-004", name: "José Luis Martínez", cedula: "V-27.890.123", grades: [16, 15, 17] },
  { id: "EST-005", name: "Luisa Alejandra Torres", cedula: "V-25.456.789", grades: [19, 18, 20] },
]
