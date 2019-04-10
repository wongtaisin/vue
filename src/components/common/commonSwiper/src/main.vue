<style lang="scss" scoped>
// 滑动编辑
.common-swiper-box {
  box-sizing: border-box;
  width: calc(100% + 3.47rem);
  transition: 0.3s;
  text-align: left;
  overflow: hidden;
  position: relative;
  &.swiper-left {
    transform: translateX(-3.47rem);
  }
  &.swiper-right {
    transform: translateX(0px);
  }
  .content {
    width: calc(100% - 3.47rem);
    float: left;
    height: inherit;
    box-sizing: border-box;
  }
  .btn-box {
    display: flex;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    width: 260px;
    top: 0;
    bottom: 0;
    height: inherit;
  }
  .bts {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .edit {
    background: #c7c7cd;
    align-items: center;
  }
  .delete {
    background: #ff3a30;
    align-items: center;
  }
  .feel {
    background: #087cd7;
    align-items: center;
  }
}
</style>

<template>
	<div class="common-swiper-box common-border swiper-right" :style="{'height':height+'rem'}" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
		<div class="content" @click="click">
			<slot name="swiperContent"></slot>
		</div>
		<div class="btn-box">
			<div class="edit bts" v-if="editShow" @click="edit">
				<span>编辑</span>
			</div>
			<div class="feel bts" v-if="feelShow" @click="feel" :style="`background: ${color}`">
				<span>{{feelText}}</span>
			</div>
			<div class="delete bts" v-if="delShow" @click="del">
				<span>删除</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'common-swiper',
	props: {
		//设置滑动序号
		index: {
			type: Number,
			default() {
				return 0
			}
		},
		//设置高度
		height: {
			type: Number
		},
		//是否显示删除按钮
		editShow: {
			type: Boolean,
			default() {
				return true
			}
		},
		//是否显示编辑按钮
		delShow: {
			type: Boolean,
			default() {
				return true
			}
		},
		//是否显示通用按钮
		feelShow: {
			type: Boolean,
			default() {
				return false
			}
		},
		//编辑通用按钮文字
		feelText: {
			type: String
		},
		//
		color: {
			type: String
		},
		//是否滑动
		isSwiper: {
			type: Boolean,
			default() {
				return true
			}
		}
	},
	data() {
		return {
			startX: 0,
			endX: 0,
			isSwiperRitght: false,
			rigthClass: 'common-swiper-box common-border swiper-rigth',
			leftClass: 'common-swiper-box common-border swiper-left'
		}
	},
	methods: {
		edit() {
			this.$emit('edit', this.callBack())
		},
		del() {
			this.$emit('del', this.callBack())
		},
		feel() {
			this.$emit('feel', this.callBack())
		},
		//回调初始化滑动效果
		callBack() {
			return {
				index: this.index,
				callBack: () => {
					document.querySelectorAll('.common-swiper-box').forEach((item) => {
						item.className = this.rigthClass
					})
				}
			}
		},
		touchStart(e) {
			this.startX = e.touches[0].pageX
			this.startY = e.touches[0].pageY
		},
		//滑动结束
		touchEnd(e) {
			// console.log(e, e.changedTouches[0].target.offsetParent.offsetParent)
			// 当前滑动的父级元素
			this.endX = e.changedTouches[0].clientX
			this.endY = e.changedTouches[0].clientY

			if (this.endY !== this.startY) {
				//初始化滑动效果
				document.querySelectorAll('.common-swiper-box').forEach((item) => {
					item.className = this.rigthClass
				})
			}
			// 左滑
			if (this.startX - this.endX > 70) this.onSwipeLeft(e)
			// 右滑
			if (this.startX - this.endX < -70) this.onSwipeRight(e)
			this.startX = 0
			this.endX = 0
			this.endY = 0
			this.startY = 0
		},
		//左滑事件
		onSwipeLeft(e) {
			if (!this.isSwiper) return false     //禁止滑动
			this.LeftOrRight(e)
			// document.querySelectorAll('.common-swiper-box').forEach((item, index) => {
			//     // console.log(item, index)
			//     if (this.index !== index) {
			//         item.className = this.rigthClass
			//     }
			// });
		},
		//右滑事件
		onSwipeRight(e) {
			this.LeftOrRight(e)
			// document.querySelectorAll('.common-swiper-box')[this.index].className = this.rigthClass
		},
		//点击事件
		click() {
			this.$emit('click')
		},
		//className
		LeftOrRight(e) {
			if (e.changedTouches[0].target.offsetParent.className == 'common-goods-row common-border' || e.changedTouches[0].target.offsetParent.className == 'row') {
				var swiper = e.changedTouches[0].target.offsetParent.offsetParent
			} else var swiper = e.changedTouches[0].target.offsetParent
			// if (e.changedTouches[0].target.offsetParent.className == 'common-swiper-box common-border swiper-right') {
			//     var swiper = e.changedTouches[0].target.offsetParent
			// } else var swiper = e.changedTouches[0].target.offsetParent.offsetParent
			if (this.startX - this.endX > 70) swiper.className = this.leftClass
			if (this.startX - this.endX < -70) swiper.className = this.rigthClass
		}
	}
}
</script>
