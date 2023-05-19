<script>
	export default {
		data() {
			return {
				refresh: false,
				swiperUrlList: ['http://home.server1.fixnas.xyz:9000/zhizhu/h5app/034f30729b684f4eb7381af2a24c83dd.jpg',
					'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
					'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/1679334110.jpg'
				],
				dotStyle: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				current: 0,
				curTopic: 0,
				topicList: ['全部', '新鲜事', '日常投稿', '求助问答', '二手转卖', '讲座'],
				fixed: false,
				offsetTop: 0,
				dynamicList: [{
					headImgUrl: 'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/201541975b0d40b48190d084f6cdaebb.jpg',
					content: '成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。哼，目光所及，短寸之间。\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！',
					createTime: '5分钟前',
					imgUrlList: [
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
					]
				}, {
					headImgUrl: 'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/201541975b0d40b48190d084f6cdaebb.jpg',
					publishingInterval: '3小时前',
					content: '成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。哼，目光所及，短寸之间。\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！',
					imgUrlList: [
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
						'http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg',
					]
				}],
				scrollLeft: 0,
				old: {
					scrollLeft: 0
				}
			}
		},
		onPullDownRefresh() {
			console.log('监听下拉刷新');
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			changeSwiper(e) {
				this.current = e.detail.current
			},
			topicChange(index) {
				let me = this
				me.curTopic = index;
				uni.request({
					url:'/api/'
				})
				if (index == me.topicList.length - 1||index == me.topicList.length - 2) {
					me.scrollLeft = this.old.scrollLeft
					me.$nextTick(() => {
						setTimeout(()=>{
							me.scrollLeft = 500
						},300)
					})
				}
			},
			initHeight() {
				// 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				//如果被卷曲的高度大于吸顶元素到顶端位置 的距离
				this.fixed = scrollTop > this.offsetTop ? true : false;
			},
			getTopicList() {
				let me = this
				uni.request({
					url: '/api/topic/list',
					method: 'POST',
					data: {},
					success: (res) => {
						me.topicList = res.data.data.list
						console.log(res);
					}
				})
			},
			scroll(e) {
				this.old.scrollLeft = e.detail.scrollLeft
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		mounted() {
			let me = this
			window.addEventListener('scroll', this.initHeight);
			this.$nextTick(() => {
				//获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
				this.offsetTop = document.querySelector('#boxFixed').offsetTop;
			})
			this.getTopicList()

		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		computed: {
			cssVars() {
				return {
					"--topic": this.topicList[this.curTopic].length
				}
			}
		}
	}
</script>
<template>
	<view class="">
		<!-- 轮播图 -->
		<view>
			<uni-swiper-dot class="uni-swiper-dot-box" :dots-styles="dotStyle" mode="default" :info="swiperUrlList"
				:current="current">
				<swiper style="height: 300rpx;" @change="changeSwiper" circular="true">
					<swiper-item v-for="(item,index) in swiperUrlList" class="swiper-item" :item-id="index.toString()">
						<image :src="item" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view id="boxFixed"></view>
		<!-- 主题 -->
		<view class="topicScroll" :class={fixed:fixed}>
			<scroll-view :scroll-left="scrollLeft" scroll-x="true" @touchmove.stop @scroll="scroll">
				<view :class="{topicActive: index===curTopic}" @click="topicChange(index)" class="topicScrollItem"
					:id="index" v-for="(item ,index) in topicList">{{item.topicName}}</view>
			</scroll-view>
		</view>

		<!-- 内容 -->
		<view class="content">
			<view class="contentItem" v-for="item in dynamicList">
				<view class="left">
					<image class="headImg" :src="item.headImgUrl" :draggable="false" mode="widthFix"></image>
				</view>
				<view class="right">
					<!-- <view class="title">wwwww</view> -->
					<view style="padding: -14px -10px;">
						<uni-section titleColor="#4d86e9" title="wwwwww" titleFontSize="20px"
							padding="0px"></uni-section>
					</view>
					<view class="text">
						<view class="tag" mr-1>{{topicList[curTopic].topicName}}</view>
						<view class="article">
							{{item.content}}
						</view>
					</view>
					<view mt-3 class="imgs">
						<u-album :urls="item.imgUrlList" :row-count="item.imgUrlList.length==4?2:3"
							multipleSize="180"></u-album>
					</view>
					<view class="time">{{item.publishingInterval}}</view>
					<view class="operations"></view>
				</view>
			</view>
		</view>



	</view>
</template>
<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx 5rpx 180rpx 5rpx;

		.contentItem {
			display: flex;
			flex: 1;
			flex-direction: row;

			.left {
				// background-color: blue;
				width: 18vw;
				height: 100%;

				.headImg {
					// display: block;
					margin: 15rpx 0 0 15rpx;
					border-radius: 100%;
					width: 100rpx;
				}
			}

			.right {
				flex: 1;
				padding-right: 20rpx;

				// width: 80%;
				.title {
					font-size: 20px;
					color: #4d86e9;
					padding-bottom: 10rpx;
				}

				.text {
					display: inline;
					line-height: 25px;
					// flex-wrap: wrap;
					flex-direction: row;

					.tag {
						display: inline;
						background-color: #4d86e9;
						color: #fff;
						padding: 0px 5px 0px 4px;
						border-radius: 3px;
						width: 100%;
						max-height: 25px;
						// float: left;
					}

					.article {
						display: inline;
						// text-indent: 2px;
					}
				}

				.imgs {}

				.time {
					color: #8b8b8b;
					padding: 10rpx 0rpx 10rpx 0rpx;
				}

				.operations {}
			}

			border-bottom: 3px #eaeaea solid;
		}

	}

	.topicScroll {
		margin-top: 20rpx;
		width: 100%;
		box-shadow: 0px 3px 5px #eaeaea;
		white-space: nowrap;
		padding-bottom: 20rpx;

		.topicScrollItem {
			display: inline-block;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 36rpx;
			overflow: hidden;
			margin-right: 20rpx;
		}

		.topicScrollItem:first-child {
			margin-left: 20rpx;
		}

		.topicActive {
			// background-color: aquamarine;
			font-size: 48rpx;
			font-weight: bold;
			transition-duration: .5s;
		}

		.topicActive:last-child {
			// background-color: aquamarine;
			font-size: 48rpx;
			font-weight: bold;
			transition-duration: .5s;
		}
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.fixed {
		// width: 100%;
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: #fff;
	}
</style>