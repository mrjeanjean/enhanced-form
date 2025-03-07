<template>
  <div
      class="block"
      :class="[block.type, {expanded: block.expanded}]"
  >
    <div class="block-header">
      <div
          class="block-header__title"
          @click="_ => {updateBlockSetting('expanded', !block.expanded); showSettings = false}"
      ><i class="fa-angle-right fa-solid block-header__expanded-icon"></i> {{ getBlockLabel(block.type) }}
      </div>
      <ul class="block-actions">
        <li v-if="!isFirst && options.blockActions.includes('move')">
          <button type="button" class="button" @click="move({id, direction: 'up'})">
            <Icon icon="arrow-up"/>
          </button>
        </li>
        <li v-if="!isLast && options.blockActions.includes('move')">
          <button type="button" class="button" @click="move({id, direction: 'down'})">
            <Icon icon="arrow-down"/>
          </button>
        </li>
        <li class="item-push-down">
          <button
              type="button"
              class="button"
              :class="{'active': showSettings}"
              @click="toggleSettings"
          >
            <Icon icon="cog"/>
          </button>
        </li>
        <li v-if="options.blockActions.includes('delete')">
          <button type="button" class="button" @click="remove(id)">
            <Icon icon="trash"/>
          </button>
        </li>
      </ul>
    </div>
    <div class="block-body" v-show="block.expanded">
      <div class="block-settings" v-show="showSettings">
        <div class="block-settings__global">
          <input-field :value="block.attrId" placeholder="Id" @onChange="value => updateBlockSetting('attrId', value)"/>
        </div>
        <settings :block="block" :blockData="blockComponent"/>
      </div>
      <component
          :is="block.type"
          :label="block.label"
          :content="block.content"
          @onChange="onInputChange"
          :id="block.id"
          v-bind="blockComponent.props"
      />
    </div>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
import {mapActions, mapGetters} from "vuex";
import InputField from "../Fields/InputField.vue";
import Settings from "../Settings.vue";

export default {
  name: "Block",
  components: {
    Settings,
    InputField,
    Icon
  },
  inject: ['blocksManager', 'options'],
  props: {
    block: Object,
    isFirst: Boolean,
    isLast: Boolean,
    onInputChange: Function
  },
  data: function () {
    return {
      id: this.block.id,
      blockComponent: this.blocksManager.getBlock(this.block.type),
      showSettings: false
    }
  },
  computed: {
    ...mapGetters(['currentBlock'])
  },
  methods: {
    ...mapActions(['remove', 'move', 'edit']),
    updateBlockSetting: function (key, value) {
      this.edit({
            id: this.block.id,
            content: this.block.content,
            settings: {
              [key]: value
            }
          }
      )
    },
    toggleSettings: function () {
      if (!this.block.expanded) {
        this.updateBlockSetting('expanded', true);
      }

      this.showSettings = !this.showSettings;
    },
    getBlockLabel: function(blockType){
      const block = this.blocksManager.getBlock(blockType);
      return block ? block.menuLabel : blockType;
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  background-color: var(--editor-block-bg-color);
  padding: var(--editor-block-padding);
  border-radius: var(--editor-block-border-radius);
  box-shadow: var(--editor-block-shadow);
}

.block-header__expanded-icon {
  transition: transform 200ms;
}

.block.expanded {
  .block-header__expanded-icon {
    transform: rotate(90deg);
  }
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.block-body {
  margin-top: 1rem;
}

.block-header__title {
  color: var(--theme-color-secondary);
  font-weight: 600;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1 0;
}

.block-actions {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--theme-color-gray-200);
  display: flex;
  border-radius: var(--block-border-radius);
  border: var(--theme-border-width) solid var(--theme-border-color);
}

.block-actions .button {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-square-width);
  height: var(--button-square-width);
  background-color: #ffffff;
  color: var(--theme-color-button);
}

.block-actions .button.active {
  color: var(--editor-theme-color);
}

.block-actions li + li .button {
  border-left: var(--theme-border-width) solid var(--theme-border-color);
}

.block-actions li:first-child .button {
  border-top-left-radius: var(--block-border-radius);
  border-bottom-left-radius: var(--block-border-radius);
}

.block-actions li:last-child .button {
  border-top-right-radius: var(--block-border-radius);
  border-bottom-right-radius: var(--block-border-radius);
}

.block-settings {
  border-top: var(--editor-input-border-width) solid var(--editor-input-border-color);
  border-bottom: var(--editor-input-border-width) solid var(--editor-input-border-color);
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  margin-inline: calc(var(--editor-block-padding) * -1);
  padding-inline: var(--editor-block-padding);
  display: flex;
  gap: 1rem;
}

.block-settings__global {
  flex: 1 0;
}

</style>
