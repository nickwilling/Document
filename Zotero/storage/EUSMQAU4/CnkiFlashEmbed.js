/*
*创建浏览FLash对象 
*2013-7-16 
*/
window.FlashEmbedding = window.$f = function (id, config) {
    this.id = id;
    var _swfFile = config.swfFile;
    var _expressInstall = config.expressInstall;
    var _wmode = config.wmode;

    var instance = "Flash_Instance" + ((id === "undefined") ? "" : id);
    window[instance] = flashembed(id, {
        src: _swfFile,
        version: [10, 0],
        expressInstall: _expressInstall,
        wmode: _wmode
    }, {
        data: (config.data != null) ? config.data : "",
        showColorYear: (config.showColorYear != null) ? config.showColorYear : "",
        showRightBar: (config.showRightBar != null) ? config.showRightBar : "",
        showReleationBar: (config.showReleationBar != null) ? config.showReleationBar : ""
    }
    );
};

(function () {
    var IE = document.all,
		 URL = 'http://www.adobe.com/go/getflashplayer',
		 JQUERY = typeof jQuery == 'function',
		 RE = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,

		 GLOBAL_OPTS = {
		     width: '100%',
		     height: '100%',
		     id: "_" + ("" + Math.random()).slice(9),
		     allowfullscreen: true,
		     allowscriptaccess: 'always',
		     quality: 'high',
		     allowFullScreenInteractive: true,
		     version: [10, 0],
		     onFail: null,
		     expressInstall: null,
		     w3c: false,
		     cachebusting: false
		 };

    function extend(to, from) {
        if (from) {
            for (var key in from) {
                if (from.hasOwnProperty(key)) {
                    to[key] = from[key];
                }
            }
        }
        return to;
    }



    //定义要生成的对象
    window.flashembed = function (root, opts, conf) {
        if (typeof root == 'string') { root = document.getElementById(root.replace("#", "")); }
        if (!root) { return; }
        root.onclick = function () { return false; }

        if (typeof opts == 'string') {
            opts = { src: opts };
        }

        return new Flash(root, extend(extend({}, GLOBAL_OPTS), opts),conf);
    };

    //合并  
    var f = extend(window.flashembed, {

        conf: GLOBAL_OPTS,

        getVersion: function () {
            var fo, ver;

            try {
                ver = navigator.plugins["Shockwave Flash"].description.slice(16);
            } catch (e) {

                try {
                    fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                    ver = fo && fo.GetVariable("$version");

                } catch (err) {
                    try {
                        fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        ver = fo && fo.GetVariable("$version");
                    } catch (err2) { }
                }
            }

            ver = RE.exec(ver);
            return ver ? [ver[1], ver[3]] : [0, 0];
        },

        //构建 Object HTML
        getHTML: function (opts,conf) {
            opts = extend({}, opts);
            opts.id = opts.id + (" " + Math.random()).slice(9);

            /******* OBJECT tag and it's attributes *******/
            var html = '<object width="' + opts.width +
				'" height="' + opts.height +
				'" id="' + opts.id +
				'" name="' + opts.id + '"';

            if (opts.cachebusting) {
                opts.src += ((opts.src.indexOf("?") != -1 ? "&" : "?") + Math.random());
            }

            if (opts.w3c || !IE) {
                html += ' data="' + opts.src + '" type="application/x-shockwave-flash"';
            } else {
                html += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
            }

            html += '>';

            /******* nested PARAM tags *******/
            if (opts.w3c || IE) {
                html += '<param name="movie" value="' + opts.src + '" />';
            }

            // not allowed params
            opts.width = opts.height = opts.id = opts.w3c = opts.src = null;
            opts.onFail = opts.version = opts.expressInstall = null;

            for (var key in opts) {
                if (opts[key]) {
                    html += '<param name="' + key + '" value="' + opts[key] + '" />';
                }
            }


            /******* FLASHVARS *******/
            var vars = "";
            if (conf) {
                for (var k in conf) {
                    if (conf[k]) {
                        var val = conf[k];
                        vars += k + '=' + (/function|object/.test(typeof val) ? f.asString(val) : val) + '&';
                    }
                }
                vars = vars.slice(0, -1);
                html += '<param name="flashvars" value=\'' + vars + '\' />';
            }


            html += "</object>";

            return html;
        },

        isSupported: function (ver) {
            return VERSION[0] > ver[0] || VERSION[0] == ver[0] && VERSION[1] >= ver[1];
        }

    });


    var VERSION = f.getVersion();
    function Flash(root, opts, conf) {
        if (f.isSupported(opts.version)) {
            root.innerHTML = f.getHTML(opts,conf);
        }
        else if (opts.expressInstall && f.isSupported([6, 65])) {
            root.innerHTML = f.getHTML(extend(opts, { src: opts.expressInstall }), {
                MMredirectURL: location.href,
                MMplayerType: 'PlugIn',
                MMdoctitle: document.title
            });

        }
        else {
            if (!root.innerHTML.replace(/\s/g, '')) {
                var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://");
                root.innerHTML =
                    "<h2>Your browser is not compatible with Flash</h2>" +
                    "<h3>Upgrade to a newer browser or download Adobe Flash Player 10 or higher.</h3>" +
                    "<p>Click on the icon below to download the latest version of Adobe Flash" +
                    "<a href='http://www.adobe.com/go/getflashplayer'><img src='"
                                        + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>";

                if (root.tagName == 'A') {
                    root.onclick = function () {
                        location.href = URL;
                    };
                }
            }

        }

        if (IE) {
            window[opts.id] = document.getElementById(opts.id);
        }
    }

    // setup jquery support
    if (JQUERY) {
        jQuery.fn.Flash = function (args) {
            var embed = new FlashEmbedding(this.attr('id'), args);
            this.element = jQuery('#' + embed.id);
            return this.element;
        };
    } else {
        throw new Error("jQuery missing!");
    }
})();