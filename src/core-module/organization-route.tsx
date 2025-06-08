import React from "react";
import { observer } from "mobx-react-lite";
import { useOrganizationStore } from "./store";
import { useParams, useNavigate } from "react-router-dom";

export const OrganizationRoute: React.FC<React.PropsWithChildren> = observer(({ children }) => {
  const { organizationName } = useParams<{ organizationName: string }>();
  const navigate = useNavigate();
  const organizationStore = useOrganizationStore();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      organizationStore.currentOrganization !== null &&
      organizationStore.organizations.length > 0
    ) {
      return;
    }

    if (organizationStore.organizations.length === 0) {
      setLoading(true);

      organizationStore
        .fetchOrganizations()
        .then(() => {
          setLoading(false);

          if (organizationStore.currentOrganization === null) {
            const org = organizationStore.organizations.find(
              (org) => org.name === organizationName,
            );

            if (org) {
              organizationStore.setCurrentOrganization(org);
            } else {
              navigate("/invalid-organization");
            }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch organizations:", error);
          setLoading(false);
        });
    }
  }, [organizationStore.currentOrganization, organizationStore.organizations]);

  return loading || organizationStore.currentOrganization === null ? (
    <div>Loading organizations...</div>
  ) : (
    children
  );
});
