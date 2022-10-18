<template>
  <div class="dialog__wrapper" v-show="visible">
    <div class="dialog dialog--prompt">
      <div class="dialog__header" v-if="hasHeaderSlot">
        <div class="dialog__title">
          <slot name="header"></slot>
        </div>
        <button @click="onCancel()" class="dialog__close-button" type="button">×</button>
      </div>
      <div class="dialog__body">
        <div class="dialog-blocks-list">
          <div
              @click="handleBlockClick(block.name)"
              class="dialog-blocks-list__item"
              v-for="block in blocks"
          >
            <div class="dialog-blocks__icon">
              <Icon :icon="icon.id" :type="icon.type" v-for="icon in getIcons(block)"/>
            </div>
            <div class="dialog-blocks__label">{{ block.menuLabel }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog__overlay" @click="onCancel()"></div>
  </div>
</template>


<script>
import {ModalMixin} from "./modalMixin";
import Icon from "../Icon.vue";

export default {
  name: "BlockSelectorModal",
  components: {
    Icon
  },
  mixins: [
    ModalMixin
  ],
  inject: [
    'blocksManager'
  ],
  props: {
    placeholder: String
  },
  data: function () {
    return {
      blocks: this.blocksManager.getBlocks()
    }
  },
  methods: {
    handleBlockClick: function (type) {
      this.value = type;
      this.onSelect();
    },
    getIcons: function (block) {
      let icons = Array.isArray(block.icon) ? block.icon : [block.icon];
      return icons.map(icon => {
        return typeof icon !== 'object' ? {type: 'solid', id: icon} : icon;
      })
    }
  }
}
</script>

<style lang="css" scoped>

.dialog__close-button {
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

.dialog-blocks-list__item {
  border: 2px solid var(--theme-color);
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
  cursor: pointer;
  position: relative;
  transition: background-color 100ms, color 200ms;
}

.dialog-blocks-list__item:hover{
  background-color: var(--theme-color);
  color: #ffffff;
}

.dialog-blocks__icon {
  font-size: 30px;
  display: flex;
  gap: 0.5rem;
}

.dialog-blocks-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.dialog__overlay {
  cursor: pointer;
}
</style>
