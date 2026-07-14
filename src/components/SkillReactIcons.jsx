import {
  ReactOriginal,
  NextjsOriginal,
  AngularOriginal,
  Css3Original,
  SassOriginal,
  TailwindcssOriginal,
  Html5Original,
  FigmaOriginal,
  TypescriptOriginal,
  JavascriptOriginal,
  PythonOriginal,
  PhpOriginal,
  DotnetcoreOriginal,
  SymfonyOriginal,
  COriginal,
  CplusplusOriginal,
  RustOriginal,
  HaskellOriginal,
  BashOriginal,
  GraphqlPlain,
  MysqlOriginal,
  MongodbOriginal,
  RedisOriginal,
  DbeaverOriginal,
  JestPlain,
  CypressioOriginal,
  RabbitmqOriginal,
  DockerOriginal,
  GrafanaOriginal,
  NginxOriginal,
  AmazonwebservicesOriginalWordmark,
  VercelOriginal,
  ElectronOriginal,
  GitOriginal,
  GithubOriginal,
  PostmanOriginal,
  VscodeOriginal,
  VimOriginal,
  MarkdownOriginal,
  LinuxOriginal,
  UbuntuOriginal,
  ArchlinuxOriginal,
  AppleOriginal,
  Windows11Original,
  RubyOriginal,
  CsharpOriginal,
} from "devicons-react";
import { TbApi, TbDatabase, TbCpu, TbRobot, TbRobotOff } from "react-icons/tb";
import {
  SiSfml,
  SiRaylib,
  SiGnu,
  SiShadcnui,
} from "react-icons/si";

const SKILL_DEVICONS = {
  "React.js": ReactOriginal,
  "Next.js": NextjsOriginal,
  "Angular 2+": AngularOriginal,
  CSS: Css3Original,
  "Sass / SCSS": SassOriginal,
  Tailwind: TailwindcssOriginal,
  TailwindCSS: TailwindcssOriginal,
  HTML: Html5Original,
  Figma: FigmaOriginal,

  TypeScript: TypescriptOriginal,
  JavaScript: JavascriptOriginal,
  Python: PythonOriginal,
  PHP: PhpOriginal,
  ".NET": DotnetcoreOriginal,
  "Entity Framework": DotnetcoreOriginal,
  Symfony: SymfonyOriginal,
  C: COriginal,
  "C++": CplusplusOriginal,
  Rust: RustOriginal,
  Ruby: RubyOriginal,
  Haskell: HaskellOriginal,
  Bash: BashOriginal,
  "C#": CsharpOriginal,

  GraphQl: GraphqlPlain,
  MySQL: MysqlOriginal,
  MongoDB: MongodbOriginal,
  Redis: RedisOriginal,
  DBeaver: DbeaverOriginal,

  Jest: JestPlain,
  Cypress: CypressioOriginal,
  RabbitMQ: RabbitmqOriginal,
  Docker: DockerOriginal,
  Grafana: GrafanaOriginal,
  Nginx: NginxOriginal,
  NGINX: NginxOriginal,
  AWS: AmazonwebservicesOriginalWordmark,
  Vercel: VercelOriginal,
  Electron: ElectronOriginal,
  Git: GitOriginal,
  GitHub: GithubOriginal,
  Postman: PostmanOriginal,
  VSCode: VscodeOriginal,
  Vim: VimOriginal,
  Markdown: MarkdownOriginal,

  Linux: LinuxOriginal,
  "Linux, Windows": LinuxOriginal,
  Ubuntu: UbuntuOriginal,
  "Arch Linux": ArchlinuxOriginal,
  MacOS: AppleOriginal,
  Windows: Windows11Original,
};

const SKILL_FALLBACK_ICONS = {
  REST: { Icon: TbApi, color: "#0D9488" },
  SQL: { Icon: TbDatabase, color: "#00618A" },
  CSFML: { Icon: SiSfml, color: "#8CC445" },
  Raylib: { Icon: SiRaylib, color: "#000000" },
  Makefile: { Icon: SiGnu, color: "#A42E2B" },
  Shadcn: { Icon: SiShadcnui, color: "#000000" },
  Assembler: { Icon: TbCpu, color: "#4B5563" },
  Assembly: { Icon: TbCpu, color: "#4B5563" },
  "Avec IA": { Icon: TbRobot, color: "#7C3AED" },
  "With AI": { Icon: TbRobot, color: "#7C3AED" },
  AIあり: { Icon: TbRobot, color: "#7C3AED" },
  "Sans IA": { Icon: TbRobotOff, color: "#6B7280" },
  "Without AI": { Icon: TbRobotOff, color: "#6B7280" },
  "No AI": { Icon: TbRobotOff, color: "#6B7280" },
  AIなし: { Icon: TbRobotOff, color: "#6B7280" },
};

export const hasSkillIcon = (name) =>
  Boolean(SKILL_DEVICONS[name] || SKILL_FALLBACK_ICONS[name]);

export const SkillIcon = ({ name, size = 24, className = "" }) => {
  const Devicon = SKILL_DEVICONS[name];
  const fallback = SKILL_FALLBACK_ICONS[name];
  if (!Devicon && !fallback) return null;

  const FallbackIcon = fallback?.Icon;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-white shrink-0 ${className}`}
      style={{ padding: Math.max(2, Math.round(size * 0.16)) }}
      title={name}
    >
      {Devicon ? (
        <Devicon size={size} />
      ) : (
        <FallbackIcon size={size} color={fallback.color} aria-label={name} />
      )}
    </span>
  );
};

export default hasSkillIcon;
