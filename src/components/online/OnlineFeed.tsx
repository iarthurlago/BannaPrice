import { useState, useMemo } from 'react';
import { Sparkles, Truck, ExternalLink } from 'lucide-react';
import { onlineDeals } from '@/data/mockData';
import { cn } from '@/lib/utils';

const marketplaces = ['Todos', 'Mercado Livre', 'Amazon', 'Shopee', 'AliExpress', 'Kabum'];

export function OnlineFeed() {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredDeals = useMemo(() => {
    if (selectedFilter === 'Todos') {
      return onlineDeals;
    }
    return onlineDeals.filter(deal => deal.marketplace === selectedFilter);
  }, [selectedFilter]);

  const handleFilterClick = (marketplace: string) => {
    setSelectedFilter(marketplace);
    console.log('Marketplace filter:', marketplace);
  };

  return (
    <section className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Achadinhos Online</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1">As melhores ofertas dos principais marketplaces</p>
      </header>
      
      {/* Marketplace filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
        {marketplaces.map((mp) => (
          <button
            key={mp}
            onClick={() => handleFilterClick(mp)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95",
              selectedFilter === mp 
                ? "bg-primary text-primary-foreground shadow-soft" 
                : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
          >
            {mp}
          </button>
        ))}
      </div>
      
      {/* Deals Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 py-2">
        {filteredDeals.length === 0 ? (
          <div className="col-span-2 py-12 text-center">
            <p className="text-muted-foreground">Nenhuma oferta encontrada para {selectedFilter}</p>
          </div>
        ) : filteredDeals.map((deal, index) => (
          <div
            key={deal.id}
            className={cn(
              "bg-card rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium animate-slide-up group"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Discount badge */}
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-gold shadow-gold">
                <span className="text-xs font-bold text-primary-foreground">
                  -{deal.discount}%
                </span>
              </div>
              
              {/* Free shipping badge */}
              {deal.freeShipping && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-success">
                  <Truck className="w-3 h-3 text-success-foreground" />
                </div>
              )}
              
              {/* Marketplace */}
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                <span className="text-[10px] font-medium text-muted-foreground">{deal.marketplace}</span>
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                {deal.name}
              </h3>
              
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground line-through block">
                  R$ {deal.originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    R$ {deal.price.toFixed(2).replace('.', ',')}
                  </span>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(deal.name + ' ' + deal.marketplace)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-primary hover:bg-gold-dark transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-primary-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
