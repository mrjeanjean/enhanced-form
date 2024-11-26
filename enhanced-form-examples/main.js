import './style.css'
import {attachEnhancedForm, createTextAreaField} from "@moveo/enhanced-form-core";
import {selectFile} from "@moveo/file-upload-manager";
import '@moveo/enhanced-form-core/dist/style.css';
import {imageType} from "@moveo/enhanced-form-core/src/types";
import MonInputWrapper from "./MonInputWrapper.vue";
import MonInput from "./MonInput.vue";

const enhancedForm = attachEnhancedForm(
    document.getElementById("input-target"),
    {
        onSelectFile: (options) => {
            let id = Math.round(Math.random() * 100 + 100);
            let width = options.imageOptions ? options.imageOptions.width : 500;
            let height = options.imageOptions ? options.imageOptions.height : 500;

            return Promise.resolve({
                image:{
                    url: `https://picsum.photos/id/${id}/${width}/${height}`
                }
            })
        }
    }
);

enhancedForm.getApp().component('MonInput', MonInput);

enhancedForm.createComponent(
    {
        component: MonInputWrapper,
        name: 'Table',
        menuLabel: 'Tableau',
        icon: 'table',
        fields: [
            createTextAreaField('table', {
                disabled: true
            })
        ],
    }
)
enhancedForm.render();


