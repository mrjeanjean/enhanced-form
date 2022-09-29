// For demo purpose. File System JS Api not work with Firefox
export const selectFile = async (uploadUrl, options) => {
    let formData = new FormData();
    let fileData = null;

    try {
        const [fileHandle] = await window.showOpenFilePicker();
        fileData = await fileHandle.getFile();

        if(options.hasOwnProperty('beforeFetch')){
            options.beforeFetch();
        }

        formData.append("file", fileData);

        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        return Promise.resolve({
            error: false,
            image: {
                url: data.url
            }
        });
    } catch (error) {
        return Promise.resolve({
            image: null,
            error: error
        })
    }
}
