<template>
  <div class="input-select-field">
    <label :for="`input-select__${id}`" v-if="label">{{ label }}</label>
    <div class="input-select-field__select">
      <select
          :id="`input-select__${id}`"
          @change="handleOnSelect"
          :class="{'empty-value': value === null, 'has-placeholder':  placeholder !== null}"
      >
        <option v-if="placeholder" value>{{ placeholder }}</option>
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
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    choices: {
      type: Object
    },
    placeholder: {
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
      const value = e.target.value;
      this.$emit('onChange', value === '' ? null : value);
    }
  }
}
</script>

<style scoped lang="scss">

.input-select-field label {
  padding: 0.5rem;
  color: var(--theme-color-secondary);
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

.input-select-field select.empty-value {
  color: rgba(#000, 0.5);

  option {
    color: var(--text-color);
  }
}

.input-select-field select.has-placeholder option:first-child{
  color: rgba(#000, 0.5);
}
</style>

