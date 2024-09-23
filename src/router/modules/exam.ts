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
      path: "/exam/category",
      name: "ExamCategory",
      component: () => import("@/views/exam/category/index.vue"),
      meta: {
        title: "分类管理",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
