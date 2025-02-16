import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { PrestamoColumn } from "./prestamoColumn";
import {
  getPetition,
  postPetition,
  putPetition,
} from "@/resources/ApiFunction";
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
import { DataTablePagination } from "@/components/pagination/DataTablePagination";
import CreatePrestamo from "./CreatePrestamo";
import { Button } from "@/components/ui/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

function Prestamos() {
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    getPetition("Prestamos/all", setData);
  }, []);

  const handleChange = (pe) => {
    putPetition(`Prestamos/update/${pe}`, { estado: 0 }, (response) => {
      getPetition("Prestamos/all", setData);
    });
  };

  const columns = PrestamoColumn({ handleChange });

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

  const getNestedValue = (obj, path) => {
    if (!path) return "";
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj
      );
  };

  const handleExport = async () => {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Prestamos");
      worksheet.columns = columns
        .filter((column) => column.accessorKey)
        .map((column) => ({
          header: column.header,
          key: column.accessorKey,
          width: 20,
        }));

      table.getRowModel().rows.forEach((row) => {
        const rowData = {};
        columns
          .filter((column) => column.accessorKey)
          .forEach((column) => {
            const value = getNestedValue(row.original, column.accessorKey);
            rowData[column.accessorKey] = value;
          });
        worksheet.addRow(rowData);
      });

      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Prestamos.xlsx");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };

  return (
    <div>
      {/* Botón para exportar a Excel */}
      <div className="my-6">
        <Button onClick={handleExport}>Exportar a Excel</Button>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-4 gap-4">
        {/* Formulario para crear un préstamo */}
        <div>
          <CreatePrestamo setData={setData} />
        </div>

        {/* Tabla de préstamos */}
        <div className="col-span-3">
          <div className="p-4">
            <Card className="mb-5 p-4">
              <h2 className="scroll-m-20 pb-6 text-2xl font-semibold tracking-tight first:mt-0">
                Préstamos de libros
              </h2>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Buscar préstamo"
                  value={filtering}
                  onChange={(e) => setFiltering(e.target.value)}
                  className="max-w-sm"
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
        </div>
      </div>
    </div>
  );
}

export default Prestamos;
