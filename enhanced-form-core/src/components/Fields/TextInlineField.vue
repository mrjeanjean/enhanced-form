<template>
  <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100, arrow: true, zIndex: 999}"
      v-if="editor"
      class="editor-menu editor-menu--bubble"
  >
    <button @click.prevent="setLink" :class="{ 'is-active': editor.isActive('link') }">
      <icon icon="link"/>
    </button>
    <button @click.prevent="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
      <icon icon="link-slash"/>
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <icon icon="bold"/>
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <icon icon="italic"/>
    </button>
  </bubble-menu>
  <editor-content :editor="editor" class="editor--inline"/>
  <PromptModal ref="linkModalRef" placeholder="http://....">
    <template v-slot:header>
      Type link url
    </template>
  </PromptModal>
</template>

<script>
import {Editor, EditorContent, BubbleMenu} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Icon from "../Icon.vue";
import PromptModal from "../Modals/PromptModal.vue";
import {Link} from "@tiptap/extension-link";

export default {
  name: 'TextInlineField',
  components: {
    EditorContent,
    Icon,
    PromptModal,
    BubbleMenu
  },
  props: {
    id: String,
    value: String
  },
  emits: ["onChange"],
  data() {
    return {
      editor: null,
      linkModal: null
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        })
      ],
      onUpdate: ({editor}) => {
        this.$emit('onChange', {
          value: editor.getHTML(),
          id: this.id
        })
      },
    });

    this.linkModal = this.$refs.linkModalRef;
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    async setLink() {
      const previousUrl = this.editor.getAttributes('link').href

      const value = await this.linkModal.show(previousUrl);

      if (!value) {
        return;
      }

      this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({href: value})
          .run();
    },
  }
}
</script>

<style lang="css">

.editor-menu--bubble{
  white-space: nowrap;
}
</style>
