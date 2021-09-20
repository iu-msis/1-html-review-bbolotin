const Person = {
    data() {
      return {
        "person": {},
              }
    },
    computed:  {
        prettyBirthday(){
            return dayjs(this.person.dob.date)
            .format('D MMMM YYYY')
        }
    },
    methods:  {
        fetchUserData(){
        console.log("A");
  
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then((parsedJson) => {
            console.log(parsedJson);
            this.person = parsedJson.results[0]
            this.picture = this.person.picture.large
            this.address = this.person.location.street.number + this.person.location.street.name 
            this.userDob = this.person.dob.date[0] + this.person.dob.date[1] +this.person.dob.date[2] +this.person.dob.date[3] + '/' + this.person.dob.date[5] + this.person.dob.date[6] + '/' + this.person.dob.date[8] + this.person.dob.date[9]
            console.log("C");
        })
        .catch( err => {
            console.error(err)
        })
  
        console.log("B");
     }
    },
    created() {
        this.fetchUserData();
    }
  }
  
  Vue.createApp(Person).mount('#personApp');