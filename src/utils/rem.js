/*设置REM方案*/
remFont()
window.addEventListener('resize', function () {
    remFont();
    // console.log(window.innerWidth)
});
function remFont() { 
    var html = document.getElementsByTagName('html')[0];
    var width = window.innerWidth;
    var font_Size = 0;
    if(width >= 320 && width <= 1024){
      font_Size = 100/375 * width;
    }else if(width<320){
      font_Size = 100/375 * 320;
    }else{
      font_Size = 100/375 * 1024;
    }
    html.style.fontSize = font_Size + 'px';
}