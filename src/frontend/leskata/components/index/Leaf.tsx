import {
    Polygon,
    ScaleControl,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    Rectangle,
    useMapEvents,
    useMapEvent,
    useMap,
    Pane,
    Circle,
    
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {useCallback, useMemo, useRef, useState, useEffect} from 'react'

var axios = require('axios');

const Iter = (x, y, z) => {

    x -= 1
    y -= 1
    let arr = []

    for (let k = 0; k < 3; k++) {
        for (let p = 0; p < 3; p++) {
            arr.push({x: x + k, y: y + p, z: z})
        }
    }

    return arr
}

const purpleOptions = {fillColor: 'blue'}

const yellowOptions = {color: 'red'}
const fillBlueOptions = { fillColor: 'blue' }

const ShowPoly = ({ mapContainer, polygons }) => {
  return polygons.map((poly, index) => {
    return  <Circle key={index} uniceid={index} center={poly} pathOptions={purpleOptions} radius={500000} />
  })
}


const GetMousePos = ({map, weather, terrain}) => {
    // const [marker, setMarker] = useState([])
    const [polygon, setPolygon] = useState([])
    const [topo, setTopo] = useState([])
    const [tornado, setTornado] = useState([])

    let points = {
      "To-print": [
        {
          "x": 3,
          "y": 4,
          "z": 5,
          "p": 0.453
        },
        {
          "x": 4,
          "y": 1,
          "z": 43,
          "p": 0.345
        }
      ],
      "analyze": [
        {
          "x": 1,
          "y": 4,
          "z": 4,
          "p": 0.3456
        },
        {
          "x": 2,
          "y": 4,
          "z": 5,
          "p": 0.2345
        },
        {
          "x": 7,
          "y": 26,
          "z": 45,
          "p": 0.4578567
        },
        {
          "x": 10,
          "y": 5,
          "z": 45,
          "p": 0.4578567
        },
        {
          "x": 25,
          "y": 40,
          "z": 45,
          "p": 0.4578567
        }
      ]
    }

    useEffect(() => {
        if (!map) return;

        const bounds = map.getBounds();

        map.setMaxBounds(bounds);
        map.fitBounds(bounds, { reset: true });
        map.on('click', (e) => {
            if (!e) return;
            // let { lat, lng } = e.latlng;

            
            if(weather == true){
              
              setTornado(pol => [...pol, [map.mouseEventToLatLng(e.originalEvent).lat, map.mouseEventToLatLng(e.originalEvent).lng]]);
              
            }
            else if(terrain == true){
              for(let j=0; j< points.analyze.length; j++){
                setTopo(pol => [...pol, [points.analyze[j].x, points.analyze[j].y]]);  
              }
            }
            
            
            let children = map.getPanes().mapPane.children[0].children[0].children[0].childNodes;
            if (children.length == 0) return;

            let json = [];
            for (let k = 0; k < children.length; k++) {
                let {x, y} = children[k]._leaflet_pos

                if (128 - Math.abs(e.layerPoint.y - y) > 0 && 128 - Math.abs(e.layerPoint.x - x) > 0) {
                    console.log(x, y);
                    //console.log(e.layerPoint.x, e.layerPoint.y);
                    let picZ = children[k].src.split('https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/')[1].split('/')[0];
                    let picY = children[k].src.split('https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/')[1].split('/')[1];
                    let picX = children[k].src.split('https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/')[1].split('/')[2].split('.')[0];
                    

                    let iter = Iter(picX, picY, Number(picZ))

                    for (let p = 0; p < iter.length; p++) {
                        json.push(iter[p])
                    }

                    console.log(children[k].src);
                }
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            console.log(JSON.stringify(json));

            // http://3496-91-238-251-84.ngrok.io/getHeightMap

            const config = {
                method: 'post',
                url: 'http://e6ee-91-238-251-84.ngrok.io/getWeatherMap',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify(json)
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }, [map]);

 


    return tornado.length > 0  ? ( 
      <ShowPoly
        mapContainer={map}
        polygons={tornado} />
    )
      : null
}

// topo.length > 0 ? (<ShowPoly color={yellowOptions} mapContainer={map} polygons={topo}/>) : null ]
// || topo.length > 0 ? (<ShowPoly color={yellowOptions} mapContainer={map} polygons={topo}/>) : null

const Map = ({weather, terrain}) => {
    
  const [map, setMap] = useState(null);
    return (
        <MapContainer fullscreenControl={true} minZoom={2} whenCreated={setMap} center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{height: "1000px", width: "100%"}}>
            <TileLayer
                url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"/>
            {/* <Polygon pathOptions={purpleOptions} positions={polygon}/> */}
            <GetMousePos weather={weather} terrain={terrain} map={map}/>
            
            
            {/* <Polyline pathOptions={purpleOptions} positions={[1, 4]} /> */}
        </MapContainer>
    )
}
export default Map