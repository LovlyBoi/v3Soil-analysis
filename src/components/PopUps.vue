<template>
  <div class="pop-ups-wrapper" v-if="popUpsIsShow">
    <div class="close-button" @click="closePopUps" :class="left ? 'close-button-left' : ''"></div>
    <slot></slot>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "PopUps",
  props: {
    showPopUps: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closePopups"],
  setup(props, context) {
    let popUpsIsShow = computed({
      get() {
        return props.showPopUps;
      },
      set() {
        // 这里的set不需要拿到新值，因为重设这个值一定是关闭窗口
        context.emit("closePopups");
      },
    });
    function closePopUps() {
      popUpsIsShow.value = false;
      context.emit("closePopups");
    }

    return {
      popUpsIsShow,
      closePopUps,
    };
  },
};
</script>

<style scoped>
.pop-ups-wrapper {
  position: absolute;
  width: 400px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 0 8px #ccc;
  left: 50%;
  top: 50%;
  transform: translateX(-200px) translateY(-150px);
  overflow: hidden;
  padding-top: 20px;
}

.pop-ups-wrapper::before {
  filter: blur(4px);
  background-color: #dddddd99;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.close-button {
  width: 16px;
  height: 16px;
  background-color: #de1c31;
  border-radius: 8px;
  margin: 3px;
  cursor: pointer;
  filter: none;
  position: absolute;
  top: 0;
  right: 0;
}

.close-button-left {
  left: 0 !important;
} 
</style>