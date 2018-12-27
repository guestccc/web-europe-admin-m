<template>
  <div>
    <el-button
      @click="download"
      type="primary">批量下载远程图片</el-button>
  </div>
</template>

<script>
import JSZip from 'jszip'
import Axios from 'axios'
import DKUtils from '@/jslib/dk-utils'

export default {
  name: 'MultipleDownload',
  data() {
    return {
      imgList: ['https://cdn.dankal.cn/01a68fd7-d283-450f-9b1b-6bc9ebd57c94', 'https://cdn.dankal.cn/01b6d916-7627-4444-94fc-c2936bfb840a'],
    }
  },
  methods: {
    download() {
      const axiosList = this.generateAxiosQueue(this.imgList)
      Axios.all(axiosList).then((response) => {
        console.log(response, 'response')
        const zip = new JSZip()
        response.forEach((value, index) => {
          zip.file(`qrcode${index}.png`, value.data)
        })
        zip.generateAsync({ type: 'blob' }).then((content) => {
          DKUtils.downloadBlobFile(content)
        })
      })
    },
    generateAxiosQueue(imgList) {
      const promiseQueue = []
      imgList.forEach((value) => {
        promiseQueue.push(Axios({
          method: 'get',
          url: value,
          responseType: 'blob',
        }))
      })
      return promiseQueue
    },
  },
}
</script>

<style scoped>

</style>
