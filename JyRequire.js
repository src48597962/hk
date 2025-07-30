let relys = [
    //"https://raw.gitcode.com/src48597962/juying/raw/master/",
    "https://codeberg.org/src48597962/Juying/raw/branch/master/",
    "https://cnb.cool/src48597962/Juying/-/git/raw/master/",
    "https://raw.githubusercontent.com/src48597962/Juying/master/"
];
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function getRely() {
    shuffleArray(relys);
    for (let i = 0; i < relys.length; i++) {
        let content = fetch(relys[i] + 'SrcJuying.js', { timeout: 3000 });
        if (content && content.indexOf('nowVersion') > -1) {
            return relys[i] + 'SrcJuying.js';
        }
    }
    return '';
}
