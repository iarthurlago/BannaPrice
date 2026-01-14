import { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Moon, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Crown,
  Zap,
  Check,
  LogOut,
  Settings,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const accountItems = [
  { icon: User, label: 'Editar perfil', description: 'Nome, foto e dados pessoais' },
  { icon: MapPin, label: 'Endereços salvos', description: '2 endereços cadastrados' },
  { icon: CreditCard, label: 'Pagamentos', description: 'Cartões e Pix' },
];

export function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Dark mode:', !isDarkMode);
  };

  const handleMenuClick = (label: string) => {
    console.log('Menu clicked:', label);
  };

  const settingsItems = [
    { icon: Bell, label: 'Notificações', description: 'Alertas de preço e ofertas' },
    { icon: isDarkMode ? Sun : Moon, label: 'Modo escuro', description: isDarkMode ? 'Ativado' : 'Desativado', toggle: true },
    { icon: Shield, label: 'Privacidade', description: 'Dados e permissões' },
    { icon: HelpCircle, label: 'Suporte', description: 'Ajuda e contato' },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-gradient-gold px-4 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-primary-foreground">Meu Perfil</h1>
          <button className="p-2 rounded-full bg-primary-foreground/20 text-primary-foreground">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/30 flex items-center justify-center border-2 border-primary-foreground/50">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary-foreground">Usuário</h2>
            <p className="text-sm text-primary-foreground/80">usuario@email.com</p>
          </div>
        </div>
      </header>
      
      {/* Premium Banner */}
      <div className="mx-4 -mt-4 p-4 rounded-2xl bg-card shadow-medium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-premium opacity-20 blur-2xl" />
        
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-gradient-premium shadow-gold">
            <Crown className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground">Plano Premium</h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                Oferta
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Economize mais com benefícios exclusivos!
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>Compra automática em 1 clique</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Bell className="w-4 h-4 text-primary" />
                <span>Alertas de preço em tempo real</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Sem anúncios</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-foreground">R$ 14,90</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <Button variant="premium" size="sm">
                Assinar agora
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Section */}
      <section className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Conta
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {accountItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.label)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 hover:bg-muted active:bg-muted/80 transition-colors",
                  index !== accountItems.length - 1 && "border-b border-border"
                )}
              >
                <div className="p-2 rounded-xl bg-secondary">
                  <Icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </section>
      
      {/* Settings Section */}
      <section className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Configurações
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            const isToggle = item.toggle;
            return (
              <button
                key={item.label}
                onClick={() => isToggle ? toggleDarkMode() : handleMenuClick(item.label)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 hover:bg-muted active:bg-muted/80 transition-colors",
                  index !== settingsItems.length - 1 && "border-b border-border"
                )}
              >
                <div className="p-2 rounded-xl bg-secondary">
                  <Icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                {isToggle ? (
                  <div className={cn(
                    "w-11 h-6 rounded-full relative transition-colors",
                    isDarkMode ? "bg-primary" : "bg-muted"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full transition-all",
                      isDarkMode ? "right-1 bg-primary-foreground" : "left-1 bg-muted-foreground"
                    )} />
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>
      </section>
      
      {/* Logout */}
      <div className="px-4 mt-6">
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair da conta</span>
        </button>
      </div>
      
      {/* App version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Economizar v1.0.0
      </p>
    </div>
  );
}
