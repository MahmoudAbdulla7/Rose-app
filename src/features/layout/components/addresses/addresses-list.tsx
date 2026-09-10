'use client';

import { MapPin, PenLine, Phone, Trash2 } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import type { Address } from '../../lib/types/address';
import DeleteAddressDialog from './delete-address-dialog';

interface AddressesListProps {
  addresses: Address[];
  addressToDelete: Address | null;
  setAddressToDelete: React.Dispatch<React.SetStateAction<Address | null>>;
  onEdit: (address: Address) => void;
}

export default function AddressesList({
  addresses,
  addressToDelete,
  setAddressToDelete,
  onEdit,
}: AddressesListProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Separator />

        {addresses.map((address) => (
          <div
            key={address.id}
            className="border-ds-border-soft hover:border-ds-secondary relative mt-5 rounded-lg border p-4 pe-8 pt-6"
          >
            {/* Title */}
            <div className="text-ds-primary absolute inset-s-3 -top-5 bg-transparent px-1.5 text-2xl font-semibold">
              {address.title}
            </div>

            <div className="absolute inset-e-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-transparent p-1 rtl:-translate-x-1/2">
              <div className="flex flex-col gap-2">
                {/* Edit */}
                <Button variant="soft" size="icon-rounded" onClick={() => onEdit(address)}>
                  <PenLine />
                </Button>

                {/* Delete */}
                <Button
                  variant="destructive"
                  size="icon-rounded"
                  onClick={() => setAddressToDelete(address)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                {/* City */}
                <div className="flex items-center gap-2.5">
                  <div className="bg-ds-success flex h-8 w-8 items-center justify-center rounded-full">
                    <MapPin strokeWidth={1.5} size={20} color="white" />
                  </div>
                  <p className="text-ds-text-plain text-2xl font-semibold">{address.city}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-1.5">
                  <Phone size={20} className="text-ds-text-default" />
                  <p className="text-ds-text-default text-lg">{address.phone}</p>
                </div>
              </div>

              {/* Street */}
              <Badge variant="muted" className="text-base">
                {address.street}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {addressToDelete && (
        <DeleteAddressDialog address={addressToDelete} onClose={() => setAddressToDelete(null)} />
      )}
    </>
  );
}
