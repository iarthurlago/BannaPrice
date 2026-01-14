import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      console.log('Search term:', query);
      onSearch?.(query);
    }
  }, [query, onSearch]);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-muted transition-all duration-200",
            isFocused && "ring-2 ring-primary bg-card shadow-soft"
          )}
        >
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Buscar produtos, lojas..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-border transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <button className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-soft hover:shadow-gold transition-all">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
