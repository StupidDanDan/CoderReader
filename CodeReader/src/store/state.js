import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		isNight : false
	},
	getters:{
		changeModel(state){
    		return state.isNight ? 'night' : 'morning'
  		},
  		changeModelText(state){
    		return state.isNight ? '日间模式' : '夜间模式'
  		},
  		changeModelImgSrc(state){
  			return state.isNight ? 'http://oz033lzfm.bkt.clouddn.com/sun.png' : 'http://oz033lzfm.bkt.clouddn.com/yejianmoshi.png'
  		},
  		changeModelExit(state){
  			return state.isNight=false;
  		}
		
	},
	mutations : {
		CHANGE_MODEL(state){
			state.isNight = !state.isNight;
		}
	},
	actions:{
		changeModel(context){
			context.commit('CHANGE_MODEL')
		}
	}
	
	
})
