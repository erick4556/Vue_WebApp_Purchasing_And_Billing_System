import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home";
import PixaBay from "./components/pixabay/PixaBay";
import Documents from "./components/documents/Documents";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/pixa",
    name: "pixa",
    component: PixaBay,
  },
  {
    path: "/docs",
    name: "documents",
    component: Documents,
  },
  {
    path: "/siscmpfc",
    name: "siscmpfc",
    component: () => import("./components/siscmpfc/Main"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/login/Login"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

//Proteccion de rutas
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem("access") !== null ? true : false;
  console.log(from.name, to.name);
  if (to.name !== "login" && !isLogged) {
    next({ name: "login" }); //Función de redireccionamiento
  } else {
    next();
  }
});

export default router;
