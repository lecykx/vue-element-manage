<template>
    <div class='menu-wrapper'>
        <template v-for="item in routes">

            <template v-if="item.name === 'profile'">
                <div class="profile-wrapper" @click="logout" title="点击退出登录">
                    <pan-thumb class="user-avatar" :image="avatar">
                        <icon-svg icon-class="zhuxiao" style="font-size:32px;margin:20%;"></icon-svg>
                    </pan-thumb>
                    <ul class="user-info">
                        <li class="user-info-item">{{name}}</li>
                        <li class="user-info-item">{{code}}</li>
                    </ul>
                </div>
            </template>
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
                    <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
                    <span class="menu-title">{{item.children[0].name}}</span>
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
                    <span class="menu-title">{{item.name}}</span>
                </template>
                <template v-for="(child, index) in item.children" v-if='!child.hidden'>
                    <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path" :style="{'margin-top': (index===0)? '12px':'0','margin-bottom': (index===item.children.length-1)? '12px':'0' }">
                            <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
                            <span class="menu-title">{{child.name}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import PanThumb from '@/components/panThumb'

    export default {
        name: 'SidebarItem',
        components: { PanThumb },
        props: {
            routes: {
                type: Array
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'code',
                'avatar'
            ])
        },

        methods: {
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()
                })
                this.$router.push({ path: '/login' })
            }
        }
    }
</script>

<style>
    .profile-wrapper {
        background: #354052;
        height: 120px;
        margin-bottom: 8px;
        cursor: pointer;
        color: #606E87;
    }

    .user-avatar {
        height: 55px;
        width: 55px;
        border-radius: 50%;
        margin: 33px 15px 0 30px;
        display: block;
        float: left;
    }

    .user-info {
        display: block;
        float: right;
        height: 100%;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 33px 10px 0 0;
        overflow: hidden;
    }

    .user-info-item {
        height: 28px;
        line-height: 33px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .svg-icon {
        float: left;
        font-size: 24px;
        margin: 16px 13px;
    }

    .profile-wrapper:hover .pan-thumb {
        transform: rotate(85deg);
    }

    .sidebar-wrapper .el-menu--dark .el-menu-item,
    .sidebar-wrapper .el-menu--dark .el-submenu__title {
        color: #606E87;
    }

    .sidebar-wrapper .el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
        background: none;
        color: #20a0ff;
    }

    .menu-title {
        font-size: 16px;
        letter-spacing: 2px;
    }

    .sidebar-wrapper .el-submenu .el-menu-item {
        padding: 0 30px 0 70px !important;
        height: 40px;
        line-height: 40px;
    }

    .el-submenu .el-menu {
        background-color: #151c25 !important;
    }

    .el-submenu .el-menu-item.is-active,
    .el-menu-item.is-active {
        color: #20a0ff;
    }

    .el-submenu.is-active {
        background: #354052;
    }

    .el-submenu .el-icon-arrow-down {
        right: 36px;
        transform: rotateZ(270deg);
    }

    .el-submenu.is-opened .el-icon-arrow-down {
        transform: rotateZ(360deg) !important;
    }
</style>
