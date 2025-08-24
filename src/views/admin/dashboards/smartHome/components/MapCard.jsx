import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// Assets
import 'mapbox-gl/dist/mapbox-gl.css';
import Card from 'components/card';
import React from 'react';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2ltbW1wbGUiLCJhIjoiY2wxeG1hd24xMDEzYzNrbWs5emFkdm16ZiJ9.q9s0sSKQFFaT9fyrC-7--g'; // Set your mapbox token her

const MapCard = () => {
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark')
      ? 'mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5'
      : 'mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0'
  );
  React.useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          if (document.body.classList.contains('dark')) {
            setDarkmode('mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5');
            console.log(document.body.classList);
          } else {
            setDarkmode('mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0');
            console.log(document.body.classList);
          }
        }
      }
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);
  return (
    <Card extra={'relative w-full h-full bg-white px-3 py-[18px]'}>
      <Map
        initialViewState={{
          latitude: 37.692,
          longitude: -122.435,
          zoom: 13,
        }}
        style={{ borderRadius: '20px', width: '100%', minHeight: '600px' }}
        mapStyle={darkmode}
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </Card>
  );
};

export default MapCard;
