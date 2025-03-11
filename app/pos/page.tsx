'use client';

import { useState } from 'react';
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
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  DollarSign,
  Wallet,
  Receipt,
  BarChart4,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { PaymentDialog, PaymentDetails } from './payment-dialog';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function POSPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<
    'cash' | 'card' | 'digital' | null
  >(null);

  // Mock data
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'drinks', name: 'Bebidas' },
    { id: 'food', name: 'Comidas' },
    { id: 'snacks', name: 'Snacks' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Café',
      price: 3.99,
      category: 'drinks',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=128&h=128&fit=crop',
    },
    {
      id: '2',
      name: 'Té',
      price: 2.99,
      category: 'drinks',
      image:
        'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=128&h=128&fit=crop',
    },
    {
      id: '3',
      name: 'Sándwich',
      price: 6.99,
      category: 'food',
      image:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=128&h=128&fit=crop',
    },
    {
      id: '4',
      name: 'Papas Fritas',
      price: 1.99,
      category: 'snacks',
      image:
        'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=128&h=128&fit=crop',
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePayment = (method: 'cash' | 'card' | 'digital') => {
    setPaymentMethod(method);
  };

  const handlePaymentConfirm = (paymentDetails: PaymentDetails) => {
    // Here you would typically:
    // 1. Send the sale to your backend
    // 2. Update inventory
    // 3. Generate receipt
    // 4. Update cash register balance

    toast({
      title: 'Venta Completada',
      description: `Pago procesado por $${total.toFixed(2)}`,
    });

    // Reset cart and payment method
    setCart([]);
    setPaymentMethod(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Products Section */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Punto de Venta</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <BarChart4 className="h-4 w-4" />
            </Button>
            <Link href="/cash-register/closure">
              <Button variant="outline" size="icon">
                <Receipt className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? 'default' : 'outline'
                }
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto pb-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => addToCart(product)}
            >
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-[400px] border-l flex flex-col bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Venta Actual</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            {cart.length} artículos
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artículo</TableHead>
                <TableHead>Cant.</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-6 border-t bg-card">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => handlePayment('cash')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Efectivo
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => handlePayment('card')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Tarjeta
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => handlePayment('digital')}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Digital
            </Button>
          </div>
        </div>
      </div>

      {paymentMethod && (
        <PaymentDialog
          open={true}
          onClose={() => setPaymentMethod(null)}
          onConfirm={handlePaymentConfirm}
          total={total}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
}
