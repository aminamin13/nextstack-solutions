import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-background p-6">
      <Card className="surface w-full max-w-md rounded-3xl border" data-testid="card-404">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight" data-testid="text-404-title">
                Page not found
              </h1>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-404-body">
                This route isn’t set up yet. Head back to the portfolio home page.
              </p>
            </div>
          </div>

          <a
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:shadow-md ring-focus"
            data-testid="link-404-home"
          >
            Go home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
