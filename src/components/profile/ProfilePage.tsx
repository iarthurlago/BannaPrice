import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Sun,
  Loader2,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const accountItems = [
  { icon: MapPin, label: 'Endereços salvos', description: '2 endereços cadastrados' },
  { icon: CreditCard, label: 'Pagamentos', description: 'Cartões e Pix' },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSettingsClick = (label: string) => {
    switch (label) {
      case 'Notificações':
        navigate('/notifications');
        break;
      case 'Privacidade':
        navigate('/privacy');
        break;
      case 'Suporte':
        navigate('/support');
        break;
      default:
        console.log('Menu clicked:', label);
    }
  };

  const handleMenuClick = (label: string) => {
    console.log('Menu clicked:', label);
  };

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      display_name: displayName,
      avatar_url: avatarUrl || null,
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Você saiu da conta');
  };

  const settingsItems = [
    { icon: Bell, label: 'Notificações', description: 'Alertas de preço e ofertas' },
    { icon: isDarkMode ? Sun : Moon, label: 'Modo escuro', description: isDarkMode ? 'Ativado' : 'Desativado', toggle: true },
    { icon: Shield, label: 'Privacidade', description: 'Dados e permissões' },
    { icon: HelpCircle, label: 'Suporte', description: 'Ajuda e contato' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-gradient-gold px-4 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-primary-foreground">Meu Perfil</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full bg-primary-foreground/20 text-primary-foreground"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/30 flex items-center justify-center border-2 border-primary-foreground/50 overflow-hidden">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary-foreground text-primary">
                <Camera className="w-3 h-3" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary-foreground">
              {profile?.display_name || 'Usuário'}
            </h2>
            <p className="text-sm text-primary-foreground/80">{user?.email}</p>
          </div>
        </div>
      </header>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="mx-4 -mt-4 p-4 rounded-2xl bg-card shadow-medium relative z-20 mb-4">
          <h3 className="font-bold text-foreground mb-4">Editar Perfil</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Nome</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">URL do Avatar</Label>
              <Input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                variant="gold" 
                onClick={handleSaveProfile}
                disabled={updateProfile.isPending}
                className="flex-1"
              >
                {updateProfile.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Premium Banner */}
      <div className={cn("mx-4 p-4 rounded-2xl bg-card shadow-medium relative overflow-hidden", !isEditing && "-mt-4")}>
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
                onClick={() => isToggle ? toggleDarkMode() : handleSettingsClick(item.label)}
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
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair da conta</span>
        </button>
      </div>
      
      {/* App version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        BanaPrice v1.0.0
      </p>
    </div>
  );
}
