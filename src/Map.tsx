import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import ProcData from './ProcData';

interface MapProps {
    bookmarkMode: Boolean;
    setBookMarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    setToggleBookmarkInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setCoords: React.Dispatch<React.SetStateAction<number[]>>;
    mapRef: React.MutableRefObject<maplibregl.Map | null>;
    year: number[];
}

const Map: React.FC<MapProps> = ({year, mapRef, setCoords, setToggleBookmarkInfo, bookmarkMode, setBookMarkMode}) => {

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: `https://api.maptiler.com/maps/bright/style.json?key=${import.meta.env.VITE_MAP_TILER_KEY}`,
      center: [10, 10],
      zoom: 2,
      minZoom: 2,
      pitchWithRotate: false,
      dragRotate: false,
      doubleClickZoom: false,
    });

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    const loadGeoJSON = async () => {
      const geojson = await ProcData();
      const existingSource = map.getSource('co2') as any;

      if (existingSource) {
        existingSource.setData(geojson);
      } 
      else {
        map.addSource('co2', {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: 'countries-layer-emissions',
          type: 'fill',
          source: 'co2',
          paint: {
            'fill-color': [
              'interpolate',
              ['exponential', 0.997],
              ["to-number", ["get", `${year[0]}`]],
              0, '#00FF00', 
              11500, '#FF0000',
            ],
            'fill-opacity': 0.6,
          },
        });
      }
    };

    map.on('load', loadGeoJSON)

    return () => {
      map.off('load', loadGeoJSON);
      if (map) {
        map.remove()
      }
    };

    

  }, [mapRef, year]);

  const handleDoubleClick = (e: maplibregl.MapMouseEvent) => {
      if (bookmarkMode) {
          setCoords([e.lngLat['lng'], e.lngLat['lat']])
          setToggleBookmarkInfo(true)
          setBookMarkMode(false)
      }
  }

  useEffect(() => {
    const map = mapRef.current
    if (!map) {
        return;
    }

    map.on('dblclick', handleDoubleClick)

    return () => {
        map.off('dblclick', handleDoubleClick)
    }

  }, [bookmarkMode]);

  return (
    <div className="w-full h-screen z-0">
      <div ref={mapContainerRef} className="absolute w-full h-full" />
    </div>
  );
}

export default Map;

