<template>
  <section class="container">
    <quill-editor
      v-model="html"
      @change="handlerTextPage"/>
  </section>
</template>

<script>
import QuillEditor from '@/components/quill-editor';
import Mixins from '@/mixins/operations'

export default {
  data() {
    return {
      html: '<p>测试</p>',
    };
  },
  mixins: [Mixins],
  components: {
    QuillEditor,
  },

  methods: {
    handlerTextPage(data) {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    },
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    html(nv, ov) {
      console.log('====================================');
      console.log(nv);
      console.log('====================================');
    },
  },
};
</script>

<style scoped>
</style>
