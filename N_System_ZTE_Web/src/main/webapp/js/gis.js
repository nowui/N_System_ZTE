var sceneControl = null;
var scene = null;
var htmlUrl = document.location.host;
//判断网页的打开方式是本地打开还是通过网络打开
//不同的打开方式url赋值不同
//var htmlUrl = "http://10.45.26.42:8090";
var htmlUrl = "http://122.96.155.202:18129";
var sceneUrl= htmlUrl + "/iserver/services/3D-RealspaceSample/rest/realspace";

function onPageLoad() {
    //初始化三维场景控件

    //sceneControl = new SuperMap.Web.UI.Controls.SceneControl($get("map"), initCallback, failedCallback);


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

 	//var bound = new SuperMap.Bounds(116.203953, 39.523575, 116.212675, 39.535796);
   //  scene.get_flyingOperator().flyToBounds(bound);

    //获取Realspace控件的场景，控件和场景是一对一的捆绑关系
    scene = sceneControl.get_scene();


}

//控件初始化失败后的回调函数
function failedCallback() {
    alert("Realspace initialized failed!");
}