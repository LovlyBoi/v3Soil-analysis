import { reactive } from 'vue'
export const options = reactive([
])

export function addOptions(crops) {
  for (const crop of crops) {
    options.push({
      value: crop,
      label: crop,
    })
  }
}
