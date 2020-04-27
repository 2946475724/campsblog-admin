<template>
  <div class="app-container">
    <el-form ref="" :model="articleInfo" label-width="100px" style="width: 95%; margin-top: 10px;" size="small">
      <el-form-item label="文章封面">
        <el-upload action="http://localhost:8080/file/uploadImage" name="image" :show-file-list="false"
          :http-request="uploadImage" :on-success="handleAvatarSuccess" :before-upload="handleBeforeUpload"
          class="avatar-uploader">
          <img v-if="articleInfo.coverImage" :src=articleInfo.coverImage class="article-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章标题" props="title">
        <el-input placeholder="请输入文章标题" class="input-width" v-model="articleInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" props="summary">
        <el-input type="textarea" placeholder="请输入文章摘要" v-model="articleInfo.summary"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="文章分类" prop="categoryId">
            <el-select v-model="name" size="small" @change="selectChange" placeholder="请选择">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章标签">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否发布">
            <el-radio-group @change="radioChange" v-model="articleInfo.status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章内容">
        <div class="section-editor">
          <quillEditor v-model="articleInfo.content" ref="vueQuillEditor" :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
          </quillEditor>
        </div>
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
  import {
    getArticleById
  } from '@/api/article'
  import {
    getCategotyList,
    getCategories
  } from '@/api/category'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {
    quillEditor
  } from "vue-quill-editor"; //调用编辑器
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
    components: {
      quillEditor
    },
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
      // 获取分类
      getCategories().then(resp => {
        this.categories = resp.data
      })
      // 判断编辑或新增
      if (this.isEdit) {
        getArticleById(this.$route.query.id).then(resp => {
          this.articleInfo = resp.data
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === resp.data.categoryId) {
              console.log(this.categories[i].name)
              this.name = this.categories[i].name
            }
          }
          this.dynamicTags = resp.data.tags.split(',')
        })
      } else {
        this.articleInfo = Object.assign({}, defaultArticle)
      }

    },
    methods: {

      uploadImage() {

      },
      handleAvatarSuccess() {

      },
      handleBeforeUpload() {},
      onEditorBlur() {}, // 失去焦点事件
      onEditorFocus() {}, // 获得焦点事件
      onEditorChange() {}, // 内容改变事件
      handleClose() {

      },

      // 标签输入
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      radioChange(value) {
        console.log(value)
        this.article.status = value
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .article-image {
    width: 80px;
    height: 80px;
    display: block;
  }

</style>
