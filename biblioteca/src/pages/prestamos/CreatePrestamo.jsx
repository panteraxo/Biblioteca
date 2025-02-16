import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { getPetition, postPetition } from "@/resources/ApiFunction";
import { Input } from "@/components/ui/input";

function CreatePrestamo({ setData }) {
  const { register, handleSubmit, setValue } = useForm();
  const [libro, setLibro] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  useEffect(() => {
    getPetition("libro/all", setLibro);
    getPetition("Estudiante/all", setEstudiante);
  }, []);

  const onSubmit = async (data) => {
    const prestamoData = {
      ...data,
      estudiante: { estudianteId: data.estudianteId },
      libro: { libroId: data.libroId },
      estado: 1,
    };
    try {
      await postPetition("Prestamos/add", prestamoData, (response) => {
        setData(response);
        console.log(response);
      });
      getPetition("Prestamos/all", setData);
    } catch (error) {
      console.log("Error al crear prestamo", error);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-center text-2xl my-6">Generar Prestamo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 mb-6">
          <label>Libro</label>
          <Select onValueChange={(value) => setValue("libroId", Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {libro.map((item) => (
                  <SelectItem
                    key={item.libroId}
                    value={item.libroId.toString()}
                  >
                    {""}
                    {item.titulo}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="px-6 mb-6">
          <label>Estudiante</label>
          <Select
            onValueChange={(value) => setValue("estudianteId", Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {estudiante.map((item) => (
                  <SelectItem
                    key={item.estudianteId}
                    value={item.estudianteId.toString()}
                  >
                    {""}
                    {item.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-around md:flex-row flex-col  mb-6">
          <div>
            <label>Fecha de prestamo</label>
            <Input {...register("fechaPrestamo")} type="date" />
          </div>
          <div>
            <label>Fecha de devolucion</label>
            <Input {...register("fechaDevolucion")} type="date" />
          </div>
        </div>

        <div className="px-6 mb-6">
          <Button type="submit">Guardar prestamo</Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePrestamo;
