﻿function IsWideScreen() {
    if (window.screen.width >= 1280) {
        return true;
    }
    else {
        return false;
    }
}

function AutoWide() {
    if (IsWideScreen()) {
        document.getElementsByTagName("body")[0].className = "rootw";
    }
}
AutoWide();
