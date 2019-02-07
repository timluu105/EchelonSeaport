export default {
    methods: {
        includeJavascriptTag(scriptSource) {
            let scriptTag = document.createElement('script')
            scriptTag.setAttribute('src', scriptSource);
            document.head.appendChild(scriptTag);
            console.log(scriptTag, "included");
        }
    }
};

