// components
import Auction from "./components/Auction";
import Description from "./components/Description";
import TableLastOffer from "./components/TableLastOffer";
import tableDataLastOffer from "./variables/tableDataLastOffer";
import NftCard from "components/card/NftCard";
import Banner from "./components/Banner";

//assets
import NftLarge1 from "assets/img/nfts/NftLarge1.png";
import AvatarSimmmple from "assets/img/avatars/avatarSimmmple.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

const NftPage = () => {
  return (
    <div className="mt-4 grid h-full w-full grid-cols-1 gap-5 xl:mt-3">
      <div className="gap-[20px] grid h-full w-full grid-cols-6">
        <div className="col-span-6 lg:col-span-3">
          <Banner image={NftLarge1} />
          <Description
            creator={"simmmple.web"}
            description={
              " The Abstractus® project is an online art show and the First Art NFTs on Ethereum, launched on May 9, 2017. Abstractus® features 28 unique series of cards from 7 different artists. Abstractus® are referenced with CryptoAbstractus® and Crypto in the original ERC-721 Non-Fungible Token Standard, and pre-dates them both. Join the Abstractus® Discord and check out theAbstractus® Docs to find out more."
            }
          />
        </div>

        <div className=" col-span-6 lg:!col-span-3">
          <div className=" xl:px-16">
            <Auction
              name="Color Abstractus®"
              creator="Simmmple"
              creatorAvatar={AvatarSimmmple}
              price="3.87 ETH"
              bid="2.82 ETH"
            />
          </div>
          <div className="pt-4">
            <TableLastOffer tableData={tableDataLastOffer} />
          </div>
        </div>
      </div>
      {/* NFT card */}

      <div className="h-full w-full rounded-[20px]">
        <h4 className="ml-5 mt-7 text-2xl font-medium text-navy-700 dark:text-white">
          More from this collection
        </h4>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price=" 0.91"
            image={Nft2}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price=" 0.7"
            image={Nft4}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price=" 2.91"
            image={Nft5}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price=" 2.91"
            image={Nft6}
          />
        </div>
      </div>
    </div>
  );
};

export default NftPage;
