import { createResource, Show } from "solid-js";
import { service } from "~/service";
import { ProductType } from "~/services/product";
import { withTryCatch } from "~/utils/with-try-catch";
import Card from "../ui/card";
import { A } from "@solidjs/router";
import Button from "../ui/button";
import Badge from "../ui/badge";
import { useCurrency } from "~/hooks/use-currency";
import { usePagesTranslationTree } from "~/hooks/use-translation-tree";

interface HomeProductCardProps extends ProductType {}

export default function HomeProductCard({
  _id,
  storeId,
  name,
  price,
}: HomeProductCardProps) {
  const [store] = createResource(async () => {
    const [response, error] = await withTryCatch(
      service.store.getStoreById,
      storeId
    );
    return error ? null : response;
  });
  const currency = useCurrency();
  const pagesTranslation = usePagesTranslationTree();

  return (
    <Card.Self>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          {price} {currency()}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <img
          class="w-36 rounded-md"
          src="/local-excellence.png"
          alt="Local Excellence"
        />
      </Card.Content>
      <Card.Footer class="flex items-center justify-between">
        <A href={`/products/${_id}`}>
          <Button variant="outline">
            {pagesTranslation()?.home.products.card.goForItBtn}
          </Button>
        </A>
        <Badge class="capitalize">{store()?.name}</Badge>
      </Card.Footer>
    </Card.Self>
  );
}
