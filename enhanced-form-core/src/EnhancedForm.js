import {createApp} from "vue";
import {getStore} from "./store";
import {parseJson} from "./utils";

import {BlocksManager} from "./BlocksManager";
import {clickOutside} from "./directives";

import Editor from "./components/Editor.vue";

import CustomBlock from "./components/Blocks/CustomBlock.vue";
import {registerDefaultBlocks} from "./blocks";
import {registerDefaultFields} from "./fields";

/**
 * Main class to handle enhanced form creation and bind data with textarea
 */
export class EnhancedForm {
    constructor($input, options) {
        this.$input = $input;

        this.$appContainer = document.createElement('div');
        $input.parentNode.insertAdjacentElement('beforebegin', this.$appContainer);

        this.updateInput = this.updateInput.bind(this);

        this.app = createApp(
            Editor,
            {
                onChange: this.updateInput
            }
        );

        this.app.use(getStore(parseJson($input.value)));
        this.app.directive('click-outside', clickOutside);

        if (!options.hasOwnProperty('onSelectFile')) {
            console.warn('enhanced form warning: onSelectFile property is required for image contained blocks')
        }

        this.blocksManager = new BlocksManager(this.app);

        this.app.provide('options', options);
        this.app.provide('blocksManager', this.blocksManager);

        registerDefaultBlocks(this);
        registerDefaultFields(this.app);
    }

    updateInput(value) {
        this.$input.value = JSON.stringify(JSON.parse(value), null, 2);
    }

    render() {
        this.app.mount(this.$appContainer);
    }

    deregisterBlock(name) {
        this.blocksManager.deregisterBlock(name);
    }

    editBlockProps(name, ...args) {
        this.blocksManager.editBlockProps(name, ...args);
    }

    editBlockContent(name, ...args) {
        this.blocksManager.editBlockContent(name, ...args);
    }

    createComponent(
        {
            name,
            menuLabel,
            fields,
            icon = 'circle-question'
        }
    ) {

        this.blocksManager.registerBlock(name, {
            component: CustomBlock,
            menuLabel,
            icon,
            props: {
                fields,
            },
        });

        for (let field of fields) {
            this.blocksManager.editBlockContent(name, {
                [field.name]: field.value
            });

            if (field.settings) {
                this.blocksManager.editBlockSettings(name, field)
            }
        }
    }
}
