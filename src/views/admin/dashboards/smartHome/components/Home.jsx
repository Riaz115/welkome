// Assets
import home from 'assets/img/dashboards/home.png';
import Card from 'components/card';

const Home = () => {
  return (
    <Card
      extra={
        'bg-cover bg-no-repeat min-h-[320px] md:w-full md:h-full xl:w-full xl:h-full relative'
      }
      style={{ backgroundImage: `url(${home})` }}
    >
      <button className="absolute left-5 bottom-8 flex items-center justify-center rounded-full bg-homeButton px-4 py-2 text-base font-medium text-white backdrop-blur-md">
        More photos
      </button>
    </Card>
  );
};

export default Home;
