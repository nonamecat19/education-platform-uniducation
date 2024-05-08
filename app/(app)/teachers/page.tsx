import TeacherList from "@/components/teachers/TeacherList";
import NewTeacherModal from "@/components/teachers/TeacherModal";
import { api } from "@/lib/trpc/api";

export default async function Teachers() {
  const { teachers } = await api.teachers.getTeachers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Teachers</h1>
        <NewTeacherModal />
      </div>
      <TeacherList teachers={teachers} />
    </main>
  );
}
