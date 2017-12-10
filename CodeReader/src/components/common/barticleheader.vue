<template lang="html">
	<div class="barticleHeader">
		<mt-header title="">
			<mt-button icon="back" slot="left" @click="gobackhome()">返回</mt-button>
			<mt-button icon="" slot="right" class="tool" @click="bdelete($event,article.detailpageid)">{{(article.detaileuserid == userid)?'删除':''}}</mt-button>
		</mt-header>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "barticleHeader",
		props: ['article'],
		data() {
			return {
				userid: ''
			}
		},
		created() {
			this.userid = localMessage.get('userid');
			//			console.log(this.userid);
		},
		methods: {
			bdelete(ev, num) {
				var _this = this;

				if(ev.target.innerText == '删除') {
					MessageBox.confirm('你确定删除这条文章吗?').then(action => {
						this.axios.get('http://txspring.cn:8010/deleteDetailPages?detailid=' + num)
							.then(function(response) {
								console.log(response);
								if(response.data.type != '1') {
									Toast({
										message: '删除失败，请联系管理员',
										position: 'bottom'
										// iconClass: 'icon icon-wangyanruyes'
									});
								} else {
									Toast({
										message: '删除成功',
										position: 'bottom'
										// iconClass: 'icon icon-wangyanruyes'
									});
									history.back();
								}

							}).catch(function(error) {
								console.log(error);
							})
					})

					console.log(num);
				} else {
					console.log('不操作')
				}
			},
			gobackhome() {
				console.log('111');
				history.back();
			}
		}

	}
</script>

<style lang="css">
	* {
		margin: 0;
		padding: 0;
	}
</style>