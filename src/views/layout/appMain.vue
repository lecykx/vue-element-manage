<template>
    <section class="app-main">
        <transition name="fade" mode="out-in">
            <router-view :key="key" :style="appMainStyle"></router-view>
        </transition>
        <page-footer :style="hiddenFooter"></page-footer>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        data() {
            return {
                appMainStyle: {
                    'min-height': (document.documentElement.clientHeight - 170) + 'px'
                }
            }
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            },
            hiddenFooter() {
                return (this.$route.meta.hiddenFooter) ? {
                    'display': 'none'
                } : {}
            }
        }
    }
</script>