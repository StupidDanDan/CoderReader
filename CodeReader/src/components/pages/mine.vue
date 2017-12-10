<template>
  <div class="mine" :class="model">
    <mt-header fixed title="MySelf" :class="model"></mt-header>
    <minemain class="margintop"></minemain>
    <mineunder></mineunder>
    <footerbottom :usermodel='usermodels'  v-if="usermodels"></footerbottom>
  </div>
</template>

<script>
  import minemain from '@/components/common/minecom'
  import footerbottom from '@/components/common/footerbottom'
  import mineunder from '@/components/common/mineunder'
  export default {
    name: 'mine',
    data(){
      return {
        usermodels:{}
      }
    },
    components:{
      minemain,
      footerbottom,
      mineunder
    },
    computed:{
    	model(){
    		return this.$store.getters.getModel
    	}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .mine .margintop{
          margin-top: 44px;
        }
        .morning{
					color:#999;
					background-color:#fff;
				} 
		    .night{
		    	 color: #fff;
		       background-color:#373535;
		    }
		    body.night{
		    	background-color:#373535;
		    }
</style>
