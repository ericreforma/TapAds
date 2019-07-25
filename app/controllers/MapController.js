import { CampaignTripSchema, CampaignTripMapSchema } from '../database';
import Geocoder from 'react-native-geocoder';

const rad = (x) => (x * Math.PI / 180);

export const MapController = {
  Points: (dataMap) => {
    const lats = [];
    const lons = [];
    let latitudeDelta = 0;
    let longitudeDelta = 0;

    const coordinates = dataMap.map(c => c.map(geo => geo.map(coord =>
      {
          lats.push(coord[1]);
          lons.push(coord[0]);
          const coor = {
            latitude: coord[1],
            longitude: coord[0],
          };
          return coor;
      }))
    );
    const minX = Math.min.apply(null, lats);
    const maxX = Math.max.apply(null, lats);
    const minY = Math.min.apply(null, lons);
    const maxY = Math.max.apply(null, lons);

    latitudeDelta = maxX - minX;
    longitudeDelta = maxY - minY;
    const region = {
      latitude: (minX + maxX) / 2,
      longitude: (minY + maxY) / 2,
      latitudeDelta,
      longitudeDelta
    };

    return { region, coordinates };
  },

  isInsidePolygon: (polygons, point) => {
    let isInside = false;
    let counter = 0;

    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      const x = point.latitude;
      const y = point.longitude;

      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xLat = polygon[i].latitude;
        const yLat = polygon[i].longitude;
        const xLon = polygon[j].latitude;
        const yLon = polygon[j].longitude;

        const intersect = ((yLat > y) !== (yLon > y)) &&
          (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat);

        if (intersect) {
          inside = !inside;
        }
      }

      if (inside) {
        counter += 1;
      }
    }
    if (counter > 0) {
      isInside = true;
    }
    return isInside;
  },

  getDistanceBetween: (p1, p2) => {
    const R = 6378137;
    const dLat = rad(p2.latitude - p1.latitude);
    const dLong = rad(p2.longitude - p1.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return (d / 1000).toFixed(2);
  },

  DBInsert: (campaignTrip, campaignTripMap) => {
    const tripId = CampaignTripSchema.insert(campaignTrip);
    campaignTripMap.forEach(trip => {
      let ctrip = trip;
      ctrip.campaign_id = campaignTrip.campaign_id;
      ctrip.campaign_trip_id = tripId;

      CampaignTripMapSchema.insert(ctrip);
    });
  },

  getAddress: coords =>
    new Promise((resolve, reject) => {
      const co = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      let address = {
        formattedAddress: '',
        feature: '',
        streetNumber: '',
        streetName: '',
        postalCode: '',
        locality: '',
        country: '',
        countryCode: '',
        adminArea: '',
        subAdminArea: '',
        subLocality: '',
      };

      const res = Geocoder.geocodePosition(co);

      res
        .then(reso => {
          resolve(reso[0]);
        })
        .catch(err => {
          resolve(address);
          console.log(err);
        });
    }),
};
