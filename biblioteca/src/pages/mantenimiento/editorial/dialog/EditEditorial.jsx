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

const EditEditorial = ({ data, setData, idC }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(
      "nombre",
      data.find((item) => item.editorialId === idC)?.nombre || ""
    );
    setValue("pais", data.find((item) => item.editorialId === idC)?.pais || "");
    setValue(
      "sitioWeb",
      data.find((item) => item.editorialId === idC)?.sitioWeb || ""
    );
  }, []);
  console.log(data);
  console.log(idC);

  const onSubmit = async (data) => {
    try {
      await putPetition("Editorial/update", data, (response) => {
        console.log(response);
        setData(response);
      });
      getPetition("Editorial/all", setData);
    } catch (error) {
      console.error("Error editing Editorial:", error);
    }
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      editorialId: idC,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil className="text-green-500 size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edicion de Editorial</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombre</label>
                <Input {...register("nombre")} type="text" />
              </div>
              <div className="mb-8">
                <label>Pais</label>
                <Input {...register("pais")} type="text" />
              </div>
              <div className="mb-8">
                <label>Sitio web</label>
                <Input {...register("sitioWeb")} type="text" />
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

export default EditEditorial;
