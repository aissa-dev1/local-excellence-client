import { Accessor, createResource, For, Setter } from "solid-js";
import { service } from "~/service";
import Spacing from "../ui/spacing";
import Badge from "../ui/badge";
import { withTryCatch } from "~/utils/with-try-catch";

interface SearchFiltersProps {
  activeStoreType: Accessor<string>;
  setActiveStoreType: Setter<string>;
}

export default function SearchFilters(props: SearchFiltersProps) {
  const [storeTypes] = createResource(async () => {
    const [response, error] = await withTryCatch(service.store.getStoreTypes);
    return error ? ["all"] : ["all", ...response!];
  });

  return (
    <Spacing.GapX size="content-md" class="items-center flex-wrap">
      <For each={storeTypes()}>
        {(storeType) => (
          <Badge
            variant={
              props.activeStoreType() === storeType ? "default" : "secondary"
            }
            class="capitalize cursor-pointer"
            onClick={() => {
              if (props.activeStoreType() === storeType) {
                props.setActiveStoreType("all");
              } else {
                props.setActiveStoreType(storeType);
              }
            }}
          >
            {storeType}
          </Badge>
        )}
      </For>
    </Spacing.GapX>
  );
}
