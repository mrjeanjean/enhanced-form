import {createApp} from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css'
import Editor from './components/Editor.vue';
import {getStore} from "./store";
import {parseJson} from "./utils";

export const attachEnhancedForm = ($input) => {
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

    app.mount($app)
}
