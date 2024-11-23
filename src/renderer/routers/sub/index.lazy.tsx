import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sub/")({
  component: About,
});

function About() {
  return (
    <div>
      <h3>subPage</h3>
    </div>
  );
}
