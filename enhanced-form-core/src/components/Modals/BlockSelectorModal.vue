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
        <ul class="dialog-blocks__categories" v-if="categories.length > 1">
          <li
              v-for="category in categories"
              :key="category"
              :class="{'active': currentCategory === category}"
              @click="currentCategory = category"
          >{{ category }}
          </li>
        </ul>
        <div class="dialog-blocks-list">
          <div
              @click="handleBlockClick(block.name)"
              class="dialog-blocks-list__item"
              v-for="block in filteredBlocks"
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
      blocks: this.blocksManager.getBlocks().filter(block => {
        return block.hideOnMenu === false
      }),
      currentCategory: 'default'
    }
  },
  computed: {
    filteredBlocks: function () {
      return this.blocks.filter(block => block.category === this.currentCategory);
    },
    categories: function () {
      const blocks = this.blocks;
      return blocks.reduce((categories, block) => {
        if (block.hasOwnProperty('category') && !categories.includes(block.category)) {
          categories.push(block.category);
        }
        return categories;
      }, []);
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

<style lang="scss" scoped>
.dialog__wrapper{
  --editor-block-selector-columns: 4;
}

.dialog__close-button {
  background-color: transparent;
  border: none;
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
  border: var(--editor-button-border-width) solid var(--editor-button-border-color);
  box-shadow: var(--editor-button-shadow);
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
  color: var(--editor-button-text-color);
  cursor: pointer;
  position: relative;
  transition: background-color 100ms, color 200ms;
  border-radius: var(--editor-button-border-radius);
  text-align: center;
  background-color: #fff;
}

.dialog-blocks-list__item:hover {
  background-color: var(--editor-theme-color);
  color: #ffffff;
}

.dialog-blocks__icon {
  font-size: 30px;
  display: flex;
  gap: 0.5rem;
}

.dialog-blocks-list {
  display: grid;
  grid-template-columns: repeat(var(--editor-block-selector-columns), 1fr);
  gap: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-inline: calc(-1 * var(--editor-modal-padding));
  padding-inline: var(--editor-modal-padding);
}

.dialog__overlay {
  cursor: pointer;
}

.dialog-blocks__categories {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
}

.dialog-blocks__categories li {
  border: var(--editor-button-border-width) solid var(--editor-button-border-color);
  border-radius: 99px;
  padding: 0.5rem 1.5rem;
  text-align: center;
  color: var(--editor-button-text-color);
  cursor: pointer;
  font-size: 90%;

  &:first-letter {
    text-transform: uppercase;
  }
}

.dialog-blocks__categories li.active {
  background-color: var(--editor-theme-color);
  border-color: var(--editor-theme-color);
  color: #ffffff;
}
</style>
