let file1 = "https://gitcode.net/src48597962/hk/-/raw/master/SrcJuying.js";
let file2 = "https://agit.ai/src48597962/Src/raw/branch/master/SrcJuying.js";
if(!fileExist('hiker://files/libs/' + md5(file1) + '.js' && !fileExist('hiker://files/libs/' + md5(file2) + '.js')){
  let cjFile = request(file2,{timeout:2000});
  if(cjFile.indexOf('nowVersion') > -1){
    var relyfile = file2;
  }else{
    var relyfile = file1;
  }
}
