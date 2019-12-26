var _name = '', _kw = '';//用于记录检索词或者刊名，用于统计广告投放
var _slide;//清除定时器使用
//var _timeclick;//点击事件的定时器
//var _sign = false;//判断广告是否加载完成
//var _firstload = true;//首次加载，其他页面调用的时候使用，为了记录日志
(function ($) {
    var url = "//ishufang.cnki.net/a/";
    $(function () {
        adsContainer.includeCss(url + "quote/ad.css");
        //$("#btnSearch").click(function () {
        //    _sign = false; _firstload = false;
        //    var index = window.adsContainer.cookie('ad_index') ? window.adsContainer.cookie('ad_index') : 1;
        //    _timeclick = setInterval(function () { window.adsContainer.setOrder(index) }, 500);
        //    var count = $(".dot-wrap li").length == 0 ? 1 : (parseInt(index) + 1) % ($(".dot-wrap li").length + 1) == 0 ? 1 : (parseInt(index) + 1) % ($(".dot-wrap li").length + 1);
        //    window.adsContainer.cookie('ad_index', count, { path: '/', domain: 'cnki.net' });
        //})
    });
    //获取url参数
    function GetQueryStringByName(query, name) {
        if (query && name) {
            var result = query.toString().match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return null;
            }
            return result[1];
        }
        return null;
    }
    var adsContainer = {
        //初始化
        init: function (obj) {
            if ($(obj).find("ul").length == 0) {
                return;
            }
            clearInterval(_slide);
            adsContainer.bindFlash();
        },

        //加载 css 文件
        includeCss: function (url) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },

        //加载 js 文件
        includeJs: function (url) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            head.appendChild(script);
        },

        bindFlash: function () {
            var $slider = $("#slider2d-imgs");

            if ($slider.length < 1) return;
            var $ul = $('#slider2d-imgs > ul');
            if ($ul.find("li").length == 1) {
                $(".btn-prev").remove();
                $(".btn-next").remove();
                $("#slide-controls").css("display", "none");
            }
            $(".dot-wrap li[id='dot1']").addClass("current");
            var step = 0;

            //getAdvTitle(0);//初始化图片标题
            var flag = false;//记录是否循环完了一圈
            //图片右划
            var nextPic = function () {
                var $ul = $("#slider2d-imgs > ul")
                var $li = $("#slider2d-imgs > ul li")
                var sliderWidth = $li.eq(0).width();
                if (step === $li.length) {
                    $ul.css('left', 0);
                    step = 0;
                    flag = true;
                }
                current(step + 1);
                $ul.stop().animate({ left: -step * sliderWidth }, 500);
                getAdvTitle(step);
                step++;
            }

            //图片左划
            var prevPic = function () {
                var $ul = $("#slider2d-imgs > ul")
                var $li = $("#slider2d-imgs > ul li")
                var sliderWidth = $li.eq(0).width();
                if (step === 0) {
                    $ul.css('left', -($li.length - 1) * sliderWidth);
                    step = $li.length;
                }
                current(step);
                $ul.stop().animate({ left: -(step - 1) * sliderWidth }, 500);
                getAdvTitle(step);
                step--;
            }
            //设置小圆点的current
            var current = function (index) {
                $(".dot-wrap li").removeClass("current");
                $(".dot-wrap li[id='dot" + index + "']").addClass("current");
                var count = $(".dot-wrap li").length == 0 ? 1 : (parseInt(index) + 1) % ($(".dot-wrap li").length + 1) == 0 ? 1 : (parseInt(index) + 1) % ($(".dot-wrap li").length + 1);
                window.adsContainer.cache('ad_index', count, { domain: 'cnki.net' });
                if (flag != true)
                    window.adsContainer.WirteAsyc();

            }
            $(".dot-wrap li").click(function () {
                flag = false;
                var index = $(this).attr("id").replace("dot", "");
                current(index);
                step = index - 1;
                var $ul = $("#slider2d-imgs > ul");
                var $li = $("#slider2d-imgs > ul li");
                var sliderWidth = $li.eq(0).width();
                $ul.stop().animate({ left: -step * sliderWidth }, 500);
            })
            //=>点击左右箭头切换图片
            if ($("body").on === undefined) {
                $("a.btn-next").die().live("click", function () { step = parseInt($(".dot-wrap li.current").attr("id").replace("dot", "")); flag = false; nextPic(); });
                $("a.btn-prev").die().live("click", function () { step = parseInt($(".dot-wrap li.current").attr("id").replace("dot", "")) - 1; flag = false; prevPic(); });
            }
            else {
                $("#slider2d-imgs a.btn-next,#slider2d-imgs a.btn-prev").off("click");
                $("#slider2d-imgs").on('click', "a.btn-next", function () { step = parseInt($(".dot-wrap li.current").attr("id").replace("dot", "")); flag = false; nextPic(); });
                $("#slider2d-imgs").on('click', "a.btn-prev", function () { step = parseInt($(".dot-wrap li.current").attr("id").replace("dot", "")) - 1; flag = false; prevPic(); });
            }
            if (window.location.pathname.toLowerCase().indexOf("/kcms") == 0) {
                var speed = 2000;
                //图片滚动
                _slide = setInterval(nextPic, speed);
                $("#slider2d-imgs").mouseenter(function () { clearInterval(_slide); flag = false; });
                $("#slider2d-imgs").mouseleave(function () { flag = true;_slide = setInterval(nextPic, speed) });
            }

            //=>获取图片标题
            function getAdvTitle(_index) {
                titText = $ul.find('li').eq(_index).find("img").attr("alt");
                $slider.find("p.title").html('<i>纸刊广告信息</i>');
            }
        },
        WirteAsyc: function () {
            var ID = '';
            if ($(".dot-wrap li.current").length > 0) {
                var liID = $(".dot-wrap li.current").attr("id").replace("dot", "");
                ID = $("#recommend ul li:eq(" + (parseInt(liID) - 1) + ") a").attr("dataid");
            }
            else
                ID = $("#recommend ul li a").attr("dataid");
            var param = "ID=" + ID + "&KM=" + (_name ? encodeURIComponent(_name) : "") + "&KeyWord=" + (_kw ? encodeURIComponent(_kw) : "") + "&type=1";
            $.ajax({
                type: "GET",
                url: url + "data/add",
                dataType: "jsonp",
                data: param,
                success: function (data) {

                }
            });
        },
        //按关键词加载图片
        //kw:关键词
        //name:期刊名
        //若同时传入关键词和期刊名，则按期刊名检索
        // KW标识关键词 KM标识刊名
        loadAds: function (kw, name) {
            if (!kw && !name)
                return;
            _kw = kw ? kw : ""; _name = name ? name : "";
            $.ajax({
                url: url + "data/get",
                type: "GET",
                dataType: "jsonp",
                data: { kw: kw, name: name },
                success: function (data) {
                    var obj = $("#recommend", window.parent.document).length == 1 ? $("#recommend", window.parent.document) : $("#recommend");
                    $(obj).html("");
                    var data2 = decodeURIComponent(data.data.replace(/\+/g, '%20'));
                    if (!!$.trim(data2)) {
                        $(obj).html(data2);
                        //if (window.location.pathname.toLowerCase().indexOf("/kcms") == 0) {
                            $(obj).prepend('<div class="font">广告<div>')
                        //}
                        if ($(obj).find("#slider2d-imgs > ul").length > 0 || $(obj).find("#slider2d-imgs  > ul li").length > 0) {
                            adsContainer.init(obj);
                        }
                        $(obj).find("div.sidebar-adv").css("display", "block");
                        var $ul = $(obj).find("#slider2d-imgs > ul");
                        var $li = $(obj).find("#slider2d-imgs > ul li");
                        var sliderWidth = $li.eq(0).width();
                        if ($ul.length > 0 && $li.length > 0) {
                            $ul.css('width', ($li.length) * sliderWidth);
                        }
                        if (window.location.pathname.toLowerCase().indexOf("/kcms") == -1) {
                            adsContainer.setpicture();
                        }
                        else {
                            var obj = $("#recommend #slider2d-imgs>ul");
                            if ($(obj).length > 0) {
                                $("#recommend  ul.dot-wrap li:eq(0)").click();
                            }
                        }
                    }
                    else {
                        $(obj).parent().removeClass("hasad");
                        $(obj).empty().hide();
                    }

                }
            });
        },
        ////设置第几个图片显示在第一位
        //setOrder: function (index) {
        //    if (!_sign)
        //        return;
        //    //var href = $("#iframeResult").contents().find("body > form ").attr("action");;
        //    //var group = GetQueryStringByName(href, "dest");
        //    //var orderby = GetQueryStringByName(href, "sorttype");
        //    //var page = GetQueryStringByName(href, "curpage");
        //    var obj = $("#recommend #slider2d-imgs>ul");
        //    if ($(obj).length > 0) {
        //        window.clearInterval(_timeclick);
        //        $("#recommend  ul.dot-wrap li:eq(" + (index - 1) + ")").click();
        //    }
        //},
        setpicture: function () {
            var index = window.adsContainer.cache('ad_index') ? parseInt(window.adsContainer.cache('ad_index')) : 1;
            if ($("#recommend #slider2d-imgs>ul>li").length > 1) {
                $("#recommend  ul.dot-wrap li:eq(" + (index - 1) + ")").click();
            }
            else {
                window.adsContainer.WirteAsyc();
            }
            var count = $(".dot-wrap li").length == 0 ? 1 : (index + 1) % ($(".dot-wrap li").length + 1) == 0 ? 1 : (index + 1) % ($(".dot-wrap li").length + 1);
            window.adsContainer.cache('ad_index', count, { domain: 'cnki.net' });
        },
        GetURL: function () {
            return url;
        },
        cache: function (name, value, options) {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            var date;
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            if (window.localStorage || window.sessionStorage) {
                if (typeof value != 'undefined') {
                    if (date) {
                        var data = { value: value, expirse: date };
                        localStorage.setItem(name, JSON.stringify(data));
                    }
                    else
                        sessionStorage.setItem(name, value);
                } else { // only name given, get cookie
                    if (date) {
                        var data = JSON.parse(localStorage.getItem(name));
                        if (data !== null) {
                            if (data.expirse != null && data.expirse < new Date().getTime()) {
                                localStorage.removeItem(name);
                            } else {
                                return data.value;
                            }
                        }
                        return null;
                    }
                    else
                        return sessionStorage.getItem(name);
                }
            }
            else {
                if (typeof value != 'undefined') {
                    var path = options.path ? '; path=' + (options.path) : '';
                    var domain = options.domain ? '; domain=' + (options.domain) : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                } else { // only name given, get cookie
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
            }
        }
    };
    window.adsContainer = adsContainer;
})(jQuery);
function WirteLog(obj) {
    var ID = $(obj).attr("dataid");
    $.ajax({
        type: "GET",
        url: window.adsContainer.GetURL() + "data/add",
        dataType: "jsonp",
        data: "ID=" + ID + "&KM=" + (_name ? encodeURIComponent(_name) : "") + "&KeyWord=" + (_kw ? encodeURIComponent(_kw) : "") + "&type=2",
        success: function (data) {

        }
    });
}

