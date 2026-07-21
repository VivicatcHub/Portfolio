import { useState } from "react";
import { useTranslation } from "react-i18next";
import { announcement } from "../announcement";

const STORAGE_PREFIX = "announcementDismissed:";

const VARIANTS = {
  dark: {
    wrapper:
      "inline-flex max-w-2xl items-start gap-3 rounded-lg border border-ayu-purple/50 bg-ayu-purple/10 px-4 py-2.5 text-sm text-white backdrop-blur-sm",
    link: "underline decoration-ayu-purple underline-offset-2 hover:text-ayu-purple",
    close: "text-white/60 hover:text-white",
  },
  light: {
    wrapper:
      "flex max-w-2xl items-start gap-3 rounded-xl border border-ayu-purple/30 bg-ayu-purple/5 px-4 py-3 text-sm text-gray-700",
    link: "underline decoration-ayu-purple underline-offset-2 hover:text-ayu-purple",
    close: "text-gray-400 hover:text-gray-700",
  },
};

const Announcement = ({ variant = "dark", className = "" }) => {
  const { t: translate } = useTranslation();
  const message = translate("announcement.message", { defaultValue: "" });
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || !message.trim() || dismissed) return null;

  const styles = VARIANTS[variant] || VARIANTS.dark;

  const dismiss = () => {
    setDismissed(true);
  };

  const content = announcement.href ? (
    <a
      href={announcement.href}
      target={announcement.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={styles.link}
    >
      {message}
    </a>
  ) : (
    message
  );

  return (
    <div
      role="status"
      className={`animate-fade-in ${styles.wrapper} ${className}`}
    >
      <span aria-hidden="true">📣</span>
      <span className="flex-1 leading-snug">{content}</span>
      <button
        type="button"
        onClick={dismiss}
        aria-label={translate("announcement.dismiss", {
          defaultValue: "Dismiss",
        })}
        className={`shrink-0 leading-none ${styles.close}`}
      >
        ✕
      </button>
    </div>
  );
};

export default Announcement;
