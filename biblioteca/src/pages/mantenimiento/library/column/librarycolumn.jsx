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
import { Trash2 } from "lucide-react";
import EditLibrary from "../dialog/EditLibrary";
export const LibraryColumn = ({ setData, data, handleDelete }) => {
  const columns = [
    {
      accessorKey: "libroId",
      header: "ID",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (row.original.estado === 0 ? "Viejo" : "Nuevo"),
    },
    {
      accessorKey: "categoria.nombre",
      header: "Categoria",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "titulo",
      header: "Titulo",
    },
    {
      accessorKey: "numeroPaginas",
      header: "Numero de Paginas",
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
    },
    {
      accessorKey: "editorial.nombre",
      header: "Editorial",
    },
    {
      accessorKey: "autor.nombre",
      header: "Autor",
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex">
          <div className="ml-2">
            <EditLibrary
              idC={row.original.libroId}
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
                    Estas seguro de eliminar este Editorial?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.libroId)}
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
