import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css'

import {EnhancedForm} from "./EnhancedForm";

export const attachEnhancedForm = ($input, options = {}) => {
    return new EnhancedForm($input, options);
}
