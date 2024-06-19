let file1 = "https://gitcode.net/src48597962/juying/-/raw/master/SrcJuying.js";
let file2 = "https://codeberg.org/src48597962/Juying/raw/branch/master/SrcJuying.js";
let file3 = "https://raw.githubusercontent.com/src48597962/Juying/master/SrcJuying.js";

let cjFile = request(file1,{timeout:3000});
if(cjFile.indexOf('nowVersion') > -1){
  relyfile = file1;
}else{
  let cjFile = request(file2,{timeout:3000});
  if(cjFile.indexOf('nowVersion') > -1){
    relyfile = file2;
  }else{
    relyfile = file3;
  }
}
