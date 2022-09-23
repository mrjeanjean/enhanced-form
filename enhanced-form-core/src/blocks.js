const defaultBlockValue = {
    TextImageBlock: () => {
        return {
            text: '',
            image: {
                url: '',
                title: ''
            }
        }
    },
    ImageBlock: () => {
        return {
            image: {
                url: '',
                title: ''
            }
        }
    },
    TextBlock: () => {
        return {
            text: '',
            image: {
                url: '',
                title: ''
            }
        }
    }
}

export const getDefaultBlockValue = (type)=> {
    if(!defaultBlockValue.hasOwnProperty(type)){
        throw new Error(`Type '${type}' don't have default value (file block.js)`)
    }

    return defaultBlockValue[type]();
}
