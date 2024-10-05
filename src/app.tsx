import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";
import "./app.css";
import Title from "./components/reusable/title";
import axios from "axios";
import { getApiUrl } from "./utils/get-api-url";
import ContextProviders from "./components/context-providers/context-providers";

export default function App() {
  onMount(async () => {
    await axios.get(getApiUrl("root"));
  });

  return (
    <Router
      root={(props) => (
        <ContextProviders>
          <Title.Self />
          <Suspense>{props.children}</Suspense>
        </ContextProviders>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
