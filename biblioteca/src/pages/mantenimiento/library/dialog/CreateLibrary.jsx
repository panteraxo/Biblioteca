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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPetition, postPetition } from "@/resources/ApiFunction";
import { Switch } from "@/components/ui/switch";
function CreateLibrary({ setData }) {
  const { register, handleSubmit, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editorial, setEditorial] = useState([]);
  const [autor, setAutor] = useState([]);
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    getPetition("Categoria/all", setCategoria);
    getPetition("Editorial/all", setEditorial);
    getPetition("Autor/all", setAutor);
  }, []);

  const onSubmit = async (data) => {
    const libroData = {
      ...data,
      categoria: { categoriaId: data.categoriaId },
      editorial: { editorialId: data.editorialId },
      autor: { autorId: data.autorId },
    };
    try {
      await postPetition("libro/add", libroData, (response) => {
        setData(response);
        setOpen(false);
        console.log(response);
      });
      getPetition("libro/all", setData);
    } catch (error) {
      console.log("Error al crear libro", error);
    }
  };
  /* const onSubmit = (data) => console.log(data); */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Nuevo libro</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creacion de libro</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombre de libro:</label>
                <Input {...register("titulo")} type="text" />
              </div>
              <div className="mb-8">
                <label>Descripcion</label>
                <Input {...register("descripcion")} type="text" />
              </div>
              <div className="mb-8">
                <label>ISBN</label>
                <Input {...register("isbn")} type="text" />
              </div>
              <div className="mb-8">
                <label>Numero de paginas</label>
                <Input
                  {...register("numeroPaginas", { valueAsNumber: true })}
                  type="Number"
                />
              </div>
              <div className="mb-8">
                <label>Cantidad</label>
                <Input
                  {...register("cantidad", { valueAsNumber: true })}
                  type="Number"
                />
              </div>
              <div className="mb-8">
                <label>Categoria</label>
                <Select
                  onValueChange={(value) =>
                    setValue("categoriaId", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categoria.map((item) => (
                        <SelectItem
                          key={item.categoriaId}
                          value={item.categoriaId.toString()}
                        >
                          {""}
                          {item.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-8">
                <label>Editorial</label>
                <Select
                  onValueChange={(value) =>
                    setValue("editorialId", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {editorial.map((item) => (
                        <SelectItem
                          key={item.editorialId}
                          value={item.editorialId.toString()}
                        >
                          {""}
                          {item.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-8">
                <label>Autor</label>
                <Select
                  onValueChange={(value) => setValue("autorId", Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {autor.map((item) => (
                        <SelectItem
                          key={item.autorId}
                          value={item.autorId.toString()}
                        >
                          {""}
                          {item.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 mb-8">
                <Switch
                  onCheckedChange={(checked) =>
                    setValue("estado", checked ? 1 : 0)
                  }
                  id="estado"
                />
                <label htmlFor="estado">estado</label>
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

export default CreateLibrary;
