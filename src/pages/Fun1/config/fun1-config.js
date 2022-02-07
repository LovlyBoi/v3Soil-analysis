import { reactive } from 'vue'
export const options = reactive([
  // {
  //   value: "大豆",
  //   label: "大豆",
  // },
  // {
  //   value: "玉米",
  //   label: "玉米",
  // },
  // {
  //   value: "小麦",
  //   label: "小麦",
  // },
  // {
  //   value: "香瓜",
  //   label: "香瓜",
  // },
  // {
  //   value: "糯玉米",
  //   label: "糯玉米",
  // },
])

export function addOptions(crops) {
  for (const crop of crops) {
    options.push({
      value: crop,
      label: crop,
    })
  }
}
