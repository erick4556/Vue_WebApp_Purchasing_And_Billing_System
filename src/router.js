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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
