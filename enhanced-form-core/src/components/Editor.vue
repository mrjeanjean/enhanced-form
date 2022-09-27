<template>
  <div class="editor" :class="{'sidebar-is-open': isSidebarOpen}">
    <div class="editor-options-menu">
      <button type="button" @click="showBlockSelector" class="button">Add block</button>
      <button
          class="button editor-sidebar__button"
          @click="setSidebarVisibility(!isSidebarOpen)"
          type="button"
      ><Icon icon="cog"/></button>
    </div>

    <div class="editor-body">
      <div class="blocks-list">
        <Block
            v-for="(block, index) in blocks"
            :key="block.id"
            class="block"
            :id="block.id"
            :isFirst="index === 0"
            :isLast="index >= blocks.length - 1"
        >
          <component
              :is="block.type"
              :content="block.content"
              :key="index"
              @onChange="onInputChange"
              :id="block.id"
          />
        </Block>
      </div>
      <SidebarSettings/>
    </div>
    <BlockSelectorModal ref="blockSelectorModalRef">
      <template v-slot:header>
        Select block
      </template>
    </BlockSelectorModal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TextImageBlock from "./Blocks/TextImageBlock.vue";
import TextBlock from "./Blocks/TextBlock.vue";
import {getDefaultBlockValue} from "./Blocks/blocks";
import BlockSelectorModal from "./Modals/BlockSelectorModal.vue";
import ImageBlock from "./Blocks/ImageBlock.vue";
import MultiImagesBlock from "./Blocks/MultiImagesBlock.vue";
import Block from "./Blocks/Block.vue";
import SidebarSettings from "./SidebarSettings.vue";
import Icon from "./Icon.vue";

export default {
  name: 'Editor',
  components: {
    Block,
    TextImageBlock,
    TextBlock,
    ImageBlock,
    MultiImagesBlock,
    BlockSelectorModal,
    SidebarSettings,
    Icon
  },
  data: function () {
    return {
      blockSelectorModal: null
    }
  },
  props: {
    onChange: Function
  },
  computed: {
    ...mapGetters(['blocks', 'currentBlock', 'isSidebarOpen'])
  },
  mounted() {
    this.blockSelectorModal = this.$refs.blockSelectorModalRef;
  },
  methods: {
    ...mapActions(['add', 'edit', 'setSidebarVisibility']),
    addBlock: function (type) {

      this.add({
        content: getDefaultBlockValue(type),
        type: type
      })

      this.onChange(JSON.stringify(this.blocks));
    },
    onInputChange: function ({id, content}) {
      this.edit({id, content});
    },
    showBlockSelector: async function () {
      const value = await this.blockSelectorModal.show();

      if (value) {
        this.addBlock(value);
      }
    }
  },
  watch: {
    blocks: function () {
      this.onChange(JSON.stringify(this.blocks));
    }
  }

}
</script>

<style lang="css" scoped>
.editor {
  margin-bottom: 2rem;
}

.editor-options-menu{
  display: flex;
  justify-content: flex-start;
  gap: 2px;
  width: max-content;
}

.editor-body{
  display: grid;
  grid-template-columns: 1fr  0;
}

.editor.sidebar-is-open {
  padding-right: var(--sidebar-width);
}

.blocks-list {
  margin-top: 2rem;
}

.block + .block {
  margin-top: 2rem;
}

.editor-sidebar__button{
  width: var(--button-square-width);
  height: var(--button-square-width);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0;
  background-color: var(--theme-color);
  color: #ffffff;
  z-index: 1;
}

.editor.sidebar-is-open .editor-sidebar__button{
  background-color: var(--theme-color-secondary);
}
</style>
