import ImageField from "./components/Fields/ImageField.vue";
import InputField from "./components/Fields/InputField.vue";
import TextEditorField from "./components/Fields/TextEditorField.vue";
import RepeatField from "./components/Fields/RepeatField.vue";
import SpinnerField from "./components/Fields/SpinnerField.vue";
import SwitchField from "./components/Fields/SwitchField.vue";
import RowField from "./components/Fields/RowField.vue";
import TextAreaField from "./components/Fields/TextAreaField.vue";
import FileField from "./components/Fields/FileField.vue";

/**
 * Register all fields globally in Vue app
 * @param {App} app
 */
export function registerDefaultFields(app){
    app.component('ImageField', ImageField);
    app.component('InputField', InputField);
    app.component('TextEditorField', TextEditorField);
    app.component('RepeatField', RepeatField);
    app.component('SpinnerField', SpinnerField);
    app.component('SwitchField', SwitchField);
    app.component('RowField', RowField);
    app.component('TextAreaField', TextAreaField);
    app.component('FileField', FileField);
}
