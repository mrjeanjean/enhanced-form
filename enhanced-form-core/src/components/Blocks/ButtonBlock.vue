<template>
  <div>
    <div class="button-block__link">
      <div>
        <InputField
            :value="content.url"
            @onChange="onEditLink"
            v-bind="this.getFieldOptions('url')"
            :disabled="!isLinkEditable"
            ref="linkInputRef"
            v-click-outside="onClickOutside"
        />
        <button
            type="button"
            class="button__lock button button--outline"
            :class="{active: !isLinkEditable}"
            @click="allowLinkEdit"
            :disabled="isLinkEditable"
        >
          <Icon :icon="isLinkEditable ? 'lock-open' : 'lock'"/>
        </button>
      </div>
      <FileField :value="content.url" @onChange="onFileChange"/>
    </div>
    <div class="button-block__button button button--rounded">
      <InputField
          :value="content.label"
          @onChange="data => onInput(data, 'label')"
          v-bind="this.getFieldOptions('label')"
      />
    </div>
  </div>
</template>

<script>
import InputField from "../Fields/InputField.vue";
import {InputMixin} from "../../mixins.js";
import FileField from "../Fields/FileField.vue";
import Icon from "../Icon.vue";

export default {
  name: "ButtonBlock",
  data: function () {
    return {
      forceLinkEdit: false
    }
  },
  components: {
    Icon,
    InputField,
    FileField
  },
  emits: ["onChange"],
  mixins: [InputMixin],
  computed:{
    isLinkEditable: function(){
      return !this.content.isFile || this.forceLinkEdit
    }
  },
  methods: {
    onClickOutside: function(){
      if(this.content.isFile){
        this.forceLinkEdit = false;
      }
    },
    onFileChange: function (url) {
      this.onMultipleInput({
        url: url,
        isFile: true
      });
    },
    allowLinkEdit: function(e){
      e.stopPropagation();
      this.forceLinkEdit = true;
      this.$nextTick(()=>{
        this.$refs.linkInputRef.selectAll();
      })
    },
    onEditLink: function(url){
      this.onMultipleInput({
        url: url,
        isFile: false
      });
    }
  }
}
</script>

<style scoped lang="scss">
.button-block__link {
  display: flex;
  gap: 0.5rem;
}

.button-block__link > :first-child {
  flex: 1 0;
  display: flex;

  & > :first-child{
    flex: 1 0;
  }

  &:deep(.form-input){
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button__lock{
    border-bottom-right-radius: var(--editor-button-border-radius);
    border-top-right-radius: var(--editor-button-border-radius);
    padding-left: 0;
    padding-right: 0;
    width: 50px;
    text-align: center;

    &.active{
      cursor: pointer;
    }
  }
}

.button-block__link :deep(.form-input) {
  height: 100%;
}

.button-block__button {
  margin-top: 0.5rem;
  font-weight: 600;
  background-color: var(--editor-button-text-color);
}

.button-block__button :deep(.form-input) {
  background-color: transparent;
  border-color: transparent;
  text-align: center;
}

.button-block__button :deep(.form-input)::placeholder {
  color: #ffffff;
  opacity: 0.4;
}
</style>
