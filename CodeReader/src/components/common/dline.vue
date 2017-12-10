<template>
    <div class="small">
        <canvas id="myChart2" width="320px" height="350px"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { Indicator } from 'mint-ui';

export default {
    components: {

    },
    data() {
        return {
            day: [],
            tem:[]
        }
    },
    mounted() {

        var  _this = this;
        setTimeout(function(){

        var ctx2 = document.getElementById("myChart2");

        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels:_this.day ,
                datasets: [
                    {
                        label: "未来五天天气预测",
                        backgroundColor: "rgba(225,10,10,0.3)",
                        borderColor: "rgba(225,103,110,1)",
                        borderWidth: 1,
                        pointStrokeColor: "#fff",
                        pointStyle: "crossRot",
                        data: _this.tem,
                        cubicInterpolationMode: "monotone",
                        spanGaps: "false",
                        fill: "false"
                    }
                ]
            },
            options: {

            }

        });
        var data=myChart2.config.data;
        data.labels=this.day;
        data.datasets[0].data=this.tem;
        Indicator.close();
       },1000);
    },
    methods: {

    },
    created(){
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(data=>{
            Indicator.close();
            var forecast=data.data.data.forecast;
            console.log(forecast);
            for(var i=0;i<forecast.length;i++){
                var day=forecast[i].date.slice(0,3);
//                console.log(day);
                this.day.push(day);
                var low=parseInt(forecast[i].low.slice(3,5));
                var high=parseInt(forecast[i].high.slice(3,5));
                var tem=parseInt((low+high)/2);
                this.tem.push(tem);
            }
            console.log(this.day);
            console.log(this.tem);

        })
    }
}
</script>
<style>
	body{
		background-color: #fff;
	}
    .small {
        width: 100%;
        height: 100%;
        margin: 0;
        padding-left: 15px;
        padding-top: 5px;
        background: rgb(255,255,255);
    }
</style>
