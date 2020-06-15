<template lang="pug">
.block
    Title(:title='title')
    .block-content
        slot
</template>

<script>
import Title from './Title'

import titleMixins from '@/mixin/block_title'
export default {
    mixins: [titleMixins],
    components: {
        Title
    }
}
</script>

<style lang="scss" scoped>
.block {
    padding: 24px 36px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    .block-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
}
</style>

