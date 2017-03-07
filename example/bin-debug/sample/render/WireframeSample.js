/**
 * 线框渲染
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WireframeSample = (function () {
    function WireframeSample() {
        StageMgr.Instance().init();
        this.init();
    }
    WireframeSample.prototype.init = function () {
        var geom = new egret3d.CubeGeometry(100, 100, 100);
        var wf = new egret3d.Wireframe();
        wf.fromGeometry(geom);
        wf.fromVertexs(egret3d.VertexFormat.VF_POSITION);
        StageMgr.Instance().view3d.addChild3D(wf);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    WireframeSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    WireframeSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return WireframeSample;
}());
__reflect(WireframeSample.prototype, "WireframeSample");
//# sourceMappingURL=WireframeSample.js.map