<style lang="scss" scoped>
.common-border {
  padding: 30px 32px;
  text-align: left;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .input {
    flex-grow: 1;
    font-size: 14px;
    height: 1.47058824em;
    line-height: 1.47058824;
    -webkit-appearance: none;
    word-wrap: break-word;
    border: 0;
    background-color: #ffffff;
    text-align: right;
    resize: none;
    outline: 0;
    &:focus {
      outline: 0;
    }
  }
}
</style>

<template>
	<div>
		<div class="common-border">
			<span class="title" v-text="title"></span>
			<textarea ref="textarea" class="input" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="placeholder" @change="change" @click="click" @input="input" @focus="focus" @blur="blur"></textarea>
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'common-input-row',
	props: {
		title: [String, Number],
		value: [String, Number],
		placeholder: [String, Number]
	},
	computed: {
		model: {
			set() {
				return this.value
			},
			get() {
				return this.value
			}
		}
	},
	methods: {
		change(e) {
			this.$emit('change', e.target.value)
		},
		input(e) {
			this.$emit('input', e.target.value)
		},
		focus() {
			this.$emit('focus')
			this.$refs.textarea.focus()

		},
		blur() {
			this.$emit('blur')
			this.$refs.textarea.blur()
		},
		click() {
			function isAndroid() {
				var u = navigator.userAgent
				if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
					return true
				}
			}
			if (!isAndroid()) return false
			var time = setTimeout(() => {
				var element = this.$refs.textarea
				element.scrollIntoView(false)
				clearTimeout(time)
			}, 400)
		}
	}
}
</script>
