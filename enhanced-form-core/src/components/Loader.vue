<template>
<div class="loader" v-show="isActive">
  <span></span>
</div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped>
.loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-color-gray-200);
}

.loader span {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px var(--theme-color-gray-300) solid;
  border-top-color: transparent;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate{
  to{ transform: rotate(360deg); }
}
</style>
