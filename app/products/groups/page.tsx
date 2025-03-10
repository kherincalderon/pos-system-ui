'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ProductGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

const ProductGroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - replace with actual API call
  const groups: ProductGroup[] = [
    {
      id: '1',
      name: 'Nuevo',
      code: 'Nuevo',
      description: 'D',
      isActive: true,
      createdAt: '22/01/2025 - 05:30 PM',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">GRUPOS DE ARTÍCULOS</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:underline">
              Productos
            </Link>
            <span>/</span>
            <span>Grupos de Artículos</span>
          </div>
        </div>
        <Link href="/products/groups/new">
          <Button className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            CREAR NUEVO
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <Input
              placeholder="Buscar ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <TableHead>ACCIONES</TableHead>
              <TableHead>NOMBRE</TableHead>
              <TableHead>CÓDIGO DE GRUPO</TableHead>
              <TableHead>DESCRIPCIÓN</TableHead>
              <TableHead>GRUPO ACTIVO</TableHead>
              <TableHead>CREADO EN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <Link href={`/products/groups/${group.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.code}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Checkbox checked={group.isActive} disabled />
                </TableCell>
                <TableCell>{group.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProductGroupsPage;