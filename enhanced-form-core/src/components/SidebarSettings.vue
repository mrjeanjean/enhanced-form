<template>
  <div class="editor-sidebar" :class="{'is-active' : isSidebarOpen}">
    <div class="editor-sidebar__inner">
      <button type="button" class="sidebar-close-button" @click="setSidebarVisibility(false)"><Icon icon="xmark"/></button>
      <component
          :block="currentBlock"
          :is="currentBlock.type + 'Settings'"
          v-if="currentBlock !== null"
          @onChange="onInputChange"
      />
      <div v-else><div class="block-settings__title">Page settings</div></div>
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

export default {
  name: "SidebarBlockSettings",
  components: {
    ImageBlockSettings,
    TextBlockSettings,
    TextImageBlockSettings,
    MultiImagesBlockSettings,
    Icon
  },
  data: function(){
    return{
      isOpen: false
    }
  },
  computed: {
    ...mapGetters(['currentBlock', 'isSidebarOpen'])
  },
  methods: {
    ...mapActions(['edit', 'setSidebarVisibility']),
    onInputChange: function ({id, content}) {
      this.edit({id, content});
    },
  }
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

.sidebar-close-button{
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

.editor-sidebar__inner{
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

::v-deep .block-settings__title{
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

::v-deep .block-settings__title:after{
  content: "";
  position: absolute;
  top: 100%;
  left: -2rem;
  right: -2rem;
  height: 2px;
  background-color: var(--theme-color-gray-200);
}

::v-deep .setting-form__row{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
