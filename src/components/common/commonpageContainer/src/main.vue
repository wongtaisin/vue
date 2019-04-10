<template>
  <div class="common-pageContainer">
    <ul class="pagesInner">
      <li @click="prevs" class="fa" v-if="totalPages>1">
        <span aria-hidden="true">上一页</span>
      </li>
      <li
        :class="{actived: item === currentPage}"
        :key="i"
        @click="select(item)"
        class="page"
        v-for="(item, i) in pages"
      >
        <span>{{item}}</span>
      </li>
      <li @click="next" class="fa" v-if="totalPages>1">
        <span aria-hidden="true">下一页</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'common-pageContainer',
  props: {
    totalPages: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  data () {
    return {
      currentPage: 1,
    }
  },
  computed: {
    pages () {
      const c = this.currentPage
      const t = this.totalPages
      if (t < 10) {
        let a = [...Array(t).keys()]
        let b = []
        a.map(item => {
          item = item + 1
          b.push(item)
        })
        return b
      }
      if (c <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...', t]
      } else if (c >= t - 4) {
        return [1, '...', t - 8, t - 7, t - 6, t - 5, t - 4, t - 3, t - 2, t - 1, t]
      } else {
        return [1, '...', c - 3, c - 2, c - 1, c, c + 1, c + 2, c + 3, '...', t]
      }
    }
  },
  methods: {
    select (n) {
      if (n === this.currentPage) return
      if (typeof n === 'string') return
      this.currentPage = n
      this.actived = n
      this.current()
    },
    prevs () {
      if (this.currentPage == 1) return false
      this.currentPage--
      this.current()
    },
    next () {
      if (this.currentPage == this.totalPages) return false
      this.currentPage++
      this.current()
    },
    current () {
      this.$emit('current', this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-pageContainer {
  margin: 30px 0 20px;
  .pagesInner {
    display: flex;
  }
  li {
    height: 33px;
    line-height: 33px;
    text-align: center;
    margin-right: 10px;
    border: 1px solid #eee;
    border-radius: 3px;
    cursor: pointer;
  }
  .fa {
    padding: 0 10px;
  }
  .page {
    width: 33px;
  }
  .actived {
    background: #c12219;
    color: white;
  }
}
</style>
