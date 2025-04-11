"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Plus, Search, Trash2, Edit } from "lucide-react"
import { PeriodForm } from "@/components/academic/period-form"
import { TrajectoryForm } from "@/components/academic/trajectory-form"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState("periodos")
  const [isPeriodFormOpen, setIsPeriodFormOpen] = useState(false)
  const [isTrajectoryFormOpen, setIsTrajectoryFormOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null)
  const [selectedTrajectory, setSelectedTrajectory] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "period" | "trajectory" } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo para períodos académicos
  const [periods, setPeriods] = useState([
    {
      id: "2023-T1",
      name: "Trimestre I 2023",
      year: 2023,
      trimester: "1",
      startDate: new Date(2023, 0, 15),
      endDate: new Date(2023, 3, 15),
      enrollmentStartDate: new Date(2023, 0, 1),
      enrollmentEndDate: new Date(2023, 0, 10),
      isActive: false,
    },
    {
      id: "2023-T2",
      name: "Trimestre II 2023",
      year: 2023,
      trimester: "2",
      startDate: new Date(2023, 4, 1),
      endDate: new Date(2023, 7, 1),
      enrollmentStartDate: new Date(2023, 3, 15),
      enrollmentEndDate: new Date(2023, 3, 25),
      isActive: false,
    },
    {
      id: "2023-T3",
      name: "Trimestre III 2023",
      year: 2023,
      trimester: "3",
      startDate: new Date(2023, 8, 1),
      endDate: new Date(2023, 11, 15),
      enrollmentStartDate: new Date(2023, 7, 15),
      enrollmentEndDate: new Date(2023, 7, 25),
      isActive: true,
    },
  ])

  // Datos de ejemplo para trayectos académicos
  const [trajectories, setTrajectories] = useState([
    {
      id: "TRAY-2023-2024",
      name: "Año Académico 2023-2024",
      academicYear: "2023-2024",
      description: "Trayecto académico regular para el año 2023-2024",
      firstPeriodId: "2023-T1",
      secondPeriodId: "2023-T2",
      thirdPeriodId: "2023-T3",
      isActive: true,
    },
  ])

  function handleNewPeriod(values: any) {
    if (selectedPeriod) {
      // Actualizar período existente
      setPeriods(periods.map((period) => (period.id === selectedPeriod.id ? values : period)))
    } else {
      // Crear nuevo período
      setPeriods([...periods, values])
    }
    setSelectedPeriod(null)
  }

  function handleNewTrajectory(values: any) {
    if (selectedTrajectory) {
      // Actualizar trayecto existente
      setTrajectories(trajectories.map((trajectory) => (trajectory.id === selectedTrajectory.id ? values : trajectory)))
    } else {
      // Crear nuevo trayecto
      setTrajectories([...trajectories, values])
    }
    setSelectedTrajectory(null)
  }

  function handleDeleteConfirm() {
    if (!itemToDelete) return

    if (itemToDelete.type === "period") {
      setPeriods(periods.filter((period) => period.id !== itemToDelete.id))
    } else {
      setTrajectories(trajectories.filter((trajectory) => trajectory.id !== itemToDelete.id))
    }

    setIsDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  function handleDeleteClick(id: string, type: "period" | "trajectory") {
    setItemToDelete({ id, type })
    setIsDeleteDialogOpen(true)
  }

  // Filtrar períodos por término de búsqueda
  const filteredPeriods = periods.filter(
    (period) =>
      period.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      period.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrar trayectos por término de búsqueda
  const filteredTrajectories = trajectories.filter(
    (trajectory) =>
      trajectory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trajectory.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trajectory.academicYear.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <h1 className="text-2xl font-bold">Calendario Académico</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="periodos" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="periodos">Períodos Académicos</TabsTrigger>
            <TabsTrigger value="trayectos">Trayectos Académicos</TabsTrigger>
          </TabsList>

          <TabsContent value="periodos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Períodos Académicos</CardTitle>
                <Button onClick={() => setIsPeriodFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Período
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar períodos..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Año</TableHead>
                        <TableHead>Trimestre</TableHead>
                        <TableHead>Fechas</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPeriods.map((period) => (
                        <TableRow key={period.id}>
                          <TableCell>{period.id}</TableCell>
                          <TableCell>{period.name}</TableCell>
                          <TableCell>{period.year}</TableCell>
                          <TableCell>{period.trimester}</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>Inicio: {format(period.startDate, "dd/MM/yyyy")}</div>
                              <div>Fin: {format(period.endDate, "dd/MM/yyyy")}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {period.isActive ? (
                              <Badge className="bg-green-500">Activo</Badge>
                            ) : (
                              <Badge variant="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPeriod(period)
                                  setIsPeriodFormOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(period.id, "period")}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trayectos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Trayectos Académicos</CardTitle>
                <Button onClick={() => setIsTrajectoryFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Trayecto
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar trayectos..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Año Académico</TableHead>
                        <TableHead>Períodos</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrajectories.map((trajectory) => (
                        <TableRow key={trajectory.id}>
                          <TableCell>{trajectory.id}</TableCell>
                          <TableCell>{trajectory.name}</TableCell>
                          <TableCell>{trajectory.academicYear}</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>T1: {trajectory.firstPeriodId}</div>
                              <div>T2: {trajectory.secondPeriodId}</div>
                              <div>T3: {trajectory.thirdPeriodId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {trajectory.isActive ? (
                              <Badge className="bg-green-500">Activo</Badge>
                            ) : (
                              <Badge variant="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedTrajectory(trajectory)
                                  setIsTrajectoryFormOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(trajectory.id, "trajectory")}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

      {/* Formularios */}
      {isPeriodFormOpen && (
        <PeriodForm
          isOpen={isPeriodFormOpen}
          onClose={() => {
            setIsPeriodFormOpen(false)
            setSelectedPeriod(null)
          }}
          onSubmit={handleNewPeriod}
          initialData={selectedPeriod}
        />
      )}

      {isTrajectoryFormOpen && (
        <TrajectoryForm
          isOpen={isTrajectoryFormOpen}
          onClose={() => {
            setIsTrajectoryFormOpen(false)
            setSelectedTrajectory(null)
          }}
          onSubmit={handleNewTrajectory}
          initialData={selectedTrajectory}
        />
      )}

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              {itemToDelete?.type === "period" ? " el período académico" : " el trayecto académico"}y todos los datos
              asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

