<template>
  <Form
    :model="formItem"
    :label-width="120"
  >
    <!-- 营销活动基本信息 -->
    <Card>
      <p slot="title">
        营销活动基本信息
        <a
          href="#"
          slot="extra"
          @click.prevent="returnTable()"
          style="float:right"
        >
          <Icon type="arrow-left-c"></Icon>返回
        </a>
      </p>
      <p>
        <Form-item
          label="营销活动名称"
          style="margin-bottom:2vh;"
        >
          <Input
            v-model="formItem.input"
            placeholder="请输入营销活动名称"
          ></Input>
        </Form-item>
        <Form-item label="活动类别">
          <Select
            v-model="formItem.select"
            placeholder="请选择活动类别"
            @on-open-change="FetchmarketactvityCategory"
          >
            <Option
              v-for="(item,index) in actvityCategorylist"
              :key="index"
              :value="item.id"
            >{{item.name}}</Option>
          </Select>
        </Form-item>
      </p>
    </Card>
    <!-- 选择营销人群 -->
    <Card style="margin-top:1%">
      <p slot="title">选择营销人群</p>
      <Row style="margin-bottom:2vh;">
        <Col span="10">
        <Tabs
          value="1"
          v-model="SelectMarketing"
        >
          <TabPane
            v-for="(tab,index) in tabslist"
            :key="index"
            :label="tab.name"
          >{{ tab.name }}</TabPane>
        </Tabs>
        </Col>

        <Col
          span="6"
          style=" float: right;"
        >
        <Input
          v-model="formItem.name"
          style="width:187px"
          placeholder="请输入人群名称"
        >
        <Button
          slot="append"
          icon="ios-search"
          @click="queryTableList()"
        ></Button>
        </Input>
        </Col>
        <Col
          span="4"
          style=" float: right;"
        >
        <Button
          type="success"
          @click.native="addOpen()"
        >
          <Icon type="plus"></Icon>新增人群
        </Button>
        </Col>
      </Row>

      <Table
        :loading="TableLoading"
        :data="listData"
        :columns="columns1"
        ref="table"
        @on-select="onSelect"
        @on-selection-change="onSelectionChange"
      ></Table>
      <Page
        :total="total"
        show-total
        show-sizer
        show-elevator
        @on-change="changeCurrent"
        @on-page-size-change="changePageSize"
        :current.sync="current"
        style="margin: 24px 0 24px;text-align:right"
      ></Page>
    </Card>

    <!-- 选择权益 -->
    <Card style="margin-top:1%">
      <p slot="title">选择权益</p>
      <Row
        :gutter="8"
        class="Selectinterest"
      >
        <Col
          span="8"
          v-for="(item,index) in cardMessage"
          :key="index"
        >
        <div
          class="integral_box"
          @click="showmarks(item)"
          :class="{'active':item.show === true}"
        >
          <Row>
            <Col span="6">
            <Icon
              :type="item.icon"
              size="50"
            ></Icon>
            </Col>
            <Col span="14">
            <h2>{{item.name}}</h2>
            <p>{{item.count}}</p>
            </Col>
          </Row>
          <span
            class="mark"
            v-show="item.show"
          >&#10004;</span>
        </div>
        </Col>
      </Row>
    </Card>
    <!-- 设置积分权益 -->
    <Card style="margin-top:1%;">
      <p slot="title">设置积分权益</p>
      <Row>
        <Form-item
          label="设置赠送积分数量"
          required
        >
          <Input
            v-model="formItem.code"
            placeholder="请输入积分数量"
            style="width:400px"
          ></Input>
        </Form-item>
      </Row>
    </Card>
    <div class="underline_coupon">
      <p class="title">设置线下优惠券</p>
      <div class="underline_coupon_container">
        <ul
          class="underline_coupon_box"
          v-for="(item,index) in couponListAdd"
          :key="index"
        >
          <li
            class="underline_coupon_detail"
            v-for="(items,index) in chooseList"
            :key="index"
          >
            <Card>
              <Row style="border-bottom:2px solid #f2f2f2;">
                <Col span="20">
                <p>优惠券名称：
                  <Input
                    v-model="items.name"
                    :disabled="disabled1"
                    style="width:150px;margin-bottom:5px;"
                  />
                </p>
                </Col>
                <Col span="2">
                <Icon
                  type="md-create"
                  size="25"
                  @click="disabled1 =! disabled1"
                />
                </Col>
                <Col span="2">
                <Icon
                  type="ios-trash"
                  size="25"
                  @click="removeCouponListItem(index)"
                />
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <p>优惠券额度：{{items.amount}}元</p>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <p>使用条件：{{items.amount}}元</p>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <p>使用期限：{{items.beginDate | formatDate}}</p>
                </Col>
                <Col
                  span="14"
                  push="5"
                >
                <p>{{items.endDate | formatDate}}</p>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <p>发行数量：{{items.totalCount}}&nbsp;张</p>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <p>每人限领：{{items.totalUseCount}}&nbsp;张</p>
                </Col>
              </Row>
            </Card>
          </li>
        </ul>
        <Card style="height:25vh;width:22vw;text-align:center">
          <div @click="chooseModel = true">
            <Icon
              type="ios-add"
              size="110"
            />
            <p style="text-align:center">选择线下优惠券</p>
          </div>
        </Card>
      </div>
    </div>

    <!-- 选择沟通方式 -->
    <Card style="margin-top:1%">
      <p slot="title">选择沟通方式</p>
      <Row
        :gutter="8"
        class="Selectinterest"
      >
        <Col
          span="8"
          v-for="(item,index) in cardMessages"
          :key="index"
          class="cardMessage"
        >
        <div
          class="integral_box"
          @click="showmarks(item)"
          :class="{'active':item.show === true}"
        >
          <Row>
            <Col span="6">
            <Icon
              :type="item.icon"
              size="50"
            ></Icon>
            </Col>
            <Col span="14">
            <h2>{{item.name}}</h2>
            <p>{{item.count}}</p>
            </Col>
          </Row>
          <span
            class="mark"
            v-show="item.show"
          >&#10004;</span>
        </div>
        </Col>
      </Row>
    </Card>

    <!-- 设置沟通方式优先级 -->
    <Card style="margin-top:1%">
      <p slot="title">设置沟通方式优先级</p>

      <Form-item label="是否重复发送">
        <Radio-group>
          <Radio label="1">允许重复发送</Radio>
          <Radio label="0">避免重复发送</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="优先级设置">
        <Radio-group>
          <Radio label="1">优先短信发送</Radio>
          <Radio label="0">优先微信消息发送</Radio>
        </Radio-group>
      </Form-item>
    </Card>

    <!-- 设置短信 -->
    <Card class="sms_container">
      <p slot="title">设置短信</p>
      <Form-item label="黑名单过滤：">
        <Radio-group>
          <Radio label="1">排除短信黑名单客户</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="过滤已营销客户：">
        <span>排除最近</span>&nbsp;<Input
          v-model="durations"
          placeholder="输入时长"
          style="width: 150px"
        />&nbsp;<span>小时短信营销过的客户</span>
      </Form-item>
      <Form-item label="短信内容：">
        <div class="sms_container_box">
          <div class="sms_container_header">
            <Row style="border-bottom:1px solid #f2f2f2;">
              <Col span="8">
              <span style="color:#ccc;padding-left:10px;font-size:0.9rem;">签名：</span>
              <Input
                style="padding-left:10px;font-size:0.9rem;width:190px;"
                v-model="signature"
              ></Input>
              </Col>
              <Col
                span="4"
                push="2"
              >
              <a
                href=""
                style="font-size:0.9rem;color:lightskyblue;"
              >#插入动态信息#</a>
              </Col>
              <Col
                span="6"
                push="6"
              >
              <a
                href=""
                style="font-size:0.9rem;color:lightskyblue;"
              >
                <Icon
                  type="md-create"
                  size="20"
                />修改签名</a>
              </Col>
              <Col
                span="6"
                push="3"
              >
              <span
                href=""
                style="font-size:0.9rem;color:lightskyblue;"
                @click="choosesmsModel=true"
              >
                <Icon
                  type="ios-keypad"
                  size="20"
                />选择模板</span>
              </Col>
            </Row>
          </div>
          <div class="input_box">
            <Input
              v-model="smsinputvalue"
              type="textarea"
              :autosize="{minRows: 4,maxRows: 5}"
              placeholder="在此处输入推送内容"
            />
          </div>
          <div class="button_box">
            <Row>
              <Col span="3">
              <Button>短信测试</Button>
              </Col>
              <Col span="3">
              <Button>保存为模板</Button>
              </Col>
              <Col push="6">
              <span>已输入15个字,</span>
              <span style="color:red;">一条短信</span>
              <span>(含：签名和动态信息，每条短信67个字)</span>
              </Col>
              <Col>
              </Col>
            </Row>
          </div>
        </div>
      </Form-item>
    </Card>

    <!-- 设置微信模板消息 -->
    <Card style="margin-top:1%">
      <p slot="title">设置微信模板消息</p>
      <Form-item label="黑名单过滤：">
        <Radio-group>
          <Radio label="1">排除微信黑名单客户</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="过滤已营销客户：">
        <span>排除最近</span>&nbsp;<Input
          v-model="durations"
          placeholder="输入时长"
          style="width: 150px"
        />&nbsp;<span>小时微信营销过的客户</span>
      </Form-item>
      <Form-item label="微信模板消息内容：">
        <div class="wx_modal_container">
          <p style="text-align:center;">您还未选择微信消息内容，请选择合适的微信消息模板</p>
          <Row
            type="flex"
            justify="center"
          >
            <Col>
            <Button
              type="primary"
              @click="choosewxModel=true"
            >选择微信消息模板</Button>
            </Col>
          </Row>
        </div>
      </Form-item>
    </Card>

    <!-- 设置营销时间  -->
    <Card style="margin-top:1%">
      <p slot="title">设置营销时间</p>
      <div class="marketingtime">
        <!-- <Form-item style="width:30vw;margin-left:-6vw;">
          <Radio-group>
            <Radio label="1">立即发送</Radio>
          </Radio-group>
        </Form-item>
        <Form-item style="width:30vw;margin-left:-6vw;">
          <Radio-group>
            <Radio label="1">定时发送</Radio>
            <DatePicker type="datetime" placeholder="选择发送时间" style="width: 200px"></DatePicker>
          </Radio-group>
        </Form-item>
        <Form-item style="width:30vw;margin-left:-6vw;">
          <Radio-group>
            <Radio label="1">周期性发送</Radio>
          </Radio-group>
          <div class="cyclicitytabs">
            <Row>
              <Col span="2" style="border-right:1px solid #f2f2f2;">
                <ul>
                  <li>
                    <input type="radio">
                    <span >每天</span>
                  </li>
                  <li>
                    <input type="radio">
                    <span >每周</span>
                  </li>
                  <li>
                    <input type="radio">
                    <span >每月</span>
                  </li>
                </ul>
              </Col>
              <Col span="20" push="3" v-if="dayshow">
                <Form-item style="width:30vw;margin-left:-6vw;">
                  <Checkbox v-model="everyday">每天</Checkbox>
                </Form-item>
                <Form-item style="width:30vw;margin-left:-6vw;">
                  <Checkbox v-model="workday">仅工作日</Checkbox>
                </Form-item>
              </Col>
              <Col span="20" push="1" v-if="weekshow">
                  <Checkbox v-model="Monday">周一</Checkbox>
                  <Checkbox v-model="Tuesday">周二</Checkbox>
                  <Checkbox v-model="Wednesday">周三</Checkbox>
                  <Checkbox v-model="Thursday">周四</Checkbox>
                  <Checkbox v-model="Friday ">周五</Checkbox>
                  <Checkbox v-model="Saturday">周六</Checkbox>
                  <Checkbox v-model="Sunday">周日</Checkbox>
              </Col>
              <Col span="20" push="1">
                  <Input v-model="smsinputvalue" style="width:150px;padding-top:1vh;"/>&nbsp;号
              </Col>
            </Row> -->
        <RadioGroup
          v-model="vertical"
          vertical
        >
          <Radio label="apple">
            <Icon type="social-apple"></Icon>
            <span>立即发送</span>
            <span style="margin-left:2vw;color:#ccc;">根据人数预计发送时间： 2018/7/18 20:45</span>
          </Radio>
          <Radio label="android">
            <Icon type="social-android"></Icon>
            <span>定时发送</span>
            <DatePicker
              type="datetime"
              placeholder="选择发送时间"
              style="width: 200px;padding-left:2vw;"
            ></DatePicker>
          </Radio>
          <Radio label="windows">
            <Icon type="social-windows"></Icon>
            <span>周期性发送</span>
            <Row>
              <Col
                span="2"
                style="width:10vw;margin-left:5vw;border-right:1px solid #f2f2f2;"
              >
              <RadioGroup
                v-model="num"
                vertical
              >
                <Radio
                  :label="item.value"
                  v-for="(item,index) in cyclelist"
                  :key="index"
                >{{item.label}}</Radio>
              </RadioGroup>
              </Col>
              <Col
                span="10"
                style="margin-left:2vw;"
              >
              <Row>
                <Col
                  span="20"
                  push="3"
                  v-if="num==0"
                >
                <Form-item style="width:30vw;margin-left:-6vw;">
                  <Checkbox v-model="everyday">每天</Checkbox>
                </Form-item>
                <Form-item style="width:30vw;margin-left:-6vw;">
                  <Checkbox v-model="workday">仅工作日</Checkbox>
                </Form-item>
                </Col>
                <Col
                  span="20"
                  v-if="num==1"
                  push="1"
                >
                  <Checkbox v-model="Monday">周一</Checkbox>
                  <Checkbox v-model="Tuesday">周二</Checkbox>
                  <Checkbox v-model="Wednesday">周三</Checkbox>
                  <Checkbox v-model="Thursday">周四</Checkbox>
                  <Checkbox v-model="Friday ">周五</Checkbox>
                  <Checkbox v-model="Saturday">周六</Checkbox>
                  <Checkbox v-model="Sunday">周日</Checkbox>
                </Col>
                <Col
                  span="20"
                  push="1"
                  v-if="num == 2"
                >
                <Input
                  v-model="smsinputvalue"
                  style="width:150px;padding-top:1vh;"
                />&nbsp;号
                </Col>
              </Row>
              </Col>
            </Row>
            <Row>
              <Form-item
                label="短信发送时间："
                style="margin-top:1vh;"
              >
                <DatePicker
                  type="datetime"
                  placeholder="选择发送时间"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
              <Form-item
                label="周期时间设置："
                style="margin-top:1vh;"
              >
                <Row>
                  <Col span="5">
                  <DatePicker
                    type="date"
                    placeholder="选择周期开始时间"
                    v-model="cyclicitybegin"
                    style="width: 200px"
                  ></DatePicker>
                  </Col>
                  <Col
                    span="2"
                    style="text-align: center"
                    push="7"
                  >-</Col>
                  <Col
                    span="6"
                    push="7"
                  >
                  <DatePicker
                    type="date"
                    placeholder="选择周期结束时间"
                    v-model="cyclicityend"
                    style="width: 200px"
                  ></DatePicker>
                  </Col>
                </Row>
              </Form-item>
            </Row>

          </Radio>
        </RadioGroup>
      </div>
      </Form-item>

      <Form-item style="width:30vw;margin-left:-6vw;">
        <Radio-group>
          <Radio label="1">保障权益到账后发送</Radio>
        </Radio-group>
      </Form-item>
      </div>
    </Card>

    <!-- 设置效果监控时间 -->
    <Card style="margin-top:1%;margin-bottom:13%">
      <p slot="title">设置效果监控时间</p>
      <Row>
        <Col span="3">效果监控时间</Col>
        <Col span="2">沟通发送后</Col>
        <Col span="5">
        <Input
          v-model="formItem.name"
          placeholder="请输入"
          style="width:187px"
        ></Input>
        </Col>
        <Col span="6">小时</Col>
      </Row>
    </Card>

    <Row style="width: 80%;background: #fff;  padding: 16px;  border:1px solid #A3A3A3;  z-index: 1; position:fixed;top:100%;margin-top:-120px;height:100px;">
      <Col span="5">
      <Row>
        <Col span="6">
        <Icon
          type="email"
          size="40"
        ></Icon>
        </Col>
        <Col
          span="18"
          style="padding-top:10px"
        >
        <p style="font-size:12px">目标人群</p>
        <p style="font-size:16px">面乳活跃人群</p>
        </Col>
      </Row>
      </Col>

      <Col span="4">
      <Row>
        <Col span="6">
        <Icon
          type="email"
          size="40"
        ></Icon>
        </Col>
        <Col
          span="18"
          style="padding-top:10px"
        >
        <p style="font-size:12px">短信发送人数</p>
        <p style="font-size:16px">122,597 人</p>
        </Col>
      </Row>
      </Col>

      <Col span="5">
      <Row>
        <Col span="6">
        <Icon
          type="email"
          size="40"
        ></Icon>
        </Col>
        <Col
          span="18"
          style="padding-top:10px"
        >
        <p style="font-size:12px">线下优惠券发送人数</p>
        <p style="font-size:16px">35,156 人</p>
        </Col>
      </Row>
      </Col>

      <Col span="4">
      <Row>
        <Col span="6">
        <Icon
          type="email"
          size="40"
        ></Icon>
        </Col>
        <Col
          span="18"
          style="padding-top:10px"
        >
        <p style="font-size:12px">微信消息发送人数</p>
        <p style="font-size:16px">94,515人</p>
        </Col>
      </Row>
      </Col>

      <Col span="6">
      <Button
        size="large"
        type="primary"
        long
        @click="addInfo('add_info')"
        style="line-height: 56px;"
      >创建</Button>
      </Col>
    </Row>

    <Modal
      v-model="chooseModel"
      title="选择优惠券"
      width="650"
      :mask-closable="false"
    >
      <Table
        :data="couponList"
        :columns="chooseColumns"
        ref="table"
        @on-select="chooseInfo"
        @on-select-all="chooseALLInfo"
      ></Table>
      <Row
        type="flex"
        justify="center"
      >
        <Col>
        <Page
          :total="total"
          show-total
          show-sizer
          show-elevator
          @on-change="changeCurrent"
          @on-page-size-change="changePageSize"
          :current.sync="current"
          style="margin: 24px 0 24px;text-align:right"
        ></Page>
        </Col>
      </Row>
      <div slot="footer">
        <i-button
          type="primary"
          size="large"
          long
          @click="chooseConfirm"
          icon="checkmark-round"
        >保存</i-button>
      </div>
    </Modal>
    <Modal
      v-model="choosesmsModel"
      title="选择短信模板"
      width="750"
      :mask-closable="false"
    >
      <Table
        :data="smsList"
        :columns="chooseColumnsms"
        ref="table"
        @on-select="chooseInfo"
        @on-select-all="chooseALLInfo"
      ></Table>
      <Row
        type="flex"
        justify="center"
      >
        <Col>
        <Page
          :total="totalsms"
          show-total
          show-sizer
          show-elevator
          @on-change="changeCurrent"
          @on-page-size-change="changePageSize"
          :current.sync="current"
          style="margin: 24px 0 24px;text-align:right"
        ></Page>
        </Col>
      </Row>
    </Modal>
    <Modal
      v-model="choosewxModel"
      title="选择微信文本模板"
      width="750"
      :mask-closable="false"
    >
      <Table
        :data="wxList"
        :columns="chooseColumnwx"
        ref="table"
        @on-select="chooseInfo"
        @on-select-all="chooseALLInfo"
      ></Table>
      <Row
        type="flex"
        justify="center"
      >
        <Col>
        <Page
          :total="totalwx"
          show-total
          show-sizer
          show-elevator
          @on-change="changeCurrent"
          @on-page-size-change="changePageSize"
          :current.sync="current"
          style="margin: 24px 0 24px;text-align:right"
        ></Page>
        </Col>
      </Row>
    </Modal>
  </Form>
</template>
<script>
// import {
//   fetchmarketactvityCategory,
//   fetchmarketgroupList,
//   fetchmarketgroupcategoryList,
//   fetchmarketcouponList,
//   fetchmarketSMSlist,
//   fetchmarketwxlist
// } from "@/api/marketing";
export default {
  name: "list",
  components: {},
  data() {
    return {
      formItem: {
        input: "",
        select: ""
      },
      disabled1: true,
      // vertical: "",
      dayradio: "",
      SelectMarketing: "",
      TableLoading: false,
      actvityCategorylist: [],
      tabslist: [],
      couponList: [], // 优惠券列表
      current: 1,
      total: 0, //总条数
      pageNum: 0, //开始条数
      pageSize: 10, //每页记录数
      page: 0,
      // total: 0,
      limit: 10,
      listData: [], // @:data 列表数据
      smsinputvalue: "", // 短信内容
      titleMaxLength: 67, // 最大短信字数
      durations: "", // 时长
      signature: "", //签名
      smsList: [], // 短信模板列表
      totalsms: 0,
      wxList: [], // 微信文本模板列表
      totalwx: 0,
      couponListAdd: [], // 获取选择的优惠券信息
      chooseModel: false,
      choosewxModel: false,
      choosesmsModel: false,
      tabPosition: "left", // 周期性发送tabs位置
      cyclicitybegin: "",
      cyclicityend: "",
      vertical: "days",

      // 周期发送显示/隐藏
      num: 0,
      name: 1,
      // weekshow:false,
      // monthshow:false,
      everyday: "",
      workday: "",
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      },
      columns1: [
        //列表表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "人群名称",
          key: "name",
          align: "center"
        },
        {
          title: "人群总数",
          key: "lastCalcTargetNum",
          align: "center"
        },
        {
          title: "状态",
          key: "contents",
          align: "center",
          render: (h, params) => {
            // const type = params.row.status === 1 ? "success" : "error";
            // let _this = this;
            let text = "";
            let color = "";
            if (params.row.status == 0) {
              text = "删除";
              color = "red";
            } else if (params.row.status == 1) {
              text = "创建";
              color = "lightorange";
            } else if (params.row.status == 2) {
              text = "进行中";
              color = "lightskyblue";
            } else if (params.row.status == 3) {
              text = "计算完成";
              color = "lightgreen";
            }
            // const row = params.row;
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },

        {
          title: "创建时间",
          key: "createDate",
          align: "center"
        },

        {
          title: "创建人",
          key: "createBy",
          align: "center"
        }
      ],

      cardMessage: [
        {
          icon: "ios-mail-outline",
          name: "微信",
          count: "对目标客户直接发送积分",
          show: false
        },
        {
          icon: "ios-mail-outline",
          name: "线下优惠券",
          count: "选择微信会员通生成的线下优惠券发送给客户",
          show: false
        }
      ],
      cardMessages: [
        {
          icon: "ios-mail-outline",
          name: "短信",
          count: "使用短信主动通知客户",
          show: false
        },
        {
          icon: "ios-mail-outline",
          name: "微信模板消息",
          count: "使用微信模板消息推送客户",
          show: false
        }
      ],

      chooseColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "优惠券名称",
          key: "name",
          align: "center"
        },
        {
          title: "优惠券金额",
          key: "amount",
          align: "center"
        },
        {
          title: "使用期限开始日期",
          key: "beginDate",
          align: "center",
          width: 180
        },
        {
          title: "使用期限结束日期",
          key: "endDate",
          align: "center"
        },
        {
          title: "使用条件",
          key: "description",
          align: "center",
          tooltip: "true"
        }
      ],
      chooseColumnsms: [
        {
          type: "selection",
          align: "center"
        },
        {
          title: "短信模板名称",
          key: "name",
          align: "center"
        },
        {
          title: "文案",
          key: "contents",
          align: "center"
        },
        {
          title: "使用条件",
          key: "beginDate",
          align: "center"
        }
      ],
      chooseColumnwx: [
        {
          type: "selection",
          align: "center"
        },
        {
          title: "模板名称",
          key: "name",
          align: "center"
        },
        {
          title: "调用微信模板",
          key: "contents",
          align: "center"
        },
        {
          title: "创建时间",
          key: "beginDate",
          align: "center"
        }
      ],
      cyclelist: [
        {
          label: "每天",
          value: 0
        },
        {
          label: "每周",
          value: 1
        },
        {
          label: "每月",
          value: 2
        }
      ],
      chooseList: [] // 优惠券参数
    };
  },

  watch: {
    SelectMarketing: {
      handler(val) {
        if (val == "1") {
          this.updateTableList();
        } else if (val == "2") {
          this.updateTableList();
        } else if (val == "3") {
          this.updateTableList();
        }
      }
    }
  },
  methods: {
    //分页
    changePageSize(pageSize) {
      this.limit = pageSize;
      this.updateTableList();
    },
    changeCurrent(current) {
      this.start = current * this.limit - this.limit;
      this.updateTableList();
    },
    onSelect(selection, row) {},

    onSelectionChange(selection) {
      this.params.limit = selection;
    },

    FetchmarketactvityCategory() {
      //查询营销活动类别
      this.TableLoading = true;
      this.load = true;
      fetchmarketactvityCategory()
        .then(res => {
          this.TableLoading = false;
          if (res.data.code == 200) {
            this.actvityCategorylist = res.data.result.campaignCategoryList;
          }
        })
        .catch(error => {
          this.$Message.error("请求失败");
        });
    },

    //列表
    updateTableList(params) {
      this.TableLoading = true;
      this.load = true;
      var reqParams = {
        name: this.formItem.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.total
      };
      fetchmarketgroupList(reqParams)
        .then(res => {
          this.TableLoading = false;
          if (res.data.code == 200) {
            this.total = res.data.result.total;
            this.pageNum = res.data.result.pageNum;
            this.pageSize = res.data.result.pageSize;
            this.listData = res.data.result.targetList;
          }
        })
        .catch(error => {
          this.$Message.error("请求失败");
        });
    },

    FetchmarketgroupcategoryList(params) {
      //查询营销人群类别tabs
      var reqParams = {
        page: this.page,
        limit: this.limit,
        total: this.total
      };
      fetchmarketgroupcategoryList(reqParams)
        .then(res => {
          if (res.data.status == 200) {
            this.tabslist = res.data.data.records;
          }
        })
        .catch(error => {
          this.$Message.error(error);
        });
    },

    FetchmarketcouponList(params) {
      //查询营销优惠券列表
      this.TableLoading = true;
      this.load = true;
      var reqParams = {
        page: this.page,
        limit: this.limit,
        total: this.total
      };
      fetchmarketcouponList(reqParams)
        .then(res => {
          this.TableLoading = false;
          if (res.data.status == 200) {
            this.couponList = res.data.records;
          }
        })
        .catch(error => {
          this.$Message.error(error);
        });
    },
    FetchmarketSMSlist(params) {
      this.TableLoading = true;
      this.load = true;
      var reqParams = {
        name: this.formItem.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.total
      };
      fetchmarketSMSlist(reqParams)
        .then(res => {
          // 请求短信模板列表
          this.TableLoading = false;
          if (res.data.code == 200) {
            this.total = res.data.records.total;
            this.pageNum = res.data.records.pageNum;
            this.pageSize = res.data.records.pageSize;
            this.smslist = res.data.records;
          }
        })
        .catch(error => {
          this.$Message.error("请求失败");
        });
    },
    returnTable() {
      this.$router.push({ path: "/static/marketingManagementList" });
    },

    addInfo(name) {
      this.loading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          var reqParams = this.add_info;
          this.func.ajaxPost(
            this.api.baseUrl + "/sysUser/addUser.do",
            this.qs.stringify(reqParams),
            res => {
              if (res.data.code == 200) {
                this.$Message.success("添加成功!");

                setTimeout(
                  function() {
                    this.returnTable();
                  }.bind(this),
                  1200
                );
              } else {
                this.$Message.error(
                  res.data.errcode + "添加失败!请稍后再试..."
                );

                this.loading = false;
              }
            }
          );
        } else {
          this.$Message.error("表单验证失败!");
          this.loading = false;
        }
      });
    },

    chooseInfo(obj) {
      this.chooseList = obj;
    },

    chooseALLInfo(obj) {
      this.chooseList = obj;
    },

    //设置线下优惠券 -弹窗叠加
    chooseConfirm(obj) {
      this.couponListAdd.push(this.chooseList);
      this.chooseModel = false;
    },
    //设置线下优惠券 -编辑
    editCouponListItem(item) {},

    //设置线下优惠券 -移除
    removeCouponListItem(index) {
      this.couponListAdd.splice(index, 1);
    },
    showmarks(item) {
      item.show = !item.show;
    },

    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    },
    changestatus() {
      this.disabled1 != this.disabled1;
    },
    FetchData() {
      this.FetchmarketgroupcategoryList();
      this.FetchmarketcouponList();
      this.FetchmarketSMSlist();
    },
    toggle(index) {
      this.num = index;
      console.log(index);
    }
  },

  created() {
    this.updateTableList(this.params);
    this.FetchData(this.params);
  }
};
</script>

<style lang="scss" scoped>
// @import "../../styles/common.scss";
.active {
  border: 1px solid #3089dc;
  color: #3089dc;
}
.cardMessage {
  .ivu-icon {
    font-size: 38px;
  }
  .count {
    font-size: 12px;
    color: #9ea7b4;
    height: 30px;
  }
  .name {
    font-size: 16px;
  }
}
.Selectinterest {
  width: 100%;
  height: 20vh;
  position: relative;
  .integral_box,
  .coupon_box {
    // 选择权益样式
    width: 24vw;
    height: 20vh;
    box-shadow: 0px -2px 0px 0px #f2f2f2,
      /*上边阴影    */ -2px 0px 0px 0px #f2f2f2,
      /*左边阴影  */ 2px 0px 0px 0px #f2f2f2,
      /*右边阴影  */ 0px 2px 0px 0px #f2f2f2; /*下边阴影  */
    box-sizing: border-box;
    .mark {
      width: 30px;
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      position: absolute;
      bottom: 0px;
      right: 2.1vw;
      background-color: #3089dc;
    }
  }
}
.underline_coupon {
  // 线下优惠券
  margin-top: 1vh;
  box-shadow: 0px -2px 0px 0px #f2f2f2,
    /*上边阴影    */ -2px 0px 0px 0px #f2f2f2,
    /*左边阴影  */ 2px 0px 0px 0px #f2f2f2,
    /*右边阴影  */ 0px 2px 0px 0px #f2f2f2; /*下边阴影  */
  .title {
    padding-left: 1vw;
    font-weight: bolder;
    font-size: 14px;
    color: #333;
  }
  .underline_coupon_container {
    display: flex;
    height: auto;
    .underline_coupon_box {
      min-height: 30vh;
      list-style: none;
      li {
        float: left;
        margin-right: 1vw;
      }
      .underline_coupon_detail {
        width: 22vw;
        min-height: 25vh;
        display: inline-block;
      }
    }
  }
}
.sms_container {
  // 设置短信
  margin-top: 1vh;
  .sms_container_box {
    width: 60vw;
    height: 28vh;
    margin-top: 2vh;
    border: 1px solid #f2f2f2;
    .sms_container_header {
    }
    .button_box {
      margin: 0px 0px 1vh 0px;
      padding: 1vh 0px 0px 1vw;
    }
  }
}

.wx_modal_container {
  // 微信模板消息
  width: 500px;
  height: 100px;
  margin-top: 1vh;
  background-color: #f2f2f2;
}
.marketingtime {
  width: 70vw;
  padding-left: -5vw;
  .cyclicitytabs {
    // 营销时间
    width: 60vw;
    height: 20vh;
    margin-left: 7vw;
    margin-top: -3vh;
  }
}
</style>
