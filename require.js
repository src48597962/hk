let file1 = "https://gitcode.net/src48597962/hk/-/raw/master/SrcJuying.js";
let file2 = "https://jihulab.com/src485979621/hk/-/raw/master/SrcJuying.js";
var relyfile = "";
if(fileExist('hiker://files/libs/' + md5(file1) + '.js')){
  relyfile = file1;
}else if(fileExist('hiker://files/libs/' + md5(file2) + '.js')){
  relyfile = file2;
}
if(relyfile==""){
  let cjFile = request(file1,{timeout:2000});
  if(cjFile.indexOf('nowVersion') > -1){
    relyfile = file1;
  }else{
    relyfile = file2;
  }
}
  
