import Typography from "../ui/typography";
import { useTranslation } from "~/hooks/use-translation";
import { productsTranslation } from "~/translations/pages/products";

export default function ProductsHeader() {
  const translation = useTranslation(productsTranslation);

  return (
    <>
      <Typography.H1>{translation().header.title}</Typography.H1>
    </>
  );
}
