const Layout = () => import("@/layout/index.vue");

export default {
  path: "/exam",
  name: "Exam",
  component: Layout,
  redirect: "/exam/index",
  meta: {
    icon: "ep:home-filled",
    title: "考试管理",
    rank: 4
  },
  children: [
    {
      path: "/exam/index",
      name: "ExamIndex",
      component: () => import("@/views/exam/index.vue"),
      meta: {
        title: "考试管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
