import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackLink = ({ to, label }) => (
  <Link to={to} className="back-link">
    <ArrowLeftIcon className="btn-icon" aria-hidden="true" />
    {label}
  </Link>
);

export default BackLink;
