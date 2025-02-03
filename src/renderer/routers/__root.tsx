import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import Main from '@renderer/pages/main';

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Loading</div>}>
      <Outlet />
    </Suspense>
  ),
  notFoundComponent: () => <Main />, // TODO: 임시방편. 라우터 교체 필요
});
