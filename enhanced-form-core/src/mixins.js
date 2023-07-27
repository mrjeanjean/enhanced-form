import {unWrap} from "./utils.js";

export const InputMixin = {
    props: {
        content: null,
        id: String,
        fields: Array // optionally used depending on block type
    },
    emits: ['onChange'],
    methods: {
        onInput: function (value, fieldName) {
            this.$emit('onChange', {
                id: this.id,
                content: {
                    ...this.content,
                    [fieldName]: value
                }
            })
        },
        onMultipleInput: function (data){
            this.$emit('onChange', {
                id: this.id,
                content: {
                    ...this.content,
                    ...data
                }
            })
        },
        getFieldOptions: function(fieldName){
            const field = this.fields.find(field => field.name === fieldName);
            return field ? field.options : {};
        }
    }
}
