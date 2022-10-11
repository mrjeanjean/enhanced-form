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
import {createImageField, createInputField, createRepeater, createTextField} from "./main";
import MultiImagesBlockSettings from "./components/Blocks/MultiImagesBlockSettings.vue";

export class EnhancedForm {
    constructor($input, options) {
        this.$input = $input;

        this.$appContainer = document.createElement('div');
        $input.parentNode.insertBefore(this.$appContainer, $input);

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
            settings = null,
            component = null
        }
    ) {
        console.log(fields);
        this.blocksManager.registerBlock(name, {
            component: component || CustomBlock,
            menuLabel,
            props: {
                fields,
            },
            settingsComponent: settings ? settings.component : null
        })

        for (let field of fields) {
            this.blocksManager.editBlockContent(name, {
                [field.name]: field.default
            });
        }

        if (settings) {
            this.blocksManager.editBlockContent(name, {
                ...settings.value
            })
        }

        console.log(this.blocksManager.getBlock(name));
    }

    registerDefaultBlocks() {
        /*this.createComponent(
            {
                name: 'Text',
                menuLabel: 'Text',
                fields: [
                    createTextField('text')
                ],
                settings: {
                    component: TextBlockSettings
                }
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
                name: 'TextImage',
                menuLabel: 'Image/Text',
                component: TextImageBlock,
                fields: [
                    createImageField('image'),
                    createTextField('text')
                ],
                settings: {
                    component: TextImageBlockSettings,
                    value: {
                        reverse: false
                    }
                }
            }
        );*/

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
                        })
                ],
                settings: {
                    component: MultiImagesBlockSettings,
                }
            }
        )

        /*this.blocksManager.registerBlock(
            'MultiImagesBlock',
            {
                component: MultiImagesBlock,
                settingsComponent: MultiImagesBlockSettings,
                props: {
                    imageOptions: {
                        width: 600,
                        height: 600
                    }
                },
                content: {
                    nbImages: 3,
                    max: 4,
                    min: 1,
                    images: [
                        {...imageType},
                        {...imageType},
                        {...imageType}
                    ]
                },
                menuLabel: 'Multi images'
            }
        );*/
    }
}
