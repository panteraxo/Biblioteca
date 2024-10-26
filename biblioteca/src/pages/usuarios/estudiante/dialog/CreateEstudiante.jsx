import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPetition, postPetition } from "@/resources/ApiFunction";
function CreateEstudiante({ setData }) {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      await postPetition("Estudiante/add", data, (response) => {
        setData(response);
        setOpen(false);
        console.log(response);
      });
      getPetition("Estudiante/all", setData);
    } catch (error) {
      console.log("Error al crear Estudiante", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Nuevo Estudiante</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creacion de Estudiante</DialogTitle>
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
}

export default CreateEstudiante;
