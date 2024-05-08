package http_dto

type UpdateStudentDTO struct {
	Name       string `json:"Name,omitempty"`
	Surname    string `json:"Surname,omitempty"`
	Patronymic string `json:"Patronymic,omitempty"`
	GroupID    int    `json:"GroupId,omitempty"`
	Email      string `json:"Email,omitempty"`
	StudentID  string `json:"StudentIdNumber,omitempty"`
	Password   string `json:"Password,omitempty"`
}

type AddStudentDTO struct {
	Name       string `json:"Name"`
	Surname    string `json:"Surname"`
	Patronymic string `json:"Patronymic"`
	GroupID    int    `json:"GroupId"`
	Email      string `json:"Email"`
	StudentID  string `json:"StudentIdNumber"`
	Password   string `json:"Password"`
}
