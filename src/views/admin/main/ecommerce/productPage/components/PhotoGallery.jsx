import { useState } from 'react';

const PhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(
    'https://i.ibb.co/Y8V1gLW/2212121212-1.jpg'
  );
  const Chair1 =
    'https://images.unsplash.com/photo-1527005980469-e172416c200b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80';
  const Chair2 =
    'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80';
  const Chair3 =
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80';
  const Chair4 =
    'https://images.unsplash.com/photo-1554104707-a76b270e4bbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
  const Chair5 =
    'https://images.unsplash.com/photo-1489269637500-aa0e75768394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2641&q=80';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full rounded-xl sm:h-full sm:w-fit md:h-[670px] md:w-fit lg:h-[600px] lg:w-[800px] xl:h-[555px] xl:w-[555px] 2xl:w-full 3xl:h-[745px]">
        <img
          src={currentImage}
          className="h-full w-full rounded-xl"
          alt="img"
        />
      </div>
      {/* small images */}
      <div className="mt-[10px] flex w-full items-center justify-between rounded-[20px] px-3 py-3 hover:cursor-pointer lg:justify-center xl:px-0 3xl:gap-[14px]">
        <div
          onClick={() => setCurrentImage(Chair1)}
          className="h-[42px] w-[42px] md:h-[104px] md:w-[104px] lg:h-[70px] lg:w-[70px] xl:h-[90] xl:w-[90px] 3xl:h-[130px] 3xl:w-[135px]"
        >
          <img className="h-full w-full rounded-xl" src={Chair1} alt="" />
        </div>
        <div
          onClick={() => setCurrentImage(Chair2)}
          className="h-[42px] w-[42px] md:h-[104px] md:w-[104px] lg:h-[70px] lg:w-[70px] xl:h-[90] xl:w-[90px] 3xl:h-[130px] 3xl:w-[135px]"
        >
          <img className="h-full w-full rounded-xl" src={Chair2} alt="" />
        </div>
        <div
          onClick={() => setCurrentImage(Chair3)}
          className="h-[42px] w-[42px] md:h-[104px] md:w-[104px] lg:h-[70px] lg:w-[70px] xl:h-[90] xl:w-[90px] 3xl:h-[130px] 3xl:w-[135px]"
        >
          <img className="h-full w-full rounded-xl" src={Chair3} alt="" />
        </div>
        <div
          onClick={() => setCurrentImage(Chair4)}
          className="h-[42px] w-[42px] md:h-[104px] md:w-[104px] lg:h-[70px] lg:w-[70px] xl:h-[90] xl:w-[90px] 3xl:h-[130px] 3xl:w-[135px]"
        >
          <img className="h-full w-full rounded-xl" src={Chair4} alt="" />
        </div>
        <div
          onClick={() => setCurrentImage(Chair5)}
          className="h-[42px] w-[42px] md:h-[104px] md:w-[104px] lg:h-[70px] lg:w-[70px] xl:h-[90] xl:w-[90px] 3xl:h-[130px] 3xl:w-[135px]"
        >
          <img className="h-full w-full rounded-xl" src={Chair5} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
