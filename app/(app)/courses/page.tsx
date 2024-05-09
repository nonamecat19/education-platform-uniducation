import CourseList from "@/components/courses/CourseList";
import NewCourseModal from "@/components/courses/CourseModal";
import { api } from "@/lib/trpc/api";

export default async function Courses() {
  const { courses } = await api.courses.getCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Courses</h1>
        <NewCourseModal />
      </div>
      <CourseList courses={courses} />
    </main>
  );
}
