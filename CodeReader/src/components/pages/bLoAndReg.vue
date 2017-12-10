<template lang="html">

	<div class="bLoAndReg">
		<transition name="fade">
			<div class="login" v-if="show">
				<blogin></blogin>
				<div class="blogintext">登录遇到问题请联系管理员，或者<span id="toReg" class="toView" @click="toView($event)">还没有账户？</span></div>
			</div>
		</transition>
		<div class="register">
			<bregister></bregister>
			<div class="blogintext"><span class="toView" id="toLog" @click="toView($event)">已经有账户了，请登录！</span></div>
		</div>
	</div>

</template>

<script>
	import blogin from '../common/bLogin'
	import bregister from '../common/bregister'
	export default {
		name: 'app',
		data() {
			return {
				show: true,
			}
		},
		components: {
			blogin,
			bregister,
		},
		methods: {
			toView(ev) {
				this.show = !this.show;

			}
		}
	}
</script>

<style lang="css">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	
	.bLoAndReg {
		width: 100%;
	}
	
	.login {
		position: fixed;
		z-index: 10;
		background-color: #fcfcfc;
		height: 100%;
		width: 100%;
	}
	
	.register {
		position: fixed;
		background-color: #C6E2FF;
		height: 100%;
		width: 100%;
	}
	
	.blogintext {
		position: static;
		bottom: 0;
		width: 100%;
		text-align: center;
		font-size: .2rem;
		color: silver;
		margin: .5rem auto;
	}
	
	.toView {
		font-size: .2rem;
		color: red;
	}
	/*因为input的UI样式两个UI组件库发生冲突，在此重新设置UI样式*/
	.mint-field-core{
		border: 0 !important;
		margin: 0 !important;
	}
	.bIsInlineBlock{
		vertical-align: middle;
	}
	.bInputBar{
		line-height: 1.6rem;
	}
</style>