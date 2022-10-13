<template>
  <div class="editor-sidebar" :class="{'is-active' : isSidebarOpen}">
    <div class="editor-sidebar__inner">
      <button type="button" class="sidebar-close-button" @click="setSidebarVisibility(false)">
        <Icon icon="xmark"/>
      </button>
      <div v-if="currentBlock !== null">
        <div class="block-settings__title">{{ blockData.menuLabel }} settings</div>
        <div v-for="(data, fieldName) in getSettings">

          <div class="setting-form__row" :class="setting.type" v-for="(setting) in data">
            <div>{{setting.label}}</div>
            <component
                :is="setting.component.type"
                v-bind="currentBlock.content[fieldName][setting.component.name]"
                :value="currentBlock.content[fieldName][setting.component.name]"
                :image="currentBlock.content[fieldName][setting.component.name]"
                @onChange="value=>onChange(fieldName, setting.component.name, value)"
            />
          </div>
        </div>

      </div>

      <div class="block-settings__title" v-if="!currentBlock">Page settings</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TextBlockSettings from "./Blocks/TextBlockSettings.vue";
import ImageBlockSettings from "./Blocks/ImageBlockSettings.vue";
import TextImageBlockSettings from "./Blocks/TextImageBlockSettings.vue";
import MultiImagesBlockSettings from "./Blocks/MultiImagesBlockSettings.vue";
import Icon from "./Icon.vue";
import Settings from "./Settings.vue";

export default {
  name: "SidebarBlockSettings",
  components: {
    ImageBlockSettings,
    TextBlockSettings,
    TextImageBlockSettings,
    MultiImagesBlockSettings,
    Icon,
    Settings
  },
  inject: ['blocksManager'],
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters(['currentBlock', 'isSidebarOpen']),
    getSettings: function () {
      const block = this.blocksManager.getBlock(this.currentBlock.type);
      return block.settings
    },
    blockData: function () {
      console.log(this.blocksManager.getBlock(this.currentBlock.type))
      return this.blocksManager.getBlock(this.currentBlock.type);
    }
  },
  methods: {
    ...mapActions(['edit', 'setSidebarVisibility']),
    onChange: function (field, key, value) {
      this.edit({
        id: this.currentBlock.id,
        content: {
          ...this.currentBlock.content,
          [field]: {
            ...this.currentBlock.content[field],
            [key]: value
          }
        }
      })
    }
  },
}
</script>

<style scoped>
.editor-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.sidebar-close-button {
  position: absolute;
  padding: 0;
  top: 0;
  right: 0;
  z-index: 1;
  border: none;
  background-color: transparent;
  color: var(--theme-color-secondary);
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.editor-sidebar__inner {
  background-color: #fff;
  padding: 2rem;
  box-shadow: #00000011 -0.5rem 0 15px;
  height: 100%;
  width: var(--sidebar-width);
  display: none;
}

.editor-sidebar.is-active .editor-sidebar__inner {
  display: block;
}

::v-deep .block-settings__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 2rem;
  position: relative;
  height: 70px;
  align-items: center;
  display: flex;
  margin-top: -2rem;
}

.block-settings__title:after {
  content: "";
  position: absolute;
  top: 100%;
  left: -2rem;
  right: -2rem;
  height: 2px;
  background-color: var(--theme-color-gray-200);
}

.setting-form__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.setting-form__row + .setting-form__row{
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: var(--theme-color-gray-200) 1px solid;
}

.setting-form__row.ImageField,
.setting-form__row.InputField{
  display: block;
}

.setting-form__row.ImageField::v-deep .image-field{
  min-height: auto;
  aspect-ratio: 1;
}
</style>
