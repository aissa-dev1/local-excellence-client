import { Accessor, Setter } from "solid-js";
import Button from "../ui/button";
import Input from "../ui/input";
import Spacing from "../ui/spacing";
import { GAP_SIZE } from "~/constants";
import Label from "../ui/label";

interface ProductsSearchProps {
  inputSearchQuery: Accessor<string>;
  searchQuery: Accessor<string>;
  searchProducts: (query: string) => void;
  handleInputChange: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
}

export default function ProductsSearch(props: ProductsSearchProps) {
  return (
    <Spacing.GapY size="content-md">
      <Label for="search" class="w-fit">
        Search for products
      </Label>
      <form
        class={`flex flex-col ${GAP_SIZE.contentMd} lg:flex-row`}
        onSubmit={(e) => {
          e.preventDefault();
          props.searchProducts(props.inputSearchQuery());
        }}
      >
        <Input
          type="text"
          placeholder="Search..."
          id="search"
          value={props.inputSearchQuery()}
          onInput={props.handleInputChange}
        />
        <Button class="w-full lg:w-fit">Search</Button>
      </form>
    </Spacing.GapY>
  );
}
