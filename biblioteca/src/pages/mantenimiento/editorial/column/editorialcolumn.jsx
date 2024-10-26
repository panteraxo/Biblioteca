import { Trash2 } from "lucide-react";
import EditEditorial from "../dialog/EditEditorial";
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
export const EditorialColumn = ({ data, setData, handleDelete }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "editorialId",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Pais",
      accessorKey: "pais",
    },
    {
      header: "Sitio web",
      accessorKey: "sitioWeb",
    },
    {
      header: "Opciones",
      cell: ({ row }) => (
        <div className="flex">
          <div className="ml-2">
            <EditEditorial
              idC={row.original.editorialId}
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
                    onClick={() => handleDelete(row.original.editorialId)}
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
