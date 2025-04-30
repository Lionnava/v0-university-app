"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Plus, Search } from "lucide-react"

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState("materias")

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
            <h1 className="text-2xl font-bold">Gestión Académica</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="materias" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="materias">Materias</TabsTrigger>
            <TabsTrigger value="secciones">Secciones</TabsTrigger>
            <TabsTrigger value="planificacion">Planificación</TabsTrigger>
          </TabsList>

          <TabsContent value="materias">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Materias</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Materia
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Materia</DialogTitle>
                      <DialogDescription>
                        Complete la información para registrar una nueva materia en el sistema.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                          Código
                        </Label>
                        <Input id="code" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nombre
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="credits" className="text-right">
                          Créditos
                        </Label>
                        <Input id="credits" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                          Departamento
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Seleccionar departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informatica">Informática</SelectItem>
                            <SelectItem value="matematicas">Matemáticas</SelectItem>
                            <SelectItem value="administracion">Administración</SelectItem>
                            <SelectItem value="contaduria">Contaduría</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar materias..." className="pl-8" />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Créditos</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjectData.map((subject) => (
                        <TableRow key={subject.code}>
                          <TableCell>{subject.code}</TableCell>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.credits}</TableCell>
                          <TableCell>{subject.department}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="secciones">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Secciones</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Sección
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar secciones..." className="pl-8" />
                  </div>
                  <Select>
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

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Materia</TableHead>
                        <TableHead>Profesor</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Cupos</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sectionData.map((section) => (
                        <TableRow key={section.id}>
                          <TableCell>{section.id}</TableCell>
                          <TableCell>{section.subject}</TableCell>
                          <TableCell>{section.professor}</TableCell>
                          <TableCell>{section.schedule}</TableCell>
                          <TableCell>{section.capacity}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planificacion">
            <Card>
              <CardHeader>
                <CardTitle>Planificación Académica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Período Académico</Label>
                      <Select>
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
                    <div>
                      <Label className="text-sm font-medium">Carrera</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar carrera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informatica">Ingeniería Informática</SelectItem>
                          <SelectItem value="administracion">Administración</SelectItem>
                          <SelectItem value="contaduria">Contaduría</SelectItem>
                          <SelectItem value="industrial">Ingeniería Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Fechas Importantes</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Inicio de clases:</span>
                        <span className="font-medium">02/05/2023</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fin de clases:</span>
                        <span className="font-medium">28/07/2023</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Evaluaciones finales:</span>
                        <span className="font-medium">31/07/2023 - 04/08/2023</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Entrega de notas:</span>
                        <span className="font-medium">07/08/2023</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Planificación de Recursos</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Aulas Disponibles</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          <div className="border rounded p-2 text-center">A-101</div>
                          <div className="border rounded p-2 text-center">A-102</div>
                          <div className="border rounded p-2 text-center">A-103</div>
                          <div className="border rounded p-2 text-center">A-104</div>
                          <div className="border rounded p-2 text-center">B-201</div>
                          <div className="border rounded p-2 text-center">B-202</div>
                          <div className="border rounded p-2 text-center">B-203</div>
                          <div className="border rounded p-2 text-center">B-204</div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Laboratorios Disponibles</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          <div className="border rounded p-2 text-center">Lab-01</div>
                          <div className="border rounded p-2 text-center">Lab-02</div>
                          <div className="border rounded p-2 text-center">Lab-03</div>
                          <div className="border rounded p-2 text-center">Lab-04</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">
                      Cancelar
                    </Button>
                    <Button>Generar Planificación</Button>
                  </div>
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

// Datos de ejemplo
const subjectData = [
  { code: "INF-101", name: "Introducción a la Programación", credits: 4, department: "Informática" },
  { code: "MAT-201", name: "Cálculo I", credits: 4, department: "Matemáticas" },
  { code: "ADM-301", name: "Administración de Empresas", credits: 3, department: "Administración" },
  { code: "CON-101", name: "Contabilidad Básica", credits: 3, department: "Contaduría" },
  { code: "INF-202", name: "Estructura de Datos", credits: 4, department: "Informática" },
]

const sectionData = [
  {
    id: "SEC-001",
    subject: "Introducción a la Programación",
    professor: "Juan Pérez",
    schedule: "Lun-Mie 8:00-10:00",
    capacity: "30/30",
  },
  {
    id: "SEC-002",
    subject: "Cálculo I",
    professor: "María González",
    schedule: "Mar-Jue 10:00-12:00",
    capacity: "25/30",
  },
  {
    id: "SEC-003",
    subject: "Administración de Empresas",
    professor: "Carlos Rodríguez",
    schedule: "Lun-Mie 14:00-16:00",
    capacity: "28/30",
  },
  {
    id: "SEC-004",
    subject: "Contabilidad Básica",
    professor: "Ana López",
    schedule: "Mar-Jue 16:00-18:00",
    capacity: "22/30",
  },
  {
    id: "SEC-005",
    subject: "Estructura de Datos",
    professor: "Pedro Martínez",
    schedule: "Vie 8:00-12:00",
    capacity: "27/30",
  },
]
