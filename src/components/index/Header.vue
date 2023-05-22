<template>
    <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;display: flex;">
        <div style="width: 200px;padding-left: 30px;font-weight: bold;color: dodgerblue;">后端管理</div>
        <div style="flex: 1;"></div>
        <div style="width: 100px;">
            <el-dropdown>
                <span style="text-align: center;font-size: large;">
<!--                {{ user.nickName }}-->
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="$router.push('/person')">个人信息</el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/login')">退出系统</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
export default {
  name: "header"
}
</script>

<style>


</style>