// import bgMaster from 'assets/img/dashboards/Debit.png';
import { RiMastercardFill } from "react-icons/ri";

function MasterCard(props) {
  const { number, CCV, expDate } = props;
  return (
    <div
      // style={{ backgroundImage: `url(${bgMaster})` }}Ma
      className="w-full rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 bg-cover bg-no-repeat py-2 px-[20px]"
    >
      <div className="flex items-center justify-between pt-3">
        <h2 className="text-2xl font-bold text-white">Glassy.</h2>
        <div className="text-[50px] text-white">
          <RiMastercardFill />
        </div>
      </div>
      <h3 className="mt-[40px] text-xl font-bold text-white">{number}</h3>
      {/* Card info */}
      <div className="mt-3 flex gap-[28px]">
        <div>
          <h5 className="text-xs font-extralight text-white">VALID THRU</h5>
          <p className="text-sm font-medium text-white"> {expDate} </p>
        </div>
        <div>
          <h5 className="text-xs font-extralight text-white">CVV</h5>
          <p className="text-sm font-medium text-white"> {CCV} </p>
        </div>
      </div>
    </div>
  );
}

export default MasterCard;
