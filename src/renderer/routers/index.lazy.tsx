import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Main,
});

function Main() {
  return (
    <div>
      <h3>Main</h3>
    </div>
  );
}
