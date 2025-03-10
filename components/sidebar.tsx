'use client';

import { cn } from '@/lib/utils';
import {
  Store,
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Boxes,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Punto de Venta',
    href: '/pos',
    icon: ShoppingCart,
  },
  {
    title: 'Productos',
    href: '/products',
    icon: Package,
  },
  {
    title: 'Categorías',
    href: '/categories',
    icon: Tags,
  },
  {
    title: 'Inventario',
    href: '/inventory',
    icon: Boxes,
  },
  {
    title: 'Clientes',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Ventas',
    href: '/sales',
    icon: ShoppingCart,
  },
  {
    title: 'Caja Registradora',
    href: '/cash-register/closure',
    icon: Calculator,
  },
  {
    title: 'Configuración',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r bg-card">
      <div className="p-6">
        <div className="flex items-center gap-2 px-2">
          <Store className="h-6 w-6" />
          <span className="font-semibold text-lg">Sistema POS</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}