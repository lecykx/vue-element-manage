<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}" :style="appStyle">
		<header class="header-wrapper">
			<img class="header-logo" :src="logo" width="260" height="120"/>
			<div class="header-title">
				<span>管理系统</span>
				<span style="font-size:24px">(V1.0.0)</span>
			</div>
		</header>
		<div class="sidebar-wrapper">
			<sidebar class="sidebar-container"></sidebar>
		</div>
		<div class="main-container">
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
	import { Sidebar, AppMain } from '@/views/layout'
	import logo from '@/assets/images/logo.png'

	export default {
		name: 'layout',
		data() {
			return {
				logo,
				appStyle: {
					'min-height': (document.documentElement.clientHeight - 120) + 'px'
				}
			}
		},
		components: {
			Sidebar,
			AppMain
		},
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 36px;
			}
		}
		.header-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1001;
			height: 120px;
			background: #2179E3;
			color: #fff;
			font-size: 32px;
			line-height: 120px;
			.header-logo {
				padding: 28px 80px;
    			background: #2989fd;
				display: block;
				float: left;
			}
			.header-title {
				text-align: center;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 260px;
			height: 100%;
			position: fixed;
			top: 119px;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
			border-radius: 0px;
			background-color: #19212B;
			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 260px;
			margin-top: 120px;
		}
	}
</style>