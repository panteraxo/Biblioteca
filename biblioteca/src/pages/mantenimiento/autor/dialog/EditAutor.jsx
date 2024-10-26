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

const EditAutor = ({ data, setData, idC }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue("nombre", data.find((item) => item.autorId === idC)?.nombre || "");
    setValue(
      "apellido",
      data.find((item) => item.autorId === idC)?.apellido || ""
    );
    setValue(
      "fechaNacimiento",
      data.find((item) => item.autorId === idC)?.fechaNacimiento || ""
    );
    setValue(
      "biografia",
      data.find((item) => item.autorId === idC)?.biografia || ""
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      await putPetition("Autor/update", data, (response) => {
        console.log(response);
        setData(response);
      });
      getPetition("Autor/all", setData);
    } catch (error) {
      console.error("Error editing Autor:", error);
    }
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      autorId: idC,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil className="text-green-500 size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edicion de Autor</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombre</label>
                <Input {...register("nombre")} type="text" />
              </div>
              <div className="mb-8">
                <label>Apellido</label>
                <Input {...register("apellido")} type="text" />
              </div>
              <div className="mb-8">
                <label>Fecha de Nacimiento</label>
                <Input {...register("fechaNacimiento")} type="text" />
              </div>
              <div className="mb-8">
                <label>Biografia</label>
                <Input {...register("biografia")} type="text" />
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

export default EditAutor;
