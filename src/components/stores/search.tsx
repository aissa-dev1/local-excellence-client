import { Accessor, Setter } from "solid-js";
import Button from "../ui/button";
import Input from "../ui/input";
import { GAP_SIZE } from "~/constants";
import Label from "../ui/label";
import SearchFilters from "./search-filters";
import Flex from "../ui/flex";
import { useTranslation } from "~/hooks/use-translation";
import { storesTranslation } from "~/translations/pages/stores";

interface StoresSearchProps {
  inputSearchQuery: Accessor<string>;
  searchQuery: Accessor<string>;
  searchStores: (query: string) => void;
  handleInputChange: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  activeStoreType: Accessor<string>;
  setActiveStoreType: Setter<string>;
}

export default function StoresSearch(props: StoresSearchProps) {
  const translation = useTranslation(storesTranslation);

  return (
    <Flex direction="column" gap="md">
      <Label for="search" class="w-fit">
        {translation().search.label}
      </Label>
      <form
        class={`flex flex-col ${GAP_SIZE.md} lg:flex-row`}
        onSubmit={(e) => {
          e.preventDefault();
          props.searchStores(props.inputSearchQuery());
        }}
      >
        <Input
          type="text"
          placeholder={translation().search.placeholder}
          id="search"
          value={props.inputSearchQuery()}
          onInput={props.handleInputChange}
        />
        <Button
          class="w-full lg:w-fit"
          onClick={() => props.searchStores(props.inputSearchQuery())}
        >
          {translation().search.button}
        </Button>
      </form>
      <SearchFilters
        activeStoreType={props.activeStoreType}
        setActiveStoreType={props.setActiveStoreType}
      />
    </Flex>
  );
}
