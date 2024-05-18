export interface Course {
  id: string
  groupSubjectId: string
  teacherId: string
  createdAt: Date
  updatedAt: Date
  groupSubject: GroupSubject | null
  teacher: Teacher | null
}

export interface GroupSubject {
  id: string
  subjectId: string
  groupId: string
  hours: number | null
  createdAt: Date
  updatedAt: Date
  subject: Subject | null
}

export interface Teacher {
  id: string
  name: string
  surname: string
  patronomyc: string | null
  email: string
  profession: string
  password: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Subject {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
