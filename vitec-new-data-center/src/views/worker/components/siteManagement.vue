<template lang="pug">
.site-management-page.scroll-box
  .title
    span 总人数
    span.number {{all}}
  .site-managers.scroll-content
    ScrollBar
      .managers
        .manager(v-for='one in managers', :key='one.id')
          .manager__avatar
            img(:src='one.file')
          .manager__infos
            .manager__name {{one.name}}
            .manager__info
              .manager__info--key 岗位
              .manager__info--value {{one.role}}
            .manager__info
              .manager__info--key 入场
              .manager__info--value {{one.joinTime}}
</template>

<script>
import ScrollBar from "@/components/scroll-bar";
import { getManagers } from "@/api/worker";

export default {
  components: {
    ScrollBar
  },
  data: () => ({
    all: 0,
    managers: []
  }),

  methods: {
    refresh() {
      getManagers().then(res => {
        this.managers = res;
        this.all = res.length;

        setTimeout(() => this.refresh(), 5000);
      });
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
// .site-management-page {
//     // display: flex;
//     // // justify-content: stretch;
//     // flex-direction: column;

//     height: 100%;
//     overflow: hidden;

//     .site-managers{
//         // flex: 1;
//         height: 100%;
//         overflow-y: hidden;
//     }
// }
// .site-management-page {
//     height: calc(100vh - 100px);
// }
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  // margin-left: 15px;
  margin-bottom: 20px;
  span {
    &.number {
      font-size: 32px;
      margin-left: 20px;
    }
  }
}

.managers {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.manager {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 48.5%;
  padding: 28px;
  background: #17181d;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 24px;

  &__avatar {
    display: block;
    border-radius: 8px;
    width: 94px;
    height: 94px;
    overflow: hidden;
    margin-right: 15px;
    border: 1px solid #fff;
    flex: 1 0 94px;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    font-size: 18px;
    line-height: 25px;
  }

  &__infos {
    width: 100%;
    text-align: left;
  }

  &__info {
    margin: 15px 0;
    font-size: 14px;
    display: flex;
    line-height: 20px;
    &--key {
      color: #b0b2b8;
      margin-right: 16px;
    }
  }
}

@media screen and (max-width: 1480px) {
  .manager {
    width: 100%;
  }
}
</style>
