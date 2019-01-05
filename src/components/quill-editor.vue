<template>
  <div>
    <!-- 这个组件有很多方法，需要用自己去官网找 -->
    <quill-editor
      ref="myTextEditor"
      v-model="content01"
      :config="editorOption"
      :options="option"
      @change="event().onContentChange(content01)"/>
    <input
      ref='file_click'
      type="file"
      accept="image/*"
      style="display:none;"
      @change="fileUpload">
    <input
      ref='video_click'
      type="file"
      id="video"
      accept="video/*"
      style="display:none;"
      @change="videoUpload">
  </div>
</template>

<script>
import axios from 'axios'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import { uploadDomain } from '../configs/env'
import qiniu from '../jslib/qiniu'
// 手动引入css--官方文档说的
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],
  ['image'],
  ['clean'], // remove formatting button
]

export default {
  name: 'DkEditor',
  props: {
    content: {
      type: String,
      required: true, // 必须
    },
  },
  mixins: [qiniu],
  data() {
    return {
      file: '',
      editorOption: {
        placeholder: '请输入内容',
      },
      content01: '',
      addRange: [],
      uploadType: '', // 这个很重要，插入文本编辑器需要用这个分辨文件类型
      // 富文本编辑器配置
      option: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
          },
        },
      },
    };
  },
  created() {
    if (sessionStorage.getItem('permissions')) {
      const accessToken = JSON.parse(sessionStorage.getItem('permissions'))
      axios.interceptors.request.use((config) => {
        const newConfig = config
        newConfig.headers = { 'X-Access-Token': accessToken.token.access_token }

        return newConfig
      })
    }
  },
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler) // 为视频ICON绑定事件
    this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler) // 为视频ICON绑定事件
  },
  methods: {
    // 获取图片流
    fileUpload(e) {
      const file = e.target.files[0];
      const that = this;
      if (!file) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.$notify({
          title: '警告',
          message: '上传图片不能超过5MB',
          type: 'warning',
        });
        return
      }
      that.network().fileUpload(file)
    },
    // 获取图片流
    videoUpload(e) {
      const file = e.target.files[0];
      const that = this;
      if (!file) {
        return;
      }
      that.network().fileUpload(file)
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      this.file = 'image/*'
      this.addRange = this.$refs.myTextEditor.quill.getSelection()
      if (state) {
        this.$refs.file_click.click();
      }
      this.uploadType = 'image'
    },
    videoHandler(state) {
      this.file = 'video/*'
      this.addRange = this.$refs.myTextEditor.quill.getSelection()
      if (state) {
        this.$refs.video_click.click();
      }
      this.uploadType = 'video'
    },
    event() {
      const self = this
      return {
        /** 编辑器内容更改，向父组件传递数据 */
        onContentChange(content01) {
          self.$emit('update:contentUpdate', content01)
        },
      }
    },
    network() {
      const self = this
      return {
        /** 上传文件 */
        async fileUpload(file) {
          /** 把文件流和token一起放在FormData这个里面 */
          const formData = new FormData()
          formData.append('file', file)
          formData.append('token', self.uploadData.token)
          const loading = self.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          axios({
            url: uploadDomain,
            data: formData,
            method: 'POST',
          }).then((res) => {
            self.handle().onScuccess(res.data.hash)
          }).catch(() => {
            self.$message({ message: '网络中断', type: 'danger' })
          }).finally(() => {
            loading.close()
          })
        },
      }
    },
    handle() {
      const self = this
      return {
        /** 当图片和token上传七牛成功后调用--把图片传入编辑器中 */
        onScuccess(fileHash) {
          const url = self.cdnDomain + fileHash
          if (fileHash != null && fileHash.length > 0) {
            // 将文件上传后的URL地址插入到编辑器文本中
            // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index
            // 即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
            self.addRange = self.$refs.myTextEditor.quill.getSelection() // 这个是获取焦点，O(∩_∩)O
            self.$refs.myTextEditor.quill.insertEmbed(
              self.addRange !== null ? self.addRange.index : 0,
              self.uploadType, url, Quill.sources.USER,
            ) // 调用编辑器的 insertEmbed 方法，插入URL
          } else {
            this.$message.error(`${self.uploadType}插入失败`)
          }
        },
      }
    },
  },
  components: {
    quillEditor,
  },
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    },
  },
  watch: {
    /** 监听prop--再赋值data--不可以直接挂在v-model */
    content(cur, old) {
      if (cur !== old) {
        this.content01 = cur
      }
    },
  },
};
</script>
<style>
html, body, div {
  overflow: initial
}
.ql-toolbar ql-snow {
  overflow: initial
}
.ql-container.ql-snow{
  height: 480px;
}
.quill-editor{
  min-height: 360px
}

.ql-container{
  min-height: 360px
}

.ql-snow .ql-editor img{
  max-width: 440px
}

.ql-editor .ql-video{
  max-width: 440px
}
</style>
