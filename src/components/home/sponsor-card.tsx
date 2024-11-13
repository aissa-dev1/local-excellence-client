import { SponsorType } from "~/services/sponsor";
import Card from "../ui/card";
import { StoreType } from "~/services/store";
import Flex from "../ui/flex";
import Typography from "../ui/typography";
import { encodeStoreName } from "~/utils/store-name";
import { A } from "@solidjs/router";
import Button from "../ui/button";
import { useTranslation } from "~/hooks/use-translation";
import { homeTranslation } from "~/translations/pages/home";

interface SponsorCardProps extends SponsorType {
  store: StoreType | null;
}

export default function SponsorCard(props: SponsorCardProps) {
  const translation = useTranslation(homeTranslation);

  return (
    <Card.Self
      class="h-full min-h-[200px]"
      style={{
        "background-color": props.backgroundColor,
        color: props.color,
      }}
    >
      <Card.Padded>
        <Flex direction="column" gap="md">
          <Typography.H3>{props.store?.name}</Typography.H3>
          <Typography.P>{props.description}</Typography.P>
          <A
            href={
              props.store
                ? `/stores/${encodeStoreName(props.store.name)}`
                : "/stores"
            }
            class="w-fit"
          >
            <Button>{translation().sponsors.card.exploreBtn}</Button>
          </A>
        </Flex>
      </Card.Padded>
    </Card.Self>
  );
}