<template>
  <div class="app-container">
  <el-card class="filter-container" shadow="never">
    <el-form-item label="文章封面：">
      <el-upload action="">
        <el-button type="primary"></el-button>
      </el-upload>
    </el-form-item>
    <el-form ref="" :model="articleInfo" label-width="200px" style="width: 90%; margin-top: 10px;" size="small">
      <el-form-item label="文章标题：" props="title">
        <el-input placeholder="请输入文章标题" class="input-width" v-model="articleInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要：" props="summary">
        <el-input type="textarea" placeholder="请输入文章摘要" class="input-width" v-model="articleInfo.summary"></el-input>
      </el-form-item>
      <el-form-item label="文章内容：">
        <div class="section-editor">
          <quillEditor v-model="articleInfo.content" ref="vueQuillEditor" :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" >
          </quillEditor>
        </div>
      </el-form-item>
      <el-form-item label="文章标签：">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </el-form-item>
      <el-form-item label="是否发布：">
        <el-radio-group @change="radioChange" v-model="articleInfo.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="name" size="small" @change="selectChange" placeholder="请选择">
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.name">
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
  import {getArticleById, getArticleCategory} from '@/api/article'
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
        dynamicTags: [],
        content: null,
        editorOption: {},
        inputVisible: '',
        categories: [],
        name: "",
      }
    },
    computed: {
      editor() {
        return this.$refs.vueQuillEditor.quill;
      }
    },
    created() {
      // 判断编辑或新增
      if (this.isEdit) {
        getArticleById(this.$route.query.id).then(resp => {
          this.articleInfo = resp.data
        })
      } else {
        this.articleInfo = Object.assign({}, defaultArticle)
      }
      // 获取分类
      getArticleCategory().then(resp => {
        this.categories = resp.data
      })
    },
    methods: {

      onEditorBlur() { }, // 失去焦点事件
      onEditorFocus() { }, // 获得焦点事件
      onEditorChange() { }, // 内容改变事件
      handleClose() {

      },
      handleInputConfirm() {

      },
      showInput() {

      },
      radioChange() {

      },
      selectChange() {

      },
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