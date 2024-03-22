$.fn.hasAttr = function (name) {
    var attr = $(this).attr(name);
    return (typeof attr !== "undefined" && attr !== false);
}
String.prototype.turkishUpperCase = function () {

    return this.trim()
        .replaceAll("i", "İ").toLocaleUpperCase('tr-TR') ;

}
String.prototype.turkishLowerCase = function () {
    
    return this.trim()
        .replaceAll("I", "ı").toLocaleLowerCase('tr-TR') ;

}

String.prototype.toPascalCase = function(){
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
}

String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ','g')
        .replace('Ü','u')
        .replace('Ş','s')
        .replace('I','i')
        .replace('İ','i')
        .replace('Ö','o')
        .replace('Ç','c')
        .replace('ğ','g')
 		.replace('ü','u')
        .replace('ş','s')
        .replace('ı','i')
        .replace('ö','o')
        .replace('ç','c');
};

//Array.prototype.unique = function () {
//    var a = this.concat();
//    console.log("a", a);
//    for (var i = 0; i < a.length; ++i) {
//        for (var j = i + 1; j < a.length; ++j) {
//            if (a[i] === a[j])
//                a.splice(j--, 1);
//        }
//    }

//    return a;
//};