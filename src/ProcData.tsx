import { csv } from 'd3-fetch';
import geojsonData from './assets/custom.geo.json';
import { FeatureCollection, Geometry } from 'geojson';

/**
 * Takes both the geojson country borders file and CO2 emissions file (csv) 
 * to to dynamically change fill colour of colour depending on CO2 emmisions per year.
 * Populates each nation key with indiviual year keys containing co2 emissions
 */
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
