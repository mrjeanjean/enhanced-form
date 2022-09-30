import {createApp} from "vue";
import {getStore} from "./store";
import {parseJson} from "./utils";

import {BlocksManager} from "./BlocksManager";
import {imageType} from "./types";
import {clickOutside} from "./directives";

import Editor from "./components/Editor.vue";

// Default blocks imports
import ImageBlock from "./components/Blocks/ImageBlock.vue";
import ImageBlockSettings from "./components/Blocks/ImageBlockSettings.vue";
import TextBlock from "./components/Blocks/TextBlock.vue";
import TextBlockSettings from "./components/Blocks/TextBlockSettings.vue";
import TextImageBlock from "./components/Blocks/TextImageBlock.vue";
import TextImageBlockSettings from "./components/Blocks/TextImageBlockSettings.vue";
import MultiImagesBlock from "./components/Blocks/MultiImagesBlock.vue";
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
        this.$input.value = value;
    }

    render() {
        this.app.mount(this.$appContainer);
    }

    registerBlock(...args){
        this.blocksManager.registerBlock(...args);
    }

    deregisterBlock(...args){
        this.blocksManager.deregisterBlock(...args);
    }

    editBlockProps(...args){
        this.blocksManager.editBlockProps(...args);
    }

    editBlockContent(...args){
        this.blocksManager.editBlockContent(...args);
    }

    registerDefaultBlocks() {
        this.blocksManager.registerBlock(
            'ImageBlock',
            {
                component: ImageBlock,
                settingsComponent: ImageBlockSettings,
                props: {
                    imageOptions: {
                        width: 1800,
                        height: 800
                    }
                },
                content: {
                    text: '',
                    image: {
                        ...imageType
                    },
                    reverse: true
                },
                menuLabel: 'Image'
            }
        );

        this.blocksManager.registerBlock(
            'TextBlock',
            {
                component: TextBlock,
                settingsComponent: TextBlockSettings,
                props: {},
                content: {
                    text: ''
                },
                menuLabel: 'Text'
            }
        );

        this.blocksManager.registerBlock(
            'TextImageBlock',
            {
                component: TextImageBlock,
                settingsComponent: TextImageBlockSettings,
                props: {
                    imageOptions: {
                        width: 600,
                        height: 600
                    }
                },
                content: {
                    text: '',
                    image: {
                        ...imageType
                    },
                    reverse: true
                },
                menuLabel: 'Image/Text'
            }
        );

        this.blocksManager.registerBlock(
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
        );
    }
}
