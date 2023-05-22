<template>
  <div>
    <div style="margin: 10px 0;">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>


    <div style="margin: 10px 0;">
      <el-input v-model="search" placeholder="请输入" style="width: 20%;" clearable/>
      <el-button type="primary" @click="load">查询</el-button>
    </div>
    <el-table 
      :data="tableData" 
      border 
      style="width: 100%"
      stripe
      >
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="address" label="地址"/>
     <el-table-column label="操作">
       <template #default="scope">
           <el-button type="primary" fixed="right"  @click="handleEdit(scope.row)">编辑</el-button>
             <el-popconfirm title="确认删除吗?" @confirm="handleDelect(scope.row.id)">
                 <template #reference>
                   <el-button type="danger">删除</el-button>
                 </template>
             </el-popconfirm>
       </template>
     </el-table-column>
    </el-table>

    <div style="margin: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5,10,20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


      <el-dialog title="请输入信息" v-model="dialogVisible"  width="30%">
        <el-form :model="form" label-width=120px>
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 50%"/>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 50%"/>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 50%"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
            <el-radio v-model="form.sex" label="未知">未知</el-radio>
<!--            <el-input v-model="form.sex" style="width: 50%"/>-->
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" style="width: 50%"/>
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
          </span>
        </template>
      </el-dialog>


       
    </div>
  </div>
</template>

<script>



import request from "@/utils/request";

export default {
  name: "home",
  components:{

  },
  data(){
    return {
      form: {},
      search: '',
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableData: [

      ],
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      request.get("/user",{
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res=>{
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    add(){
      this.dialogVisible = true
      this.form= {}
    },
    save(){
      if(this.form.id){//有ID则更新
        request.put("/user",this.form).then(res => {
          console.log(res)
          if(res.code === '0'){
            this.$message({
              type: "success",
              message: "更新成功"
            })
          }else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load()
          this.dialogVisible = false
        })
      }else{//新增
        request.post("/user",this.form).then(res => {
          console.log(res)
          if(res.code === '0'){
            this.$message({
              type: "success",
              message: "新增成功"
            })
          }else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load()
          this.dialogVisible = false
        })

      }
    },
    handleEdit(row){
      this.form  = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleDelect(id){
      console.log(id)
      request.delete("/user"+"/"+id).then(res =>{
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "删除成功"
          })
        }else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()
      })
    },
    handleCurrentChange(pageNum){//改变每页个数时触发
      this.currentPage = pageNum
      this.load()
    },
    handleSizeChange(pageSize){//改变当前页码时触发
      this.pageSize = pageSize
      this.load()
    },
  }
}
</script>