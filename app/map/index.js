import { MapController } from '../controllers';
import { MetroManila } from './metromanila';

export const MAP = {
  Philippines: {
    id: 0,
    parent: -1,
    name: 'Philippines',
    data: MapController.Points(MetroManila.MetroManilaMap),
  },
  MetroManila: {
    id: 1,
    parent: 0,
    name: 'Metro Manila',
    data: MapController.Points(MetroManila.MetroManilaMap),
  },
  Caloocan: {
    id: 2,
    parent: 1,
    name: 'Caloocan',
    data: MapController.Points(MetroManila.CaloocanMap)
  },
  LasPinas: {
    id: 3,
    parent: 1,
    name: 'Las Piñas',
    data: MapController.Points(MetroManila.LasPinasMap)
  },
  Makati: {
    id: 4,
    parent: 1,
    name: 'Makati',
    data: MapController.Points(MetroManila.MakatiMap)
  },
  Malabon: {
    id: 5,
    parent: 1,
    name: 'Malabon',
    data: MapController.Points(MetroManila.MalabonMap)
  },
  Mandaluyong: {
    id: 6,
    parent: 1,
    name: 'Mandaluyong',
    data: MapController.Points(MetroManila.MandaluyongMap)
  },
  Manila: {
    id: 7,
    parent: 1,
    name: 'Manila',
    data: MapController.Points(MetroManila.ManilaMap)
  },
  Marikina: {
    id: 8,
    parent: 1,
    name: 'Marikina',
    data: MapController.Points(MetroManila.MarikinaMap)
  },
  Muntinlupa: {
    id: 9,
    parent: 1,
    name: 'Mutinlupa',
    data: MapController.Points(MetroManila.MuntinlupaMap)
  },
  Navotas: {
    id: 10,
    parent: 1,
    name: 'Navotas',
    data: MapController.Points(MetroManila.NavotasMap)
  },
  Paranaque: {
    id: 11,
    parent: 1,
    name: 'Parañaque',
    data: MapController.Points(MetroManila.ParanaqueMap)
  },
  Pasay: {
    id: 12,
    parent: 1,
    name: 'Pasay',
    data: MapController.Points(MetroManila.PasayMap)
  },
  Pasig: {
    id: 13,
    parent: 1,
    name: 'Pasig',
    data: MapController.Points(MetroManila.PasigMap)
  },
  Pateros: {
    id: 14,
    parent: 1,
    name: 'Pateros',
    data: MapController.Points(MetroManila.PaterosMap)
  },
  QuezonCity: {
    id: 15,
    parent: 1,
    name: 'Quezon City',
    data: MapController.Points(MetroManila.QuezonCityMap)
  },
  SanJuan: {
    id: 16,
    parent: 1,
    name: 'Quezon City',
    data: MapController.Points(MetroManila.SanJuanMap)
  },
  Taguig: {
    id: 17,
    parent: 1,
    name: 'Taguig',
    data: MapController.Points(MetroManila.TaguigMap)
  },
  Valenzuela: {
    id: 18,
    parent: 1,
    name: 'Valenzuela',
    data: MapController.Points(MetroManila.ValenzuelaMap)
  },
};
