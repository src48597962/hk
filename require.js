let file1 = "https://codeberg.org/src48597962/hk/raw/branch/Ju/SrcJu.js";
let file2 = "https://gitcode.net/src48597962/hk/-/raw/Ju/SrcJu.js";
let file3 = "https://agit.ai/src48597962/hk/raw/branch/Ju/SrcJu.js";

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
  
