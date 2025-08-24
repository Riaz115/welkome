import Barcode from "assets/img/ecommerce/Code-128.png";
const Details = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between rounded-[20px] bg-white bg-clip-border px-[35px] pt-8 pb-11 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-row">
      {/* left side */}
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div>
          <p className="text-base font-medium leading-6 text-gray-600">
            Customer Details:
          </p>
          <h3 className="text-xl font-bold leading-7 text-navy-700 dark:text-white">
            Anthony Petterson
          </h3>
          <p className="text-base font-medium leading-6 text-gray-600">
            37 Avenue, Boggstown,
          </p>
          <p className="text-base font-medium leading-6 text-gray-600">
            Indiana, United States 84219
          </p>
        </div>
        <div>
          <p className="text-base font-medium text-gray-600">+1932 769400421</p>
          <p className="font-medium text-navy-700">
            <a
              className="text-brand-500 underline hover:text-brand-500 dark:text-white"
              href=" "
            >
              anthony.petterson@gmail.com
            </a>
          </p>
          <p className="text-base font-medium text-gray-600">By Credit Card</p>
          <p className="text-base font-medium text-gray-600">
            July 27, 2022 at 09:44 AM
          </p>
        </div>
      </div>
      {/* barcode image */}
      <div className="mt-5 h-[112px] w-[112px] rounded-[20px] md:!mt-0">
        <img src={Barcode} className="h-full w-full" alt="barcode" />
      </div>
    </div>
  );
};

export default Details;
