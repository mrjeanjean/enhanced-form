<template>
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
    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
      <span>h4</span>
    </button>
    <button @click.prevent="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
      <icon icon="list-ul"/>
    </button>
  </div>
  <editor-content :editor="editor" class="editor--full"/>
  <LinkPromptModal ref="linkModalRef"/>
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Icon from "../Icon.vue";
import {Link} from "@tiptap/extension-link";
import LinkPromptModal from "./TextEditorConfig/LinkPromptModal.vue";

const CustomLink = Link.extend({
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(element) {
          return element.getAttribute('href')
        },
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      rel: {
        default: this.options.HTMLAttributes.rel,
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
    }
  },
})

export default {
  name: 'TextEditorField',
  components: {
    EditorContent,
    Icon,
    LinkPromptModal
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
        CustomLink.configure({
          openOnClick: false,
          HTMLAttributes: {
            target: null,
            rel: null
          }
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
      const previousUrl = this.editor.getAttributes('link').href;
      const value = await this.linkModal.show({
        url: previousUrl,
        target: this.editor.getAttributes('link').target,
        rel: this.editor.getAttributes('link').rel
      });

      if (!value) {
        return;
      }

      this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({
            href: value.url,
            target: value.target,
            // not working: no 'rel' attribute shown in html
            // will work on @tiptap/extension-link package update
            // related to this commit :
            // https://github.com/ueberdosis/tiptap/commit/193b991acc0394305ab9799dbc656e6dbc6d1e11
            rel: value.rel
          })
          .run();
    },
  }
}
</script>

<style lang="scss">
.ProseMirror {
  border: var(--theme-border-width) solid var(--theme-border-color);
  padding: 1.5rem;
  background-color: #fff;
  line-height: 1.6;
  border-radius: 0 0 var(--block-border-radius) var(--block-border-radius);
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

.ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4 {
  font-weight: 600;
  strong{
    font-weight: inherit;
  }
}

.ProseMirror h1 {
  font-size: 1.75rem;
}

.ProseMirror h2 {
  font-size: 1.6rem;
}

.ProseMirror h3 {
  font-size: 1.4rem;
}

.editor-menu {
  border: var(--theme-border-width) solid var(--theme-border-color);
  border-radius: var(--block-border-radius) var(--block-border-radius) 0 0;
  background-color: #fff;
  margin-bottom: calc(var(--theme-border-width) * -1);
}

.editor-menu button {
  border: none;
  border-right: var(--theme-border-width) solid var(--theme-border-color);
  border-radius: 0;
  margin-bottom: calc(var(--theme-border-width) * -1);
  background-color: #fff;
  color: var(--theme-color-button);
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.editor-menu button:first-child {
  border-top-left-radius: var(--block-border-radius);
}

.editor-menu button:disabled {
  color: #c8c8c8;
  cursor: default;
}

.editor-menu button.is-active {
  color: var(--theme-color);
}

.editor-menu button > span {
  text-transform: uppercase;
  font-weight: 600;
}

</style>
