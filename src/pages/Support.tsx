import { ArrowLeft, MessageCircle, Mail, Phone, FileText, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  const faqItems = [
    { question: 'Como funciona o app?', answer: 'O app compara preços de produtos em lojas próximas a você.' },
    { question: 'Como salvar ofertas?', answer: 'Toque no ícone de coração em qualquer produto para salvar.' },
    { question: 'Como receber alertas de preço?', answer: 'Ative as notificações nas configurações do app.' },
  ];

  const contactItems = [
    { 
      icon: MessageCircle, 
      label: 'Chat ao vivo', 
      description: 'Fale com um atendente',
      action: () => console.log('Open chat')
    },
    { 
      icon: Mail, 
      label: 'E-mail', 
      description: 'suporte@economizar.com.br',
      action: () => window.location.href = 'mailto:suporte@economizar.com.br'
    },
    { 
      icon: Phone, 
      label: 'Telefone', 
      description: '0800 123 4567',
      action: () => window.location.href = 'tel:08001234567'
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
          <h1 className="text-xl font-bold text-primary-foreground">Suporte</h1>
        </div>
      </header>

      {/* FAQ Section */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Perguntas Frequentes
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {faqItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors text-left ${
                index !== faqItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-secondary">
                <HelpCircle className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.question}</p>
                <p className="text-xs text-muted-foreground">{item.answer}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Entre em Contato
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors ${
                  index !== contactItems.length - 1 ? 'border-b border-border' : ''
                }`}
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
      </div>

      {/* Terms & Policies */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Termos e Políticas
        </h3>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="p-2 rounded-xl bg-secondary">
              <FileText className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Termos de uso</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors">
            <div className="p-2 rounded-xl bg-secondary">
              <FileText className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Política de privacidade</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Economizar v1.0.0
      </p>
    </div>
  );
}
