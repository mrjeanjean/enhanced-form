import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import '@moveo/enhanced-form-core/dist/style.css'

document.addEventListener("DOMContentLoaded", ()=>{
    const $target = document.querySelector('[data-enhanced-editor]');
    console.log("INIT ADMIN")
    if($target){
        attachEnhancedForm($target)
    }
})
