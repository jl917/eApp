import SubMonitor from '@renderer/pages/subMonitor'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/subMonitor/')({
  component: SubMonitor,
})
