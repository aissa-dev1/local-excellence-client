import { Accessor, Setter } from "solid-js";
import Button from "../ui/button";
import Input from "../ui/input";
import { GAP_SIZE } from "~/constants";
import Label from "../ui/label";
import Flex from "../ui/flex";
import { usePagesTranslationTree } from "~/hooks/use-translation-tree";

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
  const pagesTranslation = usePagesTranslationTree();

  return (
    <Flex direction="column" gap="md">
      <Label for="search" class="w-fit">
        {pagesTranslation()?.products.search.label}
      </Label>
      <form
        class={`flex flex-col ${GAP_SIZE.md} lg:flex-row`}
        onSubmit={(e) => {
          e.preventDefault();
          props.searchProducts(props.inputSearchQuery());
        }}
      >
        <Input
          type="text"
          placeholder={pagesTranslation()?.products.search.placeholder}
          id="search"
          value={props.inputSearchQuery()}
          onInput={props.handleInputChange}
        />
        <Button
          class="w-full lg:w-fit"
          onClick={() => props.searchProducts(props.inputSearchQuery())}
        >
          {pagesTranslation()?.products.search.button}
        </Button>
      </form>
    </Flex>
  );
}
