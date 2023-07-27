<template>
  <div class="input-switch-field">
    <input
        type="checkbox"
        @change="_ => $emit('onChange', !value)"
        :checked="value"
        :id="`input-reverse__${id}`"
    >
    <label :for="`input-reverse__${id}`" class="input-switch__render">
      <span></span>
    </label>
  </div>
</template>

<script>
import {uniqueId} from "../../utils";

export default {
  name: "SwitchField",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['onChange'],
  data: function () {
    return {
      id: uniqueId()
    }
  }
}
</script>

<style scoped>
.input-switch-field input {
  display: none;
}

.input-switch__render {
  border-radius: 2rem;
  position: relative;
  width: calc(2 * var(--switch-height));
  height: var(--switch-height);
  padding: 2px;
  display: flex;
  background-color: var(--theme-color-gray-300);
  cursor: pointer;
}

.input-switch__render span {
  border-radius: 50%;
  background-color: #fff;
  height: calc(var(--switch-height) - 4px);
  width: calc(var(--switch-height) - 4px);
  transition: transform 200ms;
}

input[type="checkbox"]:checked + .input-switch__render {
  background-color: var(--theme-color);
}

input[type="checkbox"]:checked + .input-switch__render span {
  transform: translateX(calc(100% + 4px));
}
</style>
