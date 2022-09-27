<template>
  <div>
    <div v-if="editor" class="editor-menu editor-menu--full">
      <button @click.prevent="setLink" :class="{ 'is-active': editor.isActive('link') }">
        <icon icon="link"/>
      </button>
      <button @click.prevent="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
        <icon icon="link-slash"/>
      </button>
      <button @click.prevent="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }">
        <icon icon="bold"/>
      </button>
      <button @click.prevent="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }">
        <icon icon="italic"/>
      </button>
      <button @click.prevent="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }">
        <icon icon="paragraph"/>
      </button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <span>h1</span>
      </button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <span>h2</span>
      </button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <span>h3</span>
      </button>
      <button @click.prevent="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
        <icon icon="list-ul"/>
      </button>
    </div>
    <editor-content :editor="editor" class="editor--full"/>
  </div>
  <PromptModal ref="linkModalRef" placeholder="http://....">
    <template v-slot:header>
      Type link url
    </template>
  </PromptModal>
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
        this.$emit('onChange', editor.getHTML())
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
.ProseMirror {
  border: 2px solid var(--theme-color);
  padding: 1rem 1rem;
  background-color: #fff;
}

.editor--full .ProseMirror {
  min-height: 300px;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror a {
  text-decoration: underline;
  color: var(--theme-color);
}

.ProseMirror p {
  margin: 0;
}

.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror > p + p {
  margin-top: 0.75em;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror ul p,
.ProseMirror ol p {
  margin: 0;
}

.editor-menu button {
  border: 2px solid var(--theme-color);
  border-radius: 0;
  margin-bottom: -2px;
  background-color: #fff;
  color: var(--theme-color);
}

.editor-menu button:disabled {
  color: #c8c8c8;
  cursor: default;
}

.editor-menu button.is-active {
  background-color: var(--theme-color);
  color: #ffffff;
}

.editor-menu button + button {
  margin-left: -2px;
}

.editor-menu button > span {
  text-transform: uppercase;
  font-weight: 600;
}

</style>
