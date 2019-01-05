<template>
  <el-main class="page-content-margin-unset">
    <div class="el-form-item">
      <span class="el-form-item__label">规格名</span>
      <el-input
        class="el-input-mini"
        placeholder="请输入内容"
        v-model="specificationsTitle"
        clearable/>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="event().onAddSpecificationsTitle()">添加</el-button>
    </div>
    <div
      class="el-form-item"
      v-for="(item,index) in Arr"
      :key="index">
      <span class="el-form-item__label">{{ item.specificationsTitle }}</span>
      <el-input
        class="el-input-mini"
        placeholder="请输入内容"
        v-for="(parameter,parameterIndex) in item.parameters"
        :key="parameterIndex"
        v-model="parameter.title"
        clearable/>
      <el-button
        type="warning"
        size="small"
        icon="el-icon-plus"
        circle
        @click="event().onAddParametersTitle(index)"/>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        circle
        @click="event().onDelParametersTitle(index)"/>
    </div>
    <div class="el-form-item">
      <el-button
        type="primary"
        @click="event().onSureClick()">确定</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border >
        <el-table-column
          v-for="(item,index) in Arr"
          :key="index"
          :prop="'parametersTitle'+(index+1)"
          :label="item.specificationsTitle"/>
        <el-table-column
          label="售价">
          <template slot-scope="scope">
            <el-input-number
              controls-position="right"
              :precision="2"
              :min="0.01"
              v-model="scope.row.selling_price"
              class="input-table"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存">
          <template slot-scope="scope">
            <el-input-number
              :min="1"
              controls-position="right"
              v-model="scope.row.stock"
              class="input-table"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'DkSpecifications',
  data() {
    return {
      num: 0,
      specificationsTitle: '',
      // 编辑型号规格数据结构
      Arr: [
        {
          specificationsTitle: '型号',
          parameters: [
            {
              title: 'awm',
            },
            {
              title: '98k',
            },
            {
              title: 'm24',
            },
          ],
        },
        {
          specificationsTitle: '包装',
          parameters: [
            {
              title: '精美',
            },
            {
              title: '普通',
            },
            {
              title: 'soso',
            },
          ],
        },
        {
          specificationsTitle: '规格',
          parameters: [
            {
              title: '大',
            },
            {
              title: '小',
            },
          ],
        },
      ],
      // 表格数据结构
      tableData: [
      //   {
      //     parametersTitle2: '大',
      //     specificationsTitle2: '规格二',
      //     parametersTitle1: '黑',
      //     specificationsTitle1: '规格一',
      //     selling_price: '',
      //     stock: '',
      //   },
      //   {
      //     parametersTitle2: '小',
      //     specificationsTitle2: '规格二',
      //     parametersTitle1: '黑',
      //     specificationsTitle1: '规格一',
      //     selling_price: '',
      //     stock: '',
      //   },
      //   {
      //     parametersTitle2: '大',
      //     specificationsTitle2: '规格二',
      //     parametersTitle1: '白',
      //     specificationsTitle1: '规格一',
      //     selling_price: '',
      //     stock: '',
      //   },
      //   {
      //     parametersTitle2: '小',
      //     specificationsTitle2: '规格二',
      //     parametersTitle1: '白',
      //     specificationsTitle1: '规格一',
      //     selling_price: '',
      //     stock: '',
      //   },
      ],
    }
  },
  created() {
    this.tableData = this.handler().updateTable(this.Arr, 0)
  },
  methods: {
    // 合并侧边栏
    objectSpanMethod({
      rowIndex, columnIndex,
    }) {
      let merge = this.tableData.length
      for (let index = 0; index < this.Arr.length; index += 1) {
        if (columnIndex === index) {
          if (rowIndex % (merge / this.Arr[index].parameters.length) === 0) {
            return { // 临界
              rowspan: (merge / this.Arr[index].parameters.length),
              colspan: 1,
            }
          }
          return { // 非临界
            rowspan: 0,
            colspan: 0,
          }
        }
        merge /= this.Arr[index].parameters.length
      }
      return { // 不处理
        rowspan: 1,
        colspan: 1,
      }
    },
    event() {
      return {
        // 加规格
        onAddSpecificationsTitle: () => {
          this.Arr.push({
            // 规格名
            specificationsTitle: this.specificationsTitle,
            // 参数s
            parameters: [
              {
                title: '',
              },
            ],
          })
        },
        // 减规格
        onDelParametersTitle: (index) => {
          this.Arr.splice(index, 1)
        },
        // 加参数
        onAddParametersTitle: (index) => {
          this.Arr[index].parameters.push({
            title: '',
          })
        },
        // 确定
        onSureClick: () => {
          this.tableData = this.handler().updateTable(this.Arr, 0)
        },
      }
    },
    handler() {
      return {
        // 生成表格---闭包
        updateTable: (Arr) => {
          const ArrLength = Arr.length - 1
          let item = {}
          const tableData = []
          function doCombinationCal(arr, arrIndex) {
            arr[arrIndex].parameters.forEach((val) => {
              item[`parametersTitle${arrIndex + 1}`] = val.title
              item[`specificationsTitle1${arrIndex + 1}`] = arr[arrIndex].specificationsTitle
              if (arrIndex < ArrLength) {
                doCombinationCal(arr, arrIndex + 1)
              } else {
                tableData.push(item);
              }
              item = JSON.parse(JSON.stringify(item))
            })
            return tableData
          }
          return doCombinationCal(Arr, 0);
        },
      }
    },
  },
}
</script>

<style scoped>

</style>
