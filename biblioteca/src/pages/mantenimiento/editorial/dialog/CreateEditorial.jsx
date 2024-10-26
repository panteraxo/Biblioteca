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
      await postPetition("Editorial/add", data, (response) => {
        setData(response);
        setOpen(false);
        console.log(response);
      });
      getPetition("Editorial/all", setData);
    } catch (error) {
      console.log("Error al crear Editorial", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Nueva Editorial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creacion de Editorial</DialogTitle>
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
}

export default CreateCategory;
