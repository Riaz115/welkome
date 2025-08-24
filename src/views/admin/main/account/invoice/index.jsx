import Card from 'components/card';
import Banner from './components/Banner';
import Content from './components/Content';

const Invoice = () => {
  return (
    <div className="mt-3 w-full rounded-[20px] font-dm md:h-[1150px] 3xl:px-52">
      <Card extra={'w-full xl:w-[95%] 3xl:w-[82%] mx-auto p-4 h-full'}>
        {/* banner */}
        <div>
          <Banner />

          <div className="mx-auto -mt-[80px] overflow-visible px-2 md:-mt-10 md:px-14 lg:w-[90%] 3xl:w-[90%]">
            <Content />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
