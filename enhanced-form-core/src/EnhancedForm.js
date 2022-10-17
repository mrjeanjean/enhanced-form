import {createApp} from "vue";
import {getStore} from "./store";
import {parseJson} from "./utils";

import {BlocksManager} from "./BlocksManager";
import {clickOutside} from "./directives";

import Editor from "./components/Editor.vue";

// Default blocks imports
import TextBlockSettings from "./components/Blocks/TextBlockSettings.vue";
import TextImageBlock from "./components/Blocks/TextImageBlock.vue";
import TextImageBlockSettings from "./components/Blocks/TextImageBlockSettings.vue";

import CustomBlock from "./components/Blocks/CustomBlock.vue";
import {
    createImageField,
    createInputField,
    createRepeater, createRow,
    createSpinnerField,
    createSwitchField,
    createTextField
} from "./main";

// Import for fields registration
// Should be may be moved
import ImageField from "./components/Fields/ImageField.vue";
import InputField from "./components/Fields/InputField.vue";
import TextEditorField from "./components/Fields/TextEditorField.vue";
import RepeatField from "./components/Fields/RepeatField.vue";
import SpinnerField from "./components/Fields/SpinnerField.vue";
import SwitchField from "./components/Fields/SwitchField.vue";
import Settings from "./components/Settings.vue";
import RowField from "./components/Fields/RowField.vue";

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

        this.registerDefaultBlocks();
        this.registerFields();
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
            fields
        }
    ) {
        this.blocksManager.registerBlock(name, {
            component: CustomBlock,
            menuLabel,
            props: {
                fields,
            },
        });

        for (let field of fields) {
            this.blocksManager.editBlockContent(name, {
                [field.name]: field.default
            });

            if (field.props) {
                for (const [key, value] of Object.entries(field.props)) {
                    this.blocksManager.editBlockContent(name, {
                        [key]: value
                    });
                }
            }

            if (field.settings) {
                this.blocksManager.editBlockSettings(name, field)
            }
        }
    }

    registerDefaultBlocks() {
        this.createComponent(
            {
                name: 'Text',
                menuLabel: 'Text',
                fields: [
                    createTextField('text')
                ]
            }
        );

        this.createComponent(
            {
                name: 'Image',
                menuLabel: 'Image',
                fields: [
                    createImageField('image')
                ]
            }
        );

        this.createComponent(
            {
                name: 'Accordion',
                menuLabel: 'Accordion',
                fields: [
                    createRepeater('items', [
                            createInputField('title'),
                            createTextField('text')
                        ]
                    )
                ]
            }
        )

        this.createComponent(
            {
                name: 'MultiImages',
                menuLabel: 'Multi Images',
                fields: [
                    createRepeater(
                        'images',
                        [
                            createImageField('image')
                        ],
                        {
                            fixed: true,
                            size: 3
                        },
                        [
                            {
                                label: 'Nb columns',
                                component: createSpinnerField('size', {
                                    min: 2,
                                    max: 4
                                })
                            }
                        ]
                    )
                ]
            }
        )

        this.createComponent(
            {
                name: 'TextImage',
                menuLabel: 'Text/Image',
                fields: [
                    createRow(
                        'items',
                        [
                            createTextField('monTexte'),
                            createImageField('monImage')
                        ],
                        {
                          reverse: false
                        },
                        [
                            {
                                label: 'Switch columns',
                                component: createSwitchField('reverse')
                            }
                        ]
                    )
                ],
            }
        )

    }

    registerFields() {
        this.app.component('ImageField', ImageField);
        this.app.component('InputField', InputField);
        this.app.component('TextEditorField', TextEditorField);
        this.app.component('RepeatField', RepeatField);
        this.app.component('SpinnerField', SpinnerField);
        this.app.component('SwitchField', SwitchField);
        this.app.component('RowField', RowField);
    }
}
