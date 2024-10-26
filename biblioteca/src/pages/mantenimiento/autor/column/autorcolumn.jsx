import { Trash2 } from "lucide-react";
import EditAutor from "../dialog/EditAutor";
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
export const AutorColumn = ({ idC, data, setData, handleDelete }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "autorId",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Apellido",
      accessorKey: "apellido",
    },
    {
      header: "Fecha de Nacimiento",
      accessorKey: "fechaNacimiento",
    },
    {
      header: "Biografia",
      accessorKey: "biografia",
    },
    {
      header: "Opciones",
      cell: ({ row }) => (
        <div className="flex">
          <div className="ml-2">
            <EditAutor
              idC={row.original.autorId}
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
                    Estas seguro de eliminar este autor?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.autorId)}
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
