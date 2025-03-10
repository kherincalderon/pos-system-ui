'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentDetails: PaymentDetails) => void;
  total: number;
  paymentMethod: 'cash' | 'card' | 'digital';
}

export interface PaymentDetails {
  method: 'cash' | 'card' | 'digital';
  amount: number;
  change?: number;
  reference?: string;
  cardLastFour?: string;
  cardType?: string;
  digitalProvider?: string;
}

export function PaymentDialog({ open, onClose, onConfirm, total, paymentMethod }: PaymentDialogProps) {
  const [amount, setAmount] = useState(total.toString());
  const [reference, setReference] = useState('');
  const [cardLastFour, setCardLastFour] = useState('');
  const [cardType, setCardType] = useState('');
  const [digitalProvider, setDigitalProvider] = useState('');

  const handleConfirm = () => {
    const paymentDetails: PaymentDetails = {
      method: paymentMethod,
      amount: parseFloat(amount),
    };

    if (paymentMethod === 'cash') {
      paymentDetails.change = parseFloat(amount) - total;
    } else if (paymentMethod === 'card') {
      paymentDetails.cardLastFour = cardLastFour;
      paymentDetails.cardType = cardType;
      paymentDetails.reference = reference;
    } else if (paymentMethod === 'digital') {
      paymentDetails.digitalProvider = digitalProvider;
      paymentDetails.reference = reference;
    }

    onConfirm(paymentDetails);
  };

  const renderContent = () => {
    switch (paymentMethod) {
      case 'cash':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Monto Recibido</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            {parseFloat(amount) > total && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Cambio a devolver</p>
                <p className="text-2xl font-bold">${(parseFloat(amount) - total).toFixed(2)}</p>
              </div>
            )}
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Últimos 4 dígitos</Label>
              <Input
                maxLength={4}
                value={cardLastFour}
                onChange={(e) => setCardLastFour(e.target.value.replace(/\D/g, ''))}
                placeholder="1234"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Tarjeta</Label>
              <Input
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                placeholder="VISA, Mastercard, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Número de Referencia</Label>
              <Input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ref. de transacción"
              />
            </div>
          </div>
        );

      case 'digital':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Proveedor</Label>
              <Input
                value={digitalProvider}
                onChange={(e) => setDigitalProvider(e.target.value)}
                placeholder="PayPal, Mercado Pago, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Número de Referencia</Label>
              <Input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ref. de transacción"
              />
            </div>
          </div>
        );
    }
  };

  const getIcon = () => {
    switch (paymentMethod) {
      case 'cash':
        return <DollarSign className="h-5 w-5" />;
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'digital':
        return <Wallet className="h-5 w-5" />;
    }
  };

  const getTitle = () => {
    switch (paymentMethod) {
      case 'cash':
        return 'Pago en Efectivo';
      case 'card':
        return 'Pago con Tarjeta';
      case 'digital':
        return 'Pago Digital';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Total a Pagar</p>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>

          {renderContent()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar Pago</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}