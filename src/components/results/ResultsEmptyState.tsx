import React from "react";
import { FileX2, Clock } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function ResultsEmptyState() {
  return (
    <EmptyState
      icon={<FileX2 className="h-6 w-6 text-slate-400" />}
      title="Academic Results Not Yet Released"
      description="Continuous assessment scores and exam results for this term are currently undergoing academic board moderation and vetting. Results will be published once approved by the school principal."
    />
  );
}
