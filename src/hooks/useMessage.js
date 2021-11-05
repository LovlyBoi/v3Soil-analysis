// 封装提示语句
import { ElMessage } from 'element-plus'
function message(type, message, duration = 1500) {
  ElMessage({
    center: true,
    message,
    type,
    duration,
  });
}

export default message