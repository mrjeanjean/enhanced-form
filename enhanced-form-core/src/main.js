import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css'

import {EnhancedForm} from "./EnhancedForm";
import InputField from './components/Fields/InputField.vue';
import ImageField from './components/Fields/ImageField.vue';
import {imageType} from "./types";

export const attachEnhancedForm = ($input, options = {}) => {
    return new EnhancedForm($input, options);
}

export {createComponent} from "./blocks";


export const createInputField = (name, options, value) => {
    return {
        name: name,
        type: 'InputField',
        default: value || '',
        options
    };
}


export const createTextField = (name, options, value) => {
    return {
        name: name,
        type: 'TextEditorField',
        default: value || '<p>Mon bloc</p>',
        options
    };
}

export const createImageField = (name, options, value) => {
    return {
        name: name,
        type: 'ImageField',
        default: {
            ...imageType,
            ...value
        },
        options
    };
}

export{
    InputField,
    ImageField
}
