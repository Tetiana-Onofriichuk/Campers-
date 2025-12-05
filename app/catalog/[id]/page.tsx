// app/catalog/[id]/page.tsx
import { getCamperById } from "@/lib/api/api";
import CamperDetails from "@/components/CamperDetails/CamperDetails";
import type { Camper } from "@/types/camper";

type Props = {
  params: { id: string };
};

export default async function CamperDetailsPage({ params }: Props) {
  const camper: Camper = await getCamperById(params.id);

  return <CamperDetails camper={camper} />;
}
