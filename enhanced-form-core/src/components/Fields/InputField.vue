<template>
  <div>
    <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="e=>$emit('onChange', e.target.value)"
        ref="input"
        class="form-input"
        :disabled="disabled"
    >
  </div>
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
      this.$refs.input.focus();
    },
    selectAll: function(){
      this.$refs.input.focus();
      this.$refs.input.select();
    }
  }
}
</script>

<style scoped lang="scss">
.form-input {
  all: unset;
  display: block;
  border: var(--editor-input-border-width) solid var(--editor-input-border-color);
  border-radius: var(--editor-input-border-radius);
  padding: 0.75rem 1rem;
  font-size: inherit;
  box-sizing: inherit;
  width: 100%;
  background-color: #ffffff;
}

.form-input:disabled {
  color: rgba(#000, 0.5);
}
</style>
