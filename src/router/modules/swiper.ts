const Layout = () => import("@/layout/index.vue");

export default {
  path: "/swiper",
  name: "Swiper",
  component: Layout,
  redirect: "/swiper/index",
  meta: {
    icon: "ep:picture-filled",
    title: "轮播图管理",
    rank: 1
  },
  children: [
    {
      path: "/swiper/index",
      name: "SwiperIndex",
      component: () => import("@/views/swiper/index.vue"),
      meta: {
        title: "轮播图管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
