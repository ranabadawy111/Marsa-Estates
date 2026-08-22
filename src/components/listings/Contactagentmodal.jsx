import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, MessageSquare } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const copy = {
  viewing: {
    title: "Request a viewing",
    icon: Calendar,
    intro:
      "Pick a rough time that works — the agent will confirm exact availability.",
    submitLabel: "Send request",
    successTitle: "Viewing requested",
    successBody:
      "The agent will call you within a few hours to confirm a time.",
  },
  message: {
    title: "Message agent",
    icon: MessageSquare,
    intro: "Ask about the property — pricing, availability, anything.",
    submitLabel: "Send message",
    successTitle: "Message sent",
    successBody: "The agent typically replies within 24 hours.",
  },
};

export default function ContactAgentModal({ open, onClose, type, listing }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const cfg = copy[type] || copy.message;

  function validate() {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Your name, please.";
    }

    if (!form.phone.trim()) {
      errs.phone = "A working phone number, please.";
    } else if (form.phone.trim().length < 8) {
      errs.phone = "Phone number must be at least 8 characters.";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");

    // Simulated send
    await new Promise((res) => setTimeout(res, 700));

    setStatus("sent");
  }

  function handleClose() {
    onClose();

    setTimeout(() => {
      setForm({
        name: "",
        phone: "",
        note: "",
      });

      setErrors({});
      setStatus("idle");
    }, 200);
  }

  function handleFieldChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove the error for this specific field
    // as soon as the user starts correcting it.
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={cfg.title}>
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="w-12 h-12 rounded-full bg-sage-500/15 flex items-center justify-center mx-auto mb-4">
            <Check size={20} className="text-sage-600" />
          </div>

          <p className="font-display text-lg text-navy-900 mb-1">
            {cfg.successTitle}
          </p>

          <p className="text-sm text-navy-700/60 mb-6">{cfg.successBody}</p>

          <Button variant="secondary" onClick={handleClose} className="w-full">
            Close
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-navy-700/60">{cfg.intro}</p>

          {/* Name + Phone */}
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Name */}
            <div className="space-y-1.5">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className={
                  errors.name ? "border-red-400 focus-visible:ring-red-300" : ""
                }
              />

              {errors.name && (
                <p className="text-xs text-red-500 px-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className={
                  errors.phone
                    ? "border-red-400 focus-visible:ring-red-300"
                    : ""
                }
              />

              {errors.phone && (
                <p className="text-xs text-red-500 px-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <textarea
              rows={3}
              placeholder={
                type === "viewing"
                  ? "Preferred day/time (optional)"
                  : "Your question (optional)"
              }
              value={form.note}
              onChange={(e) => handleFieldChange("note", e.target.value)}
              className="w-full bg-white/80 border border-navy-700/10 rounded-xl px-4 py-3 text-sm placeholder:text-navy-700/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 resize-none"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : cfg.submitLabel}
          </Button>
        </form>
      )}
    </Modal>
  );
}
