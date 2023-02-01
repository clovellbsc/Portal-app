import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import { Auth } from "aws-amplify";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/pensions",
      name: "pensions",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PensionsView.vue"),
    },
    {
      path: "/annual-leave",
      name: "annual leave",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AnnualLeaveView.vue"),
    },
    {
      path: "/payroll",
      name: "payroll",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PayrollView.vue"),
    },
    {
      path: "/benefits",
      name: "benefits",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BenefitsView.vue"),
    },
    {
      path: "/validate-email",
      name: "validateEmail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ValidateEmail.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/validate-email") {
    Auth.currentAuthenticatedUser()
      .then(() => next({ path: "/dashboard" }))
      .catch(() => next());
  } else {
    Auth.currentAuthenticatedUser()
      .then(() => next())
      .catch(() => next({ path: "/" }));
  }
});

export default router;
