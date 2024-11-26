<template>
  <div class="form-input--checkbox">
    <label>
      <span class="form-input__label">{{ label }}</span>
      <input
          type="checkbox"
          :checked="checked"
          @change="handleCheckedChanged"
          ref="input"
          :disabled="disabled"
      >
    </label>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    checked: {
      required: false,
      type: Boolean,
      default: false
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    },
    label: {
      required: false,
      type: String,
      default: ''
    }
  },
  methods: {
    handleCheckedChanged: function (e){
      this.$emit('onChange', e.target.checked);
    }
  }
}
</script>

<style scoped lang="scss">
.form-input--checkbox label{
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.form-input--checkbox > input{
  width: 20px;
  height: 20px;
  border: var(--editor-input-border-width) solid var(--editor-input-border-color);
  border-radius: var(--editor-input-border-radius);
  background-color: #ffffff;
}

</style>
