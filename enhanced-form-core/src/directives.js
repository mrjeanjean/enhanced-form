const excludedElements = [
    '.editor-sidebar',
    '.editor-options-menu'
]

export const clickOutside = {
    mounted: (el, binding) => {
        // Elements excluded from outside event
        el.clickOutsideEvent = event => {
            let excludedElementReach = false;

            excludedElements.forEach(selector=>{
                const $element = document.querySelector(selector);
                if($element && ($element == event.target || $element.contains(event.target))){
                    excludedElementReach = true;
                }
            })

            if(excludedElementReach){
                return;
            }

            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };

        setTimeout(()=>{
            document.addEventListener("click", el.clickOutsideEvent);
        }, 20)

    },
    unmounted: el => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};
