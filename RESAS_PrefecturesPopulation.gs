////////////////////////////////////////////////////////////////
//  RESAS_PrefecturesPopulation

//e.parameter.year    =1980 ~ 2040 //pre:5year
//e.parameter.prefCode=   1 ~   47 //北海道 ~ 沖縄

function doGet(e) {
  var domain = "https://opendata.resas-portal.go.jp/";
  var populationpyramid_api = "api/v1/population/composition/pyramid?";
  var debugmode = 1;
  if(debugmode){
    var year     = "yearRight="+ e.parameter.year + "&yearLeft=" + e.parameter.year;
    var prefCode = "prefCode=" + e.parameter.prefCode + "&";
  }else{
    var year     = "yearRight="+ 1980 + "&yearLeft=" + 1980;
    var prefCode = "prefCode=" + 1 + "&";
  }
  var url = domain + populationpyramid_api + year + prefCode;
  var params = {
     "method"  : "get",
     "headers" : {'X-API-KEY': PropertiesService.getScriptProperties().getProperty("API_KEY")},
  };
  var response = UrlFetchApp.fetch(url,params);
  var json = JSON.parse(response.getContentText());
  var i = 0;
  var output = "";
  while(i < 19){
    output += "$$" + json["result"]["yearLeft"]["data"][i]["class"] + 
              "men:" + json["result"]["yearLeft"]["data"][i]["man"] + 
              "wemen:" + json["result"]["yearLeft"]["data"][i]["woman"];
    i++;
  }
  console.log(output);
  return output;
}

//$$0～4歳men:208437wemen:199061$$5～9歳men:238711wemen:226566$$10～14歳men:217367wemen:208182$$15～19歳men:209528wemen:200572$$20～24歳men:185415wemen:191405$$25～29歳men:223093wemen:236955$$30～34歳men:252957wemen:267680$$35～39歳men:204233wemen:220272$$40～44歳men:196248wemen:205548$$45～49歳men:198635wemen:196417$$50～54歳men:174360wemen:173230$$55～59歳men:126069wemen:146934$$60～64歳men:97925wemen:116332$$65～69歳men:81875wemen:94160$$70～74歳men:59491wemen:69525$$75～79歳men:36898wemen:46893$$80～84歳men:17393wemen:25470$$85～89歳men:5699wemen:9760$$90歳～men:1347wemen:3216

