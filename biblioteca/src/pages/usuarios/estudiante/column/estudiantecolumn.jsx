import { Trash2 } from "lucide-react";
import EditEstudiante from "../dialog/EditEstudiante";
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
export const EstudianteColumn = ({ data, setData, handleDelete }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "estudianteId",
    },
    {
      header: "Documento",
      accessorKey: "documento",
    },
    {
      header: "Codigo",
      accessorKey: "codigo",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
    {
      header: "Carrera",
      accessorKey: "carrera",
    },
    {
      header: "Opciones",
      cell: ({ row }) => (
        <div className="flex">
          <div className="ml-2">
            <EditEstudiante
              idC={row.original.estudianteId}
              setData={setData}
              data={data}
            />
          </div>
          <div className="ml-2">
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 className="text-red-500 size-6" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Estas seguro de eliminar este Estudiante?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.estudianteId)}
                  >
                    Si
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ),
    },
  ];
  return columns;
};
