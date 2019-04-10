- 说明
```
<common-swiper v-for="(item,index) in getSingle" :key="index" :index="index" :height="高度" @edit="编辑" @del="删除">
    <div slot="swiperContent">
        <mu-list-item ref="item" class="item" :title="item.name">
            <mu-switch @change="changeSwitch(item.id,index)" v-model="item.weigh" slot="right" />
        </mu-list-item>
    </div>
</common-swiper>
```

