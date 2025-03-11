'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Calculator,
  DollarSign,
  CreditCard,
  Wallet,
  AlertCircle,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';

interface CashCount {
  denomination: string;
  count: number;
  total: number;
}

interface PaymentSummary {
  method: string;
  expected: number;
  actual: number;
  difference: number;
}

export default function CashRegisterClosurePage() {
  const [initialBalance, setInitialBalance] = useState<number>(500);
  const [cashCounts, setCashCounts] = useState<CashCount[]>([
    { denomination: '100', count: 0, total: 0 },
    { denomination: '50', count: 0, total: 0 },
    { denomination: '20', count: 0, total: 0 },
    { denomination: '10', count: 0, total: 0 },
    { denomination: '5', count: 0, total: 0 },
    { denomination: '1', count: 0, total: 0 },
    { denomination: '0.25', count: 0, total: 0 },
    { denomination: '0.10', count: 0, total: 0 },
    { denomination: '0.05', count: 0, total: 0 },
    { denomination: '0.01', count: 0, total: 0 },
  ]);

  const paymentSummary: PaymentSummary[] = [
    {
      method: 'Efectivo',
      expected: 1234.56,
      actual: 1230.0,
      difference: -4.56,
    },
    {
      method: 'Tarjeta de Crédito',
      expected: 2345.67,
      actual: 2345.67,
      difference: 0,
    },
    {
      method: 'Tarjeta de Débito',
      expected: 1456.78,
      actual: 1456.78,
      difference: 0,
    },
    {
      method: 'Billetera Digital',
      expected: 890.12,
      actual: 890.12,
      difference: 0,
    },
  ];

  const handleCountChange = (index: number, count: number) => {
    const newCounts = [...cashCounts];
    newCounts[index].count = count;
    newCounts[index].total = count * parseFloat(newCounts[index].denomination);
    setCashCounts(newCounts);
  };

  const totalCash = cashCounts.reduce((sum, item) => sum + item.total, 0);
  const totalExpected = paymentSummary.reduce(
    (sum, item) => sum + item.expected,
    0
  );
  const totalActual = paymentSummary.reduce(
    (sum, item) => sum + item.actual,
    0
  );
  const totalDifference = totalActual - totalExpected;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Cierre de Caja</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <span>/</span>
            <span>Cierre de Caja</span>
          </div>
        </div>
        <Button className="gap-2">
          <Calculator className="h-4 w-4" />
          Completar Cierre
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Conteo de Efectivo
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Saldo Inicial</Label>
              <Input
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(Number(e.target.value))}
                className="max-w-[200px]"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Denominación</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashCounts.map((item, index) => (
                  <TableRow key={item.denomination}>
                    <TableCell>${item.denomination}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.count}
                        onChange={(e) =>
                          handleCountChange(index, Number(e.target.value))
                        }
                        className="max-w-[100px]"
                      />
                    </TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total Efectivo</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="font-bold">
                    ${totalCash.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Resumen de Métodos de Pago
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Método</TableHead>
                <TableHead>Esperado</TableHead>
                <TableHead>Real</TableHead>
                <TableHead>Diferencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSummary.map((item) => (
                <TableRow key={item.method}>
                  <TableCell className="font-medium">{item.method}</TableCell>
                  <TableCell>${item.expected.toFixed(2)}</TableCell>
                  <TableCell>${item.actual.toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      item.difference < 0 ? 'text-red-500' : 'text-emerald-500'
                    }
                  >
                    ${item.difference.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
