<template>
  <div class="editor">
    <div class="editor-options-menu" v-if="options.allowAddBlock">
      <button
          type="button"
          @click="showBlockSelector"
          class="button button--outline button--rounded button--with-icon"
      ><Icon icon="circle-plus"/>Add Block</button>
    </div>

    <div class="editor-body">
      <div class="blocks-list">
        <Block
            v-for="(block, index) in blocks"
            :key="block.id"
            class="block"
            :block="block"
            :isFirst="index === 0"
            :isLast="index >= blocks.length - 1"
            :onInputChange="onInputChange"
        />
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
    addBlock: function (type) {
      const block = this.blocksManager.getBlock(type);

      if(!block){
        return;
      }

      this.add({
        content: block.content,
        type: type
      })

      this.onChange(JSON.stringify(this.blocks));
    },
    onInputChange: function ({id, content, settings = []}) {
      this.edit({id, content, settings});
    },
    showBlockSelector: async function () {
      const type = await this.blockSelectorModal.show();

      if (type) {
        this.addBlock(type);
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

.block + .block {
  margin-top: 1rem;
}

</style>
