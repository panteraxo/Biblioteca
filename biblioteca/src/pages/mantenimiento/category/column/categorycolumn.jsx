import { Trash2 } from "lucide-react";
import EditCategory from "../dialog/EditCategory";
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
export const CategoryColumn = ({ data, setData, handleDelete }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "categoriaId",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Opciones",
      cell: ({ row }) => (
        <div className="flex">
          <div className="ml-2">
            <EditCategory
              idC={row.original.categoriaId}
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
                    Are you sure you want delete this Kiosk?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.categoriaId)}
                  >
                    Yes
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
