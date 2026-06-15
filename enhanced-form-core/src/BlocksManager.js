/**
 * @typedef {{name: string, menuLabel: string, icon: string|string[]|Object|Object[], component: Object, props?: Object, hideOnMenu?: boolean, category?: string}} BlockOptions
 */

/**
 * Manages block registration and metadata
 */
export class BlocksManager {
    constructor(vueApp) {
        this.vueApp = vueApp;
        this.blocks = new Map();
    }

    /**
     * @param {string} name - Unique block identifier
     * @param {BlockOptions} options
     */
    registerBlock(name, options) {
        // Add component name as option property (make toArray easier)
        options.name = name;
        options.settings = {};
        options.blockSettings = {};

        if (this.blocks.has(name)) {
            throw new Error(`Block with name '${name}' already exists in block list`)
        }

        this.blocks.set(name, options);
        this.vueApp.component(name, options.component);
    }

    /**
     * @param {string} name
     */
    deregisterBlock(name) {
        this.blocks.delete(name);
    }

    /**
     * Edit props of a registered block. For CustomBlock, targets a specific field by fieldName.
     * @param {string} name
     * @param {Object} props
     * @param {string|null} [fieldName]
     */
    editBlockProps(name, props, fieldName = null) {
        const block = this.blocks.get(name);

        if (!block) {
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        if (block.component.name === 'CustomBlock') {
            const field = block.props.fields.find(f => f.name === fieldName);
            if (field) {
                field.options = {
                    ...field.options,
                    ...props
                }
            }
        } else {
            block.props = {
                ...block.props,
                ...props
            };
        }
    }

    /**
     * Set default content values for a block
     * @param {string} name
     * @param {Object} value
     */
    editBlockContent(name, value) {
        const block = this.blocks.get(name);

        if (!block) {
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        block.content = {
            ...block.content,
            ...value
        };
    }

    /**
     * @param {string} name
     * @param {Object} field
     */
    editBlockSettings(name, field) {
        const block = this.blocks.get(name);

        if (!block) {
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        if (!block.settings.hasOwnProperty(field.name)) {
            block.settings[field.name] = [];
        }

        for (let setting of field.settings) {
            block.settings[field.name].push({
                ...setting
            });
        }
    }

    /**
     * Add a global setting (displayed in the block settings panel)
     * @param {string} name
     * @param {Object} field - Field definition created with a factory
     */
    addBlockSetting(name, field) {
        const block = this.blocks.get(name);

        if (!block) {
            throw new Error(`Block with name '${name}' not exist in block list`);
        }

        block.blockSettings[field.name] = field;
    }

    /**
     * @returns {BlockOptions[]}
     */
    getBlocks() {
        return Array.from(this.blocks.values());
    }

    /**
     * @param {string} name
     * @returns {BlockOptions|null}
     */
    getBlock(name) {
        const block = this.blocks.get(name);

        if (!block) {
            return null;
        }

        block.getBlockSettings = () => {
            return Object.entries(block.blockSettings).reduce((acc, [key, field]) => {
                acc[key] = field.value;
                return acc;
            }, {});
        }
        return block;
    }
}