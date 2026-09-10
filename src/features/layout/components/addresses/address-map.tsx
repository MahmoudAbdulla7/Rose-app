'use client';

import L from 'leaflet';
import type { LatLngLiteral } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { MapPinHouse } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import pinIcon from '../../../../../public/assets/images/map-pin-icon.svg';

interface AddressMapProps {
  location: LatLngLiteral | null;
  onLocationChange: (location: LatLngLiteral) => void;
}

function MapEvents({ onLocationChange }: AddressMapProps) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  return null;
}

function ChangeView({ location }: { location: LatLngLiteral | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, map.getZoom());
    }
  }, [location, map]);

  return null;
}

export default function AddressMap({ location, onLocationChange }: AddressMapProps) {
  // Translation
  const t = useTranslations('address');

  // State
  const [isLocating, setIsLocating] = useState(false);

  // Variables
  const defaultCenter = location ?? {
    lat: 30.0444,
    lng: 31.2357, // Cairo
  };

  const icon =
    typeof window !== 'undefined'
      ? L.icon({
          iconUrl: pinIcon.src,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })
      : undefined;

  // Functions
  const handleFindMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t('form.notSupported'));
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onLocationChange({
          lat: coords.latitude,
          lng: coords.longitude,
        });

        setIsLocating(false);
      },
      () => {
        toast.error(t('form.locationDenied'));
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <>
      <div className="relative h-71 w-full overflow-hidden rounded-lg">
        <MapContainer center={defaultCenter} zoom={13} className="h-full w-full rounded-xl">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEvents location={location} onLocationChange={onLocationChange} />

          <ChangeView location={location} />

          {location && (
            <Marker
              draggable
              position={location}
              eventHandlers={{
                dragend(event) {
                  onLocationChange(event.target.getLatLng());
                },
              }}
              icon={icon}
            />
          )}
        </MapContainer>

        <Button
          type="button"
          variant="outline"
          className="absolute top-3 z-1000 flex gap-2.5 ltr:inset-e-3 rtl:inset-s-3"
          onClick={handleFindMyLocation}
          loading={isLocating}
        >
          <MapPinHouse />
          {t('form.findMyLocation')}
        </Button>
      </div>
    </>
  );
}
