import { Accessor } from "solid-js";
import Button from "../ui/button";
import Input from "../ui/input";
import Spacing from "../ui/spacing";
import Typography from "../ui/typography";
import { GapSize } from "~/constants";
import Label from "../ui/label";

interface StoresSearchProps {
  searchQuery: Accessor<string>;
  searchStores: (query: string) => void;
  handleInputChange: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
}

export default function StoresSearch(props: StoresSearchProps) {
  return (
    <Spacing.GapY size="content-md">
      <Label for="search" class="w-fit">
        Search for stores
      </Label>
      <div class={`flex flex-col ${GapSize.contentMd} lg:flex-row`}>
        <Input
          type="text"
          placeholder="Search..."
          id="search"
          value={props.searchQuery()}
          onInput={props.handleInputChange}
        />
        <Button
          class="w-full lg:w-fit"
          onClick={() => props.searchStores(props.searchQuery())}
        >
          Search
        </Button>
      </div>
    </Spacing.GapY>
  );
}
