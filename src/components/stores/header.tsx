import { useTranslation } from "~/hooks/use-translation";
import Typography from "../ui/typography";
import { storesTranslation } from "~/translations/pages/stores";

export default function StoresHeader() {
  const translation = useTranslation(storesTranslation);

  return (
    <>
      <Typography.H1>{translation().header.title}</Typography.H1>
    </>
  );
}
