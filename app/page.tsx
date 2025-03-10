'use client';

import { Card } from '@/components/ui/card';
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  AlertCircle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  Receipt,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const salesData = [
  { name: 'Ene', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Abr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const paymentMethodData = [
  { name: 'Efectivo', value: 400 },
  { name: 'Tarjeta de Crédito', value: 300 },
  { name: 'Tarjeta de Débito', value: 300 },
  { name: 'Billetera Digital', value: 200 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const CustomXAxis = (props: any) => (
  <XAxis
    {...props}
    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
    tickLine={{ stroke: 'hsl(var(--border))' }}
    axisLine={{ stroke: 'hsl(var(--border))' }}
  />
);

const CustomYAxis = (props: any) => (
  <YAxis
    {...props}
    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
    tickLine={{ stroke: 'hsl(var(--border))' }}
    axisLine={{ stroke: 'hsl(var(--border))' }}
  />
);

export default function Home() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/pos">
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Punto de Venta
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ventas Totales</p>
              <h3 className="text-2xl font-bold">$12,345</h3>
              <p className="text-sm text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                12% vs mes anterior
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <h3 className="text-2xl font-bold">$9,876</h3>
              <p className="text-sm text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                8% vs mes anterior
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Clientes</p>
              <h3 className="text-2xl font-bold">1,234</h3>
              <p className="text-sm text-red-500 flex items-center gap-1">
                <ArrowDownRight className="h-4 w-4" />
                3% vs mes anterior
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Productos</p>
              <h3 className="text-2xl font-bold">567</h3>
              <p className="text-sm text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                5% vs mes anterior
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts & Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Ventas</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <CustomXAxis dataKey="name" />
                <CustomYAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Métodos de Pago</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Low Stock & Cash Register */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alertas de Stock Bajo</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Producto {i}</p>
                    <p className="text-sm text-muted-foreground">Solo quedan {i} unidades</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-500">Requiere reposición</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Estado de Caja
          </h3>
          <div className="space-y-6">
            {/* Current Session */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sesión Actual</span>
                </div>
                <span className="text-sm font-medium">Iniciada a las 08:00 AM</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Saldo Inicial</p>
                  <p className="text-lg font-semibold">$500.00</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Saldo Actual</p>
                  <p className="text-lg font-semibold">$2,345.67</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Métodos de Pago</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Efectivo</span>
                  <span className="font-medium">$1,234.56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tarjetas de Crédito</span>
                  <span className="font-medium">$2,345.67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pagos Digitales</span>
                  <span className="font-medium">$3,456.78</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Transacciones Recientes</span>
              </div>
              <div className="space-y-2">
                {[
                  { time: '10:45 AM', amount: '$123.45', type: 'Venta' },
                  { time: '10:30 AM', amount: '$67.89', type: 'Venta' },
                  { time: '10:15 AM', amount: '$50.00', type: 'Retiro' },
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{transaction.time}</span>
                      <span>{transaction.type}</span>
                    </div>
                    <span className="font-medium">{transaction.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Petty Cash */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Saldo de Caja Chica</span>
              </div>
              <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                <span className="text-sm">Saldo Disponible</span>
                <span className="font-medium">$150.00</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}