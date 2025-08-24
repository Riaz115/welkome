import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdEdit } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
const columnHelper = createColumnHelper();
// const columns = columnsDataCheck;
export default function ComplexTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="flex items-center gap-2 pr-16 text-sm font-bold text-gray-600 sm:min-w-[120px] md:min-w-[150px] lg:w-full lg:pr-0">
          NAME
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2 pr-16 sm:min-w-[120px] md:min-w-[150px] lg:w-full lg:pr-0">
          <img className="h-9 w-9 rounded-xl" src={info.getValue()[2]} alt="" />
          <div className="flex w-full flex-col">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()[0]}
            </p>
            <p className="text-sm font-medium text-gray-600">
              {info.getValue()[1]}
            </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="w-full text-sm font-bold text-gray-600 sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          DATE
        </p>
      ),
      cell: (info) => (
        <p className="w-full text-sm font-bold dark:text-white sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("permissions", {
      id: "permissions",
      header: () => (
        <p className="w-full text-sm font-bold text-gray-600 sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          PERMISSIONS
        </p>
      ),
      cell: (info) => (
        <p className="w-full text-sm font-bold dark:text-white sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          <div
            className={`flex w-[95px] items-center justify-center rounded-[10px] py-1.5 text-sm font-bold uppercase ${
              info.getValue().toLowerCase() === "rejected"
                ? "bg-red-100 text-red-500 dark:bg-red-50"
                : "bg-green-100 text-green-500 dark:bg-green-50"
            }`}
          >
            {info.getValue()}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
          PRICE
        </p>
      ),
      cell: (info) => (
        <div
          className={`w-full text-sm font-bold dark:text-white sm:min-w-[100px] lg:min-w-[unset]`}
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("edit", {
      id: "edit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white sm:max-w-[40px] md:max-w-[4å0px] lg:max-w-[unset]"></p>
      ),
      cell: (info) => (
        <button className="flex max-h-fit w-full max-w-max cursor-pointer items-end justify-center text-xl text-gray-600">
          <MdEdit />
        </button>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full h-full px-8 pb-8 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Team Management
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="mb-2 cursor-pointer border-b border-gray-200 pb-4 pr-4 pt-4 text-start dark:border-white/10"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 20)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="border-white/0 py-3 pr-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
