import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: Login,
    },
    {
      path: "/",
      component: Login,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requeriesAuth: true,
      }
    },
  ]
});

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser;
  const requeriesAuth = to.matched.some(record => record.meta.requeriesAuth);

  if(requeriesAuth && !currentUser){
    next('login');
  }
  else if(!requeriesAuth && currentUser){
    next('home');
  }
  else{
    next();
  }
});

export default router;