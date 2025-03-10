'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  lastUpdated: string;
}

const InventoryPage = () => {
  const items: InventoryItem[] = [
    {
      id: '1',
      name: 'Product A',
      sku: 'SKU001',
      quantity: 50,
      minStock: 10,
      maxStock: 100,
      lastUpdated: '22/01/2025 - 05:30 PM',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">INVENTARIO</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:underline">
              Productos
            </Link>
            <span>/</span>
            <span>Inventario</span>
          </div>
        </div>
        <Link href="/inventory/movements/new">
          <Button className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            NUEVO MOVIMIENTO
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <Input
              placeholder="Buscar por nombre o SKU..."
              className="pl-4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span>1 de 1</span>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NOMBRE</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>CANTIDAD</TableHead>
              <TableHead>STOCK MÍNIMO</TableHead>
              <TableHead>STOCK MÁXIMO</TableHead>
              <TableHead>ÚLTIMA ACTUALIZACIÓN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>{item.maxStock}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default InventoryPage;