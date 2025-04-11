"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  studentId: z.string({
    required_error: "Por favor seleccione un estudiante.",
  }),
  period: z.string({
    required_error: "Por favor seleccione un período académico.",
  }),
  subjects: z.array(z.string()).min(1, {
    message: "Debe seleccionar al menos una asignatura.",
  }),
})

// Datos de ejemplo para las asignaturas disponibles
const availableSubjects = [
  {
    id: "INF-101",
    name: "Introducción a la Programación",
    credits: 4,
    section: "SEC-001",
    schedule: "Lun-Mie 8:00-10:00",
  },
  { id: "MAT-201", name: "Cálculo I", credits: 4, section: "SEC-002", schedule: "Mar-Jue 10:00-12:00" },
  {
    id: "ADM-301",
    name: "Administración de Empresas",
    credits: 3,
    section: "SEC-003",
    schedule: "Lun-Mie 14:00-16:00",
  },
  { id: "CON-101", name: "Contabilidad Básica", credits: 3, section: "SEC-004", schedule: "Mar-Jue 16:00-18:00" },
  { id: "INF-202", name: "Estructura de Datos", credits: 4, section: "SEC-005", schedule: "Vie 8:00-12:00" },
]

// Datos de ejemplo para los estudiantes
const students = [
  { id: "EST-001", name: "Ana María Rodríguez" },
  { id: "EST-002", name: "Carlos Eduardo Pérez" },
  { id: "EST-003", name: "María Fernanda López" },
  { id: "EST-004", name: "José Luis Martínez" },
  { id: "EST-005", name: "Luisa Alejandra Torres" },
]

type EnrollmentFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: z.infer<typeof formSchema>) => void
}

export function EnrollmentForm({ isOpen, onClose, onSubmit }: EnrollmentFormProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      period: "",
      subjects: [],
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Inscripción de Asignaturas</DialogTitle>
          <DialogDescription>Complete la información para inscribir asignaturas al estudiante.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estudiante</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between w-full"
                        >
                          {field.value
                            ? students.find((student) => student.id === field.value)?.name
                            : "Seleccionar estudiante..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar estudiante..." />
                        <CommandList>
                          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                          <CommandGroup>
                            {students.map((student) => (
                              <CommandItem
                                key={student.id}
                                value={student.id}
                                onSelect={() => {
                                  form.setValue("studentId", student.id)
                                  setOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    student.id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {student.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Académico</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2025-1">2025 - Trimestre I</SelectItem>
                      <SelectItem value="2025-2">2025 - Trimestre II</SelectItem>
                      <SelectItem value="2025-3">2025 - Trimestre III</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Asignaturas Disponibles</FormLabel>
                    </div>
                    <div className="border rounded-md">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2 text-left">Seleccionar</th>
                            <th className="p-2 text-left">Código</th>
                            <th className="p-2 text-left">Asignatura</th>
                            <th className="p-2 text-left">Sección</th>
                            <th className="p-2 text-left">Horario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableSubjects.map((subject) => (
                            <tr key={subject.id} className="border-b">
                              <td className="p-2">
                                <FormField
                                  control={form.control}
                                  name="subjects"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={subject.id}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(subject.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, subject.id])
                                                : field.onChange(field.value?.filter((value) => value !== subject.id))
                                            }}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )
                                  }}
                                />
                              </td>
                              <td className="p-2">{subject.id}</td>
                              <td className="p-2">{subject.name}</td>
                              <td className="p-2">{subject.section}</td>
                              <td className="p-2">{subject.schedule}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Inscribir</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

