import { usePagesTranslationTree } from "~/hooks/use-translation-tree";
import Typography from "../ui/typography";

export default function StoresHeader() {
  const pagesTranslation = usePagesTranslationTree();

  return (
    <>
      <Typography.H1>{pagesTranslation()?.stores.header.title}</Typography.H1>
    </>
  );
}
