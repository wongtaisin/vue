<style lang="scss" scoped>
.common-report-nav {
  background: #0992fd;
  color: white;
  padding-bottom: 10px;
  width: 100%;
  display: inline;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  overflow-y: hidden;
  .list {
    display: inline-block;
    padding-bottom: 10px;
    margin-left: 30px;
    &:first-child {
      margin-left: 45px;
    }
    &:last-child {
      margin-right: 30px;
    }
  }
  .active {
    border-bottom: 4px solid white;
  }
}
</style>

<template>
    <div class="common-report-nav">
        <div class="list" :class="{'active':isNav==index}" v-for="(item,index) in data" :key="index" @click="navToggle(index)">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
	name: 'common-report-nav',
	props: {
	},
	data() {
		return {
			isNav: 0,
			data: [
				'销售统计',
				'采购统计',
				'毛利统计'
				// '销售业绩',
				// '报损统计',
				// '库存预警'
			]
		}
	},
	computed: {
	},
	mounted() {
	},
	methods: {
		navToggle(i) {
			this.isNav = i
			this.$emit('navToggle', i)
		}
	}
}
</script>
