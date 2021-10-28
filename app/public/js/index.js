const SomeApp = {
    data() {
      return {
        books: [],
        bookForm: {},
        selectedBook: null
      }
    },
    computed: {},
    methods: {
        fetchBookData() {
            fetch('/api/book/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postBook(evt) {
          console.log ("Test:", this.selectedBook);
        if (this.selectedBook) {
            this.postEditBook(evt);
        } else {
            this.postNewBook(evt);
        }
      },

        postEditBook(evt) {
          this.bookForm.id = this.selectedBook.id;
          //this.bookForm.bookid = this.selectedBook.id;        
          
          console.log("Editing!", this.bookForm);
  
          fetch('api/book/update.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        
        postNewBook(evt) {     
          
          console.log("Creating!", this.bookForm);
  
          fetch('api/book/create.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.bookForm = {};
           
            });
        },
        postDeleteBook(o) {  
          if ( !confirm("Are you sure you want to delete the book ") ) {
              return;
          }  
          
          console.log("Delete!", o);
  
          fetch('api/book/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() {
            this.selectedBook = null;
            this.bookForm = {};
        }
    },
    created() {
        this.fetchBookData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#bookApp');