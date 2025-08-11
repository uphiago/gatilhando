import { useState } from "react";
import { toast } from "react-toastify";

export function useEmailRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("Preencha todos os campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const meta = collectMeta();

      const res = await fetch("/api/send-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, description, meta }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      toast.success("Solicitação enviada! Confira seu e-mail!");
      setEmail("");
      setDescription("");
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message || "Falha inesperada");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    email,
    setEmail,
    description,
    setDescription,
    isSubmitting,
    handleSubmit,
  };
}
