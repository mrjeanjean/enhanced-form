<template>
  <div class="dialog__wrapper" v-show="visible">
    <div class="dialog dialog--prompt">
      <div class="dialog__header">
        <div class="dialog__title">Type image description</div>
      </div>
      <div class="dialog__body">
        <div class="dialog-body__form">
          <InputField
              :value="value.alt"
              @onChange="value => {this.value = {...this.value, alt: value}}"
              ref="input"
              placeholder="Type image description (alt)"
          />
          <InputField
              :value="value.legend"
              @onChange="value => {this.value = {...this.value, legend: value}}"
              ref="input"
              placeholder="Type image legend"
          />
        </div>
      </div>
      <div class="dialog__footer">
        <button class="button button--rounded button--outline" @click.prevent="onCancel">Cancel</button>
        <button class="button button--rounded" @click.prevent="onSelect">Valid</button>
      </div>
    </div>
    <div class="dialog__overlay"></div>
  </div>
</template>

<script>

import InputField from "../Fields/InputField.vue";
import CheckboxField from "../Fields/CheckboxField.vue";
import {ModalMixin} from "./modalMixin.js";

export default {
  name: "ImagePromptModal",
  components: {
    InputField,
    CheckboxField
  },
  mixins: [
    ModalMixin
  ],
  methods: {
    onModalEnter() {
      this.$refs.input.focus();
    }
  }
}
</script>

<style scoped>
.dialog-body__form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog-body__options {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.dialog-body__options::v-deep(.form-input__label) {
  opacity: 0.65;
  font-size: 96%;
}

.dialog-body__options::v-deep(.form-input--checkbox) {
  text-align: right;
}
</style>
