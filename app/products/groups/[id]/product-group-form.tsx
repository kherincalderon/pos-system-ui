'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AtSign } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function ProductGroupForm() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';

  const [formData, setFormData] = useState({
    name: 'Nuevo',
    code: 'Nuevo',
    description: 'D',
    isActive: true,
  });

  const handleCancel = () => {
    router.push('/products/groups');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          GRUPOS DE ARTÍCULOS ({isNew ? 'NUEVO' : 'EDITAR'})
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/products" className="hover:underline">
            Productos
          </Link>
          <span>/</span>
          <Link href="/products/groups" className="hover:underline">
            Grupos de Artículos
          </Link>
          <span>/</span>
          <span>{isNew ? 'Nuevo' : 'Editar'}</span>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon">
            <AtSign className="h-4 w-4" />
          </Button>
          <span className="font-medium">GENERAL</span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <span className="text-sm text-muted-foreground">Campo obligatorio</span>
            </div>

            <div className="space-y-2">
              <Label>Código de grupo</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, isActive: checked as boolean })
                }
              />
              <Label htmlFor="active">Grupo activo</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              CANCELAR
            </Button>
            <Button>{isNew ? 'CREAR' : 'ACTUALIZAR'}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}