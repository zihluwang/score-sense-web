const Layout = () => import("@/layout/index.vue");

export default {
  path: "/job-position",
  name: "JopPosition",
  component: Layout,
  redirect: "/job-position/index",
  meta: {
    icon: "ep:briefcase",
    title: "岗位管理",
    rank: 3
  },
  children: [
    {
      path: "/job-position/index",
      name: "JopPositionIndex",
      component: () => import("@/views/jopPosition/index.vue"),
      meta: {
        title: "岗位管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
