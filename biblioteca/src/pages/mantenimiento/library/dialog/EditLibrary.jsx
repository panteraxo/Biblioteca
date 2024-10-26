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
import { useForm, Controller } from "react-hook-form";
import { Pencil } from "lucide-react";
import { getPetition, putPetition } from "@/resources/ApiFunction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const EditLibrary = ({ data, setData, idC }) => {
  const [open, setOpen] = useState(false);
  const [editorial, setEditorial] = useState([]);
  const [autor, setAutor] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [libro, setLibro] = useState([]);

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      libroId: idC,
    },
  });

  useEffect(() => {
    getPetition("Categoria/all", setCategoria);
    getPetition("Editorial/all", setEditorial);
    getPetition("Autor/all", setAutor);
    const foundLibro = data.find((item) => item.libroId === idC);
    if (foundLibro) setLibro(foundLibro);
  }, [data, idC]);

  useEffect(() => {
    if (libro) {
      setValue("isbn", libro.isbn || "");
      setValue("titulo", libro.titulo || "");
      setValue("descripcion", libro.descripcion || "");
      setValue("numeroPaginas", libro.numeroPaginas || "");
      setValue("estado", libro.estado || "");
      setValue("cantidad", libro.cantidad || "");
    }
  }, [libro, setValue]);

  const onSubmit = async (data) => {
    try {
      await putPetition("libro/update", data, (response) => setData(response));
      getPetition("libro/all", setData);
    } catch (error) {
      console.error("Error editing Library:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil className="text-green-500 size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edición de Libro</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Nombre de libro:</label>
                <Input {...register("titulo")} type="text" />
              </div>

              <div className="mb-8">
                <label>Descripción</label>
                <Input {...register("descripcion")} type="text" />
              </div>

              <div className="mb-8">
                <label>ISBN</label>
                <Input {...register("isbn")} type="text" />
              </div>

              <div className="mb-8">
                <label>Número de páginas</label>
                <Input
                  {...register("numeroPaginas", { valueAsNumber: true })}
                  type="number"
                />
              </div>

              <div className="mb-8">
                <label>Cantidad</label>
                <Input
                  {...register("cantidad", { valueAsNumber: true })}
                  type="number"
                />
              </div>

              {/* Select de Categoría */}
              <div className="mb-8">
                <label>Categoría</label>
                <Controller
                  name="categoria.categoriaId"
                  control={control}
                  defaultValue={libro.categoria?.categoriaId || ""}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categoria.map((item) => (
                            <SelectItem
                              key={item.categoriaId}
                              value={item.categoriaId.toString()}
                            >
                              {item.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Select de Editorial */}
              <div className="mb-8">
                <label>Editorial</label>
                <Controller
                  name="editorial.editorialId"
                  control={control}
                  defaultValue={libro.editorial?.editorialId || ""}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una editorial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {editorial.map((item) => (
                            <SelectItem
                              key={item.editorialId}
                              value={item.editorialId.toString()}
                            >
                              {item.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Select de Autor */}
              <div className="mb-8">
                <label>Autor</label>
                <Controller
                  name="autor.autorId"
                  control={control}
                  defaultValue={libro.autor?.autorId || ""}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un autor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {autor.map((item) => (
                            <SelectItem
                              key={item.autorId}
                              value={item.autorId.toString()}
                            >
                              {item.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2 mb-8">
                <Controller
                  name="estado"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value === 1}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 1 : 0)
                      }
                      id="estado"
                    />
                  )}
                />
                <label htmlFor="estado">Estado</label>
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

export default EditLibrary;
