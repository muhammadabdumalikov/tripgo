// 'use client';
// import { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// interface TourMapProps {
//   startLocation: string;
//   endLocation: string;
//   className?: string;
// }

// const TourMap = ({ startLocation, endLocation, className = '' }: TourMapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//         version: 'weekly',
//         libraries: ['places']
//       });

//       const { Map } = await loader.importLibrary('maps');

//       const map = new Map(mapRef.current!, {
//         center: { lat: 41.2995, lng: 69.2401 }, // Tashkent coordinates
//         zoom: 8,
//         styles: [
//           {
//             featureType: 'poi',
//             elementType: 'labels',
//             stylers: [{ visibility: 'off' }]
//           }
//         ]
//       });

//       const { DirectionsService, DirectionsRenderer } = await loader.importLibrary('routes');
//       const directionsService = new DirectionsService();
//       const directionsRenderer = new DirectionsRenderer({
//         map,
//         suppressMarkers: false,
//         polylineOptions: {
//           strokeColor: '#febd2d',
//           strokeWeight: 4
//         }
//       });

//       const request = {
//         origin: startLocation,
//         destination: endLocation,
//         travelMode: await google.maps.TravelMode.DRIVING
//       };

//       directionsService.route(request, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           directionsRenderer.setDirections(result);
//         }
//       });
//     };

//     initMap();
//   }, [startLocation, endLocation]);

//   return (
//     <div className={`relative rounded-2xl overflow-hidden ${className}`}>
//       <div ref={mapRef} className="w-full h-[400px]" />
//     </div>
//   );
// };

// export default TourMap; 