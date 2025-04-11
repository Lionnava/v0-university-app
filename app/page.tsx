import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, UserCheck, Calendar, FileText, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Sistema de Gestión Universitaria</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+180 desde el último trimestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asignaturas Activas</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">+12 desde el último trimestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profesores</CardTitle>
                <UserCheck className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64</div>
                <p className="text-xs text-muted-foreground">+8 desde el último trimestre</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Módulos del Sistema</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Estudiantes</CardTitle>
                <CardDescription>Censo, inscripción y registro de alumnos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <Users className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/students" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestión Académica</CardTitle>
                <CardDescription>Materias, secciones y planificación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <BookOpen className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/academic" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portal Docente</CardTitle>
                <CardDescription>Evaluación y planificación de clases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <UserCheck className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/teachers" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendario Académico</CardTitle>
                <CardDescription>Períodos y trayectos académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <Calendar className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/calendar" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reportes</CardTitle>
                <CardDescription>Informes y documentos académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <FileText className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/reports" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Análisis de datos académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4">
                  <BarChart3 className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/statistics" className="w-full">
                  <Button className="w-full">Acceder</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200">
  <div className="container mx-auto">
    {/* Línea superior: Nombre del sistema + versión */}
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-semibold text-gray-800">
        UPTMA-Moján
      </span>
      <span className="text-xs text-gray-500">
        Sistema de Gestión Universitaria +2.0
      </span>
    </div>

    <div className="flex justify-between items-center text-xs text-gray-500">
      <span>
        <p>Desarrollado por</p> <span className="font-medium">Ing. Lionell Nava.</span>
      </span>
      <span>
        <p>© {new Date().getFullYear()} Uptma-Moján.</p> Derechos reservados.
      </span>
    </div>
  </div>
</footer>
    </div>
  )
}

