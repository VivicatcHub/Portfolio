import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useData from "./useData";
import RoomHeader from "./RoomHeader";
import BackLink from "./BackLink";
import { WorksRoom } from "./LightProjects";
import { catalogue, yearLabel } from "./museum";
import { findBundle } from "../projectLookup";

const LightProjectBundle = () => {
  const { bundleId } = useParams();
  const { t: translate } = useTranslation();
  const data = useData();

  if (!data) return <div className="room room--white room--page" />;

  const found = findBundle(data.projects || [], bundleId);

  if (!found) {
    return (
      <div className="room room--white room--page">
        <div className="room-inner">
          <BackLink
            to="/pro/projects"
            label={translate("projectCard.backToProjects")}
          />
          <RoomHeader title={translate("projectCard.notFound")} />
        </div>
      </div>
    );
  }

  const { bundle, category } = found;
  const numbers = catalogue(data.projects);

  return (
    <div className="room room--white room--page">
      <div className="room-inner">
        <BackLink
          to="/pro/projects"
          label={translate("projectCard.backToProjects")}
        />
        <RoomHeader
          title={bundle.name}
          name
          meta={[
            translate("light.cartel.series", {
              count: bundle.subProjects.length,
            }),
            yearLabel(bundle, translate("light.cartel.inProgress")),
            bundle.company || category,
          ]
            .filter(Boolean)
            .join(" · ")}
        />
        <WorksRoom items={bundle.subProjects || []} numbers={numbers} />
      </div>
    </div>
  );
};

export default LightProjectBundle;
