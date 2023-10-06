<template>
  <div class="editor">
    <div class="editor-options-menu" v-if="options.allowAddBlock">
      <button
          type="button"
          @click="showBlockSelector"
          class="button button--outline button--rounded button--with-icon"
      >
        <Icon icon="circle-plus"/>
        Add Block
      </button>
    </div>

    <div class="editor-body">
      <div class="blocks-list">
        <div
            v-for="(block, index) in blocks"
            :key="block.id"
        >
          <Block
              class="block"
              :block="block"
              :isFirst="index === 0"
              :isLast="index >= blocks.length - 1"
              :onInputChange="onInputChange"
          />
          <div class="blocks-list__add-button" v-if="options.allowAddBlock">
            <button @click="showBlockSelector(index)" type="button">
              <Icon icon="circle-plus"/>
            </button>
          </div>
        </div>
      </div>
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
import BlockSelectorModal from "./Modals/BlockSelectorModal.vue";
import Block from "./Blocks/Block.vue";
import Icon from "./Icon.vue";

export default {
  name: 'Editor',
  components: {
    Block,
    BlockSelectorModal,
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
  inject: ['blocksManager', 'options'],
  computed: {
    ...mapGetters(['blocks']),
  },
  mounted() {
    this.blockSelectorModal = this.$refs.blockSelectorModalRef;
  },
  methods: {
    ...mapActions(['add', 'edit', 'setSidebarVisibility']),
    addBlock: function (type, blockIndex) {
      const block = this.blocksManager.getBlock(type);

      if (!block) {
        return;
      }

      this.add({
        block:{
          content: block.content,
          type: type,
        },
        index: blockIndex + 1
      })

      this.onChange(JSON.stringify(this.blocks));
    },
    onInputChange: function ({id, content, settings = []}) {
      this.edit({id, content, settings});
    },
    showBlockSelector: async function (blockIndex = null) {
      const type = await this.blockSelectorModal.show();

      if (type) {
        this.addBlock(type, blockIndex);
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
  margin-bottom: 1rem;
}

.editor-options-menu {
  display: flex;
  justify-content: flex-start;
  gap: 2px;
  width: max-content;
}

.editor-options-menu + .editor-body {
  margin-top: 1rem;
}

.editor-body {
  display: grid;
  grid-template-columns: 1fr  0;
}

.blocks-list > * + * {
  margin-top: 1rem;
}

.blocks-list__add-button{
  position: relative;
  margin-bottom: -1rem;
}

.blocks-list__add-button:after{
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-bottom: 1px var(--editor-button-border-color) dashed;
  z-index: -1;
}

.blocks-list__add-button{
  text-align: center;
}

.blocks-list__add-button button{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  color: var(--editor-button-text-color);
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  transition: transform 150ms, color 150ms;
}

.blocks-list__add-button button:hover{
  transform: scale(1.35);
  color: var(--editor-button-text-color);
}

</style>
