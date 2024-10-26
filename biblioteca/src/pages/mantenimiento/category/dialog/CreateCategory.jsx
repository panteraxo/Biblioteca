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
function CreateCategory({ setData }) {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      await postPetition("Categoria/add", data, (response) => {
        setData(response);
        setOpen(false);
        console.log(response);
      });
      getPetition("Categoria/all", setData);
    } catch (error) {
      console.log("Error al crear categoria", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Nueva Categoria</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creacion de categoria</DialogTitle>
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
}

export default CreateCategory;
