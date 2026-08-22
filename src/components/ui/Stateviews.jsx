import { RefreshCw, SearchX } from "lucide-react";
import Button from "./Button";

export function EmptyState({ title = "No listings match your filters", hint }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6 col-span-full">
      <div className="w-11 h-11 rounded-full bg-navy-700/[0.06] flex items-center justify-center mb-4">
        <SearchX size={18} className="text-navy-600" />
      </div>
      <p className="font-display text-xl text-navy-800 mb-1">{title}</p>
      {hint && <p className="text-sm text-navy-700/55 max-w-xs">{hint}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6 col-span-full">
      <div className="w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <SearchX size={18} className="text-red-500" />
      </div>
      <p className="font-display text-xl text-navy-800 mb-1">Something went wrong</p>
      <p className="text-sm text-navy-700/55 max-w-xs mb-5">{message || "Please try again."}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
