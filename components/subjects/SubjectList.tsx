"use client";
import { CompleteSubject } from "@/lib/db/schema/subjects";
import { trpc } from "@/lib/trpc/client";
import SubjectModal from "./SubjectModal";


export default function SubjectList({ subjects }: { subjects: CompleteSubject[] }) {
  const { data: s } = trpc.subjects.getSubjects.useQuery(undefined, {
    initialData: { subjects },
    refetchOnMount: false,
  });

  if (s.subjects.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.subjects.map((subject) => (
        <Subject subject={subject} key={subject.id} />
      ))}
    </ul>
  );
}

const Subject = ({ subject }: { subject: CompleteSubject }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{subject.name}</div>
      </div>
      <SubjectModal subject={subject} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No subjects
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new subject.
      </p>
      <div className="mt-6">
        <SubjectModal emptyState={true} />
      </div>
    </div>
  );
};

