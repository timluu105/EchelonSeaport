export default {
    methods: {
        preventDanglingWords(string) {
            return string.replace(/\ \ \ */g, " ").replace(/\ ([^\ ][^\ ]*)\ ([^\ ][^\ ]*)$/, "&nbsp;$1&nbsp;$2");
        }
    }
};
