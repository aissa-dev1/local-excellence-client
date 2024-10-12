import { StoreType } from "~/services/store";
import Badge from "../ui/badge";
import Button from "../ui/button";
import Card from "../ui/card";
import { A } from "@solidjs/router";
import { encodeStoreName } from "~/utils/store-name";
import { service } from "~/service";
import { createResource, Show } from "solid-js";

interface HomeStoreCardProps extends StoreType {}

export default function HomeStoreCard({
  name,
  type,
  ownerId,
}: HomeStoreCardProps) {
  const [storeOwner] = createResource(() => {
    return service.user.getUserById(ownerId);
  });

  return (
    <Card.Self>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <Show when={storeOwner()}>
          <Card.Description>{storeOwner()!.userName}</Card.Description>
        </Show>
      </Card.Header>
      <Card.Content>
        <img
          class="w-36 rounded-md"
          src="/local-excellence.png"
          alt="Local Excellence"
        />
      </Card.Content>
      <Card.Footer class="flex items-center justify-between">
        <A href={`/stores/${encodeStoreName(name)}`}>
          <Button variant="outline">Go for it</Button>
        </A>
        <Badge class="capitalize">{type}</Badge>
      </Card.Footer>
    </Card.Self>
  );
}
