import { CheckCircle, Globe, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { useTranslation } from "../locale/Translation";
import Section from "./Section";

// Company data
const COMPANY = {
  name: "Dotmind Labs",
  email: "dotmindit@gmail.com",
  phone: "+55 (11) 96651-2778",
  address: "São Paulo, SP - Brasil",
  website: "https://dotmindlabs.com",
  socials: {
    linkedin: "https://linkedin.com/company/dotmindlabs",
  },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const { t } = useTranslation();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Soft loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      return;
    }

    setIsSubmitting(true);

    const meta =
      typeof window === "undefined"
        ? {}
        : {
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: navigator.language,
            userAgent: navigator.userAgent,
            viewport: { w: window.innerWidth, h: window.innerHeight },
            page: window.location.href,
            referrer: document.referrer || null,
          };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          meta,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setIsSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.name && form.email && form.message;

  return (
    <Section crosses crossesOffset="" customPaddings id="contact" className="bg-slate-950 text-white">
      <main className="min-h-[calc(100svh-4.75rem-60px)] lg:min-h-[calc(100svh-7rem-80px)] bg-slate-950 text-white relative overflow-y-auto">
        {/* Loading overlay */}
        <div
          className={`fixed inset-0 bg-slate-950 z-50
  transition-opacity duration-500 ease-out will-change-[opacity]
  ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-hidden="true"
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-slate-700 border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div
          className={`absolute inset-0 -z-10 pointer-events-none opacity-0
  transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
  ${isLoaded ? "opacity-100" : ""}
  bg-[radial-gradient(120%_120%_at_50%_50%,rgba(120,119,198,0.05)_0%,transparent_60%)]`}
        />
        {/* Content with staggered animation */}
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 pt-12 sm:pt-6 lg:pt-0 min-h-[calc(100svh-4.75rem-60px)] lg:min-h-[calc(100svh-7rem-80px)]">
          <div
            className={`w-full max-w-4xl
transition-[opacity,transform]
 duration-700
ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-[transform,opacity]
${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* LEFT SIDE - Contact Form */}
              <section
                className={`bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 backdrop-blur-sm transition-all duration-1000 delay-400 ${
                  isLoaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                  <h1 className="text-xl font-semibold text-slate-100">{t("contact.title")}</h1>
                </div>

                <p className="text-slate-400 mb-5 text-sm">{t("contact.subtitle")}</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                      {t("contact.nameLabel")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder={t("contact.namePlaceholder")}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 text-slate-100 transition-all duration-300"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
                      {t("contact.emailLabel")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 text-slate-100 transition-all duration-300"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-300">
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder={t("contact.messagePlaceholder")}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 text-slate-100 resize-none transition-all duration-300"
                      maxLength={1000}
                      aria-required="true"
                    />
                    <div className="flex justify-between items-center mt-2 h-4">
                      <div className="text-xs text-slate-500 tabular-nums">{form.message.length}/1000</div>

                      <div className="text-xs w-[52px] h-4 flex items-center gap-1">
                        <div
                          className={`flex items-center gap-1 transition-opacity duration-200 text-white leading-none
      ${isFormValid ? "opacity-100" : "opacity-0"}`}
                          aria-hidden={!isFormValid}
                        >
                          <CheckCircle className="w-3 h-3 shrink-0" />
                          <span className="select-none">{t("contact.ready")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid || isSubmitting}
                      className={`inline-flex items-center justify-center gap-2 text-sm font-medium
              rounded-lg h-10 min-w-[168px] px-4 transition-colors duration-300
              border  /* mantém borda SEMPRE */
              ${
                isSubmitted
                  ? "bg-green-600 text-white border-green-600/80"
                  : isFormValid && !isSubmitting
                    ? "bg-white text-black border-white/10 hover:bg-gray-100"
                    : "bg-slate-700/60 text-slate-400 border-transparent cursor-not-allowed"
              }`}
                      aria-label={isSubmitting ? "Sending message" : isSubmitted ? "Message sent" : "Send message"}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          {t("contact.sent")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("contact.submitButton")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* RIGHT SIDE - Company Information */}
              <section
                className={`bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 backdrop-blur-sm transition-all duration-1000 delay-400 ${
                  isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-medium">
                      {t("contact.ourInfoHeading")}
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => copyToClipboard(COMPANY.email, "email")}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group w-full text-left"
                      aria-label={`Copy email: ${COMPANY.email}`}
                    >
                      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                        {copiedItem === "email" ? t("contact.copied") : COMPANY.email}
                      </div>
                    </button>

                    <button
                      onClick={() => copyToClipboard(COMPANY.phone, "phone")}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group w-full text-left"
                      aria-label={`Copy phone: ${COMPANY.phone}`}
                    >
                      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                        {copiedItem === "phone" ? t("contact.copied") : COMPANY.phone}
                      </div>
                    </button>

                    <button
                      onClick={() => copyToClipboard(COMPANY.website, "website")}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group w-full text-left"
                      aria-label={`Copy website: ${COMPANY.website}`}
                    >
                      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                        <Globe className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                        {copiedItem === "website" ? t("contact.copied") : COMPANY.website}
                      </div>
                    </button>

                    <div className="flex items-center gap-3 p-3 rounded-xl">
                      <div className="p-2 bg-slate-800/50 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-300">{COMPANY.address}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/50">
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">
                      {t("contact.followUs")}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={COMPANY.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                        aria-label="Visit our LinkedIn page"
                      >
                        <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Response time indicator */}
                  <div className="p-3 bg-slate-800/25 border border-slate-700/40 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-200">{t("contact.responseTime")}</span>
                    </div>
                    <p className="text-xs text-slate-400">{t("contact.responseText")}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Section>
  );
}
