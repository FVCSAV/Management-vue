<template>
  <div>
    <!--    头部-->
    <Header></Header>
    <!-- 主体 -->
    <div style="display: flex;">
      <!--      侧边-->
      <Aside></Aside>
      <!--      内容-->
      <RouterView style="flex: 1"></RouterView>
    </div>
  </div>
</template>

<script>
import Header from "@/components/index/Header.vue";
import Aside from "@/components/index/Aside.vue"


export default {
  name: "Layout",
  components: {Aside, Header},
}

</script>

<style scoped>

</style>