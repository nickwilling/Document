﻿var request=false;try{request=new XMLHttpRequest()}catch(trymicrosoft){try{request=new ActiveXObject("Msxml2.XMLHTTP")}catch(othermicrosoft){try{request=new ActiveXObject("Microsoft.XMLHTTP")}catch(failed){request=false}}}if(!request){alert("Error initializing XMLHttpRequest!")}function RenderAjaxInfo(d,f,e,a,b){var c="/kcms/detail/frame/ReaderComments.aspx?flag={0}&dbcode={1}&dbname={2}&filename={3}";c=c.format(d,f,e,a);$.get(c,function(g){$("#"+b).html(g)})}function GetInfo(d,b,e,c){var a="/kcms/detail/block/mlyll.aspx?pykm={0}&year={1}&issue={2}&zwkm={3}";a=a.format(d,b,e,encodeURI(c));$.get(a,function(f){$("#ssyptable").html(f);$("#mlyll").html(f)})}function updatePageTimeBqsm(){if(request.readyState==4){if(request.status==200){var a=request.responseText;if(document.getElementById("bqsm")){document.getElementById("bqsm").innerHTML=a}}}}function RenderLMList(d,a,e,c){var b="/kcms/detail/block/JourLm.aspx?pykm={0}&year={1}&issue={2}&lm={3}";b=b.format(d,a,e,encodeURI(c));request.open("GET",b,true);request.onreadystatechange=updatePageLm;request.send(null)}function updatePageLm(){if(request.readyState==4){if(request.status==200){var a=request.responseText;document.getElementById("lmlist").innerHTML=a}}}function WriteLogForPic(a){try{log.AddCustom("lywb",a,a,0,"")}catch(b){}}function setGkfxFlag(b){var a="/kcms/detail/block/DataHandler.ashx?action=gkfxflag&pykm={0}";a=a.format(b);$.get(a,function(d){if(d){if(d=="1"){var c="<i class='icon-issue'>个刊发行</i>";$("#jpic").append(c)}}})}function setGkfxFlag2019(b){var a="/kcms/detail/block/DataHandler.ashx?action=gkfxflag&pykm={0}";a=a.format(b);$.get(a,function(d){if(d){if(d=="1"){var c="<i class='icon-issue'>个刊发行</i>";$(".top-tip").append(c)}}})}function setGkfxFlagByBm(a){if(!!a){if(a.toUpperCase().indexOf("DKFX")>-1){var b="<i class='icon-issue'>个刊发行</i>";$("#jpic").append(b)}}}function GetZqInfo(g,e,b){var a="/kcms/detail/block/ZengQiangData.aspx?filename={0}&dbname={1}&dbcode={2}";a=a.format(g,e,b);$.get(a,function(c){if(c){$("#zqfilelist").html(c);$("#lcatalog_zqfilelist").show();$("#lcatalog_divzqcl").show()}})}function GetDapuInfo(b){var a="/kcms/detail/block/DataForDapu.aspx?filename={0}";a=a.format(b);$.get(a,function(c){if(c){$("#datafilelist").html(c)}})}function GetDapuTitleInfo(b){var a="/kcms/detail/block/DataForDapu.aspx?filename={0}&type=title";a=a.format(b);$.get(a,function(c){if(c){$("#datapupart").html(c)}})}function sort(b,a){$(b).mouseenter(function(){$selectList=$(this).find("ul");$selectList.show();$selectList.find("a").click(function(){$selectList.siblings().find("span").html($(this).html());$(this).parent().addClass(a).siblings().removeClass(a);$selectList.hide()})}).mouseleave(function(){$selectList.hide()})}function GetYxInfoN(g,e,b){var a="/kcms/detail/block/YouXianData.aspx?filename={0}&dbname={1}&dbcode={2}";a=a.format(g,e,b);$.get(a,function(c){if(c){$(".otherversions").html(c);$(".otherversions").show()}})}function GetSfZhengShu(h,g,e,b){if(!h||!b){return}var a="/kcms/detail/block/DataHandler.ashx?action=sfzhegnshu&filename={0}&dbname={1}&dbcode={2}";a=a.format(h,g,e);$.get(a,function(i){if(i){if(i.length<7){return}var c="//c61.cnki.net/cjfd/certificate/"+b+"/"+i.substring(0,6)+"/"+i+".pdf";var f="<a href='"+c+"' target='_blank' class='btn-sf'>网络首发证书下载<i></i></a>";var d="<div class='head-tag'>"+f+"</div>";if($(".head-tag").length>0){$(".head-tag").append(f)}else{$(".wxmain").prepend(d)}}})}function downFiles(e){if(!e){alert("请先登录系统。");return}var c=$("#fns").val();if(!c){alert("请选择要下载的文件。");return}var f=c.split(";");for(var b=0;b<f.length;b++){var a=f[b];if(!a){continue}var d="//kns.cnki.net/KXReader/Detail/GetImg?filename={0}&uid={1}";d=d.format(f[b],e);downByForm(d)}}function downByForm(a){var b=document.createElement("form");b.id="tempForm";b.action=a;b.target="_blank";b.method="post";document.body.appendChild(b);b.submit();document.body.removeChild(b)}function checkAll(){if($("#selectCheckbox").attr("checked")){$(":checkbox").attr("checked",true)}else{$(":checkbox").attr("checked",false)}setFnsValue()}function setFnsValue(){$("#fns").val("");var a="";$(":checkbox").each(function(){if($(this).attr("checked")){if($(this).attr("name")=="FileNameS"){a+=$(this).val()+";"}}else{$("#selectCheckbox").attr("checked",false)}});$("#fns").val(a);if(AllCheck()){$("#selectCheckbox").attr("checked",true)}}function AllCheck(){var a=true;$(":checkbox").each(function(){if(!$(this).attr("checked")&&$(this).attr("id")!="selectCheckbox"){a=false}});return a}function remoteLastComma(b){var a=$("#"+b).val();a=a.replace(/\ +/g,"");a=a.replace(/[ ]/g,"");a=a.replace(/[\r\n]/g,"");a=a.substring(0,a.length-1);document.write(a)};