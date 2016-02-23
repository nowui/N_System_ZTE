var sceneControl = null;
var scene = null;
var htmlUrl = document.location.host;
//判断网页的打开方式是本地打开还是通过网络打开
//不同的打开方式url赋值不同
var flyManager = null;
var flyRoutes = null;
var flyRoute = null;
var routeLoaded = false;
var htmlUrl = "http://10.45.26.42:8090";
//var htmlUrl = "http://122.96.155.202:18129";
var serverUrl = "http://10.45.34.178:8080";
var sceneUrl= htmlUrl + "/iserver/services/3D-RealspaceSample/rest/realspace";
//var sceneUrl= htmlUrl + "/iserver/services/3D-zhixinghai/rest/realspace";

function onPageLoad() {
    //初始化三维场景控件

    sceneControl = new SuperMap.Web.UI.Controls.SceneControl($get("map"), initCallback, failedCallback);


}

//控件初始化完成后的回调函数，初始化完成之后才能进行数据加载
function initCallback() {
	scene = sceneControl.get_scene();
	//指定场景的服务器地址
	var sceneAddress = sceneUrl;

	//指定图层名称
	var sceneName = "scene";

	//打开场景
	scene.open(sceneAddress, sceneName);
	//获取场景中的图层

	//var bound = new SuperMap.Bounds(93.13015833333333, 39.786830555555554, 93.13015833333333, 39.786830555555554);
	//scene.get_flyingOperator().flyToBounds(bound);

	flyManager = scene.get_flyManager();
	setFilePath();

	return;

    //获取Realspace控件的场景，控件和场景是一对一的捆绑关系
    scene = sceneControl.get_scene();

	var myAction = new SuperMap.Web.UI.Action3Ds.DrawPlacemarkAction(sceneControl);
	sceneControl.set_sceneAction(myAction);

	//setTimeout("countSec()", 1000)

	//setFilePath();
}

//控件初始化失败后的回调函数
function failedCallback() {
    alert("Realspace initialized failed!");
}

//获取飞行文件路径
function getFilePath() {
    return  serverUrl+"/fx1.fpf";  //读取飞行文件
}

function setFilePath() {
    if (flyManager != null) {
        if (flyManager.get_flyStatus() == SuperMap.Web.Realspace.FlyStatus.FSTOP) {
            //获取飞行路线
            flyRoutes = flyManager.get_routes();
            if (flyRoutes != null) {
                var filePath = getFilePath();
                if (flyRoutes.fromFile(filePath) == false) {
                    return false;
                }

                flyRoute = flyRoutes.get_currentRoute();

                routeLoaded = true;
            }
        }
    } else {
        return false;
    }
}

function play() {
    //判断路径是否已加载。
    if (routeLoaded) {
        if (flyManager == null && flyRoutes == null &&
flyManager.get_flyStatus() == SuperMap.Web.Realspace.FlyStatus.FPLAY) {
            return;
        }
        else {

            flyManager.play();

        }
    }
}