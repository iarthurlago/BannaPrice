import { MapPin, Bell, Banana } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Olá, Bem-vindo!</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">São Paulo, SP</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-gold shadow-gold">
            <Banana className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">BanaPrice</span>
          </div>
        </div>
      </div>
    </header>
  );
}
