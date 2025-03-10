import { ProductGroupForm } from './product-group-form';

export function generateStaticParams() {
  return [
    { id: 'new' },
    { id: '1' }, // Example existing group
  ];
}

export default function ProductGroupPage() {
  return <ProductGroupForm />;
}