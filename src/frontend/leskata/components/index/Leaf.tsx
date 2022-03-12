import { Polygon, ScaleControl, MapContainer, Marker, Popup, TileLayer, Rectangle, useMapEvents, useMapEvent, useMap, Pane, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Trash } from 'tabler-icons-react';
import L from 'leaflet';
const center = [0,0];
const data = require('../../json/poly.geo.json');

const polygon = [
  [34.161818161230386, -85.95703125000001],
  [-17.811456088564473, -60.46875000000001],
  [21.779905342529645, -27.421875000000004]
]

const purpleOptions = { color: 'purple' }

const ShowPoly = ({ mapContainer, polygons }) => {
  return polygons.map((poly, index) => {
    return  <Circle key={index} uniceid={index} center={poly} pathOptions={purpleOptions} radius={1000000} />
  })
}


const GetMousePos = ({ map }) => {
  // const [marker, setMarker] = useState([])
  const [polygon, setPolygon] = useState([])

  let polygonList = []
  useEffect(() => {
    if (!map) return;

    map.on('click', (e) => {
      if (!e) return;
      // console.log(map.getPanes());
      // let { lat, lng } = e.latlng;
      
      // console.log(lat, lng);
      
      // polygonList.push(map.mouseEventToLatLng(e.originalEvent))
      
      setPolygon(pol => [...pol, [map.mouseEventToLatLng(e.originalEvent).lat, map.mouseEventToLatLng(e.originalEvent).lng]]);

      // console.log(e.target._layers[26]._tiles); 
      // console.log(e.latlng);
      // console.log(e.layerPoint);
      // let x = map.getPanes().mapPane.children[0].children[0].children[0].childNodes[1]._leaflet_pos.x
      // let y = map.getPanes().mapPane.children[0].children[0].children[0].childNodes[1]._leaflet_pos.y
            
      
      // if(e.layerPoint.y !== map.layerPointToLatLng({x:x,y:y}).lat){
      //   console.log("xd"+e.layerPoint.y);
      //   console.log("dx"+map.layerPointToLatLng({x:x,y:y}).lat);
        
        
      // }
      // if(map.getPanes().mapPane.children[0].children[0].children[0]){
      //   children = map.getPanes().mapPane.children[0].children[0].children[0].childNodes
      // }
      // else{
      //   children = map.getPanes().mapPane.children[0].children[0].children[1].childNodes
      // }
      
      let children = map.getPanes().mapPane.children[0].children[0].children[0].childNodes;
      if(children.length == 0) return;

      // if(map.getPanes().mapPane.children[0].children[0].children[0].childNodes == ''){
      //   children = map.getPanes().mapPane.childNodes[0].childNodes[0].childNodes[1].childNodes[0]
      // }
      // else{
      //   children = map.getPanes().mapPane.children[0].children[0].children[0].childNodes
      // }
      
      
      // console.log(map.containerPointToLatLng(map.getPanes().mapPane.children[0].children[0].children[0].childNodes[1]._leaflet_pos));
      console.log(map.getPanes());
      
      var regEx = /translate3d\((\d+)px, (\d+)px.*\)/gm
      let json = {
        data: []
     };
      for(let k = 0; k < children.length; k++){
        let {x,y} = children[k]._leaflet_pos
        
        // console.log(128 - (Math.abs(y) - Math.abs(e.layerPoint.y)));
        if(128 - Math.abs(e.layerPoint.y - y) > 0 && 128 - Math.abs(e.layerPoint.x - x) > 0 ){
          console.log(x,y);
          //console.log(e.layerPoint.x, e.layerPoint.y);  
          // console.log(`https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/3/${Number(picX) + 1}/${Number(picY) + 1}.jpg`);
          console.log(children[k].src );
          json.data.push({x: x, y:y, url:children[k].src})            
            // console.log(map.layerPointToContainerPoint({x:x,y:y}))
            // console.log(map.containerPointToLatLng({x:map.layerPointToContainerPoint({x:x,y:y}).x,y: map.layerPointToContainerPoint({x:x,y:y}).y}))

              // console.log(map.layerPointToLatLng({x:x,y:y}).lat);
              // json.data.push({x: map.layerPointToLatLng({x:x,y:y}).lat, y:map.layerPointToLatLng({x:x,y:y}).lng, url: children[k].src });
        }
      }

     console.log(json);
      //console.log(e.layerPoint.divideBy(256));
      //console.log(featured);
      

      // console.log(lat,lng); 
      // console.log(map.tile);
      // console.log(L.tileLayer);
      // var layer = L.marker(e.latlng).addTo(map);
      // layer.addTo(map);
      // console.log(data.geometries[0].coordinates);
    })

    

  }, [map]);
  return polygon.length > 0  ? ( 
    <ShowPoly
      mapContainer={map}
      polygons={polygon} />
  )
    : null
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
      {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
        <GetMousePos map={map} />
        {/* {poly} */}
    </MapContainer>
  )
}

// data.geometries[1].coordinates
export default Map