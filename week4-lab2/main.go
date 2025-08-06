package main
import (
	"fmt"
)

// var email string = "lakthan_v@silpakorn.edu"

func main(){
	// var name string = "vorrarut"
	var age int = 20

	email := "lakthan_v@silpakorn.edu"
	gpa := 2.87

	firstname, lastname := "Vorrarut", "Lakthan"

	fmt.Printf("Name: %s %s, Age: %d, Email: %s, GPA: %.2f", firstname, lastname, age, email, gpa)
}