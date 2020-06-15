<template lang="pug">
.scroll-container(ref='scrollContainer', @wheel.prevent='handleScroll')
    .scroll-wrapper(ref='scrollWrapper', :style="styleObj")
        slot

</template>

<script>
const delta = 15

export default {
    name: 'scrollBar',
    data() {
        return {
            top: 0
        }
    },
    computed: {
        styleObj() {
            const prefixs = ['', '-ms-', '-webkit-', '-o-']
            return prefixs.reduce((obj, prefix) => {
                obj[`${prefix}transform`] = `translate3d(0, ${this.top}px, 0)`
                return obj
            }, {})
        }
    },
    methods: {
        handleScroll(e) {
            const eventDelta = e.wheelDelta || -e.deltaY * 3
            const $container = this.$refs.scrollContainer
            const $containerHeight = $container.offsetHeight
            const $wrapper = this.$refs.scrollWrapper
            const $wrapperHeight = $wrapper.offsetHeight
            if (eventDelta > 0) {
                this.top = Math.min(0, this.top + eventDelta)
            } else {
                if ($containerHeight - delta < $wrapperHeight) {
                    if (
                        this.top < -($wrapperHeight - $containerHeight + delta)
                    ) {
                        this.top = this.top
                    } else {
                        this.top = Math.max(
                            this.top + eventDelta,
                            $containerHeight - $wrapperHeight - delta
                        )
                    }
                } else {
                    this.top = 0
                }
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    // background-color: $;
    .scroll-wrapper {
        position: absolute;
        width: 100% !important;
    }
}
</style>
