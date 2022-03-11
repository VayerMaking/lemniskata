import { MapContainer, Marker, Popup, TileLayer, Rectangle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const center = [0, 0]
  const rectangle = [
    [0, 10],
    [10, 20],
  ]
  const blackOptions = { color: 'black' }
  return (
    <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={false} style={{height: "1000px", width: "100%"}}>
      <TileLayer
        url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
      />
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </MapContainer>
  )
}

export default Map