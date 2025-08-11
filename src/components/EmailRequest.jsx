import { useEffect, useState } from "react";
import { Mail, MessageCircle, Send, X, ArrowDownRight } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEmailRequest } from "../config/email";
import { useTranslation } from "../locale/Translation";

export default function EmailRequestPopup() {
  const {
    isOpen,
    setIsOpen,
    email,
    setEmail,
    description,
    setDescription,
    isSubmitting,
    handleSubmit,
    emailTouched,
    setEmailTouched,
  } = useEmailRequest();

  const { t } = useTranslation();

  const isValidEmail = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isInvalidEmail = emailTouched && email && email.length > 0 && !isValidEmail;

  // 👇 Nudge (balão + seta) que pisca de tempos em tempos
// 👇 Nudge (balão + seta) que pisca de tempos em tempos
const [showNudge, setShowNudge] = useState(true);
useEffect(() => {
  if (isOpen) {
    setShowNudge(false);
    return;
  }

  /** @type {ReturnType<typeof setTimeout> | null} */
  let hideTimeout = null;

  const cycle = () => {
    setShowNudge(true);
    hideTimeout = setTimeout(() => setShowNudge(false), 3500); // visível por 3.5s
  };

  cycle();
  const loop = setInterval(cycle, 12000); // reaparece a cada 12s

  return () => {
    clearInterval(loop);
    if (hideTimeout) clearTimeout(hideTimeout);
  };
}, [isOpen]);


  return (
    <>
      {/* Nudge apenas quando o botão está fechado */}
      {!isOpen && (
        <div
          className={`pointer-events-none fixed bottom-16 right-15 z-[60] flex items-center gap-2 transition-all duration-700 ${
            showNudge ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          aria-hidden="true"
        >
          <div className="bg-white text-black text-xs font-medium px-3 py-2 rounded-xl shadow-xl border border-black/10">
            {t("email.nudge")}
          </div>
          <ArrowDownRight className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.35)] animate-bounce" />
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 group hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20"
          aria-label={t("email.buttonTooltip")}
          aria-expanded={isOpen}
          title={t("email.buttonTooltip")}
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" />
        </button>
      )}

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="fixed bottom-6 right-6 w-80 bg-black/85 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 z-50 animate-in slide-in-from-bottom-2 duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/10 border border-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 id="modal-title" className="font-semibold text-white text-sm">
                    {t("email.title")}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {t("email.subtitle")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label={t("email.closeModal")}
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email-input" className="block text-sm font-medium text-white">
                  {t("email.emailLabel")}
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder={t("email.emailPlaceholder")}
                  className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-xl transition-all text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                    isInvalidEmail
                      ? "border-red-400 focus:ring-red-400/50"
                      : isValidEmail
                      ? "border-white focus:ring-white/50"
                      : "border-white/20 focus:ring-white/30"
                  }`}
                  disabled={isSubmitting}
                  required
                  aria-describedby="email-hint"
                />
                <span
                  id="email-hint"
                  className={`text-xs flex items-center gap-1 ${
                    isInvalidEmail ? "text-red-400" : isValidEmail ? "text-white" : "text-gray-400"
                  }`}
                >
                  {isInvalidEmail ? (
                    <span>❌ {t("email.emailInvalid")}</span>
                  ) : isValidEmail ? (
                    <span>✅ {t("email.emailValid")}</span>
                  ) : (
                    <span>{t("email.emailHint")}</span>
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <label htmlFor="description-input" className="block text-sm font-medium text-white">
                  {t("email.descriptionLabel")}
                </label>
                <textarea
                  id="description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("email.descriptionPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none transition-all text-white placeholder-gray-500"
                  disabled={isSubmitting}
                  required
                  aria-describedby="description-hint"
                  maxLength={300}
                />
                <div className="flex justify-between items-center">
                  <span id="description-hint" className="text-xs text-gray-400">
                    {t("email.descriptionHint")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {t("email.charCount", { count: description.length, max: 300 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isValidEmail || !description}
                className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-600 text-black disabled:text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/30 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("email.submitting")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("email.submitButton")}
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        theme="dark"
        toastClassName="text-sm rounded-lg shadow-lg border mb-16"
        style={{ marginBottom: "100px" }}
      />
    </>
  );
}
