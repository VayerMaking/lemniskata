import { Polygon, ScaleControl, MapContainer, Marker, Popup, TileLayer, Rectangle, useMapEvents, useMapEvent, useMap, Pane, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Trash } from 'tabler-icons-react';
import L from 'leaflet';
const center = [0,0];
const data = require('../../json/poly.geo.json');

const polygon = [
  [0, 100],
  [30, 100],
  [20, 30],
]
const purpleOptions = { color: 'purple' }

const GetMousePos = ({ map }) => {
  // const [marker, setMarker] = useState([])
  const [featured, setFeatured] = useState([]);


  useEffect(() => {
    if (!map) return;
    map.on('click', (e) => {
      // console.log(map.getPanes());
      const { lat, lng } = e.latlng;
      
      // console.log(e.target._layers[26]._tiles); 
      // console.log(e.latlng);
      // console.log(e.layerPoint);
      let children = map.getPanes().mapPane.children[0].children[0].children[0].childNodes
      let children2 = map.getPanes().mapPane.children[0].children[0].children[0].childNodes

      var regEx = /translate3d\((\d+)px, (\d+)px.*\)/gm
      for(let k = 0; k < children.length; k++){
        const {x,y} = children[k]._leaflet_pos
        
        // console.log(128 - (Math.abs(y) - Math.abs(e.layerPoint.y)));
        if(256 - Math.abs(y - e.layerPoint.y) > 0 && 256 - Math.abs(x - e.layerPoint.x) > 0 ){
              console.log(children[k].src);
              // console.log(children[k].style.transform);
              //console.log(getMatches(children[k].style.transform, myRegEx, 2))
              // const match = regEx.exec(children[k].style.transform)
              //console.log(children[k].style.transform);
              console.log();
        }
      }
      //console.log(e.layerPoint.divideBy(256));
      //console.log(featured);
      

      // console.log(lat,lng); 
      // console.log(map.tile);
      // console.log(L.tileLayer);
      // var layer = L.marker(e.latlng).addTo(map);
      // layer.addTo(map);
      // console.log(data.geometries[0].coordinates);
    })

    for(let i=0; i < data.lenght; i++){
      console.log(data);
      
    }

  }, [map]);
  return null
}



const Map = () => {
  const center = [0, 0]
  const [map, setMap] = useState(null);


  const poly = [] as  any;

  for(let i=0; i < data.geometries.length; i++){

    //console.log(data.geometries[i].coordinates);
    poly.push(<Polygon key={i} pathOptions={purpleOptions} positions={data.geometries[i].coordinates}/>)
  }

  useEffect(() => {
    fetch("leskata/json/poly.geo.json")
      .then((res) => res.json())
      .then((geos) => geos.filter((geo) => {
        console.log(geo);
        
      }))
      // .then((matched) => setVideo(matched[0]));
  }, []);

  return (
    <MapContainer whenCreated={setMap}  center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{height: "1000px", width: "100%"}}>
      <TileLayer url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
      />
      {/* <Polygon pathOptions={purpleOptions} positions={data.geometries[1].coordinates} /> */}
        <GetMousePos map={map} />
        {/* {poly} */}
    </MapContainer>
  )
}

export default Map