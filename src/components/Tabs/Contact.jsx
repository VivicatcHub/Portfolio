import { useTranslation } from "react-i18next";
import Title from "../Title";
import useData from "../useData";

const Contact = () => {
  const { t: translate } = useTranslation();

  const data = useData();
  const SOCIALS = data?.socials || [];

  const Spacer = () => (
    <>
      <span className="whitespace-pre-wrap inline sm:hidden"> </span>
      <span className="whitespace-pre-wrap hidden sm:inline lg:hidden">
        {"\t"}
      </span>
      <span className="whitespace-pre-wrap hidden lg:inline">{"\t\t"}</span>
    </>
  );

  return (
    <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row text-white pt-8 overflow-y-auto">
      <div className="lg:w-1/2 px-2 md:px-4 lg:px-6 mb-6">
        <Title text={translate("contact.title")} />
        <div className="h-8 bg-gray-300 rounded-t-lg flex justify-between px-4 items-center relative ">
          <div className="italic text-gray-800 text-center w-full">
            Terminal
          </div>
          <div className="absolute flex gap-1">
            <div className="h-3 aspect-square rounded-full bg-green-600"></div>
            <div className="h-3 aspect-square rounded-full bg-yellow-400"></div>
            <div className="h-3 aspect-square rounded-full bg-red-600"></div>
          </div>
        </div>
        <code className="flex flex-col whitespace-pre-wrap lowercase text-base md:text-xl leading-8 bg-black p-4 rounded-b-2xl">
          <div>$ cat index.css</div>
          <div>
            <span className="text-ayu-purple">.socials</span>
            {" {"}
          </div>
          {SOCIALS.map((social) => (
            <div key={social.link}>
              <span>
                <Spacer />
                <span>{`${social.name}: `}</span>
              </span>
              <a
                className="text-ayu-purple hover:underline"
                href={social.link}
              >{`${social.value}`}</a>
              {";"}
            </div>
          ))}
          <div>{"}"}</div>
          <div>
            <span>$</span>
            <span className="ml-2 text-ayu-purple animate-blink font-extralight">
              _
            </span>
          </div>
        </code>
      </div>
    </div>
  );
};

export default Contact;
