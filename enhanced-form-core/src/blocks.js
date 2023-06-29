import {
    createImageField,
    createInputField,
    createRepeater,
    createRow,
    createSpinnerField, createSwitchField,
    createTextField
} from "./main";

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
                createImageField('image')
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
                        createImageField('image'),
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
                    'data',
                    [
                        createTextField('text'),
                        createImageField('image')
                    ]
                )
                    .addSetting(
                        createSwitchField('reverse'),
                        'Switch columns'
                    )
            ],
        }
    )
}
