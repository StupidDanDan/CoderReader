<template>
	<div id='updateinfo'>
		<div :class="model" class="mui-input-group">
			<mt-header title="修改个人信息">
				<router-link to="/mine" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<mt-button slot="right" @click="submitUpdateInfo()">完成</mt-button>
			</mt-header>
			<div class="topPhoto"><img :src="realpicture" @click="changPhoto()" />
			</div>
			<div class="mui-input-row">
				<label>账号</label>
				<input readonly type="text" class="mui-input" :value="usermodel.userid">
			</div>
			<div class="mui-input-row">
				<label>手机号</label>
				<input type="text" class="mui-input" v-model="usermodel.userphone" placeholder="请输入电话">
			</div>
			<div class="mui-input-row">
				<label>个性签名</label>
				<input type="text" class="mui-input" v-model="usermodel.usershowme" placeholder="请输入签名">
			</div>

			<mt-popup v-model="popupVisible" id="changephoto" position="top">
				<p>请选择您喜欢的头像</p>
				<div class="parencontent" v-for="item in pictures">
					<img @click="confirmpicture(item[0].img1)" :class="{'leftimg borderSelect':item[0].img1==realpicture,'leftimg':item[0].img1!=realpicture}" :src="item[0].img1" />
					<img @click="confirmpicture(item[1].img2)" :class="{'rightimg borderSelect':item[1].img2==realpicture,'rightimg':item[1].img2!=realpicture}" :src="item[1].img2" />
				</div>
			</mt-popup>
		</div>
		<!--单选男女-->
			<div id="mt-radio-wraper" :class="model">
				<mt-radio title="性别" v-model="sex" :options="sexoption" v-if="sexoption">
				</mt-radio>
				<!--权限选择-->
				<mt-radio title="权限" v-model="canuse" :options="canuseroption" v-if="canuseroption">
				</mt-radio>
			</div>

	</div>
</template>

<script>
	import { Popup } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Radio } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: 'updateinfo',
		components: {

		},
		computed: {
			model() {
				return this.$store.getters.changeModel
			}
		},
		updated(){
			document.getElementsByClassName('mint-radiolist-title')[0].style.padding = '8px';
			document.getElementsByClassName('mint-radiolist-title')[1].style.padding = '8px';
			console.log(document.getElementById('mt-radio-wraper').className);
			if (document.getElementById('mt-radio-wraper').className == 'night') {
				document.getElementsByClassName("mint-cell-wrapper")[0].style.backgroundColor = "#373535";	
				document.getElementsByClassName("mint-cell-wrapper")[1].style.backgroundColor = "#373535";	
				document.getElementsByClassName("mint-cell-wrapper")[2].style.backgroundColor = "#373535";	
				document.getElementsByClassName("mint-cell-wrapper")[3].style.backgroundColor = "#373535";	
			}else if(document.getElementById('mt-radio-wraper').className =='morning'){
				document.getElementsByClassName("mint-cell-wrapper")[0].style.backgroundColor = "#fff";	
				document.getElementsByClassName("mint-cell-wrapper")[1].style.backgroundColor = "#fff";	
				document.getElementsByClassName("mint-cell-wrapper")[2].style.backgroundColor = "#fff";	
				document.getElementsByClassName("mint-cell-wrapper")[3].style.backgroundColor = "#fff";	
			}
		    
		},
		data() {
			return {
				sex: "",
				canuse: "",
				popupVisible: false,
				//        axios请求后接受返回model
				usermodel: {},
				//        性别
				sexoption: [],
				//        使用者权限
				canuseroption: [],
				//        头像数组
				pictures: [],
				//        准备变化的url
				realpicture: "http://oz033lzfm.bkt.clouddn.com/moren.png"
			}
		},
		//    钩子函数  开启请求
		created() {
			if(localMessage.get("logined") == "1") {
				window.location.reload();
				localMessage.set("logined", "0");
			}

			Indicator.open({
				text: 'Loading...',
				spinnerType: 'fading-circle'
			});
			var userid = localMessage.get("userid");
			console.log(userid);
			this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid=' + userid).then((res) => {
				this.realpicture = res.data.userphoto;
				Indicator.close();
				this.usermodel = res.data;
				//        渲染数据
				this.renderData();
			}).catch((error) => {
				console.log(error);
			});
		},
		methods: {
			//      点击更新数据库更新头像
			confirmpicture(url) {
				this.realpicture = url;
				this.popupVisible = false;
				Indicator.open({
					text: '殿下请稍等',
					spinnerType: 'fading-circle'
				});
				var userid = localMessage.get("userid");
				console.log(userid);
				this.axios.post("http://txspring.cn:8010/updateUser", this.qs.stringify({
					type: "userphoto",
					value: url,
					userid: userid
				})).then((res) => {
					res = res.data;
					if(res == "1" || res == 1 || res.type == "1") {
						Indicator.close();
						Toast({
							message: '修改成功',
							position: 'bottom',
							duration: 5000
						});
					} else {
						Indicator.close();
						Toast({
							message: '修改失败，请重新尝试',
							position: 'bottom',
							duration: 5000
						});

					}
				})
			},
			//      点击后弹出更换头像
			changPhoto() {
				this.axios.get("http://oz033lzfm.bkt.clouddn.com/picturesurl.json").then((res) => {
					this.pictures = res.data;
					//         console.log(res);
				}).catch((error) => {
					console.log(error);
				});
				this.popupVisible = true;
			},
			//      渲染数据
			renderData() {
				this.sex = this.usermodel.usersex;
				this.canuse = this.usermodel.usercanuser;
				//       控制读者和写者只有一个可以显示
				var write = false;
				var read = false;
				if(this.canuse == '0') {
					write = true;
				} else {
					read = true;
				}
				var wirte = this
				this.sexoption = [{
						label: "男",
						value: 'man'
					},
					{
						label: "女",
						value: 'woman'
					}
				];
				this.canuseroption = [{
						label: "作者",
						value: '1',
						disabled: write
					},
					{
						label: "读者",
						value: '0',
						disabled: read
					}
				];
			},
			//      提交修改
			submitUpdateInfo() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'fading-circle'
				});
				var userid = localMessage.get("userid");
				//        console.log(userid);
				this.axios.post("http://txspring.cn:8010/updateUser", this.qs.stringify({
					type: "userall",
					userphone: this.usermodel.userphone,
					usersex: this.sex,
					usershowme: this.usermodel.usershowme,
					userid: userid
				})).then((res) => {
					//          console.log(res);
					res = res.data;
					if(res == "1" || res == 1 || res.type == "1") {
						Indicator.close();
						Toast({
							message: '修改成功',
							position: 'bottom',
							duration: 5000
						});
						this.$router.push({path:"/mine"});
					} else {
						Indicator.close();
						Toast({
							message: '修改失败，请重新尝试',
							position: 'bottom',
							duration: 5000
						});
					}
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#updateinfo .topPhoto {
		text-align: center;
		margin-top: 5px;
	}
	
	#updateinfo .topPhoto img {
		width: 100px;
		height: 100px;
		border-radius: 50px;
	}
	
	.parencontent {
		width: 100%;
		background-color: #4cd964;
	}
	
	.leftimg {
		float: left;
		height: 80px;
		width: 80px;
		border-radius: 40px;
		margin: 10px 10px;
	}
	
	.rightimg {
		float: right;
		height: 80px;
		width: 80px;
		border-radius: 40px;
		margin: 10px 18px;
	}
	
	#changephoto {
		width: 80%;
		border-radius: 50px;
		padding: 20px;
		background-color: #f9f9f9;
	}
	
	#changephoto p {
		text-align: center;
	}
	
	.borderSelect {
		border: 4px dotted deepskyblue;
	}
	.mint-radiolist-title{
		margin: 0 !important;
		padding: 8px ;
	}
	.morning {
		color: #999;
		background-color: #fff;
	}
	
	.night {
		color: #c7c7c7;
		background-color: #373535;
	}
	
	.night .mint-radiolist{
		color: #c7c7c7 !important;
		background-color: #373535 !important;
		z-index: 999;
	}
</style>