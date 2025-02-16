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
import { EditorialColumn } from "./column/editorialcolumn";
import { Card } from "@/components/ui/card";
import CreateEditorial from "./dialog/CreateEditorial";
import { DataTablePagination } from "@/components/pagination/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default function Editorial() {
  const [data, setData] = useState([]);

  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  useEffect(() => {
    getPetition("Editorial/all", setData);
  }, []);
  const handleDelete = (pe) => {
    deletePetition(`Editorial/delete/${pe}`)
      .then(() => {
        getPetition(`Editorial/all`, setData);
      })
      .catch((error) => {
        console.error("Error eliminando Editorial:", error);
      });
  };

  const columns = EditorialColumn({ data, setData, handleDelete });
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
  const handleExport = async () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Editorial");

    worksheet.columns = columns.map((column) => ({
      header: column.header,
      key: column.accessorKey,
      width: 20,
    }));

    table.getRowModel().rows.forEach((row) => {
      const rowData = row.getVisibleCells().reduce((acc, cell) => {
        acc[cell.column.id] = cell.getValue();
        return acc;
      }, {});
      worksheet.addRow(rowData);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Editorial.xlsx");
  };
  return (
    <div>
      <div className="my-6">
        <Button onClick={handleExport}>Exportar a Excel</Button>
      </div>
      <div className="p-4">
        <Card className="mb-5 p-4">
          <h2 className="scroll-m-20  pb-6 text-2xl font-semibold tracking-tight first:mt-0 ">
            Configuracion de Editoriales
          </h2>
          <div className="flex items-center py-4 justify-between">
            <CreateEditorial setData={setData} />
            <Input
              placeholder="Buscar Editorial"
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
  );
}
