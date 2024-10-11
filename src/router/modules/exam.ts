const Layout = () => import("@/layout/index.vue");

export default {
  path: "/exam",
  name: "Exam",
  component: Layout,
  redirect: "/exam/index",
  meta: {
    icon: "ep:edit",
    title: "考试管理",
    rank: 5
  },
  children: [
    {
      path: "/exam/category",
      name: "ExamCategory",
      component: () => import("@/views/exam/category/index.vue"),
      meta: {
        title: "分类管理"
      }
    },
    {
      path: "/exam/paper",
      name: "ExamPaper",
      component: () => import("@/views/exam/paper/index.vue"),
      meta: {
        title: "试卷管理"
      }
    },
    {
      path: "/exam/question/:examId",
      name: "ExamQuestion",
      component: () => import("@/views/exam/question/index.vue"),
      meta: {
        title: "配置试题",
        showLink: false
      }
    }
  ]
} satisfies RouteConfigsTable;
