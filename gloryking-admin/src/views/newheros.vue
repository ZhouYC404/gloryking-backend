<template>
  <el-form @submit.native.prevent label-width="auto" >
     <el-tabs type="border-card" >
      <el-tab-pane label="基础信息">
         <el-row>
        <el-col :span="6">
      <el-form-item label="英雄名称" >
          <el-input v-model="heros.name"></el-input>
      </el-form-item>
      </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
       <el-form-item label="英雄称号">
      <el-input v-model="heros.title"></el-input>
  </el-form-item>
  </el-col>
      </el-row>

       <el-row>
        <el-col :span="6">
       <el-form-item label="英雄类型">
      <el-select v-model="heros.categories" multiple >
        <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
        </el-option>
      </el-select>
  </el-form-item>
  </el-col>
      </el-row>

        <el-row>
        <el-col :span="6">
       <el-form-item label="顺风出装">
      <el-select v-model="heros.items1" multiple >
        <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
        </el-option>
      </el-select>
  </el-form-item>
  </el-col>
      </el-row>

       <el-row>
        <el-col :span="24">
       <el-form-item label="逆风出装">
      <el-select v-model="heros.items2" multiple >
        <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
        </el-option>
      </el-select>
  </el-form-item>
  </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="10">
       <el-form-item label="使用技巧">
      <el-input type="textarea" v-model="heros.usagetips"></el-input>
  </el-form-item>
  </el-col>
      </el-row>

<el-row>
        <el-col :span="10">
       <el-form-item label="对抗技巧">
      <el-input type="textarea" v-model="heros.battletips"></el-input>
  </el-form-item>
  </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
       <el-form-item label="团战思路">
      <el-input type="textarea" v-model="heros.teamtips"></el-input>
  </el-form-item>
  </el-col>
      </el-row>
      
       <el-row>
        <el-col :span="8">
       <el-form-item label="难度" class="difficult"> 
  <el-rate class="rate1" v-model="heros.scores.difficult" :colors="colors" :max="10" show-score >
  </el-rate>
   </el-form-item>
  </el-col>
      </el-row>
   <el-row>
        <el-col :span="8">
       <el-form-item label="技能" class="difficult"> 
  <el-rate class="rate1" v-model="heros.scores.skills" :colors="colors" :max="10" show-score >
  </el-rate>
   </el-form-item>
  </el-col>
      </el-row>
   <el-row>
        <el-col :span="8">
       <el-form-item label="攻击" class="difficult"> 
  <el-rate class="rate1" v-model="heros.scores.attack" :colors="colors" :max="10" show-score >
  </el-rate>
   </el-form-item>
  </el-col>
      </el-row>
   <el-row>
        <el-col :span="8">
       <el-form-item label="生存" class="difficult"> 
  <el-rate  class="rate1" v-model="heros.scores.survive" :colors="colors" :max="10" show-score >
  </el-rate>
  </el-form-item>
  </el-col>
      </el-row>

       <el-form-item label="英雄头像">
      <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="afterupload"
  >
  <!--↑action默认post方式  -->
  <img v-if="heros.avatar" :src="heros.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
      </el-tab-pane>

      <el-tab-pane label="技能">
        <el-row style="margin-bottom:10px">
          <el-col :offset="0">
      <el-button type="primary" size="default" @click="heros.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
       </el-col>
       </el-row>

   <el-row type="flex" justify="space-around" class="rowtest">
      <el-col v-for="(item,index) in heros.skills" :key="index" :span="10">
        <el-col :offset="0">

          <el-form-item label="技能名称" size="normal">
              <el-input v-model="item.name"></el-input>
          </el-form-item>

          <el-form-item label="技能图标">
      <el-upload
  class="avatar-uploader"
  :headers="uploadheader()"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="res=>$set(item,'icon',res)"
  ><!-- ↑item传不进on-success后面的函数里，用这种方法，可以传item -->
  <!--↑action默认post方式-->
  <img v-if="item.icon" :src="item.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>

 <el-form-item label="技能描述" size="normal">
              <el-input v-model="item.description" type="textarea"></el-input>
          </el-form-item>

 <el-form-item label="小贴士" size="normal">
              <el-input v-model="item.tips" type="textarea"></el-input>
          </el-form-item>
 <el-form-item size="normal">
   <el-button type="danger" @click="isdelete(index)">删除技能</el-button>
   </el-form-item>
        </el-col>
      </el-col>
</el-row>

      </el-tab-pane>
    </el-tabs>

     <el-row style="margin-top:10px">
       <el-col :span="8">
        <el-button type="primary" size="default"  native-type="submit" @click="save">确认修改</el-button>
        <el-button type="info" size="default"  @click="cancel">取消</el-button>
         </el-col>
      </el-row>
  </el-form>
</template>

<script>
export default {
data() {
  return {
     value2: null,
        colors: { 2: ' #99A9BF', 4:' #75C319',6:'#ECB10C',8:'#FF5C7C',10:'#992532'},
    heros:{
      scores:{
        difficult:0,
        skills:0,
        attack:0,
        survive:0
      },//不给scores属性，this.heros.scores.difficult会获取不到，因为scores为undefined,不给difficult属性，el-rate会报错。
      skills:[]
    },
   
    categories:[],//英雄所有类型
    items:[]//英雄所有出装
  }
},
methods: {
  async save(){//存储英雄
    let res = await this.$http.post('/rest/heros/new',this.heros)
    console.log(res);
    this.$router.push('/heros/list')
    this.$message({
      type:'success',
      message:'新建成功~',
      duration:600
    })
  },
  async getcategories(){//获取英雄分类
         let res1 = await this.$http.get('rest/categories/list')
         this.categories = res1.data
        // console.log(this.categories);
    },
  async getitems(){//获取装备
         let items = await this.$http.get('/rest/items/list')
         this.items = items.data
         //console.log(this.items);
    },
  cancel(){
    this.$router.push('/heros/list')
  },
  afterupload(res){
    //console.log(res);
      this.$set(this.heros,'avatar',res)
  },
   async isdelete(index){
         try{
           this.index = index
           await  this.$confirm('此操作将永久删除该技能, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        //1↓
          this.heros.skills.splice(index,1)//确认删除就把skills数组的相应数据去除
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration:600
          });
          //1↑
        } catch (error) {
            //2↓

          //2↑
        }          
        },     
},
async created() {
  await this.getcategories()
    await this.getitems()
    setTimeout(() => {
      console.log(this.heros);
    }, 3000);
},
}
</script>

<style>
  .rowtest{
flex-wrap:wrap;
}
.rate1{
  margin-top: 0.6rem;
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>