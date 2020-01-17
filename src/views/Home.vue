<template>
  <div>
    <Navbar />
    <div class="container">
      <Tabs />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Tabs from "@/components/Tabs";
import firebase from "firebase";

export default {
  name: "home",
  components: {
    Navbar,
    Tabs
  },
  data: function() {
    return {};
  },
  methods: {
    signoutClicked: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
