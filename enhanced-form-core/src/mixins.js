export const InputMixin = {
    props: {
        content: null,
        id: String
    },
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

export const ImageBlockMixin = {
    inject: ['options'],
    computed:{
        imageOptions: function(){
            if(
                this.options &&
                this.options.hasOwnProperty('imagesOptions') &&
                this.options.imagesOptions.hasOwnProperty(this.$options.name)
            ){
                return {
                    ...this.options.imagesOptions[this.$options.name]
                }
            }
            return null
        }
    }
}
