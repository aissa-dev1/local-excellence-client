import { Accessor, Setter } from "solid-js";
import Button from "../ui/button";
import Input from "../ui/input";
import Spacing from "../ui/spacing";
import { GAP_SIZE } from "~/constants";
import Label from "../ui/label";
import SearchFilters from "./search-filters";

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
  return (
    <Spacing.GapY size="content-md">
      <Label for="search" class="w-fit">
        Search for stores
      </Label>
      <form
        class={`flex flex-col ${GAP_SIZE.contentMd} lg:flex-row`}
        onSubmit={(e) => {
          e.preventDefault();
          props.searchStores(props.inputSearchQuery());
        }}
      >
        <Input
          type="text"
          placeholder="Search..."
          id="search"
          value={props.inputSearchQuery()}
          onInput={props.handleInputChange}
        />
        <Button
          class="w-full lg:w-fit"
          onClick={() => props.searchStores(props.inputSearchQuery())}
        >
          Search
        </Button>
      </form>
      <SearchFilters
        activeStoreType={props.activeStoreType}
        setActiveStoreType={props.setActiveStoreType}
      />
    </Spacing.GapY>
  );
}
