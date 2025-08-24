import Transfer from "components/dataDisplay/Transfer";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import Card from "components/card";

function YourTransfers() {
  return (
    <Card extra={"!p-5 h-full"}>
      <h4 className="mb-[22px] ml-px text-lg font-bold text-navy-700 dark:text-white">
        Your Transfers
      </h4>

      <Transfer
        name="From Alex Manda"
        date="Today, 16:36"
        sum="+$50"
        avatar={avatar1}
      />
      <Transfer
        name="To Laura Santos"
        date="Today, 08:49"
        sum="-$27"
        avatar={avatar2}
      />
      <Transfer
        name="From Jadon S."
        date="Yesterday, 14:36"
        sum="+$157"
        avatar={avatar3}
      />
      <Transfer
        name="From Esthera J."
        date="Yesterday, 09:42"
        sum="+$92"
        avatar={avatar4}
      />
      <div className="mb-auto" />
      <div className="flex w-full items-center justify-end gap-1 hover:cursor-pointer">
        <div className="text-sm font-bold text-brand-500 transition-all hover:-translate-x-1 hover:cursor-pointer dark:text-white">
          View all
        </div>
        <div className="text-xl font-bold text-brand-500 transition-all hover:translate-x-1 hover:cursor-pointer dark:text-white">
          <BsArrowRight />
        </div>
      </div>
    </Card>
  );
}

export default YourTransfers;
