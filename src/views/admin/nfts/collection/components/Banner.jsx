import NftBanner2 from "assets/img/nfts/NftBanner2.png";
import NftProfile from "assets/img/nfts/NftProfile.png";
import { MdVerified } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import Card from "components/card";
const Banner = () => {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-[20px]">
      <div
        style={{ backgroundImage: `url(${NftBanner2})` }}
        className="relative flex h-[150px] w-full items-center justify-center rounded-[20px] bg-cover md:h-[120px] lg:h-[170px] 3xl:h-[220px]"
      >
        <div className="absolute -bottom-20 flex h-[180px] w-[180px] items-center justify-center rounded-full border-[10px] border-white bg-navy-700 dark:!border-navy-900">
          <img className="h-full w-full rounded-full" src={NftProfile} alt="" />
        </div>
      </div>
      {/* profile info */}
      <div className="mt-[85px] flex flex-col items-center">
        <h1 className="mt-2 text-[55px] font-bold text-navy-700 dark:text-white">
          Abstractus®
        </h1>
        <p className="mt-[10px] flex w-full items-center justify-center text-lg font-medium text-gray-600">
          Created by{" "}
          <p className="ml-1 text-base font-bold text-[#3965FF] dark:text-white">
            simmmple.web{" "}
          </p>
          <p className="ml-1 text-[#3965FF]">
            <MdVerified />
          </p>
        </p>
      </div>
      {/* eth owned */}
      <Card
        extra={
          "grid grid-cols-1 dark:shadow-none md:grid-cols-4 w-full md:w-[800px] h-full md:h-[160px] gap-2 py-4 mt-9"
        }
      >
        <div className="flex flex-col items-center justify-center border-gray-200 py-3 dark:border-white/10 md:border-r-2 md:py-0">
          <h3 className="text-4xl font-bold text-navy-700 dark:text-white">
            28
          </h3>
          <p className="text-base text-gray-600">Items</p>
        </div>

        <div className="flex flex-col items-center justify-center border-gray-200 py-3 dark:border-white/10 md:border-r-2 md:py-0">
          <h3 className="text-4xl font-bold text-navy-700 dark:text-white">
            4.8
          </h3>
          <p className="text-base text-gray-600">Owners</p>
        </div>
        <div className="flex flex-col items-center justify-center border-gray-200 py-3 dark:border-white/10 md:border-r-2 md:py-0">
          <h3 className="flex items-center text-4xl font-bold text-navy-700 dark:text-white">
            <p className="text-3xl">
              <FaEthereum />
            </p>
            0.56
          </h3>
          <p className="text-base text-gray-600">Floor Price</p>
        </div>
        <div className="flex flex-col items-center justify-center py-3 md:py-0">
          <h3 className="flex items-center text-4xl font-bold text-navy-700 dark:text-white">
            <p className="text-3xl">
              <FaEthereum />
            </p>
            33.8
          </h3>
          <p className="text-base text-gray-600">Volume Traded</p>
        </div>
      </Card>
      <div className="flex h-full w-full items-center justify-center md:w-[760px] lg:w-[870px]">
        <p className="mt-10 w-[280px] text-center font-dm text-lg leading-8 text-navy-700 dark:text-white md:w-full md:text-lg">
          The Abstractus® project is an online art show and the First Art NFTs
          on Ethereum, launched on May 9, 2017. Abstractus® features 28 unique
          series of cards from 7 different artists. Abstractus® are referenced
          with CryptoAbstractus® and Crypto in the original ERC-721 Non-Fungible
          Token Standard, and pre-dates them both. Join the Abstractus® Discord
          and check out theAbstractus® Docs to find out more.
        </p>
      </div>
    </div>
  );
};

export default Banner;
