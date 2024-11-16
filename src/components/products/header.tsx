import { usePagesTranslationTree } from "~/hooks/use-translation-tree";
import Typography from "../ui/typography";

export default function ProductsHeader() {
  const pagesTranslation = usePagesTranslationTree();

  return (
    <>
      <Typography.H1>{pagesTranslation()?.products.header.title}</Typography.H1>
    </>
  );
}
