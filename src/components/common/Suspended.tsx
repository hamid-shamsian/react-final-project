import { Suspense } from "react";

interface SuspendedProps {
  comp: React.ComponentType;
  load: React.ComponentType;
}

const Suspended = ({ comp: Component, load: LoadingSkeleton }: SuspendedProps) => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Component />
    </Suspense>
  );
};

export default Suspended;
