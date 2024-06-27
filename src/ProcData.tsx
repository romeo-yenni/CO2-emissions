import { csv } from 'd3-fetch';
import geojsonData from './assets/custom.geo.json';
import { FeatureCollection, Geometry } from 'geojson';

const ProcData = async (): Promise<FeatureCollection<Geometry>> => {

  const data = await csv('src/assets/ghg-emissions.csv');

  geojsonData.features.forEach((feature) => {
    const countryData = data.find((row) => row.iso === feature.properties?.iso_a3);
    if (countryData) {
      feature.properties = {
        ...feature.properties,
        ...countryData,
      };
    }
  });
  return geojsonData as FeatureCollection<Geometry>;
}

export default ProcData;
