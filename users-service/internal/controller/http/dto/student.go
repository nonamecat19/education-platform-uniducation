package dto

type UpdateStudentBodyDTO struct {
	Name       string `json:"Name,omitempty"`
	Surname    string `json:"Surname,omitempty"`
	Patronymic string `json:"Patronymic,omitempty"`
	GroupID    int    `json:"GroupId,omitempty"`
	Email      string `json:"Email,omitempty"`
	StudentID  string `json:"StudentIdNumber,omitempty"`
	Password   string `json:"Password,omitempty"`
}

type AddStudentBodyDTO struct {
	Name       string `json:"Name,omitempty"`
	Surname    string `json:"Surname,omitempty"`
	Patronymic string `json:"Patronymic,omitempty"`
	GroupID    int    `json:"GroupId,omitempty"`
	Email      string `json:"Email,omitempty"`
	StudentID  string `json:"StudentIdNumber,omitempty"`
	Password   string `json:"Password,omitempty"`
}
