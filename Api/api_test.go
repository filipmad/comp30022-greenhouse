package main

import (
	"bytes"
	"fmt"
	"io/ioutil"

	"net/http"
	"time"

	"github.com/gorilla/mux"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

type API struct {
	server *http.Server
}

func NewAPI() *API {
	mux := mux.NewRouter()

	handleRequests(mux)
	// Create and return the API server instance
	return &API{
		server: &http.Server{
			Addr:    ":8081",
			Handler: mux,
		},
	}
}
func (api *API) Start() {
	go func() {
		if err := api.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Println("Error starting server:", err)
		}
	}()
}

// Stop gracefully stops the API server
func (api *API) Stop() {
	fmt.Println("Starting server on", api.server.Addr)
	if err := api.server.Close(); err != nil {
		fmt.Println("Error stopping server:", err)
	}
}

// Integration testing for API  )
var _ = Describe("API", func() {
	var (
		apiURL string
		api    *API
	)

	BeforeEach(func() {
		apiURL = "http://localhost:8081"
		api = NewAPI()
		go api.Start()
		time.Sleep(5 * time.Second)

	})

	AfterEach(func() {
		api.Stop()
	})

	Describe("GET /Users", func() {
		It("returns a list of users", func() {
			resp, err := http.Get(fmt.Sprintf("%s/Users", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("test"))
			Expect(bodyString).To(ContainSubstring("Password"))
		})
	})

	Describe("GET /Garden", func() {
		It("returns a list of gardens", func() {
			resp, err := http.Get(fmt.Sprintf("%s/Garden", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("1"))
			Expect(bodyString).To(ContainSubstring("6"))
			Expect(bodyString).To(ContainSubstring("4"))
		})
	})
	Describe("GET /Plant", func() {
		It("returns a list of plants", func() {
			resp, err := http.Get(fmt.Sprintf("%s/Plant", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})
	})
	Describe("GET /Comment", func() {
		It("returns a list of Comments", func() {
			resp, err := http.Get(fmt.Sprintf("%s/Comment", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})

	})
	Describe("GET /ForumPost", func() {
		It("returns a list of ForumPost", func() {
			resp, err := http.Get(fmt.Sprintf("%s/ForumPost", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})

	})
	Describe("GET /Poll", func() {
		It("returns a list of Poll", func() {
			resp, err := http.Get(fmt.Sprintf("%s/Poll", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})

	})
	Describe("GET /NewsPost", func() {
		It("returns a list of NewsPost", func() {
			resp, err := http.Get(fmt.Sprintf("%s/NewsPost", apiURL))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})

	})
})

//Integration Testing for POST

var _ = Describe("API", func() {
	var (
		apiURL string
		api    *API
	)

	BeforeEach(func() {

		apiURL = "http://localhost:8081"
		api = NewAPI()
		go api.Start()
		time.Sleep(5 * time.Second)

	})

	AfterEach(func() {
		api.Stop()
	})

	Describe("POST /Users", func() {
		It("creates a user", func() {
			b := []byte(`{
			    "University": "Testing University",
				"Username": "test",
				"Password": "Password",
				"ProfilePicture": "Picture"
		}`)
			resp, err := http.Post(fmt.Sprintf("%s/Users", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("Testing University"))
			Expect(bodyString).To(ContainSubstring("Picture"))
		})
	})

	Describe("POST /Garden", func() {
		b := []byte(`{
			    "TreeAge": 3,
    			"UserID": 6
	}`)
		It("creates a new Garden", func() {
			resp, err := http.Post(fmt.Sprintf("%s/Garden", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("3"))
			Expect(bodyString).To(ContainSubstring("4"))

		})
	})
	Describe("POST /Plant", func() {
		b := []byte(`{
			"GardenID": 1,
			"Age": 7,
			"Name": "Poppy"
}`)
		It("puts a new plant", func() {
			resp, err := http.Post(fmt.Sprintf("%s/Plant", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("1"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("Poppy"))

		})
	})
	// 	Describe("POST /Comment", func() {
	// 		b := []byte(`{
	// 			"Text": "Cool Post",
	// 			"PostID": 1,
	// 			"PostAuthorID": 6
	// }`)
	// 		It("puts a new comment", func() {
	// 			resp, err := http.Post(fmt.Sprintf("%s/Comment", apiURL), "application/json", bytes.NewBuffer(b))
	// 			Expect(err).NotTo(HaveOccurred())
	// 			defer resp.Body.Close()

	// 			Expect(resp.StatusCode).To(Equal(http.StatusOK))

	// 			bodyBytes, err := ioutil.ReadAll(resp.Body)
	// 			Expect(err).NotTo(HaveOccurred())
	// 			bodyString := string(bodyBytes)

	// 			Expect(bodyString).To(ContainSubstring("Cool Post"))
	// 			Expect(bodyString).To(ContainSubstring("1"))
	// 			Expect(bodyString).To(ContainSubstring("6"))

	// 		})

	// 	})
	Describe("POST /ForumPost", func() {
		b := []byte(`{
	    "AuthorID": 4
		"Title" : "New Forum Post"
		"Text" : "New Text"
		"Likes": 3
	
}`)
		It("returns a list of ForumPost", func() {

			resp, err := http.Post(fmt.Sprintf("%s/ForumPost", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("4"))
			Expect(bodyString).To(ContainSubstring("Poppy"))
			Expect(bodyString).To(ContainSubstring("7"))
			Expect(bodyString).To(ContainSubstring("1"))
		})

	})
	Describe("POST /Poll", func() {
		It("Creates a new Poll", func() {
			b := []byte(`{
			"Title": "Hello"
			"Text": "Please vote for one of the options"
			"OptionOne": "Option One"
			"OptionTwo": "Option Two"
			"OptionOneVotes": 0
			"OptionTwoVotes": 0 

		   
	   }`)
			resp, err := http.Post(fmt.Sprintf("%s/Poll", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("Hello"))
			Expect(bodyString).To(ContainSubstring("Please vote for one of the options"))
			Expect(bodyString).To(ContainSubstring("Option One"))
			Expect(bodyString).To(ContainSubstring("Option Two"))
		})

	})
	Describe("POST /NewsPost", func() {
		It("creates a NewsPost", func() {
			b := []byte(`{
				"Title": "News Article #1"
				"Author: "Jimmy Cook"
				"Text": "SDG Goals are cool"
			   
		   }`)
			resp, err := http.Post(fmt.Sprintf("%s/NewsPost", apiURL), "application/json", bytes.NewBuffer(b))
			Expect(err).NotTo(HaveOccurred())
			defer resp.Body.Close()

			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			bodyBytes, err := ioutil.ReadAll(resp.Body)
			Expect(err).NotTo(HaveOccurred())
			bodyString := string(bodyBytes)

			Expect(bodyString).To(ContainSubstring("News Article #1"))
			Expect(bodyString).To(ContainSubstring("Jimmy Cook"))
			Expect(bodyString).To(ContainSubstring("SDG Goals are cool"))

		})

	})
})
