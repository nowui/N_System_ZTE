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
//var serverUrl = "http://10.45.34.178:8080";
var serverUrl = "http://localhost:8080/zte";
//var sceneUrl= htmlUrl + "/iserver/services/3D-RealspaceSample/rest/realspace";
var sceneUrl= htmlUrl + "/iserver/services/3D-zhixinghai/rest/realspace";

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

	//var bound = new SuperMap.Bounds(-89, 89, -90, 90);
	//scene.get_flyingOperator().flyToBounds(bound);

	flyManager = scene.get_flyManager();
	setFilePath();

	addHeader();

	addFooter();

    //获取Realspace控件的场景，控件和场景是一对一的捆绑关系
    scene = sceneControl.get_scene();

	//var myAction = new SuperMap.Web.UI.Action3Ds.DrawPlacemarkAction(sceneControl);
	//sceneControl.set_sceneAction(myAction);

	//setTimeout("countSec()", 1000);

	//var dranAction = new SuperMap.Web.UI.Action3Ds.DranAction(sceneControl);
    //sceneControl.set_sceneAction(dranAction);
}

//控件初始化失败后的回调函数
function failedCallback() {
    alert("Realspace initialized failed!");
}

//获取飞行文件路径
function getFilePath() {
    return  serverUrl+"/fx22.fpf";  //读取飞行文件
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
        if (flyManager == null && flyRoutes == null && flyManager.get_flyStatus() == SuperMap.Web.Realspace.FlyStatus.FPLAY) {
            return;
        } else {
            flyManager.play();

        }
    }
}

function addHeader() {
    //创建图片对象
    var pic = new SuperMap.Web.Core.GeoPicture3D();
    //指定图片的网络地址
    var style = new SuperMap.Web.Core.Style3D();
    var pictureurl = serverUrl+ "/image/header_background.png";
    pic.fromImageFile(pictureurl);

    //style.set_fillForeColor(255,255,255,0.5);

    //设置图片的大小和位置，屏幕图层有两种单位：像素和比例。这里以像素为单位
    pic.set_width(1920);
    pic.set_height(110);
    pic.set_position(new SuperMap.Web.Core.Point3D(960, -12, 0));

    //屏幕图层中只能加feature3D，所以这里得把geometry构造成feature3D对象
    var feature3d = new SuperMap.Web.Core.Feature3D();
    feature3d.set_geometry(pic);

    var screenLayer = scene.get_screenLayer3D();
    //设置屏幕图层的单位为像素
    screenLayer.set_yUnit(SuperMap.Web.Realspace.ScreenCoordinateUnit.PIXEL);
    //设置屏幕图层可见
    screenLayer.set_isVisible(true);
    //将feature3D加入屏幕图层
    screenLayer.add(feature3d, "SuperMap");

}

function addFooter() {
    //创建图片对象
    var pic = new SuperMap.Web.Core.GeoPicture3D();
    //指定图片的网络地址
    var style = new SuperMap.Web.Core.Style3D();
    var pictureurl = serverUrl+ "/image/footer_background.png";
    pic.fromImageFile(pictureurl);

    //style.set_fillForeColor(255,255,255,0.5);

    //设置图片的大小和位置，屏幕图层有两种单位：像素和比例。这里以像素为单位
    pic.set_width(1920);
    pic.set_height(37);
    pic.set_position(new SuperMap.Web.Core.Point3D(960, 992, 0));

    //屏幕图层中只能加feature3D，所以这里得把geometry构造成feature3D对象
    var feature3d = new SuperMap.Web.Core.Feature3D();
    feature3d.set_geometry(pic);

    var screenLayer = scene.get_screenLayer3D();
    //设置屏幕图层的单位为像素
    screenLayer.set_xUnit(SuperMap.Web.Realspace.ScreenCoordinateUnit.PIXEL);
    //设置屏幕图层可见
    screenLayer.set_isVisible(true);
    //将feature3D加入屏幕图层
    screenLayer.add(feature3d, "SuperMap");

}

//通过继承SceneAction的方式来扩展用户的Action，继承方式采用框架提供的格式
//扩展Action的构造函数
SuperMap.Web.UI.Action3Ds.DranAction = function (sceneControl) {
    ///<param name="sceneControl" type="SuperMap.Web.UI.Controls.SceneControl"></param>
    SuperMap.Web.UI.Action3Ds.DranAction.initializeBase(this);

    this._name = "DranAction";

    this._sceneControl = sceneControl;

    //对应的场景操作类型为漫游
    this._type = SuperMap.Web.UI.Action3Ds.SceneActionType.POINTSELECT;

};

//扩展Action的属性和方法
SuperMap.Web.UI.Action3Ds.DranAction.prototype = {
    /*
     * 析构方法
     */
    dispose: function () {
        ///<returns type="void"></returns>
        this._sceneControl = null;
    },

    /*
     * 鼠标单击方法
     */
    onMouseDown: function (e) {

        var x = e.get_clientX();
        var y = e.get_clientY();

		var point = new SuperMap.Pixel(x, y);

        var select = scene.get_trackingLayer3D().hitTest(point);

		if(select == null) {

		} else {
			var value = "";
			var name = select.get_name();

			var a = name.indexOf("a");
			var b = name.indexOf("b");
			var c = name.indexOf("c");
			var d = name.indexOf("d");

			if(a > -1) {
				value = "a";
			}

			if(b > -1) {
				value = "b";
			}

			if(c > -1) {
				value = "c";
			}

			if(d > -1) {
				value = "d";
			}

			showCenterMenu(value, name.split("_")[1]);
		}
    }
};
SuperMap.Web.UI.Action3Ds.DranAction.registerClass('SuperMap.Web.UI.Action3Ds.DranAction', SuperMap.Web.UI.Action3Ds.SceneAction, Sys.IDisposable);