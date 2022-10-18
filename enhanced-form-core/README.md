# JS Enhanced form

## Why?
Wordpress Gutenberg is fun but Wordpress not.  
Friendly editor interface you can use on every html form.

## Demo
[Example on CodePen](https://codepen.io/mrjeanjean/pen/VwxXqNg)

## Installation
```
npm i @moveo/enhanced-form-core
```
or
```
yarn add @moveo/enhanced-form-core
```
## Configuration
```html
<textarea name="editor-content" id="input-target" cols="30" rows="10"></textarea>
```
```js
import {attachEnhancedForm} from "@moveo/enhanced-form-core";
import '@moveo/enhanced-form-core/dist/style.css';

// Attach editor to the textarea
const enhancedForm = attachEnhancedForm(
    document.getElementById("input-target"),
    {
        // A callback to handle file selection is required
        // Here simply return a promise with fake image
        onSelectFile: (options) => {
            let id = Math.round(Math.random() * 100 + 100);
            let width = options.imageOptions ? options.imageOptions.width : 500;
            let height = options.imageOptions ? options.imageOptions.height : 500;
            
            return Promise.resolve({
                image:{
                    url: `https://picsum.photos/id/${id}/${width}/${height}`
                }
            });
        }
    }
);

// Don't forget to call the render method
enhancedForm.render();
```

## Easy Way (for curious or/and lazy people)
Use the temporary CDN resources. Here is a full ready to use html example.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://unpkg.com/@moveo/enhanced-form-core@0.1.4/dist/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Lato, sans-serif;
        }
    </style>
</head>
<body>
<h2>Form with editor</h2>
<form action="#" method="GET">
    <div>
        <textarea name="editor-content" id="input-target" cols="30" rows="10"></textarea>
    </div>
    <button type="submit">Save form</button>
</form>
<script type="module" defer>
    import {attachEnhancedForm} from 'https://unpkg.com/@moveo/enhanced-form-core@0.1.4/dist/enhancedForm.js';

    const enhancedForm = attachEnhancedForm(
        document.getElementById('input-target'),
        {
            onSelectFile: (options) => {
                let id = Math.round(Math.random() * 100 + 100);
                let width = options.imageOptions ? options.imageOptions.width : 500;
                let height = options.imageOptions ? options.imageOptions.height : 500;

                return Promise.resolve({
                    image: {
                        url: `https://picsum.photos/id/${id}/${width}/${height}`
                    }
                })
            }
        }
    );

    enhancedForm.render();
</script>
</body>
</html>
```

## Pros
- Easy to install
- Works on every html form
- Customisable (it should be...)

## Cons
- Data will be store as a json format. I could be bothersome in a database, depending on your needs.

## Documentation
...coming soon

