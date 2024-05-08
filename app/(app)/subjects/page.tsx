import SubjectList from "@/components/subjects/SubjectList";
import NewSubjectModal from "@/components/subjects/SubjectModal";
import { api } from "@/lib/trpc/api";

export default async function Subjects() {
  const { subjects } = await api.subjects.getSubjects.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Subjects</h1>
        <NewSubjectModal />
      </div>
      <SubjectList subjects={subjects} />
    </main>
  );
}
