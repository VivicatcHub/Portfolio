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
import {
  TbApi,
  TbDatabase,
  TbCpu,
  TbRobot,
  TbRobotOff,
  TbNetwork,
  TbArrowsShuffle,
  TbBinaryTree,
  TbMath,
  TbMathFunction,
  TbTrendingUp,
  TbHash,
  TbWaveSine,
  TbInfinity,
  TbTestPipe,
  TbBrush,
  TbView360,
  TbTerminal,
  TbCube,
  TbBraces,
  TbNeedleThread,
  TbBroadcast,
} from "react-icons/tb";
import { SiSfml, SiRaylib, SiGnu, SiShadcnui } from "react-icons/si";

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
  Assembly: { Icon: TbCpu, color: "#4B5563" },
  "g++": { Icon: SiGnu, color: "#A42E2B" },
  Unix: { Icon: TbTerminal, color: "#111827" },
  ncurses: { Icon: TbTerminal, color: "#1D4ED8" },

  Algorithms: { Icon: TbBinaryTree, color: "#2563EB" },
  Mathematics: { Icon: TbMath, color: "#DB2777" },
  Optimization: { Icon: TbTrendingUp, color: "#16A34A" },
  "Network programming": { Icon: TbNetwork, color: "#0891B2" },
  "Concurrent programming": { Icon: TbArrowsShuffle, color: "#EA580C" },
  "Functional programming": { Icon: TbMathFunction, color: "#7C3AED" },
  Raycasting: { Icon: TbView360, color: "#9333EA" },
  "Graphics programming": { Icon: TbBrush, color: "#E11D48" },
  "Hash tables": { Icon: TbHash, color: "#0D9488" },
  "Signal processing": { Icon: TbWaveSine, color: "#4F46E5" },
  "Object-Oriented Programming (OOP)": { Icon: TbCube, color: "#8B5CF6" },
  "Lexer/Parser": { Icon: TbBraces, color: "#CA8A04" },
  Multithreading: { Icon: TbNeedleThread, color: "#BE185D" },
  "Signal handling": { Icon: TbBroadcast, color: "#0284C7" },
  "CI/CD": { Icon: TbInfinity, color: "#2563EB" },
  "Functional testing": { Icon: TbTestPipe, color: "#059669" },
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
