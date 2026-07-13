import { useTranslation } from "react-i18next";
import useData from "./useData";
import LightSection from "./LightSection";

const LightContact = () => {
  const { t: translate } = useTranslation();
  const data = useData();
  const socials = data?.socials || [];

  return (
    <LightSection
      title={translate("contact.title")}
      subtitle={translate("light.contact.intro")}
    >
      <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
        {socials.map((social) => (
          <a
            key={social.link}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-ayu-purple/40 hover:shadow-md transition-all"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                {social.name}
              </p>
              <p className="mt-1 font-medium text-gray-900 group-hover:text-ayu-purple break-all">
                {social.value}
              </p>
            </div>
            <span className="text-gray-300 group-hover:text-ayu-purple text-xl">
              →
            </span>
          </a>
        ))}
      </div>
    </LightSection>
  );
};

export default LightContact;
