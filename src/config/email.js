import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { useTranslation } from "../locale/Translation";

export function useEmailRequest() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const collectMeta = useCallback(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined" || typeof document === "undefined") {
      return {};
    }
    return {
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language,
      userAgent: navigator.userAgent,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      page: window.location.href,
      referrer: document.referrer || null,
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!email || !description) {
      toast.error(t("email.toastInvalidForm"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailTouched(true);
      toast.error(t("email.emailInvalid"));
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const meta = collectMeta();

      const res = await fetch("/api/send-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, description, meta }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      toast.success(t("email.toastSuccess"));
      setEmail("");
      setDescription("");
      setEmailTouched(false);
      setIsOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || t("email.toastError"));
    } finally {
      setIsSubmitting(false);
    }
  }, [email, description, isSubmitting, t, collectMeta]);

  return {
    isOpen,
    setIsOpen,
    email,
    setEmail,
    emailTouched,
    setEmailTouched,
    description,
    setDescription,
    isSubmitting,
    handleSubmit,
  };
}
