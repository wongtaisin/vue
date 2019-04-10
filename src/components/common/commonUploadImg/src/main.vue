<style lang="scss" scoped>
.common-upload-img {
  display: inline-block;
  width: 130px;
  height: 150px;
  position: relative;
  overflow: hidden;
  .show-img {
    width: 130px;
    height: 150px;
  }
  .file-box {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 28px;
    width: 130px;
    height: 150px;
    overflow: hidden;
    z-index: 1;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 130px;
      height: 130px;
    }
    .img-zi {
      margin-top: -20px;
      color: #ccd8e0;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      margin-left: 15px;
    }
    .inputFile {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      opacity: 0;
      width: 130px;
      height: 150px;
    }
  }
}
</style>

<template>
  <div class="common-upload-img">
    <div class="file-box">
      <img ref="imgSrc" class="img" :src="src||defaultImg" />
      <p class="img-zi" v-if="show">添加图片</p>
      <input type="file" accept="image/*" ref="inputFile" class="inputFile" @change="uploadHttp" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-upload-img',
  props: {
    src: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      show: true,
      defaultImg: `${this.domain}app/static/img/shopLogo.png`
    }
  },
  methods: {
    //上传图片返回url
    uploadHttp() {
      // 通过canvas压缩图片
      let file = this.$refs.inputFile.files[0]
      if (!file) return false
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt15M = file.size / 1024 / 1024 < 5
      if (!isJPG) return this._utils.tipMessage('上传图片只能是 JPG/PNG 格式!')
      if (!isLt15M) return this._utils.tipMessage('上传图片大小不能超过5MB!')

      var reader = new FileReader()
      reader.readAsDataURL(file)
      var img = new Image()
      var imgSrc = ''
      const _this = this
      reader.onload = function () {
        img.src = this.result
        var width = 800, //图像大小
          quality = 0.8, //图像质量
          canvas = document.createElement('canvas'),
          drawer = canvas.getContext('2d')
        img.onload = function () {
          canvas.width = width
          canvas.height = width * (img.height / img.width)
          drawer.drawImage(img, 0, 0, canvas.width, canvas.height)
          imgSrc = canvas.toDataURL('image/jpeg', quality)
          if (!imgSrc) return false

          var _data = {}
          _data.fileName = file.name.split('.')[0]
          _data.imgStr = imgSrc
          _data.type = file.type.split('/')[1]

          var params = {
            paramsDate: {
              base64: _data.imgStr
            },
            callBack: (res) => {
              _this.show = false
              _this.defaultImg = res
              _this.$emit('update', res)
            }
          }
          _this._store.dispatch('common/uploadImageBase64', params)
        }
      }
    }
  }
}
</script>
