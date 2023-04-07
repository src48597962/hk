let file1 = "https://gitcode.net/src48597962/hk/-/raw/Ju/SrcJu.js";
let file2 = "https://gitea.com/src48597962/hk/raw/branch/Ju/SrcJu.js";
let file3 = "https://codeberg.org/src48597962/hk/raw/branch/Ju/SrcJu.js";
let relyfile = "";
if(fileExist('hiker://files/libs/' + md5(file1) + '.js')){
  relyfile = file1;
}else if(fileExist('hiker://files/libs/' + md5(file2) + '.js')){
  relyfile = file2;
}else if(fileExist('hiker://files/libs/' + md5(file3) + '.js')){
  relyfile = file2;
}
if(relyfile==""){
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
}
  
