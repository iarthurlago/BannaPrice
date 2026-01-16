import { ArrowLeft, Eye, MapPin, Share2, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Privacy() {
  const navigate = useNavigate();
  
  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareData: false,
    personalization: true,
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const privacyItems = [
    { 
      key: 'shareLocation' as const,
      icon: MapPin, 
      label: 'Compartilhar localização', 
      description: 'Para ofertas próximas a você' 
    },
    { 
      key: 'shareData' as const,
      icon: Share2, 
      label: 'Compartilhar dados de uso', 
      description: 'Ajude a melhorar o app' 
    },
    { 
      key: 'personalization' as const,
      icon: Eye, 
      label: 'Ofertas personalizadas', 
      description: 'Baseadas no seu histórico' 
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
          <h1 className="text-xl font-bold text-primary-foreground">Privacidade</h1>
        </div>
      </header>

      {/* Privacy Settings */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Permissões
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {privacyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-4 p-4 ${
                  index !== privacyItems.length - 1 ? 'border-b border-border' : ''
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
                  checked={privacySettings[item.key]}
                  onCheckedChange={() => toggleSetting(item.key)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Meus Dados
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="p-2 rounded-xl bg-secondary">
              <Download className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Exportar meus dados</p>
              <p className="text-xs text-muted-foreground">Baixar cópia dos seus dados</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors">
            <div className="p-2 rounded-xl bg-destructive/10">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-destructive">Excluir minha conta</p>
              <p className="text-xs text-muted-foreground">Apagar todos os dados permanentemente</p>
            </div>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 px-4">
        Seus dados são protegidos de acordo com a LGPD.
      </p>
    </div>
  );
}
