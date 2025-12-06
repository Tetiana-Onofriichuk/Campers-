import { notFound } from "next/navigation";

import { getCamperById } from "@/lib/api/api";
import CamperDetails from "@/components/CamperDetails/CamperDetails";
import type { Camper } from "@/types/camper";

export default async function CamperDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const camper = await getCamperById(id);

  if (!camper) {
    notFound();
  }

  return <CamperDetails camper={camper as Camper} />;
}
