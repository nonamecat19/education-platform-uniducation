"use client";
import { CompleteGroupSubject } from "@/lib/db/schema/groupSubjects";
import { trpc } from "@/lib/trpc/client";
import GroupSubjectModal from "./GroupSubjectModal";


export default function GroupSubjectList({ groupSubjects }: { groupSubjects: CompleteGroupSubject[] }) {
  const { data: g } = trpc.groupSubjects.getGroupSubjects.useQuery(undefined, {
    initialData: { groupSubjects },
    refetchOnMount: false,
  });

  if (g.groupSubjects.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.groupSubjects.map((groupSubject) => (
        <GroupSubject groupSubject={groupSubject} key={groupSubject.groupSubject.id} />
      ))}
    </ul>
  );
}

const GroupSubject = ({ groupSubject }: { groupSubject: CompleteGroupSubject }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{groupSubject.groupSubject.subjectId}</div>
      </div>
      <GroupSubjectModal groupSubject={groupSubject.groupSubject} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No group subjects
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new group subject.
      </p>
      <div className="mt-6">
        <GroupSubjectModal emptyState={true} />
      </div>
    </div>
  );
};

