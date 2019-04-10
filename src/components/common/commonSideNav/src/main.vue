<template>
    <div class="common-side-nav">
        <el-aside width="200px" style="">
            <el-col :span="24">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#fff" text-color="#000" active-text-color="#409EFF">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span :to="{path: '/'}">首页</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title" :to="{path: '/shop'}">产品管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
    </div>
</template>
<script>
export default {
    name: 'common-side-nav',
    // props: {
    //   title: {
    //     type: String,
    //     default () {
    //       return ''
    //     }
    //   },
    //   goBack: {
    //     type: Boolean,
    //     default () {
    //       return true
    //     }
    //   }
    // },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}

</script>
<style lang="scss" scoped>
.common-side-nav {
    .el-aside {
        width: 200px;
        background-color: rgb(238, 241, 246);
    }

    .el-menu {
        height: 100vh;
    }
}

</style>
