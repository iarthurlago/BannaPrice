import { ArrowLeft, Bell, Tag, TrendingDown, Store, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function Notifications() {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    offers: true,
    newStores: false,
    newsletter: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    { 
      key: 'priceAlerts' as const,
      icon: TrendingDown, 
      label: 'Alertas de preço', 
      description: 'Receba quando o preço baixar' 
    },
    { 
      key: 'offers' as const,
      icon: Tag, 
      label: 'Ofertas e promoções', 
      description: 'Novidades e descontos exclusivos' 
    },
    { 
      key: 'newStores' as const,
      icon: Store, 
      label: 'Novas lojas', 
      description: 'Quando uma loja nova abrir perto de você' 
    },
    { 
      key: 'newsletter' as const,
      icon: Mail, 
      label: 'Newsletter', 
      description: 'Receba as melhores ofertas por e-mail' 
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-gold px-4 pt-6 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-primary-foreground/20 text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Notificações</h1>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {notificationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-4 p-4 ${
                  index !== notificationItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-secondary">
                  <Icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch 
                  checked={notifications[item.key]}
                  onCheckedChange={() => toggleNotification(item.key)}
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Você pode alterar suas preferências a qualquer momento.
        </p>
      </div>
    </div>
  );
}
