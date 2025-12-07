// ==== FILE: src/app/(auth)/_components/auth-form-skeleton.tsx ====
/**
 * Auth Form Skeleton
 */

export function AuthFormSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>
      ))}
      <div className="h-10 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}