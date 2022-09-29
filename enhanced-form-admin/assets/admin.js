import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import {selectFile} from "@moveo/file-upload-manager";
import '@moveo/enhanced-form-core/dist/style.css';
import './admin.css';

document.addEventListener("DOMContentLoaded", () => {
    const $target = document.querySelector('[data-enhanced-editor]');
    if ($target) {
        attachEnhancedForm(
            $target,
            {
                onSelectFile: (options) => {
                    return selectFile(
                        'http://127.0.0.1:8000/upload',
                        options
                    )
                }
            }
        )
    }
    // Expand post width by adding legacy Easy admin css class
    document.body.classList.add('ea-content-width-full');
})
