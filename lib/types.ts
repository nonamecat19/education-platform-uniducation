import { TextSection } from '@/lib/db/schema'

export interface BaseTable {
  createdAt: Date
  updatedAt: Date
}

export interface Course extends BaseTable {
  id: string
  groupSubjectId: string
  teacherId: string
  groupSubject: GroupSubject | null
  teacher: Teacher | null
}

export interface GroupSubject extends BaseTable {
  id: string
  subjectId: string
  groupId: string
  hours: number | null
  subject: Subject | null
}

export interface Teacher extends BaseTable {
  id: string
  name: string
  surname: string
  patronymic: string | null
  profession: string
}

export interface Subject extends BaseTable {
  id: string
  name: string
}

export interface UnitWithTextSections extends BaseTable {
  id: string
  courseId: string
  name: string
  description: string
  textSections: TextSection[]
}

export type ValueOf<T> = T[keyof T];

export type HeaderLinks = {
  url: string
  name: string
}[]
