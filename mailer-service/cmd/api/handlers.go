package main

import (
	"log"
	"net/http"
)

type mailMessages struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func (app *Config) SendMail(w http.ResponseWriter, r *http.Request) {
	var requestPayload mailMessages

	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		log.Println(err)
		_ = app.errorJSON(w, err)
		return
	}

	msg := Message{
		From:    requestPayload.From,
		To:      requestPayload.To,
		Subject: requestPayload.Subject,
		Data:    requestPayload.Message,
	}

	err = app.Mailer.SendSMPTMessage(msg)
	if err != nil {
		log.Println(err)
		_ = app.errorJSON(w, err)
		return
	}

	payload := jsonResponse{
		Error:   false,
		Message: "sent to " + requestPayload.To,
	}

	_ = app.writeJSON(w, http.StatusAccepted, payload)
}
