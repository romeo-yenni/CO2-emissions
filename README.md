# Mapping app

## Introduction

A map application the shows CO2 produced by nations by year (colour coded). Users are also able to bookmark locations and visit them.

## Features

- Visual representation of CO2 emissions by nations
- Bookmarking location (visit and delete)

## Libraries, Data, and API's

### Mapping
MapLibre and OpenStreetMaps.
GeoJson of nation borders from: https://geojson-maps.kyd.au/

### DataSets
CO2 emission dataset from: https://www.climatewatchdata.org/?utm_source=cait.wri.org&utm_medium=redirect
Data contains annual CO2 emission from nation from 1960 to 2021

### UI
UI components from shacn/ui.

## Installation

```bash
# Clone the repository
git clone https://github.com/romeo-yenni/CO2-emissions.git

# Navigate into the directory
cd your_project/

# Install dependencies
npm install
```

## Running

```bash
# Run app in browser
npm run dev
```
