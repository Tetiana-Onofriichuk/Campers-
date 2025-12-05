import { getCamperById } from "@/lib/api/campersApi";
import CamperPage from "@/components/CamperPage/CamperPage";

type Props = {
  params: { id: string };
};

export default async function CamperDetailsPage({ params }: Props) {
  const camper = await getCamperById(params.id);

  return <CamperPage camper={camper} />;
}
