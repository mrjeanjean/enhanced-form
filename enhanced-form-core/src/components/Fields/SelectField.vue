<template>
  <div class="input-select-field">
    <label :for="`input-select__${id}`">{{label}}</label>
    <div class="input-select-field__select">
      <select
          :id="`input-select__${id}`"
          @change="handleOnSelect"
      >
        <option
            :value="choice.key"
            v-for="choice in choices"
            :selected="value === choice.key"
        >{{ choice.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import {uniqueId} from "../../utils";

export default {
  name: "SelectField",
  props: {
    value: {
      type: String,
      required: true,
    },
    choices: {
      type: Object
    },
    label: {
      type: String,
      default: 'Choose...'
    }
  },
  emits: ['onChange'],
  data: function () {
    return {
      id: uniqueId()
    }
  },
  methods: {
    handleOnSelect: function (e) {
      console.log(e.target.value);
      this.$emit('onChange', e.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
.input-select-field {
  display: flex;
  gap: 0.5rem;
}

.input-select-field label {
  border: var(--editor-input-border-width) solid var(--editor-input-border-color);
  border-radius: var(--editor-input-border-radius);
  padding: 0.75rem 1rem;
}

.input-select-field__select {
  position: relative;
  flex: 1 0;

  &:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 6px;
    border-color: var(--theme-color-button) transparent transparent transparent;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}


.input-select-field select {
  all: unset;
  display: block;
  border: var(--editor-input-border-width) solid var(--editor-input-border-color);
  border-radius: var(--editor-input-border-radius);
  padding: 0.75rem 1rem;
  font-size: inherit;
  box-sizing: inherit;
  width: 100%;
  background-color: #ffffff;
  cursor: pointer;
}
</style>

