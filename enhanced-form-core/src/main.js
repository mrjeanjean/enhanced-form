import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css'

import {EnhancedForm} from "./EnhancedForm";
import InputField from './components/Fields/InputField.vue';
import ImageField from './components/Fields/ImageField.vue';
import SpinnerField from './components/Fields/SpinnerField.vue';
import {imageType} from "./types";

export const attachEnhancedForm = ($input, options = {}) => {
    return new EnhancedForm($input, options);
}

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
        default: value || '',
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

export const createRepeater = (name, fields = [], options, settings) => {
    return {
        name: name,
        type: 'RepeatField',
        default: {
            fields: [],
            ...options
        },
        options: {
            model: fields
        },
        settings
    };
}

export const createSpinnerField = (name, options, value) =>{
    return {
        name: name,
        type: 'SpinnerField',
        default: value || 0,
        options
    };
}

export const createSwitchField = (name, options, value) =>{
    return {
        name: name,
        type: 'SwitchField',
        default: value || false,
        options
    };
}

export {
    InputField,
    ImageField
}
