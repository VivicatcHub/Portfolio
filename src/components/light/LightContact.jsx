import { useTranslation } from "react-i18next";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import useData from "./useData";
import RoomHeader from "./RoomHeader";
import WelcomePanel from "./WelcomePanel";

const LightContact = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const socials = data?.socials || [];

  return (
    <div className="room room--violet room--page desk">
      <div className="room-inner">
        <RoomHeader
          title={translate("contact.title")}
          intro={translate("light.contact.intro")}
        />
        <div className="desk-grid">
          <ul className="desk-list">
            {socials.map((social) => (
              <li key={social.link}>
                <a
                  href={social.link}
                  target={social.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="desk-row"
                >
                  <span className="desk-label">{social.name}</span>
                  <span className="desk-value">{social.value}</span>
                  <ArrowUpRightIcon className="desk-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <WelcomePanel showContact={false} className="desk-welcome" />
        </div>
      </div>
    </div>
  );
};

export default LightContact;
