import React from "react";
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
    columnHelper.accessor("item", {
      id: "item",
      header: () => (
        <p className="min-w-[120px] text-sm font-bold text-gray-600 dark:text-white md:min-w-[200px]">
          ITEM
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: () => (
        <p className="min-w-[120px] text-sm font-bold text-gray-600 dark:text-white md:min-w-[150px]">
          QUANTITY
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("rate", {
      id: "rate",
      header: () => (
        <p className="min-w-[120px] text-sm font-bold text-gray-600 dark:text-white md:min-w-[150px]">
          RATE
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="min-w-[120px] text-sm font-bold text-gray-600 dark:text-white md:min-w-[150px]">
          AMOUNT
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
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
    <div className="w-full overflow-x-scroll dark:!bg-navy-800 2xl:overflow-x-hidden">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="!border-px !border-gray-200">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="mt-[20px] cursor-pointer border-b border-gray-200 pb-2 pl-7 pt-4 text-start text-sm dark:border-white/10"
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
            .rows.slice(0, 5)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="mt-[20px] border-b px-[100px] py-[32px] pl-7 text-sm dark:border-white/10"
                      >
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
  );
}
