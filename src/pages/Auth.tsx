import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight, Loader2, Banana } from 'lucide-react';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register' | 'magic-link';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        
        if (error) throw error;
        
        toast.success('Conta criada com sucesso!', {
          description: 'Você já pode fazer login.',
        });
        navigate('/');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast.success('Login realizado!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error('Erro na autenticação', {
        description: error.message || 'Tente novamente',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      toast.success('Link mágico enviado!', {
        description: 'Verifique seu e-mail para fazer login.',
      });
    } catch (error: any) {
      toast.error('Erro ao enviar link', {
        description: error.message || 'Tente novamente',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-gold px-4 pt-12 pb-16 rounded-b-[2rem] text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Banana className="w-8 h-8 text-primary-foreground" />
          <h1 className="text-3xl font-bold text-primary-foreground">BanaPrice</h1>
        </div>
        <p className="text-primary-foreground/80">Compare preços e economize mais</p>
      </header>

      {/* Auth Form */}
      <div className="flex-1 px-4 -mt-8">
        <div className="bg-card rounded-2xl shadow-medium p-6">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            {mode === 'register' ? 'Criar Conta' : mode === 'magic-link' ? 'Login com Link Mágico' : 'Entrar'}
          </h2>

          <form onSubmit={mode === 'magic-link' ? handleMagicLink : handleEmailPasswordAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
            </div>

            {mode !== 'magic-link' && (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              variant="gold" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'magic-link' ? 'Enviar Link Mágico' : mode === 'register' ? 'Cadastrar' : 'Entrar'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => setMode('magic-link')}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Entrar com link mágico (sem senha)
                </button>
                <div className="text-center text-sm text-muted-foreground">
                  Não tem conta?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="text-primary font-medium hover:underline"
                  >
                    Cadastre-se
                  </button>
                </div>
              </>
            )}

            {mode === 'register' && (
              <div className="text-center text-sm text-muted-foreground">
                Já tem conta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary font-medium hover:underline"
                >
                  Fazer login
                </button>
              </div>
            )}

            {mode === 'magic-link' && (
              <button
                onClick={() => setMode('login')}
                className="w-full text-sm text-primary hover:underline"
              >
                Voltar para login com senha
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          BanaPrice v1.0.0
        </p>
      </div>
    </div>
  );
}
