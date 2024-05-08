package student_usecase

type UpdateStudentDTO struct {
	Name       string
	Surname    string
	Patronymic string
	GroupID    int
	Email      string
	StudentID  string
	Password   string
}

type AddStudentDTO struct {
	Name       string
	Surname    string
	Patronymic string
	GroupID    int
	Email      string
	StudentID  string
	Password   string
}
