import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Send, FileText, X, MessageCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailRequestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* meta básica que não exige permissões */
  const collectMeta = () => ({
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language,
    userAgent: navigator.userAgent,
    viewport: { w: window.innerWidth, h: window.innerHeight },
    page: window.location.href,
    referrer: document.referrer || null,
  });

  const handleSubmit = async () => {
    if (!email || !description) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsSubmitting(true);

    try {
      const meta = collectMeta();

      const res = await fetch('/api/send-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, description, meta }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      toast.success('Solicitação enviada! Confira seu e-mail 😉');
      setEmail('');
      setDescription('');
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message || 'Falha inesperada');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 group hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Solicitar Documentação
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Documentação</h3>
                <p className="text-xs text-gray-500">Geração automática</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="O que você precisa documentar?"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Solicitar
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center pb-4">📄 Receba a doc personalizada no seu email</p>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        theme="light"
        toastClassName="text-sm rounded-lg shadow-lg border mb-16"
        style={{ marginBottom: '100px' }}
      />
    </>
  );
}
