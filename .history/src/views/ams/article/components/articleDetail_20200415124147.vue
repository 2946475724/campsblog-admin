<template>
  <div class="app-container">
  <el-card class="filter-container" shadow="never">
    <el-form ref="" :model="articleInfo" label-width="200px" style="width: 90%; margin-top: 10px;" size="small">
      <el-form-item label="文章标题：" props="title">
        <el-input placeholder="请输入文章标题" class="input-width" v-model="articleInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容：">
        <div class="section-editor">
          <quillEditor v-model="articleInfo.content" ref="vueQuillEditor" :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)" @change="onEditorChange($event)" >
          </quillEditor>
        </div>
      </el-form-item>
      <el-form-item label="文章封面：">
        <single-upload></single-upload>
      </el-form-item>
      <el-form-item label="文章标签：" props="title">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加标签</el-button>

      </el-form-item>
      <el-form-item label="文章分类：" props="title">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>



</template>
<script>
  import {getArticleById} from '@/api/article'
  import SingleUpload from '@/components/Upload/singleUpload'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  // 引入样式，此时样式是直接从quill文件中直接引入
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  const defaultArticle = {
    title: '',
    content: '',

  }
  export default {
    name: 'editor',
    components: { quillEditor },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        articleInfo: {},
        dynamicTags: '',
        content: null,
        editorOption: {},
        editorOption: '',
      }
    },
    computed: {
      editor() {
        return this.$refs.vueQuillEditor.quill;
      }
    },
    created() {
      if (this.isEdit) {
        getArticleById(this.$route.query.id).then(resp => {
          this.articleInfo = resp.data
        })
      } else {
        this.articleInfo = Object.assign({}, defaultArticle)
      }
    },
    methods: {

      onEditorBlur() { }, // 失去焦点事件
      onEditorFocus() { }, // 获得焦点事件
      onEditorChange() { }, // 内容改变事件
    },
    
  }
</script>
<style>
  .edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .ql-editor {
    height: 400px;
  }

  .input-width {
    width: 500px;
  }
</style>