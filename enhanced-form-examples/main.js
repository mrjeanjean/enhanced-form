import './style.css'
import {attachEnhancedForm, createComponent} from "@moveo/enhanced-form-core";
import {selectFile} from "@moveo/file-upload-manager";
import '@moveo/enhanced-form-core/dist/style.css';
import {imageType} from "@moveo/enhanced-form-core/src/types";

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

enhancedForm.registerBlock('NewTruc', {
    component: createComponent(),
    props: {
        imageOptions: {
            width: 500,
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
    menuLabel: 'NewTruc'
})

enhancedForm.render();


