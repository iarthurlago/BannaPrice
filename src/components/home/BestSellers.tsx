import { TrendingUp, MapPin, Loader2 } from 'lucide-react';
import { useBestSellers } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';
import cocaCola2L from '@/assets/coca-cola-2l.png';

export function BestSellers() {
  const { data: products, isLoading } = useBestSellers();

  if (isLoading) {
    return (
      <section className="py-4 pb-24">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // Function to get the correct image for each product
  const getProductImage = (product: { name: string; image: string }) => {
    if (product.name.toLowerCase().includes('coca-cola')) {
      return cocaCola2L;
    }
    return product.image;
  };

  return (
    <section className="py-4 pb-24">
      <div className="flex items-center gap-2 px-4 mb-3">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Mais Vendidos da Região</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={cn(
              "bg-card rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium hover:scale-[1.02] animate-slide-up"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                <span className="text-[10px] font-medium text-muted-foreground">{product.category}</span>
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold text-primary">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground line-clamp-1">{product.store}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">{product.distance} km</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
