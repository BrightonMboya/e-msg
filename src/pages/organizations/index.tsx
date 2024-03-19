import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import OrganizationTable from "~/components/organization/OrganizationTable";
import NoAsset from "~/components/Layout/NoAsset";
import Header from "~/components/Layout/Header";

export default function Page() {
  const { user } = useUser();
  const { data, isLoading } = api.organization.all.useQuery();

  return (
    <main className="pl-5">
      <Header
        caption={user?.username as unknown as string}
        link="/organizations/new"
        title="New Organization"
      />
      {data?.length === 0 && isLoading && (
        <NoAsset
          bigTitle="You haven't added your Contacts yet"
          smallTitle="It's easier to manage, your contacts. Go ahead and them now"
          c2a="Add Contacts"
          c2aUrl="/contacts/new"
        />
      )}

      {/* @ts-ignore */}
      {data!?.length > 0 && <OrganizationTable data={data} />}
    </main>
  );
}
