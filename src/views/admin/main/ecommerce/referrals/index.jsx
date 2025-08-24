import Earn from "./components/Earn";
import Invite from "./components/Invite";
// Assets
import {
  MdAttachMoney,
  MdCreditCard,
  MdPerson,
  MdRedo,
  MdShowChart,
} from "react-icons/md";
import tableDataReferrals from "./variables/tableDataReferrals";

import MiniStatistics from "components/card/MiniStatistics";
import ReferralsTable from "./components/ReferralsTable";
const Referrals = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-12 gap-5 rounded-[20px]">
      <div className="col-span-12 w-full 3xl:col-span-8">
        <Earn />
      </div>
      <div className="col-span-12 w-full 3xl:col-span-4">
        <Invite />
      </div>
      {/* Statistics */}
      <div className="z-0 col-span-12 grid h-full w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        <MiniStatistics
          name="Your Earnings"
          value="$127,589"
          icon={<MdAttachMoney />}
          iconBg="bg-lightPrimary"
        />

        <MiniStatistics
          name="Your Profit"
          value="$67,323"
          icon={<MdShowChart />}
          iconBg="bg-lightPrimary"
        />
        <MiniStatistics
          name="Customers"
          value="$1,849"
          icon={<MdPerson />}
          iconBg="bg-lightPrimary"
        />
        <MiniStatistics
          name="Average Value"
          value="$69.00"
          icon={<MdCreditCard />}
          iconBg="bg-lightPrimary"
        />
        <MiniStatistics
          name="Refund Rate"
          value="5.70%"
          icon={<MdRedo />}
          iconBg="bg-lightPrimary"
        />
      </div>
      {/* Table */}
      <div className="col-span-12">
        <ReferralsTable tableData={tableDataReferrals} />
      </div>
    </div>
  );
};

export default Referrals;
