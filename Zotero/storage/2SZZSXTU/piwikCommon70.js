(function() {
    window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    loadTrackingScript();

    function loadTrackingScript() {
        var u = "//track.cnki.net/tracking";
        _paq.push(['setTrackerUrl', u + '']);
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.defer = true;
        g.src = u + '/scripts/piwik.js';
        s.parentNode.insertBefore(g, s);
    };
    try{
        //kns
        //brief.aspx 文献下载
        $(".briefDl_D,.downloadCount>a,.briefDl_Y,.DetailNum>a").live("click", function() {
            var val = $(this).parents("tr:eq(0)").find("td:first-child input").val().split("!");
            _paq.push(['trackEvent', val[0], '下载', val[1]]);
        });
    }catch(e){}
    
    try{
        //kcms
        //关注
        $("document").on("click", "#AttentionNo a.icon-follow", function() {
            var dbcode = GetQueryString('dbcode');
            var filename = GetQueryString('filename');
            if(location.pathname.indexOf(".html") && !!filename){
                dbcode = "CAPJ";
                filename = location.pathname.substring(location.pathname.lastIndexOf("/")+1,location.pathname.indexOf(".html"));
            }

            _paq.push(['trackEvent', dbcode, '关注', filename]);
        });
        //收藏
        $("document").on("click", ".link a.icon-favor", function() {
            var dbcode = GetQueryString('dbcode');
            var filename = GetQueryString('filename');
            if(location.pathname.indexOf(".html") && !!filename){
                dbcode = "CAPJ";
                filename = location.pathname.substring(location.pathname.lastIndexOf("/")+1,location.pathname.indexOf(".html"));
            }

            _paq.push(['trackEvent', dbcode, '收藏', filename]);
        });
        //分享
        $("document").on("click", ".link .shareBoard ul a", function() {
            var dbcode = GetQueryString('dbcode');
            var filename = GetQueryString('filename');
            if(location.pathname.indexOf(".html") && !!filename){
                dbcode = "CAPJ";
                filename = location.pathname.substring(location.pathname.lastIndexOf("/")+1,location.pathname.indexOf(".html"));
            }

            _paq.push(['trackEvent', dbcode, "分享", filename]);
        });
        //下载
        $("document").on("click", "#DownLoadParts a:contains('整本下载'),#DownLoadParts a:contains('分页下载'),#DownLoadParts a:contains('分章下载'),#DownLoadParts a[name='cajDown'],#DownLoadParts a[name='pdfDown'],.wxToolbar .dllink a:contains('整本下载'),.wxToolbar .dllink a:contains('分页下载'),.wxToolbar .dllink a:contains('分章下载'),.wxToolbar .dllink a[name='cajDown'],.wxToolbar .dllink a[name='pdfDown']", function() {
            var dbcode = GetQueryString('dbcode');
            var filename = GetQueryString('filename');
            if(location.pathname.indexOf(".html") && !!filename){
                dbcode = "CAPJ";
                filename = location.pathname.substring(location.pathname.lastIndexOf("/")+1,location.pathname.indexOf(".html"));
            }

            var name = $.trim($(this).text());
            _paq.push(['trackEvent', dbcode, name, filename]);
        });
    }catch(e){}

    function GetQueryString(name) {
        var reg1 = new RegExp("(^|&amp;)" + name + "=([^&amp;]*)(&amp;|$)");
        var reg2 = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg1);
        if (r == null){
			r = window.location.search.substr(1).match(reg2);
        } 
        if(r != null){
        	return r[2] ? decodeURIComponent(r[2]) : "";
        }
        return null;
    }
})();