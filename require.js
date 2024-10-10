let file1 = "https://raw.gitcode.com/src48597962/hk/raw/Ju/SrcJu.js";
let file2 = "https://codeberg.org/src48597962/hk/raw/branch/Ju/SrcJu.js";
let file3 = "https://ghproxy.cc/https://raw.githubusercontent.com/src48597962/hk2/refs/heads/Ju/SrcJu.js";

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
