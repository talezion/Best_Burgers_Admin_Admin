<template>
  <div class="container-fluid">
    <div class="row text-center" style="margin-top:10%">
      <div class="col-md-4">
      </div>
      <div class="col-md-4 col-sm-12 align-self-center">
        <h3 class="mb-5">Best Burgers Admin Login</h3>
        <form @submit="loginClicked">
          <div class="form-group">
            <input type="email" placeholder="Email" v-model="email" class="form-control" required />
          </div>  
          <div class="form-group">
            <input type="password" placeholder="Password" v-model="password" class="form-control" required />
          </div>
          <input type="submit" value="Login" class="btn btn-primary btn-block" />              
        </form>
      </div>
      <div class="col-md-12" v-if="showAnimation">
        <br>
        <LoadingAnimation />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import LoadingAnimation from "@/components/LoadingAnimation";

export default {
  name: "login",
  components: {
    LoadingAnimation,
  },
  data: function(){
    return{
      email: '',
      password: '',
      showAnimation: false,
    }
  },
  methods: {
    loginClicked: function(e){
      e.preventDefault();
      let comp = this;
      this.showAnimation = true;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.showAnimation = false;
          this.$router.push('home');
        },
        (err) => {
          alert(err.message);
        }
      )
    }
  }
};
</script>
