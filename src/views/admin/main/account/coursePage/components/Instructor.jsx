const Instructor = () => {
  return (
    <div className="w-full rounded-xl bg-lightPrimary px-[20px] py-[20px] dark:bg-navy-700">
      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
        About Instructor
      </h4>
      <div className="mt-[14px] flex items-center gap-[17px]">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full">
          <img
            className="h-full w-full rounded-full"
            src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
            alt=""
          />
        </div>
        <div className="">
          <h5 className="text-base font-bold leading-6 text-navy-700 dark:text-white">
            Michael J. Storm
          </h5>
          <p className="text-sm font-medium text-gray-600">
            Marketing Department
          </p>
        </div>
      </div>
      <p className="mt-[18px] leading-6 text-navy-700 dark:text-white">
        Michael is an entrepreneur at heart, he builds businesses. Currently, he
        helps Fortune 100 brands leverage consumer attention through his full
        service advertising agency, Kaizoo.
      </p>
      <button className="mt-4 w-full rounded-full bg-brand-500 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        See all courses
      </button>
    </div>
  );
};

export default Instructor;
