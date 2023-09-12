import './styles/style.scss'

import {EnhancedForm} from "./EnhancedForm.js";
import InputField from './components/Fields/InputField.vue';
import ImageField from './components/Fields/ImageField.vue';
import SpinnerField from './components/Fields/SpinnerField.vue';
import {imageType} from "./types.js";
import {InputMixin} from "./mixins.js";

export const attachEnhancedForm = ($input, options = {}) => {
    return new EnhancedForm($input, options);
}

/**
 *  Field wrapper
 */
function createField (
    {
        options,
        value,
        ...rest
    }
){
    const settings = [];

    function addSetting(component, label = ''){
        settings.push({
            label,
            component
        });
        return this;
    }

    value = (options && options.value) ? options.value : value;

    return {
        addSetting,
        ...rest,
        settings,
        value,
        options
    };
}


/**
 * Fields factories
 */
export const createInputField = (name, options) => {
    return createField({
        name: name,
        type: 'InputField',
        value: '',
        options,
    });
}

export const createTextField = (name, options) => {
    return createField({
        name: name,
        type: 'TextEditorField',
        value: '',
        options
    });
}

export const createTextAreaField = (name, options) => {
    return createField({
        name: name,
        type: 'TextAreaField',
        value: '',
        options
    });
}

export const createImageField = (name, options) => {
    return createField({
        name: name,
        type: 'ImageField',
        value: {
            ...imageType
        },
        options
    });
}

export const createSpinnerField = (name, options) => {
    return createField({
        name: name,
        type: 'SpinnerField',
        value: 0,
        options
    });
}

export const createSwitchField = (name, options) => {
    return createField({
        name: name,
        type: 'SwitchField',
        value: false,
        options
    });
}

export const createRepeater = (name, model = [], options) => {
    return createField({
        name: name,
        type: 'RepeatField',
        value: {
            fields: [],
            ...options
        },
        options: {
            model
        }
    });
}

export const createRow = (name, model, options) => {
    const data = {};

    for (let field of model) {
        data[field.name] = field.value;
    }

    const columns = model.map(field => {
        return {
            [field.name]: field.value
        }
    })

    return createField({
        name: name,
        type: 'RowField',
        value: {
            reverse: false,
            columns,
            ...options,
        },
        options: {
            model
        }
    });
}

/**
 * Fields components
 */
export{
    InputField
}

/**
 * Mixins
 */
export {
    InputMixin
}
