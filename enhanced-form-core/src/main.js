import {createApp} from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css'
import Editor from './components/Editor.vue';
import {getStore} from "./store";
import {parseJson} from "./utils";
import {clickOutside} from "./directives";

export const attachEnhancedForm = ($input, options = {}) => {
    const $app = document.createElement('div');
    $input.parentNode.insertBefore($app, $input);

    const updateInput = (value) => {
        $input.value = value;
    }

    const app = createApp(
        Editor,
        {
            onChange: updateInput
        }
    ).use(getStore(parseJson($input.value)));

    app.directive('click-outside', clickOutside);

    if (!options.hasOwnProperty('onSelectFile')) {
        console.warn('enhanced form warning: onSelectFile property is required for image contained blocks')
    }

    app.provide('options', options);
    app.mount($app);
}
