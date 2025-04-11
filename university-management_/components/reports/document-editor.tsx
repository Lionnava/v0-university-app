"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  FileDown,
  Printer,
  Save,
  FileText,
  FilePlus,
  FileUp,
} from "lucide-react"

export function DocumentEditor() {
  const [documentType, setDocumentType] = useState("constancia")
  const [documentTitle, setDocumentTitle] = useState("Constancia de Estudios")
  const [selectedTemplate, setSelectedTemplate] = useState("default")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Tipo de Documento</label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constancia">Constancia de Estudios</SelectItem>
                  <SelectItem value="notas">Constancia de Notas</SelectItem>
                  <SelectItem value="recomendacion">Carta de Recomendación</SelectItem>
                  <SelectItem value="custom">Documento Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Plantilla</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar plantilla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Plantilla Estándar</SelectItem>
                  <SelectItem value="formal">Formal con Logo</SelectItem>
                  <SelectItem value="simple">Minimalista</SelectItem>
                  <SelectItem value="academic">Académica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Título del Documento</label>
              <Input
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Ingrese el título del documento"
              />
            </div>
          </div>

          <div className="border rounded-md p-2 mb-4">
            <div className="flex items-center space-x-1 border-b pb-2 mb-2">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="h-4 border-r mx-2"></div>
              <Button variant="ghost" size="sm">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="h-4 w-4" />
              </Button>
              <div className="h-4 border-r mx-2"></div>
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <div className="h-4 border-r mx-2"></div>
              <Select defaultValue="arial">
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Fuente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="times">Times New Roman</SelectItem>
                  <SelectItem value="calibri">Calibri</SelectItem>
                  <SelectItem value="courier">Courier New</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="12">
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="Tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-h-[500px] p-4 border rounded-md bg-white" contentEditable>
              {documentType === "constancia" && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-xl font-bold uppercase">CONSTANCIA DE ESTUDIOS</h1>
                    <p className="text-sm">Universidad Nacional</p>
                  </div>

                  <p className="mb-4">
                    Quien suscribe, Director de Control de Estudios de la Universidad Nacional, hace constar por medio
                    de la presente que:
                  </p>

                  <p className="text-center font-bold mb-4">NOMBRE DEL ESTUDIANTE</p>

                  <p className="mb-4">
                    Titular de la Cédula de Identidad N° V-00.000.000, es estudiante regular de esta Casa de Estudios,
                    cursando actualmente el 5to semestre de la carrera de INGENIERÍA INFORMÁTICA.
                  </p>

                  <p className="mb-4">
                    Constancia que se expide a petición de la parte interesada en la Ciudad Universitaria, a los{" "}
                    {new Date().getDate()} días del mes de {new Date().toLocaleString("es-ES", { month: "long" })} de{" "}
                    {new Date().getFullYear()}.
                  </p>

                  <div className="mt-16 text-center">
                    <p className="border-t border-black pt-2 inline-block">
                      Director de Control de Estudios
                      <br />
                      Universidad Nacional
                    </p>
                  </div>
                </>
              )}

              {documentType === "notas" && (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-xl font-bold uppercase">CONSTANCIA DE NOTAS</h1>
                    <p className="text-sm">Universidad Nacional</p>
                  </div>

                  <p className="mb-4">
                    Por medio de la presente se certifica que el estudiante NOMBRE DEL ESTUDIANTE, titular de la Cédula
                    de Identidad N° V-00.000.000, ha obtenido las siguientes calificaciones en el período académico
                    2023-III:
                  </p>

                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Código</th>
                        <th className="border p-2 text-left">Asignatura</th>
                        <th className="border p-2 text-center">Créditos</th>
                        <th className="border p-2 text-center">Calificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">INF-101</td>
                        <td className="border p-2">Introducción a la Programación</td>
                        <td className="border p-2 text-center">4</td>
                        <td className="border p-2 text-center">18</td>
                      </tr>
                      <tr>
                        <td className="border p-2">MAT-201</td>
                        <td className="border p-2">Cálculo I</td>
                        <td className="border p-2 text-center">4</td>
                        <td className="border p-2 text-center">16</td>
                      </tr>
                      <tr>
                        <td className="border p-2">FIS-101</td>
                        <td className="border p-2">Física I</td>
                        <td className="border p-2 text-center">4</td>
                        <td className="border p-2 text-center">17</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="mb-4">
                    Promedio del período: <strong>17.00</strong> puntos.
                  </p>

                  <p className="mb-4">
                    Constancia que se expide a petición de la parte interesada en la Ciudad Universitaria, a los{" "}
                    {new Date().getDate()} días del mes de {new Date().toLocaleString("es-ES", { month: "long" })} de{" "}
                    {new Date().getFullYear()}.
                  </p>

                  <div className="mt-16 text-center">
                    <p className="border-t border-black pt-2 inline-block">
                      Director de Control de Estudios
                      <br />
                      Universidad Nacional
                    </p>
                  </div>
                </>
              )}

              {documentType === "custom" && <p>Escriba aquí el contenido de su documento...</p>}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="space-x-2">
              <Button variant="outline">
                <FilePlus className="mr-2 h-4 w-4" />
                Nuevo
              </Button>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Importar
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: "Constancia de Estudios - Ana Rodríguez", date: "12/11/2023", type: "constancia" },
              { name: "Constancia de Notas - Carlos Pérez", date: "10/11/2023", type: "notas" },
              { name: "Carta de Recomendación - María López", date: "05/11/2023", type: "recomendacion" },
              { name: "Solicitud de Equivalencia", date: "01/11/2023", type: "custom" },
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">Modificado: {doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Abrir
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

