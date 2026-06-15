import {
    attachEnhancedForm,
    createInputField,
    createRepeater,
    createTextAreaField,
    createChoiceField
} from "@moveo/enhanced-form-core";
import '@moveo/enhanced-form-core/dist/style.css';
import CustomInputBlock from "./CustomInputBlock.vue";
import {createImageField} from "@moveo/enhanced-form-core/src/main.js";

const enhancedForm = attachEnhancedForm(
    document.getElementById("input-target"),
    {
        onSelectFile: (options) => {
            let id = Math.round(Math.random() * 100 + 100);
            let width = options.imageOptions ? options.imageOptions.width : 500;
            let height = options.imageOptions && options.imageOptions.height ? options.imageOptions.height : 500;

            return Promise.resolve({
                image: {
                    url: `https://picsum.photos/id/${id}/${width}/${height}`
                }
            })
        },
    }
);

enhancedForm.createComponent(
    {
        name: 'CustomInput',
        menuLabel: 'Custom Input',
        icon: [
            {
                id: 'user',
                type: 'regular'
            }
        ],
        fields: [
            createInputField('url', {
                label: 'Lien',
                placeholder: 'Lien du site ou du fichier...'
            }),
            createImageField('banner')
        ],
        component: CustomInputBlock
    }
)

/*
enhancedForm.createComponent(
    {
        name: 'Videos',
        menuLabel: 'Slider vidéos',
        icon: ['caret-left', 'film', 'caret-right'],
        fields: [
            createInputField('title', {placeholder: 'Titre'}),
            createInputField('linkLabel', {placeholder: 'Intitulé du lien'}),
            createRepeater('videos', [
                createInputField('youtubeId', {placeholder: 'Id YouTube'}),
                createTextAreaField('text')
            ], {
                fixed: false,
                size: 1
            })
        ]
    }
)
*/
enhancedForm.render();


