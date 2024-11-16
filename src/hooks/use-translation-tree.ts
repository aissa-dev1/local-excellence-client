import { Accessor } from "solid-js";
import { feature } from "~/feature";
import {
  ComponentsTranslationTree,
  PagesTranslationTree,
  ReusableTranslationTree,
} from "~/lib/translation/types";

export function usePagesTranslationTree(): Accessor<
  PagesTranslationTree | undefined
> {
  const tree = () => feature.translation.state().tree;
  return () => tree().pages;
}

export function useComponentsTranslationTree(): Accessor<
  ComponentsTranslationTree | undefined
> {
  const tree = () => feature.translation.state().tree;
  return () => tree().components;
}

export function useReusableTranslationTree(): Accessor<
  ReusableTranslationTree | undefined
> {
  const tree = () => feature.translation.state().tree;
  return () => tree().reusable;
}
