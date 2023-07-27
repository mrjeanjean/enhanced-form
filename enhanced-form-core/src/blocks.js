import {
    createImageField,
    createInputField,
    createRepeater,
    createRow,
    createSpinnerField, createSwitchField,
    createTextField
} from "./main.js";
import TextBlock from "./components/Blocks/TextBlock.vue";
import ButtonBlock from "./components/Blocks/ButtonBlock.vue";

/**
 * Register ready to use blocks
 * @param {EnhancedForm} enhancedForm
 */
export function registerDefaultBlocks(enhancedForm) {
    enhancedForm.createComponent(
        {
            name: 'Text',
            menuLabel: 'Text',
            icon: 'align-left',
            fields: [
                createTextField('text')
            ]
        }
    );

    enhancedForm.createComponent(
        {
            name: 'Image',
            menuLabel: 'Image',
            icon: {
                id: 'image',
                type: 'regular'
            },
            fields: [
                createImageField('image', {
                    size: {
                        width: 600,
                        height: null
                    }
                })
            ]
        }
    );

    enhancedForm.createComponent(
        {
            name: 'Accordion',
            menuLabel: 'Accordion',
            icon: 'grip-lines',
            fields: [
                createRepeater('items', [
                        createInputField('title', {placeholder: 'Title'}),
                        createTextField('text', {placeholder: 'Content'})
                    ]
                )
            ]
        }
    )

    enhancedForm.createComponent(
        {
            name: 'MultiImages',
            menuLabel: 'Multi Images',
            icon: {
                id: 'images',
                type: 'regular'
            },
            fields: [
                createRepeater(
                    'images',
                    [
                        createImageField('image', {
                            size: {
                                width: 600,
                                height: 600
                            }
                        }),
                    ],
                    {
                        fixed: true,
                        size: 3
                    }
                )
                    .addSetting(
                        createSpinnerField('size', {
                                min: 2,
                                max: 4
                            }
                        ),
                        'Nb columns'
                    )
            ]
        }
    )


    enhancedForm.createComponent(
        {
            name: 'TextImage',
            menuLabel: 'Text/Image',
            icon: [
                'align-right',
                {
                    id: 'image',
                    type: 'regular'
                }
            ],
            fields: [
                createRow(
                    'row',
                    [
                        createTextField('text'),
                        createImageField('image',{
                            size:{
                                width: 800,
                                height: null
                            }
                        })
                    ]
                ).addSetting(
                    createSwitchField('reverse'),
                    'Switch columns'
                )
            ],
        }
    )

    enhancedForm.createComponent(
        {
            name: 'Button',
            menuLabel: 'Button',
            icon: [
                {
                    id: 'square',
                    type: 'regular'
                }
            ],
            fields: [
                createInputField('url', {
                    placeholder: 'Lien du site ou du fichier...'
                }),
                createSwitchField('isFile'),
                createSwitchField('targetBlank'),
                createInputField('label', {
                    placeholder: 'Label du bouton...'
                }),
            ],
            component: ButtonBlock
        }
    )
}
