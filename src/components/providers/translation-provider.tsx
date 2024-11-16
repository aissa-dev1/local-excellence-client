import { createEffect, createResource, on, ParentProps } from "solid-js";
import { feature } from "~/feature";
import { readTranslationTree } from "~/lib/translation/read-translation-tree";

interface TranslationProviderProps extends ParentProps {}

export function TranslationProvider(props: TranslationProviderProps) {
  const lang = () => feature.translation.state().language;
  createResource(async () => {
    const tree = await readTranslationTree(lang());
    feature.translation.update({ tree });
  });

  createEffect(
    on(lang, async () => {
      const tree = await readTranslationTree(lang());
      feature.translation.update({ tree });
    })
  );

  return <>{props.children}</>;
}
