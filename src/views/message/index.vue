<template>
  <section class="page-message">
    <common-banner-img></common-banner-img>
    <div class="content">
      <common-inside-title :cn="`客户留言`" :en="`Feedback`"></common-inside-title>
      <div class="title">常见问题</div>
      <ul class="list">
        <li :key="i" v-for="(item, i) in quantions">
          <div class="answer">
            <div class="answer-ti">
              <div>问</div>
              <div>{{item.answer}}</div>
            </div>
            <span>{{item.date}}</span>
          </div>
          <div class="question">
            <div>答</div>
            {{item.question}}
          </div>
        </li>
      </ul>
      <div class="title">我要咨询</div>
      <div class="form">
        <textarea cols="30" name="message" placeholder="在这里输入问题" rows="10"></textarea>
        <button>提交问题</button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      quantions: [
        {
          id: 1,
          question: `是个问题是、？是个问题是、？是个问题是、？是个问题是、？`,
          answer: `哈哈哈哈哈哈`,
          date: `1970-01-01`
        },
        {
          id: 2,
          question: `是个问题是、？`,
          answer: `测试`,
          date: `1970-01-01`
        }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.page-message {
  width: 100%;
  min-height: 100%;
  .content {
    width: 1080px;
    margin: 0 auto 60px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .list {
      line-height: 2;
      font-size: 16px;
      margin-bottom: 30px;
      li {
        border-bottom: 1px solid #eee;
        font-size: 16px;
        padding: 30px 0;
        .answer {
          .answer-ti {
            display: flex;
            align-items: center;
            div:first-child {
              margin-right: 5px;
              background: #c12219;
              color: white;
              width: 16px;
              height: 16px;
              text-align: center;
              border-radius: 3px;
              line-height: 16px;
              font-size: 12px;
            }
          }
          span {
            display: inline-block;
            font-size: 14px;
            color: #666;
            text-indent: 22px;
          }
        }
        .question {
          display: flex;
          align-items: center;
          div:first-child {
            margin-right: 5px;
            background: #3c3835;
            color: white;
            width: 16px;
            height: 16px;
            text-align: center;
            border-radius: 3px;
            line-height: 16px;
            font-size: 12px;
          }
        }
        span {
          display: inline-block;
          font-size: 14px;
          color: #666;
          text-indent: 20px;
        }
      }
    }
    .form {
      margin-top: 20px;
      textarea {
        width: 1040px;
        padding: 20px;
        border: 1px solid #dddddd;
      }
      button {
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        line-height: 45px;
        width: 168px;
        height: 45px;
        background: #c12219;
        color: white;
        border: none;
        cursor: pointer;
        &:active {
          background: #850e07;
        }
      }
    }
  }
}
</style>
