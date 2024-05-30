"use client";
import { CompleteSubmittedLaboratoryWork } from "@/lib/db/schema";
import { trpcCSR } from "@/lib/trpc/client";
import SubmittedLaboratoryWorkModal from "./SubmittedLaboratoryWorkModal";


export default function SubmittedLaboratoryWorkList({ submittedLaboratoryWork }: { submittedLaboratoryWork: CompleteSubmittedLaboratoryWork[] }) {
  const { data: s } = trpcCSR.submittedLaboratoryWork.getSubmittedLaboratoryWork.useQuery(undefined, {
    initialData: { submittedLaboratoryWork },
    refetchOnMount: false,
  });

  if (s.submittedLaboratoryWork.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.submittedLaboratoryWork.map((submittedLaboratoryWork) => (
        <SubmittedLaboratoryWork submittedLaboratoryWork={submittedLaboratoryWork} key={submittedLaboratoryWork.id} />
      ))}
    </ul>
  );
}

const SubmittedLaboratoryWork = ({ submittedLaboratoryWork }: { submittedLaboratoryWork: CompleteSubmittedLaboratoryWork }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{submittedLaboratoryWork.studentId}</div>
      </div>
      <SubmittedLaboratoryWorkModal submittedLaboratoryWork={submittedLaboratoryWork} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No submitted laboratory work
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new submitted laboratory work.
      </p>
      <div className="mt-6">
        <SubmittedLaboratoryWorkModal emptyState={true} />
      </div>
    </div>
  );
};

