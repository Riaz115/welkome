import NftCard from "components/card/NftCard";
import Banner from "./components/Banner";
import Search from "./components/Search";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

const NftCollection = () => {
  return (
    <div className="mt-3 h-full w-full rounded-[20px]">
      <Banner />
      <div className="mt-[70px] w-full">
        <Search />
      </div>

      <h4 className="ml-[23px] mt-8 text-2xl font-bold text-navy-700 dark:text-white">
        More from this collection
      </h4>

      <div className="mt-[38px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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
  );
};

export default NftCollection;
