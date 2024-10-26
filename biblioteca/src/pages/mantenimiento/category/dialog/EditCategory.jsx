import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { getPetition, putPetition } from "@/resources/ApiFunction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditCategory = ({ data, setData, idC }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(
      "nombre",
      data.find((item) => item.categoriaId === idC)?.nombre || ""
    );
    setValue(
      "descripcion",
      data.find((item) => item.categoriaId === idC)?.descripcion || ""
    );
  }, []);
  console.log(data);
  console.log(idC);

  const onSubmit = async (data) => {
    try {
      await putPetition("Categoria/update", data, (response) => {
        console.log(response);
        setData(response);
      });
      getPetition("Categoria/all", setData);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      categoriaId: idC,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil className="text-green-500 size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edicion de categoria</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombre de categoria:</label>
                <Input {...register("nombre")} type="text" />
              </div>
              <div className="mb-8">
                <label>Descripcion</label>
                <Input {...register("descripcion")} type="text" />
              </div>

              <Button type="submit">Guardar cambios</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cerrar
                </Button>
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
