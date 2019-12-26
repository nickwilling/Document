!(function WriteADs()
{
	try
	{
		var uniqueScriptFileName="R018.js?";
		var zhuantiParamsName="sc";
		var adsHtml="<div class='bdazhong-ad1' style='margin-right:11px; float:left;'><a href='http://bianke.cnki.net/' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0911/636492807389020010.jpg' border='0' width='252' height='80' alt='新版知网节底部左侧栏位'></a></div>"
		+"<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://mall.cnki.net/Xinke/web/Info/DZ1907040017' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2019/0902/2019090216097812.jpg' border='0' width='635' height='80' alt='新版知网节底部中间栏位'></a></div>"
		+"<div class='bdazhong-ad3' style='float:left;'><a href='http://saishi.cnki.net/Home/Exam' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0911/636492807389020009.jpg' border='0' width='290' height='80' alt='新版知网节底部右侧栏位'></a></div>";
		//"B014;B015;B016;B020;B027;C030;C031;C041;C042;E066;E068;E069;E072;E077;E079;I136;I138;I139;I140;J159;J160;J161;J162;";//suzhourencai
		var PutAdsZTCodes=new Array();//jiangsuxianfengnami，"B014;B020;";
		PutAdsZTCodes[0]="XiaJia";//"B014";//第1个用户投放的专题
		PutAdsZTCodes[1]="D043;D046;";//第2个用户投放的专题
		PutAdsZTCodes[2]="A006;B014;B017;C029;C030;C039;C041;E059;E069;E072;E074;I135;I136;I138;I140;J153;J154;";//第3个用户投放的17个专题
		/* PutAdsZTCodes[3]="G105;";//第4个用户投放的G105专题
		PutAdsZTCodes[4]="G106;";//第4个用户投放的G106专题
		PutAdsZTCodes[5]="G108;";//第4个用户投放的G108专题
		PutAdsZTCodes[6]="G110;";//第4个用户投放的G110专题
		PutAdsZTCodes[7]="G111;";//第4个用户投放的G111专题 */
		
		
		var PutAdsZTCodesHtml=new Array();
		//第1个用户投放的广告的HTML
		PutAdsZTCodesHtml[0]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.xfnano.com/' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0124/636495295715312501.jpg' border='0' width='635' height='80' alt='江苏先丰纳米'></a></div>";
		//第2个用户投放的广告的HTML
		PutAdsZTCodesHtml[1]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.dianjiangtech.com/' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0411/636495295715312502.jpg' border='0' width='635' height='80' alt='点将科技'></a></div>";
		 //第3个用户投放的I138广告的HTML
		PutAdsZTCodesHtml[2]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://vpop.phoemix.net/rcb.html' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2019/0325/636492807389020120.jpg' border='0' width='635' height='80' alt='人才'></a></div>";
		/*//第4个用户投放的G105广告的HTML
		PutAdsZTCodesHtml[3]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.58pic.com/tupian/dangjian-808-0.html?tid=5525' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0425/636495295710425105.jpg' border='0' width='635' height='80' alt='小展板服务大党建'></a></div>";
		//第4个用户投放的G106广告的HTML
		PutAdsZTCodesHtml[4]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.58pic.com/tupian/dangjian-808-0.html?tid=5525' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0425/636495295710425106.jpg' border='0' width='635' height='80' alt='党风带新风'></a></div>";
		//第4个用户投放的G108广告的HTML
		PutAdsZTCodesHtml[5]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.58pic.com/tupian/dangjian-808-0.html?tid=5525' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0425/636495295710425108.jpg' border='0' width='635' height='80' alt='党建文档资料'></a></div>";
		//第4个用户投放的G110广告的HTML
		PutAdsZTCodesHtml[6]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.58pic.com/tupian/dangjian-808-0.html?tid=5525' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0425/636495295710425110.jpg' border='0' width='635' height='80' alt='最新党建文库模板'></a></div>";
		//第4个用户投放的G111广告的HTML
		PutAdsZTCodesHtml[7]="<div class='bdazhong-ad2' style='margin-right:12px; float:left;'><a href='http://www.58pic.com/tupian/dangjian-808-0.html?tid=5525' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0425/636495295710425111.jpg' border='0' width='635' height='80' alt='原创党建工作ppt'></a></div>";
 */


		var CurrZTCodes=GetScriptSrcQueryString(uniqueScriptFileName,zhuantiParamsName);
		if(CurrZTCodes)
		{
			var CurrZTCodeArray=CurrZTCodes.split(';');
			
			var isPut=false;
			for(var m=0;m<PutAdsZTCodes.length;m++)
			{
				for(var i=0;i<CurrZTCodeArray.length;i++)
				{
					var curCode=CurrZTCodeArray[i];
					if(curCode=="")
					continue;
					if(PutAdsZTCodes[m].indexOf(curCode)>-1)
					{
						isPut=true;
						break;
					}
				}
				if(isPut)
				{		
					adsHtml ="<div class='bdazhong-ad1' style='margin-right:11px; float:left;'><a href='http://bianke.cnki.net/' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0911/636492807389020010.jpg' border='0' width='252' height='80' alt='新版知网节底部左侧栏位'></a></div>"
							+PutAdsZTCodesHtml[m]
							+"<div class='bdazhong-ad3' style='float:left;'><a href='http://saishi.cnki.net/Home/Exam' target='_blank'><img src='//qiangguo.cnki.net/adfiles/ad/2018/0911/636492807389020009.jpg' border='0' width='290' height='80' alt='新版知网节底部右侧栏位'></a></div>";
							
					break;
				}
			}

			
		}	
		//var cnzz_protocol = (('https:' == document.location.protocol) ? ' https://' : ' http://');
		//adsHtml+="<div style='display:none;'><span id='cnzz_stat_icon_3258975'></span><script src='" + cnzz_protocol + "s22.cnzz.com/stat.php?id=3258975&show=pic1' type='text/javascript'></script></div>";
		document.write(adsHtml);

	}
	catch(e)
	{}

})();

function GetScriptSrcQueryString(jsfilename,name)
{
	if (name==null ||name=="")
	return null;
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var dscriptSrc=FindScriptSrc(jsfilename);
     var scriptsrc= dscriptSrc.substr(dscriptSrc.indexOf("?")+1);
     var r = scriptsrc.match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function FindScriptSrc(jsfilename)
{
	var src="";
	var scriptArr=document.scripts;
	for(var i=0;i<scriptArr.length;i++)
	{
		if(scriptArr[i].src.indexOf(jsfilename)>-1)
		{
			src=scriptArr[i].src;
			break;
		}
	}
	return src;

}
