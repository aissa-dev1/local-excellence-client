import { HomeStoreType } from "~/features/store";
import Badge from "../ui/badge";
import Button from "../ui/button";
import Card from "../ui/card";

interface HomeStoreCardProps extends HomeStoreType {}

export default function HomeStoreCard({
  name,
  ownerName,
  type,
}: HomeStoreCardProps) {
  return (
    <Card.Self>
      <Card.Header>
        <Card.Title>{name}</Card.Title>
        <Card.Description>{ownerName}</Card.Description>
      </Card.Header>
      <Card.Content>
        <img
          class="w-36 rounded-md"
          src="/local-excellence.png"
          alt="Local Excellence"
        />
      </Card.Content>
      <Card.Footer class="flex items-center justify-between">
        <Button variant="outline">Go for it</Button>
        <Badge class="capitalize">{type}</Badge>
      </Card.Footer>
    </Card.Self>
  );
}
