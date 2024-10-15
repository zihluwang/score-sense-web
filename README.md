## score-sense-web

### 还未完成功能

- 岗位excel导入，代码已写部分。接口已封装。
- 试卷excel导入，代码已写部分。接口已封装。
- 试题配置管理，只实现了路由部分的配置和页面文件的创建

### 代码分层

- public/templeFile 里面存放了 excel 的模板，用于下载
- hooks 里面有两个自定义 hooks，一个用于获取所有的考试分类，另一个用于获取省市数据
- views 文件夹下面的 swiper 是轮播图管理
- views 文件夹下面的 exam 是考试管理
  - category 是考试分类管理
  - paper 是考试试卷管理
  - question 是试题配置管理
- views 文件夹下面的 jobPosition 是岗位管理.
  - setExamPaperDialog 是将岗位和试卷关联用的弹窗
- index.vue 是列表页
- editDialog 是编辑和新增弹窗
- importDialog 是导入用的弹窗
- login 是登录页面代码
- api 文件夹里面都是接口封装，每个页面的接口都在对应的ts里面
