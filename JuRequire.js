let relys = [
    "https://raw.gitcode.com/src48597962/juyue/raw/master/",
    "https://codeberg.org/src48597962/Juyue/raw/branch/master/",
    "https://cnb.cool/src48597962/Juyue/-/git/raw/master/",
    "https://raw.githubusercontent.com/src48597962/Juyue/master/"
];
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function getRely() {
    shuffleArray(relys);
    for (let i = 0; i < relys.length; i++) {
        let content = fetch(relys[i] + 'SrcJu.js', { timeout: 3000 });
        if (content && content.indexOf('nowVersion') > -1) {
            return relys[i] + 'SrcJu.js';
        }
    }
    return '';
}
