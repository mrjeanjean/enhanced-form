<template>
  <div class="dialog__wrapper" v-show="visible">
    <div class="dialog dialog--prompt">
      <div class="dialog__header">
        <div class="dialog__title">Type link url</div>
      </div>
      <div class="dialog__body">
        <div class="dialog-body__form">
          <InputField
              :value="value.url"
              @onChange="value => {this.value = {...this.value, url: value}}"
              ref="input"
              placeholder="http://...."
          />
          <CheckboxField
              :checked="value.target === '_blank'"
              label="Open link in new tab"
              @onChange="value => {this.value = {...this.value, target: value === true ? '_blank' : null}}"
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
import InputField from "./../../Fields/InputField.vue";
import CheckboxField from "./../../Fields/CheckboxField.vue";
import {ModalMixin} from "./../../Modals/modalMixin";

export default {
  name: "PromptModal",
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
.dialog-body__form{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
