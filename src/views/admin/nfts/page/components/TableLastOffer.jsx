import React from "react";
import { FaEthereum } from "react-icons/fa";
import Card from "components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function CheckTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PRICE</p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="text-black text-base font-bold !text-navy-700 dark:!text-white">
            <FaEthereum />
          </div>
          <div className="text-base font-bold text-navy-700 hover:cursor-pointer dark:text-white">
            {info.getValue()} ETH
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("usd", {
      id: "usd",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          USD PRICE
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("expiration", {
      id: "expiration",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          EXPIRATION
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("from", {
      id: "from",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">FROM</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-[#3965FF] dark:text-white">
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
    <Card extra={"w-full h-full sm:overflow-auto p-6"}>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Latest Offers
        </p>
        <button className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
          See all
        </button>
      </div>

      <div className="mt-6 overflow-x-scroll xl:overflow-x-hidden">
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
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start"
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
                          className="min-w-[150px] border-white/0 py-3  pr-4"
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
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper();
