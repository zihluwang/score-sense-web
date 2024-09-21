const Layout = () => import("@/layout/index.vue");

export default {
  path: "/category",
  name: "Category",
  component: Layout,
  redirect: "/category/index",
  meta: {
    icon: "ep:home-filled",
    title: "标签管理",
    rank: 2
  },
  children: [
    {
      path: "/category/index",
      name: "CategoryIndex",
      component: () => import("@/views/category/index.vue"),
      meta: {
        title: "标签管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
