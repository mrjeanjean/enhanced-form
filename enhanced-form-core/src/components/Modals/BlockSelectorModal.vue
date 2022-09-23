<template>
  <div class="dialog__wrapper" v-show="visible">
    <div class="dialog dialog--prompt">
      <div class="dialog__header" v-if="hasHeaderSlot">
        <div class="dialog__title"><slot name="header"></slot></div>
        <button @click="onCancel()" class="dialog__close-button">×</button>
      </div>
      <div class="dialog__body">
        <div class="blocks-list">
          <div @click="handleBlockClick('TextImageBlock')" class="blocks-list__item">Text/Image</div>
          <div @click="handleBlockClick('TextBlock')" class="blocks-list__item">Text</div>
          <div @click="handleBlockClick('ImageBlock')" class="blocks-list__item">Image</div>
        </div>
      </div>
    </div>
    <div class="dialog__overlay" @click="onCancel()"></div>
  </div>
</template>


<script>
import {ModalMixin} from "./modalMixin";

export default {
  name: "BlockSelectorModal",
  mixins: [
      ModalMixin
  ],
  props: {
    placeholder: String
  },
  methods: {
    handleBlockClick: function(type){
      this.value = type;
      this.onSelect();
    }
  }
}
</script>

<style lang="css" scoped>

.dialog__close-button{
  background-color: transparent;
  border: none;
  border-left: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 80px;
  font-size: 30px;
  font-weight: 400;
  cursor: pointer;
}

.blocks-list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.blocks-list__item{
  border: 2px solid var(--theme-color);
  height: 10rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
  cursor: pointer;
}

.dialog__overlay{
  cursor: pointer;
}
</style>
