<template>
  <div class="operate-pannel">
    <el-button size="small" type="primary" round @click="generateReport">
      生成报告
    </el-button>
    <el-button
      v-if="
        userState.userInfo.role === 'expert' ||
        userState.userInfo.role === 'superAdmin'
      "
      size="small"
      type="primary"
      round
      @click="showUpdateTable = true"
    >
      修改数据
    </el-button>
    <!-- 专家修改弹出窗口 -->
    <el-drawer
      v-model="showUpdateTable"
      title="修改此次查询数据"
      direction="ltr"
      size="50%"
    >
      <el-table :data="updateData" style="width: 100%">
        <el-table-column label="属性" min-width="70">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="参考值" min-width="70">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.suggestValue }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox, ElLoading } from 'element-plus'
import message from '@/hooks/useMessage'
import { queryFun1, updateExpertSuggest, getExcelURL } from '@/api'
import { currJingwei, info, updateData } from './state/fun1-state'
import { assignResult } from './utils'
import { userState } from '@/hooks/useUserState'
import { QueryRecord } from './state/querHistory'

export default {
  props: ['crop'],
  setup(props) {
    const showUpdateTable = ref(false)

    const excelURL = ref('')

    // 发送修改请求
    function updateSuggest(elementName, suggestValue) {
      let data = {
        // 本次查询的经纬度
        jing: currJingwei.jing + '',
        wei: currJingwei.wei + '',
        elementName,
        suggestValue: suggestValue + '',
        cropName: props.crop,
      }
      return updateExpertSuggest(data)
    }
    // 修改数据函数
    function handleEdit(index, row) {
      // 当前查询经纬度为空
      if (currJingwei.jing === '') {
        message('warning', '还没有查询哦~')
        return
      }

      let loading = null

      // 检查格式，然后发送请求
      ElMessageBox.prompt('请输入将要修改的值', '修改查询值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 匹配小数正则
        inputPattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
        inputErrorMessage: '格式错误',
      })
        .then(({ value }) => {
          // 小于0，不允许
          if (value < 0) {
            message('error', '不允许输入负值')
            return
          }

          // 加载loading
          loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })

          // 发送修改请求
          return updateSuggest(row.elementName, value)
        })
        .then(
          (data) => {
            if (data.code !== 200) {
              return Promise.reject(data)
            }

            // 重新获取数据
            return queryFun1(
              currJingwei.jing,
              currJingwei.wei,
              props.crop,
              // 这次查询不需要成功提示
              false,
              // 也不需要遮罩
              false
            )
          },
          (reason) => {
            message('error', '数据更新失败')
            console.warn('数据更新失败', reason)
          }
        )
        .then(
          (data) => {
            if (data.code !== 200) {
              return Promise.reject(data)
            }
            // 拆包赋值，更新数据
            let res = data.data
            assignResult(info, res)
          },
          (reason) => {
            message('error', '重新拉取数据失败')
            console.warn('重新拉取数据失败', reason)
          }
        )
        .finally(() => {
          loading.close()
        })
    }

    // 生成报告
    async function generateReport() {
      const requestData = QueryRecord.generateRequestData(
        QueryRecord.queryHistory[0]
      )
      const {code, data, msg} = await getExcelURL(requestData)
      console.log(data)
      if (code !== 200) {
        message('error', '生成报告失败')
        console.log(msg)
        return
      }

      excelURL.value = data.url
      window.location.href = excelURL.value
    }

    return {
      showUpdateTable,
      excelURL,
      userState,
      updateData,
      handleEdit,
      generateReport,
    }
  },
}
</script>

<style scoped>
.operate-pannel {
  display: flex;
  flex-direction: row-reverse;
  margin: 10px;
  gap: 10px;
}
</style>
