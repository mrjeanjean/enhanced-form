import './style.css'
import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import {selectFile} from "@moveo/file-upload-manager";
import '@moveo/enhanced-form-core/dist/style.css';

attachEnhancedForm(
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
        },
        imagesOptions:{
            ImageBlock: {
                width: 600,
                height: 600
            },
            TextImageBlock: {
                width: 900,
                height: 600
            },
            MultiImagesBlock: {
                width: 600,
                height: 500
            }
        }
    }
);


