<style lang="scss" scoped>
.common-orders-time-box {
  padding: 0 32px;
  height: 72px;
  line-height: 72px;
  background: #f8f8f8;
  color: #30a9fb;
  font-size: 12px;
  display: block;
  text-align: left;
  .iconfont {
    font-size: 14px;
  }
}
</style>

<template>
	<div class="common-orders-time-box">
		<i class="iconfont minku-shijian time"></i>
		<span v-text="time"></span>
	</div>
</template>

<script>
export default {
	name: 'common-orders-time',
	props: {
		time: String,
		default() {
			return ''
		}
	},
	data() {
		return {

		}
	},
	computed: {

	},
	mounted() {

	},
	methods: {

	}
}
</script>
