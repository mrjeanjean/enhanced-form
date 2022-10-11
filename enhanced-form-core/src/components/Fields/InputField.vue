<template>
    <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="e=>$emit('onChange', e.target.value)"
        ref="input"
        class="form-input"
        :disabled="disabled"
    >
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: String,
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus: function () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
.form-input {
  all: unset;
  display: block;
  border: 2px solid var(--theme-color);
  padding: 1rem;
  font-size: inherit;
  box-sizing: inherit;
  width: 100%;
  background-color: #ffffff;
}
</style>
