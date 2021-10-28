const SomeApp = {
    data() {
      return {
        books: [],
        bookForm: {},
        
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookData() {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postEditBook(evt) {
          this.bookForm.id = this.selectedBook.id;
          this.bookForm.bookid = this.selectedBook.id;        
          
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
          this.bookForm.bookid = this.selectedBook.id;        
          
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
              this.handleResetEdit();
            })
            .catch( err => {
              alert("Something went horribly wrong.");
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