function filterUnorderedList(filterText) {
    var ulItem = document.getElementById("ULlist");
    var liItem = ulItem.getElementsByTagName("li");
    
    regexp = new RegExp(filterText, "i");
    regexphtml = new RegExp("<a[^>]*>(.*)<\/a>", "i");
    
    for (var i = 0; i < liItem.length; i++){
        var elemFullText = liItem[i].innerHTML;
        var elemShortTextAll = regexphtml.exec(elemFullText);
        var elemShortText = elemShortTextAll[1];
        
        if (!regexp.test(elemShortText)){
            liItem[i].className = 'ulhide';
        }
        else {
            liItem[i].className = 'ulitem';
        }
    }
}