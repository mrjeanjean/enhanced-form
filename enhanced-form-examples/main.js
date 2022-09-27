import './style.css'
import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import '@moveo/enhanced-form-core/dist/style.css'

attachEnhancedForm(
    document.getElementById("input-target"),
    {
        onBrowse: ()=>{
            let userId = Math.round(Math.random() * 2500);
            return Promise.resolve({
                url: `https://avatars.githubusercontent.com/u/${userId}?v=4`,
                title: 'Github profile picture'
            });
        }
    }
);


