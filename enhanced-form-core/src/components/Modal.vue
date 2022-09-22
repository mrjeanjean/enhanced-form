<template>
  <div class="modal__wrapper" v-show="visible">
    <div class="modal modal--prompt">
      <div class="modal__header" v-if="hasHeaderSlot">
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <InputField
            :value="value"
            @onChange="v => this.value = v"
            ref="input"
            :placeholder="placeholder"
        />
      </div>
      <div class="modal__footer">
        <button class="button button--outline" @click.prevent="onCancel">Cancel</button>
        <button class="button" @click.prevent="onSelect">Valid</button>
      </div>
    </div>
    <div class="modal__overlay"></div>
  </div>
</template>

<script>
import InputField from "./Fields/InputField.vue";

export default {
  name: "Modal",
  components: {
    InputField
  },
  props: {
    placeholder: String
  },
  data: function () {
    return {
      value: '',
      visible: false,
      resolvePromise: null,
      rejectPromise: null
    }
  },
  computed: {
    hasHeaderSlot: function () {
      return !!this.$slots.header;
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyInput);
  },
  beforeUnmount(){
    window.removeEventListener('keyup', this.handleKeyInput);
  },
  methods: {
    onCancel: function () {
      this.resolvePromise(null);
      this.value = '';
      this.visible = false;
    },
    onSelect: function () {
      this.resolvePromise(this.value);
      this.value = '';
      this.visible = false;
    },
    showModal(value = null) {
      this.value = value ? value : '';
      this.visible = true;

      this.$nextTick(() => {
        this.$refs.input.focus();
      })

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    handleKeyInput(e) {
      if(!this.visible || this.resolvePromise === null){
        return;
      }

      if(e.key === 'Escape'){
        this.onCancel();
      }

      if(e.key === 'Enter'){
        this.onSelect();
      }
    }
  }
}
</script>

<style lang="css" scoped>
.modal__wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: #a2a2a2;
  opacity: 0.8;
}

.modal {
  background-color: #fff;
  min-width: 25rem;
}

.modal__header {
  padding: 1.5rem 2rem;
  background-color: var(--theme-color);
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
}

.modal__body {
  padding: 2rem;
}

.modal__body + .modal__footer {
  margin-top: -2rem;
}

.modal__footer {
  /*border-top: 1px #cacaca solid;*/
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 1rem 2rem;
  border: 2px solid var(--theme-color);
  text-transform: uppercase;
  background-color: var(--theme-color);
  border-radius: 0;
  color: #ffffff;
  font-weight: 600;
}

.button--outline {
  background-color: transparent;
  color: var(--theme-color);
}
</style>
