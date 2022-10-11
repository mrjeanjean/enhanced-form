export class BlocksManager{
    constructor(vueApp){
        this.vueApp = vueApp;
        this.blocks = new Map();
    }

    registerBlock(name, options){
        // Add component name as option property (make toArray easier)
        options.name = name;


        if(this.blocks.has(name)){
            throw new Error(`Block with name '${name}' already exists in block list`)
        }

        this.blocks.set(name, options);
        this.vueApp.component(name, options.component);
        this.vueApp.component(name + 'Settings', options.settingsComponent);
    }

    deregisterBlock(name){
        this.blocks.delete(name);
    }

    editBlockProps(name, props, fieldName = null){
        const block = this.blocks.get(name);

        if(!block){
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        if(block.component.name === 'CustomBlock'){
            const field = block.props.fields.find(f=>f.name === fieldName);
            if(field){
                field.options = {
                    ...field.options,
                    ...props
                }
            }
        }else{
            block.props = {
                ...block.props,
                ...props
            };
        }
    }

    editBlockContent(name, value){
        const block = this.blocks.get(name);

        if(!block){
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        block.content = {
            ...block.content,
            ...value
        };
    }

    getBlocks(){
        return Array.from(this.blocks.values());
    }

    getBlock(name){
        return this.blocks.get(name);
    }
}
