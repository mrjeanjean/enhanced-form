<template>
  <div>
    <label for="" v-if="label" class="form-input__label">{{ label }}</label>
    <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="e=>$emit('onChange', e.target.value)"
        ref="input"
        class="form-input"
        :disabled="disabled"
        :readonly="readOnly"
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
    label: {
      required: false,
      type: String,
      default: null
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    },
    readOnly: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    console.log(this.$props)
  },
  methods: {
    focus: function () {
      this.$refs.input.focus();
    },
    selectAll: function () {
      this.$refs.input.focus();
      this.$refs.input.select();
    }
  },
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

.form-input__label {
  font-size: 90%;
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--theme-color-secondary);
  padding-left: 0.5rem;
}

.form-input:disabled {
  color: rgba(#000, 0.5);
}
</style>
