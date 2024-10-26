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

const EditEstudiante = ({ data, setData, idC }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      estudianteId: idC,
    },
  });
  useEffect(() => {
    setValue(
      "documento",
      data.find((item) => item.estudianteId === idC)?.documento || ""
    );
    setValue(
      "codigo",
      data.find((item) => item.estudianteId === idC)?.codigo || ""
    );
    setValue(
      "nombre",
      data.find((item) => item.estudianteId === idC)?.nombre || ""
    );
  }, []);
  setValue(
    "telefono",
    data.find((item) => item.estudianteId === idC)?.telefono || ""
  );
  setValue(
    "carrera",
    data.find((item) => item.estudianteId === idC)?.carrera || ""
  );

  const onSubmit = async (data) => {
    try {
      await putPetition("Estudiante/update", data, (response) => {
        console.log(response);
        setData(response);
      });
      getPetition("Estudiante/all", setData);
    } catch (error) {
      console.error("Error editing Estudiante:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil className="text-green-500 size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edicion de Estudiante</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Documento</label>
                <Input {...register("documento")} type="text" />
              </div>
              <div className="mb-8">
                <label>Codigo</label>
                <Input {...register("codigo")} type="text" />
              </div>
              <div className="mb-8">
                <label>Nombre</label>
                <Input {...register("nombre")} type="text" />
              </div>
              <div className="mb-8">
                <label>Telefono</label>
                <Input {...register("telefono")} type="text" />
              </div>
              <div className="mb-8">
                <label>Carrera</label>
                <Input {...register("carrera")} type="text" />
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

export default EditEstudiante;
