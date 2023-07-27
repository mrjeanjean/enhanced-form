<template>
  <editor-content :editor="editor" class="editor--full"/>
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Icon from "../Icon.vue";
import PromptModal from "../Modals/PromptModal.vue";
import {Link} from "@tiptap/extension-link";

export default {
  name: 'TextEditorField',
  components: {
    EditorContent,
    Icon,
    PromptModal
  },
  props: {
    value: String,
    label: String,
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
        this.$emit('onChange', editor.getHTML())
      },
    });

    this.linkModal = this.$refs.linkModalRef;
  },

  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">


</style>
