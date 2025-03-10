'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Tags, Boxes } from 'lucide-react';
import Link from 'next/link';

const ProductsPage = () => {
  const sections = [
    {
      title: 'Productos',
      description: 'Gestionar productos y servicios',
      icon: Package,
      href: '/products/items',
    },
    {
      title: 'Grupos de Artículos',
      description: 'Administrar grupos de productos',
      icon: Tags,
      href: '/products/groups',
    },
    {
      title: 'Inventario',
      description: 'Control de stock y movimientos',
      icon: Boxes,
      href: '/products/inventory',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href} className="p-6">
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <Link href={section.href} className="mt-auto">
                <Button variant="outline" className="w-full">
                  Gestionar
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;