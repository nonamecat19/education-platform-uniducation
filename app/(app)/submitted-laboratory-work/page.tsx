import SubmittedLaboratoryWorkList from "@/components/submittedLaboratoryWork/SubmittedLaboratoryWorkList";
import NewSubmittedLaboratoryWorkModal from "@/components/submittedLaboratoryWork/SubmittedLaboratoryWorkModal";
import { api } from "@/lib/trpc/api";

export default async function SubmittedLaboratoryWork() {
  const { submittedLaboratoryWork } = await api.submittedLaboratoryWork.getSubmittedLaboratoryWork.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Submitted Laboratory Work</h1>
        <NewSubmittedLaboratoryWorkModal />
      </div>
      <SubmittedLaboratoryWorkList submittedLaboratoryWork={submittedLaboratoryWork} />
    </main>
  );
}
