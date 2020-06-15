<template>
  <div class="title-box">
    <div class="title">{{title}}</div>
    <svg
      class="macrame"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 458 10"
    >
      <polygon
        points="0,10 7,10 14,0 7,0"
        style="fill:#3581fb;"
        stroke="#3581fb"
      />
      <polygon
        points="13,10 20,10 27,0 20,0"
        style="fill:#3581fb;"
        stroke="#3581fb"
      />
      <polygon
        points="26,10 33,10 40,0 33,0"
        style="fill:#3581fb;"
        stroke="#3581fb"
      />
      <polygon
        points="39,10 46,10 53,0 46,0"
        style="fill:#3581fb;"
        stroke="#3581fb"
      />
      <path
        d="M47,9 458,9"
        stroke="#3581fb"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "box-title",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.title-box {
  width: 100%;
  font-weight: bold;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #3581fb;
  display: inline-block;
}
.macrame {
  display: inline-block;
  width: 568px;
  margin-left: 24px;
  vertical-align: text-bottom;
}
</style>
