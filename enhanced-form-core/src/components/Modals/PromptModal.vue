<template>
  <div class="dialog__wrapper" v-show="visible">
    <div class="dialog dialog--prompt">
      <div class="dialog__header" v-if="hasHeaderSlot">
        <div class="dialog__title"><slot name="header"></slot></div>
      </div>
      <div class="dialog__body">
          <InputField
              :value="value"
              @onChange="v => this.value = v"
              ref="input"
              :placeholder="placeholder"
          />
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
import InputField from "./../Fields/InputField.vue";
import {ModalMixin} from "./modalMixin";

export default {
  name: "PromptModal",
  components: {
    InputField
  },
  mixins: [
      ModalMixin
  ],
  props: {
    placeholder: String
  },
  methods:{
    onModalEnter() {
      this.$refs.input.focus();
    }
  }
}
</script>
