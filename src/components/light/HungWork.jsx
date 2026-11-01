import { Link } from "react-router-dom";
import Cartel from "./Cartel";
import { workPath } from "./museum";

export const Frame = ({ src, alt = "", className = "", eager = false }) => (
  <span className={`frame ${className}`}>
    <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
  </span>
);

const HungWork = ({ work, number, size = "m", eager = false }) => (
  <Link to={workPath(work)} className={`hung hung--${size}`}>
    <span className="hung-light" aria-hidden="true" />
    <Frame src={work.cover} eager={eager} />
    <Cartel work={work} number={number} />
  </Link>
);

export default HungWork;
