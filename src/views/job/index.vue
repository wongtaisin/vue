<template>
  <section class="page-job">
    <common-banner-img></common-banner-img>
    <div class="content">
      <common-inside-title :cn="`招聘英才`" :en="`Recruitment of talents`"></common-inside-title>
      <div class="fold">
        <div :key="i" class="list" v-for="(item, i) in jobs">
          <div class="title">
            {{item.job}}
            <span @click="foldMenu(i)">+</span>
          </div>
          <ul v-show="active == i">
            <li>
              招聘人数：
              <span>{{item.num}}</span>
            </li>
            <li>
              工作地点：
              <span>{{item.address}}</span>
            </li>
            <li>
              发布时间：
              <span>{{item.date}}</span>
            </li>
            <li>
              职责要求：
              <span>{{item.duty}}</span>
            </li>
            <li>
              你将拥有：
              <span>{{item.welfare}}</span>
            </li>
            <li>
              邮箱：
              <span>{{item.contact_email}}</span>
            </li>
            <li>
              联系电话：
              <span>{{item.contact_tel}}</span>
            </li>
            <li>
              联系人：
              <span>{{item.contact_name}}</span>
            </li>
          </ul>
        </div>
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
      active: 0,
      jobs: [
        {
          id: 1,
          job: `律师助理`,
          num: 10,
          address: `地点`,
          duty: `1、具有法律本科以上学历
                2、具有良好的沟通能力和学习能力
                2、具有敬业爱岗的职业素养
                3、从事金融银行、保险、证券法律和公司法律事务工作
                4、通过国家司法考试、有从业经验及体育项目爱好者优先
                5、薪酬面议`,
          demand: `1、具有法律本科以上学历
                2、具有良好的沟通能力和学习能力
                2、具有敬业爱岗的职业素养
                3、从事金融银行、保险、证券法律和公司法律事务工作
                4、通过国家司法考试、有从业经验及体育项目爱好者优先
                5、薪酬面议`,
          date: `2019-04-19`,
          contact_name: `罗小姐`,
          contact_tel: `0755-12345678`,
          contact_email: `l@gmail.com`,
          welfare: `1、良好的学习、工作和晋升平台
                    2、基础工资+ 多劳多得的薪酬工资
                    3、五险一金
                    4、充分享有国家规定的福利待遇`
        },
        {
          id: 2,
          job: `律师助理`,
          num: 3,
          address: `地点`,
          duty: `1、具有法律本科以上学历
                2、具有良好的沟通能力和学习能力
                2、具有敬业爱岗的职业素养
                3、从事金融银行、保险、证券法律和公司法律事务工作
                4、通过国家司法考试、有从业经验及体育项目爱好者优先
                5、薪酬面议`,
          demand: `1、具有法律本科以上学历
                2、具有良好的沟通能力和学习能力
                2、具有敬业爱岗的职业素养
                3、从事金融银行、保险、证券法律和公司法律事务工作
                4、通过国家司法考试、有从业经验及体育项目爱好者优先
                5、薪酬面议`,
          date: `2019-04-19`,
          contact_name: `罗小姐`,
          contact_tel: `0755-12345678`,
          contact_email: `l@gmail.com`,
          welfare: `1、良好的学习、工作和晋升平台
                    2、基础工资+ 多劳多得的薪酬工资
                    3、五险一金
                    4、充分享有国家规定的福利待遇`
        }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    foldMenu (i) {
      this.active = i
    }
  }
}
</script>

<style lang='scss' scoped>
.page-job {
  width: 100%;
  min-height: 100%;
  .content {
    width: 1080px;
    margin: 0 auto 60px;
    .fold {
      .list {
        margin-top: 20px;
        .title {
          font-size: 20px;
          background: #3a3633;
          color: white;
          height: 60px;
          line-height: 60px;
          padding-left: 30px;
          span {
            width: 60px;
            height: 60px;
            background: #c12219;
            display: block;
            float: right;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
          }
        }
        ul {
          border: 1px solid #ddd;
          padding: 30px;
          line-height: 3;
          font-size: 16px;
          li {
            color: #666;
            span {
              color: black;
            }
          }
        }
      }
    }
  }
}
</style>
