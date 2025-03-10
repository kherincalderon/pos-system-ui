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
    { method: 'Cash', expected: 1234.56, actual: 1230.00, difference: -4.56 },
    { method: 'Credit Card', expected: 2345.67, actual: 2345.67, difference: 0 },
    { method: 'Debit Card', expected: 1456.78, actual: 1456.78, difference: 0 },
    { method: 'Digital Wallet', expected: 890.12, actual: 890.12, difference: 0 },
  ];

  const handleCountChange = (index: number, count: number) => {
    const newCounts = [...cashCounts];
    newCounts[index].count = count;
    newCounts[index].total = count * parseFloat(newCounts[index].denomination);
    setCashCounts(newCounts);
  };

  const totalCash = cashCounts.reduce((sum, item) => sum + item.total, 0);
  const totalExpected = paymentSummary.reduce((sum, item) => sum + item.expected, 0);
  const totalActual = paymentSummary.reduce((sum, item) => sum + item.actual, 0);
  const totalDifference = totalActual - totalExpected;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Cash Register Closure</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <span>/</span>
            <span>Cash Register Closure</span>
          </div>
        </div>
        <Button className="gap-2">
          <Calculator className="h-4 w-4" />
          Complete Closure
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Initial Balance & Cash Count */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cash Count
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Balance</Label>
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
                  <TableHead>Denomination</TableHead>
                  <TableHead>Count</TableHead>
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
                        onChange={(e) => handleCountChange(index, Number(e.target.value))}
                        className="max-w-[100px]"
                      />
                    </TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total Cash</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="font-bold">${totalCash.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Payment Methods Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods Summary
          </h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSummary.map((item) => (
                <TableRow key={item.method}>
                  <TableCell className="font-medium">{item.method}</TableCell>
                  <TableCell>${item.expected.toFixed(2)}</TableCell>
                  <TableCell>${item.actual.toFixed(2)}</TableCell>
                  <TableCell className={item.difference < 0 ? 'text-red-500' : 'text-emerald-500'}>
                    ${item.difference.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">${totalExpected.toFixed(2)}</TableCell>
                <TableCell className="font-bold">${totalActual.toFixed(2)}</TableCell>
                <TableCell className={`font-bold ${totalDifference < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  ${totalDifference.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Requires supervisor approval for completion</span>
            </div>
            {totalDifference < 0 && (
              <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>Cash shortage detected. Please verify counts and transactions.</span>
              </div>
            )}
            {totalDifference > 0 && (
              <div className="flex items-center gap-2 p-3 bg-emerald-100 text-emerald-700 rounded-md">
                <CheckCircle2 className="h-4 w-4" />
                <span>Cash surplus detected. Please verify counts and transactions.</span>
              </div>
            )}
          </div>
        </Card>

        {/* Petty Cash Movements */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Petty Cash Movements
          </h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Authorized By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>09:15 AM</TableCell>
                <TableCell>Withdrawal</TableCell>
                <TableCell>$50.00</TableCell>
                <TableCell>Office supplies purchase</TableCell>
                <TableCell>John Supervisor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>02:30 PM</TableCell>
                <TableCell>Deposit</TableCell>
                <TableCell>$25.00</TableCell>
                <TableCell>Unused funds return</TableCell>
                <TableCell>Jane Manager</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}