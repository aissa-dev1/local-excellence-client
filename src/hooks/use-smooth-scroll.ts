import { onCleanup, onMount } from "solid-js";

export function useSmoothScroll() {
  let links: NodeListOf<HTMLAnchorElement>;

  function smoothScroll(event: Event) {
    event.preventDefault();
    const target = (event.target as HTMLElement).closest(
      "a"
    ) as HTMLAnchorElement;
    const targetId = target.getAttribute("href")?.slice(1);
    const targetElement = document.getElementById(targetId || "");

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  onMount(() => {
    links = document.querySelectorAll('a[href^="#"]');

    if (!links) {
      return;
    }

    links.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });
  });

  onCleanup(() => {
    if (!links) {
      return;
    }

    links.forEach((link) => {
      link.removeEventListener("click", smoothScroll);
    });
  });
}
