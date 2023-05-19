<template>
	<view class="body">
		<view class="circle" @click="foodRandom()">
			<div>
				{{foodName}}
			</div>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodArr: ['滷味', '水餃', '牛肉麵', '7-11', '一午一拾', '涼麵', '粥', '牛肉飯', '義大利麵', 'YOLO', '大陸餅', '不吃', '去遠東吃',
					'柒-麻辣燙', '島嶼便當', 'WANT', "酸辣粉", "羹麵"
				],
				num: 0,
				click: false,
				foodName: "吃什么",
				fun:''
			}
		},
		methods: {
			foodRandom() {
				let me = this
				if (!me.click) {
					me.fun=setInterval(() => {
						let random = Math.round(Math.random() * (me.foodArr.length-1)),
							eat = me.foodArr[random]
						me.foodName = eat
					}, 10)
				} else {
					clearInterval(me.fun)
				}
				me.click = !me.click
			}
		},
		beforeUnmount(){
			console.log("要被卸载了");
			// clearInterval(this.fun)
		}
	}
</script>

<style>
	.body {
		font-family: Arial, "微軟正黑體" !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(45deg, rgb(19, 73, 95), rgb(118, 75, 226), rgb(131, 115, 198), rgb(119, 211, 185));
		height: 90vh;
		color: #fff;
	}

	.circle {
		margin-top: 200rpx;
		width: 150px;
		min-height: 150px;
		border-radius: 100%;
		background: #f2f2f2;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2em;
		box-shadow: 0px 10px 30px -10px #000;
		color: #000;
	}
</style>