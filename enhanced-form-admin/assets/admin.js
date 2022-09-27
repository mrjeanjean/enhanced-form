import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import '@moveo/enhanced-form-core/dist/style.css'
import './admin.css'

document.addEventListener("DOMContentLoaded", ()=>{
    const $target = document.querySelector('[data-enhanced-editor]');
    if($target){
        attachEnhancedForm($target)
    }

    // Expand post width by adding legacy Easy admin css class
    document.body.classList.add('ea-content-width-full');
})
