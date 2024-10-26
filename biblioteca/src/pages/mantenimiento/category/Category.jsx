import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePetition, getPetition } from "@/resources/ApiFunction";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { CategoryColumn } from "./column/categorycolumn";
import { Card } from "@/components/ui/card";
import CreateCategory from "./dialog/CreateCategory";
import { DataTablePagination } from "@/components/pagination/DataTablePagination";

export default function Category() {
  const [data, setData] = useState([]);

  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  useEffect(() => {
    getPetition("Categoria/all", setData);
  }, []);
  const handleDelete = (pe) => {
    deletePetition(`Categoria/delete/${pe}`)
      .then(() => {
        getPetition(`Categoria/all`, setData);
      })
      .catch((error) => {
        console.error("Error eliminando categoria:", error);
      });
  };

  const columns = CategoryColumn({ data, setData, handleDelete });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="p-4">
      <Card className="mb-5 p-4">
        <h2 className="scroll-m-20  pb-6 text-2xl font-semibold tracking-tight first:mt-0 ">
          Configuracion de Categorias
        </h2>
        <div className="flex items-center py-4 justify-between">
          <CreateCategory setData={setData} />
          <Input
            placeholder="Buscar categoria"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm "
          />
        </div>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    onClick={header.column.getToggleSortingHandler()}
                    scope="col"
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="pt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}