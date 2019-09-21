<template>
  <div>
    <Navbar />
    <div class="container">
      <CategoryTabs />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CategoryTabs from "@/components/CategoryTabs";
import firebase from "firebase";

export default {
  name: "home",
  components: {
    Navbar, CategoryTabs
  },
  data: function(){
    return{

    }
  },
  methods: {
    signoutClicked: function(){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    },
  }
};
</script>
