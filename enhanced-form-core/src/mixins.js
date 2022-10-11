export const InputMixin = {
    props: {
        content: null,
        id: String
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
        }
    }
}
