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
    Circle
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {useCallback, useMemo, useRef, useState, useEffect} from 'react'
import {Trash} from 'tabler-icons-react';
import L from 'leaflet';

var axios = require('axios');
const center = [0, 0];
const data = require('../../json/poly.geo.json');

const polygon = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
]

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

const purpleOptions = {color: 'purple'}

const ShowPoly = ({mapContainer, polygons}) => {
    return polygons.map((poly, index) => {
        return <Circle key={index} center={poly} pathOptions={purpleOptions} radius={1000000}/>
    })
}


const GetMousePos = ({map}) => {
    // const [marker, setMarker] = useState([])
    const [polygon, setPolygon] = useState([])

    let polygonList = []
    useEffect(() => {
        if (!map) return;

        map.on('click', (e) => {
            if (!e) return;
            // let { lat, lng } = e.latlng;

            // console.log(lat, lng);

            setPolygon(pol => [...pol, [map.mouseEventToLatLng(e.originalEvent).lat, map.mouseEventToLatLng(e.originalEvent).lng]]);

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

                    let iter = Iter(picX, picY, picZ)

                    for (let p = 0; p < iter.length; p++) {
                        json.push(iter[p])
                    }


                    console.log(children[k].src);
                }
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            console.log(JSON.stringify(json));


            const data = JSON.stringify({
                "hello": "world",
                "received": "ok",
                "asdf": "qwerty"
            });

            const config = {
                method: 'post',
                url: 'http://3496-91-238-251-84.ngrok.io/getHeightMap',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify(json[0])
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
    return polygon.length > 0 ? (
            <ShowPoly
                mapContainer={map}
                polygons={polygon}/>
        )
        : null
}


const Map = () => {
    const center = [0, 0]
    const [map, setMap] = useState(null);

    return (
        <MapContainer whenCreated={setMap} center={[0, 0]} zoom={3} scrollWheelZoom={true}
                      style={{height: "1000px", width: "100%"}}>
            <TileLayer
                url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"/>
            <Polygon pathOptions={purpleOptions} positions={polygon}/>
            <GetMousePos map={map}/>
            {/* {poly} */}
        </MapContainer>
    )
}
export default Map