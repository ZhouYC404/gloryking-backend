(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c432e"],{"3a8b":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{"label-width":"auto"},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{attrs:{label:"所属分类",size:"normal"}},[r("el-select",{model:{value:e.article.categories,callback:function(t){e.$set(e.article,"categories",t)},expression:"article.categories"}},e._l(e.categories,(function(e){return r("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"文章标题"}},[r("el-input",{model:{value:e.article.title,callback:function(t){e.$set(e.article,"title",t)},expression:"article.title"}})],1)],1)],1),r("el-row",[r("el-col",[r("el-form-item",{attrs:{label:"文章内容"}},[r("vue-editor",{attrs:{useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.article.detail,callback:function(t){e.$set(e.article,"detail",t)},expression:"article.detail"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"default","native-type":"submit"},on:{click:e.save}},[e._v("新建")]),r("el-button",{attrs:{type:"info",size:"default"},on:{click:e.cancel}},[e._v("取消")])],1)],1)},n=[],i=(r("96cf"),r("1da1")),s=r("5873"),c={components:{VueEditor:s["a"]},data:function(){return{article:{},categories:[]}},methods:{handleImageAdded:function(e,t,r,a){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){var s,c,l;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=new FormData,s.append("file",e),i.next=4,n.$http.post("upload",s);case 4:c=i.sent,l=c.data,console.log(l),t.insertEmbed(r,"image",l),a();case 9:case"end":return i.stop()}}),i)})))()},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post("/rest/articles/new",e.article);case 2:r=t.sent,console.log(r),e.$router.push("/articles/list"),e.$message({type:"success",message:"新建成功~",duration:600});case 6:case"end":return t.stop()}}),t)})))()},getparents:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/rest/categories/list");case 2:r=t.sent,e.categories=r.data;case 4:case"end":return t.stop()}}),t)})))()},cancel:function(){this.$router.push("/articles/list")}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getparents();case 2:case"end":return t.stop()}}),t)})))()}},l=c,o=r("2877"),u=Object(o["a"])(l,a,n,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0c432e.a3cd9a28.js.map