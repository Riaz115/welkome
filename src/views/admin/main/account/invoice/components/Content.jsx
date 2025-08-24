import InvoiceTable from "./InvoiceTable";
import tableDataInvoice from "views/admin/main/account/invoice/variables/tableDataInvoice";

const Content = () => {
  return (
    <div
      className={`h-full w-full rounded-[20px] bg-white pb-8 font-dm dark:!bg-navy-800`}
    >
      <div className="md:h-[190px] flex w-full flex-col justify-between rounded-[20px] p-7 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none md:flex-row">
        <div className="mb-4">
          <p className="text-base text-gray-600">Invoice for:</p>
          <p className="mt-[13px] mb-1.5 text-xl font-bold text-navy-700 dark:text-white">
            Anthony Petterson
          </p>
          <p className="leading-2 lg:text-md text-base text-gray-600">
            37 Avenue, Boggstown,
          </p>
          <p className="leading-2 lg:text-md text-base text-gray-600">
            Indiana, United States 84219
          </p>
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-2 mr-20 text-base text-gray-600">Amount due</p>
          <p className="text-[35px] lg:text-[40px] mb-1.5 font-bold text-navy-700 dark:text-white">
            $395.00
          </p>
          <div className="from-[#FF416C] to-[#FF4B2B] flex items-center justify-center rounded-[10px] bg-gradient-to-br px-2.5 py-1.5 text-base font-medium text-white">
            Due on Sep 30, 2022
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-10 w-full">
        <InvoiceTable tableData={tableDataInvoice} />
      </div>

      {/* Note */}
      <div className="mt-16 flex h-fit flex-col justify-between md:flex-row">
        <div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            Note
          </p>
          <p className="w-[290px] text-gray-600">
            Hi Anthony, please take a look at the this invoice from September.
            Let me know if you have any questions, thanks.
          </p>
        </div>

        <div className="mt-1 flex flex-col">
          <div className="gap-[120px] flex items-center justify-between">
            <p className="text-base text-navy-700 dark:text-white">Total</p>
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              $395
            </p>
          </div>
          <div className="gap-[120px] mt-2 flex items-center justify-between">
            <p className="text-base text-navy-700 dark:text-white">
              paid to date
            </p>
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              $0
            </p>
          </div>
          <div className="md:w-[230px] mt-6 h-px w-full bg-gray-200 dark:bg-white/10" />
          <div className="gap-[80px] mt-3 flex items-center justify-between">
            <p className="text-base text-navy-700 dark:text-white">
              Amount to pay
            </p>
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              $395
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
