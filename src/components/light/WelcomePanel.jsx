import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { announcement } from "../../announcement";

const WelcomePanel = ({ email, showContact = true, className = "" }) => {
  const { t: translate } = useTranslation();
  const message = translate("announcement.message", { defaultValue: "" });

  if (!announcement.enabled || !message.trim()) return null;

  return (
    <aside className={`welcome ${className}`} aria-labelledby="welcome-title">
      <h2 id="welcome-title" className="welcome-title">
        <span className="welcome-dot" aria-hidden="true" />
        {translate("light.welcome.title")}
      </h2>
      <p className="welcome-text">
        {announcement.href ? (
          <a
            href={announcement.href}
            target={announcement.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {message}
          </a>
        ) : (
          message
        )}
      </p>
      {showContact && (
        <div className="welcome-actions">
          <Link to="/pro/contact" className="btn btn--ink">
            {translate("home.contact")}
            <ArrowRightIcon className="btn-icon" aria-hidden="true" />
          </Link>
          {email && (
            <a href={email.link} className="welcome-mail">
              {email.value}
            </a>
          )}
        </div>
      )}
    </aside>
  );
};

export default WelcomePanel;
