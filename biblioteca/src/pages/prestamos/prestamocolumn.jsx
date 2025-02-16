import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookDown } from "lucide-react";
export const PrestamoColumn = ({ handleChange }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "prestamoId",
    },
    {
      header: "Libro",
      accessorKey: "libro.titulo",
    },
    {
      header: "Estudiante",
      accessorKey: "estudiante.nombre",
    },
    {
      header: "Fecha de prestamo",
      accessorKey: "fechaPrestamo",
    },
    {
      header: "Fecha de Devolucion",
      accessorKey: "fechaDevolucion",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (row.original.estado === 1 ? "Prestado" : "Devuelto"),
    },
    {
      header: "Opciones",
      cell: ({ row }) =>
        row.original.estado === 1 ? (
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <BookDown className="text-blue-600 size-6" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Estas seguro de cambiar el estado del prestamo?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleChange(row.original.prestamoId)}
                  >
                    Si
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div></div>
        ),
    },
  ];
  return columns;
};
