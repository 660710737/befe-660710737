package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type Customer struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

var customers []Customer
var nextID = 1

func main() {
	r := gin.Default()

	r.GET("/customers", func(c *gin.Context) {
		c.JSON(http.StatusOK, customers)
	})

	r.POST("/customers", func(c *gin.Context) {
		var customer Customer
		c.BindJSON(&customer)
		customer.ID = nextID
		nextID++
		customers = append(customers, customer)
		c.JSON(http.StatusCreated, customer)
	})

	r.GET("/customers/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		for _, cus := range customers {
			if cus.ID == id {
				c.JSON(http.StatusOK, cus)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
	})
	r.GET("/health", func(c *gin.Context){
		c.JSON(200, gin.H{"message" : "healthy"})
	})

	r.Run(":8080")
}