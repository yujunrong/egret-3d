﻿module egret3d {


    /**
    * @language zh_CN
    * @class egret3d.Input
    * @classdesc
    * 触摸事件信息参数。
    * 作为触摸事件基本参数保存于TouchEvent3D，
    * @see egret3d.TouchEvent3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TouchData {

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(touch: Touch) {
            this.canvasX = Input.getX(touch.clientX)// - Input.canvas.x + Input.canvas.offsetX;
            this.canvasY = Input.getY(touch.clientY)// - Input.canvas.y + Input.canvas.offsetY;
            this.identifier = touch.identifier;
            this.clientX = touch.clientX;
            this.clientY = touch.clientY;
            this.pageX = touch.pageX;
            this.pageY = touch.pageY;
            this.screenX = touch.screenX;
            this.screenY = touch.screenY;
        }

        /**
       * @language zh_CN
       * 相对于Stage3D左上角位置的水平偏移量。
       * 基于 Stage3D 的x坐标
       * @see egret3d.Stage3D
       * @version Egret 3.0
       * @platform Web,Native
       */
        public canvasX: number;
        /**
        * @language zh_CN
        * 相对于Stage3D左上角位置的垂直偏移量。
        * 基于 Stage3D 的y坐标
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public canvasY: number;

        /**
        * @language zh_CN
        * touch id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public identifier: number;

        /**
       * @language zh_CN
       * 相对于浏览器内容区域左上角位置的水平偏移量，该参照点会随之滚动条的移动而移动。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public clientX: number;
        /**
        * @language zh_CN
        * 相对于浏览器内容区域左上角位置的垂直偏移量，该参照点会随之滚动条的移动而移动。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clientY: number;
        /**
      * @language zh_CN
      * 相对于浏览器内容区域左上角位置的水平偏移量，该参照点不会随之滚动条的移动而移动。
      * @version Egret 3.0
      * @platform Web,Native
      */
        public pageX: number;
        /**
        * @language zh_CN
        * 相对于浏览器内容区域左上角位置的垂直偏移量，该参照点不会随之滚动条的移动而移动。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pageY: number;
        /**
     * @language zh_CN
     * 相对于用户屏幕左上角位置的水平偏移量。
     * @version Egret 3.0
     * @platform Web,Native
     */
        public screenX: number;
        /**
      * @language zh_CN
      * 相对于用户屏幕左上角位置的垂直偏移量。
      * @version Egret 3.0
      * @platform Web,Native
      */
        public screenY: number;
    }

    /**
     * @language zh_CN
     * @class egret3d.Input
     * @classdesc
     * 处理输入设备,鼠标.键盘.触摸。
     * 当点事件产生时如果没有点击到任何的View3D内，
     * 当前事件将不用派发.
     * @includeExample input/Input.ts
     * @see egret3d.EventDispatcher
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Input extends EventDispatcher {

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static canvas: Stage3D;

        public static scaleX:number = 1;

        public static scaleY:number = 1;

        public static getX(value:number):number {
            return (value - Input.canvas.x + Input.canvas.offsetX) / Input.scaleX;
        }

        public static getY(value:number):number {
            return (value - Input.canvas.y + Input.canvas.offsetY) / Input.scaleY;
        }

        /**
        * @language zh_CN
        * 当前鼠标X坐标。
        * 基于 Stage3D 的x坐标
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseX: number = 0;

        /**
        * @language zh_CN
        * 当前鼠标Y坐标。
        * 基于 Stage3D 的y坐标
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseY: number = 0;

        /**
        * @language zh_CN
        * 鼠标滚轮增量值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static wheelDelta: number = 0;

        /**
        * @language zh_CN
        * 鼠标X坐标的偏移值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseOffsetX: number = 0;

        /**
        * @language zh_CN
        * 鼠标Y坐标的偏移值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseOffsetY: number = 0;

        /**
        * @language zh_CN
        * 上一次鼠标X坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseLastX: number = 0;

        /**
        * @language zh_CN
        * 上一次鼠标Y坐标。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mouseLastY: number = 0;

        private _time: number = 0;

        private _keyStatus: { [key: number]: boolean; } = {};
        private _mouseStatus: { [key: number]: boolean; } = {};
        private _isTouchStart: boolean = false;
        protected _mouseEvent3d: MouseEvent3D = new MouseEvent3D();
        protected _keyEvent3d: KeyEvent3D = new KeyEvent3D();
        protected _touchEvent3d: TouchEvent3D = new TouchEvent3D();
        protected _windowsEvent3d: Event3D = new Event3D();
        protected _orientationEvent3d: OrientationEvent3D = new OrientationEvent3D();

        /**
        * @language zh_CN
        * 游戏手柄Stick1事件侦听函数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        private onGamepadStick1: Function = null;

        /**
        * @language zh_CN
        * 游戏手柄Stick2事件侦听函数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        private onGamepadStick2: Function = null;

        private static _instance: Input = null;

        /**
        * @language zh_CN
        * 获取Input类对象的单例。
        * @returns Input
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static get instance(): Input {
            if (this._instance == null) {
                this._instance = new Input();
            }
            return this._instance;
        }

        /**
        * @language zh_CN
        * 创建一个新的 Input 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            window.addEventListener("click", (e: MouseEvent) => {!this.disableWindowTouch && this.mouseClick(e)}, true);

            window.addEventListener("mousedown", (e: MouseEvent) => {!this.disableWindowTouch && this.mouseStart(e)}, true);

            window.addEventListener("mouseup", (e: MouseEvent) => {!this.disableWindowTouch && this.mouseEnd(e)}, true);

            window.addEventListener("mousewheel", (e: MouseWheelEvent) => {!this.disableWindowTouch && this.mouseWheel(e)}, true);



            window.addEventListener("mousemove", (e: MouseEvent) => {!this.disableWindowTouch && this.mouseMove(e)}, true);

            window.addEventListener("mouseover", (e: MouseEvent) => {!this.disableWindowTouch && this.mouseOver(e)}, true);

            window.addEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e), true);

            window.addEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e), true);

            if (this.canGame()) {
                window.addEventListener("gamepadconnected", (e: GamepadEvent) => this.ongamepadconnected(e), true);

                window.addEventListener("gamepaddisconnected", (e: GamepadEvent) => this.ongamepaddisconnected(e), true);
            }

            window.addEventListener("touchstart", (e: TouchEvent) => {!this.disableWindowTouch && this.touchStart(e)}, true);

            window.addEventListener("touchend", (e: TouchEvent) => {!this.disableWindowTouch && this.touchEnd(e)}, true);

            window.addEventListener("touchmove", (e: TouchEvent) => {!this.disableWindowTouch && this.touchMove(e)}, true);

            window.addEventListener("touchcancel", (e: TouchEvent) => {!this.disableWindowTouch && this.touchEnd(e)}, true);

            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e), true);
            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e), true);

            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e), true);
            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e), true);

            //window.addEventListener("resize", (e: UIEvent) => this.onWindowsResize(e));
            window.addEventListener("resize", (e: UIEvent) => this.onWindowsResize(e), true);

            //window.addEventListener("orientationchange", (e: Event) => this.onOrientationChange(e), true);

            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.onDeviceMotion(e), true);

            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.onDeviceOrientation(e), true);


        }

        private disableWindowTouch:boolean = false;
        public init(canvas:HTMLCanvasElement) {
            this.disableWindowTouch = true;
            // window.removeEventListener("click", (e: MouseEvent) => this.mouseClick(e), true);
            // window.removeEventListener("mousedown", (e: MouseEvent) => this.mouseStart(e), true);
            // window.removeEventListener("mouseup", (e: MouseEvent) => this.mouseEnd(e), true);
            // window.removeEventListener("mousewheel", (e: MouseWheelEvent) => this.mouseWheel(e), true);
            // window.removeEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e), true);
            // window.removeEventListener("mouseover", (e: MouseEvent) => this.mouseOver(e), true);
            // window.removeEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e), true);
            // window.removeEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e), true);
            // window.removeEventListener("touchstart", (e: TouchEvent) => this.touchStart(e), true);
            // window.removeEventListener("touchend", (e: TouchEvent) => this.touchEnd(e), true);
            // window.removeEventListener("touchmove", (e: TouchEvent) => this.touchMove(e), true);
            // window.removeEventListener("touchcancel", (e: TouchEvent) => this.touchEnd(e), true);

            canvas.addEventListener("click", (e: MouseEvent) => this.mouseClick(e), false);
            canvas.addEventListener("mousedown", (e: MouseEvent) => this.mouseStart(e), false);
            canvas.addEventListener("mouseup", (e: MouseEvent) => this.mouseEnd(e), false);
            canvas.addEventListener("mousewheel", (e: MouseWheelEvent) => this.mouseWheel(e), false);
            canvas.addEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e), false);
            canvas.addEventListener("mouseover", (e: MouseEvent) => this.mouseOver(e), false);
            // canvas.addEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e), false);
            // canvas.addEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e), false);
            canvas.addEventListener("touchstart", (e: TouchEvent) => this.touchStart(e), false);
            canvas.addEventListener("touchend", (e: TouchEvent) => this.touchEnd(e), false);
            canvas.addEventListener("touchmove", (e: TouchEvent) => this.touchMove(e), false);
            canvas.addEventListener("touchcancel", (e: TouchEvent) => this.touchEnd(e), false);
        }



        /**
        * @language zh_CN
        * 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件和优先级注册事件侦听器。
        * 成功注册一个事件侦听器后，不使用后 需要removeEventListenerAt(). 
        * @param type {string} 事件的类型。
        * @param callback {Function} 处理事件的侦听器函数。此函数必须接受 Event3D 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event3D):void 函数可以有任何名称。
        * @param param 事件携带参数
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        * @returns 事件ID 返回值 removeEventListenerAt 时会用到
         * @version Egret 3.0
         * @platform Web,Native
        */
        public static addEventListener(type: string, callback: Function, thisObject: any, param: any = null, priolity: number = 0): number {
            return Input.instance.addEventListener(type, callback, thisObject, param, priolity);
        }


        public addEventListener(type: string, callback: Function, thisObject: any, param: any = null, priority: number = 0): number {

   

            if (type == OrientationEvent3D.ORIENTATION_CHANGE && !this.containEventListener(OrientationEvent3D.ORIENTATION_CHANGE)) {
                window.addEventListener("orientationchange", (e: Event) => this.onOrientationChange(e), true);
            }
            else if (type == OrientationEvent3D.DEVICE_MOTION && !this.containEventListener(OrientationEvent3D.DEVICE_MOTION)) {
                window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.onDeviceMotion(e), true);

            }
            else if (type == OrientationEvent3D.DEVICE_ORIENTATION && !this.containEventListener(OrientationEvent3D.DEVICE_ORIENTATION)) {
                window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.onDeviceOrientation(e), true);
            }

            var id = super.addEventListener(type, callback, thisObject, param, priority);
            return id;
        }


        /**
         * @language zh_CN
         * 根据addEventListener传入的事件数据信息,移除事件侦听器。
         * @param type {string} 事件名。
         * @param callback {Function} 侦听函数。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static removeEventListener(type: string, callback: Function, thisObject: any): void {
            Input.instance.removeEventListener(type, callback, thisObject);
        }

        /**
         * @language zh_CN
         * 根据addEventListener 的返回值,移除事件侦听器。
         * @param id  事件id, addEventListener 的返回值.
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static removeEventListenerAt(id: number): void {
            Input.instance.removeEventListenerAt(id);
        }

        /**
        * @private
        * @language zh_CN
        * 获取按键是否压下
        * @param code  
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static getKeyPress(code: KeyCode): boolean {
            return Input.instance._keyStatus[code];
        }

        /**
        * @private
        * @language zh_CN
        * 获取鼠标是否压下
        * @param code  
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static getMousePress(code: MouseCode): boolean {
            return Input.instance._mouseStatus[code];
        }

        private _gp: boolean = false;
        private ongamepaddisconnected(e: GamepadEvent) {
            //Debug.instance.trace("Gamepad disconnected!");
            this._gp = false;
        }
        private ongamepadconnected(e: GamepadEvent) {
            //Debug.instance.trace("Gamepad connected!");
            this._gp = true;
        }

        /**
        * @language zh_CN
        * 游戏手柄按钮是否按下。
        * @version Egret 3.0
        * @platform Web,Native
        * @param index {number}
        * @returns {boolean}
        */
        private getGamepadButtonState(index: number): boolean {
            return navigator.getGamepads()[0].buttons[index].pressed;
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick1 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3}
        */
        private getGamepadStick1(): Vector3 {
            return new Vector3(navigator.getGamepads()[0].axes[0], navigator.getGamepads()[0].axes[1], 0);
        }

        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick2 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3}
        */
        private getGamepadStick2(): Vector3 {
            return new Vector3(navigator.getGamepads()[0].axes[2], navigator.getGamepads()[0].axes[3], 0);
        }



        private canGame(): boolean {
            return "getGamepads" in navigator;
        }


        /**
        * @private
        * @language zh_CN
        * 更新游戏手柄信息。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static reportOnGamepad() {
            if (Input.instance.canGame() && Input.instance._gp) {

                if (Input.instance.onGamepadStick1 != null) {
                    Input.instance.onGamepadStick1(Input.instance.getGamepadStick1());
                }

                if (Input.instance.onGamepadStick2 != null) {
                    Input.instance.onGamepadStick2(Input.instance.getGamepadStick2());
                }

                //for (var i: number = 0; i < Input.instance._listenerGamepadButtons.length; ++i) {
                //    Input.instance._listenerGamepadButtons[i].callback.call(Input.instance._listenerGamepadButtons[i].thisObject, Input.instance.getGamepadButtonState(i));
                //}
            }
        }

        private printout(): void {

            var html = "";
            html += "id: " + navigator.getGamepads()[0].id + "<br/>";
            var len: number = navigator.getGamepads()[0].buttons.length;
            for (var i: number = 0; i < len; i++) {
                html += "Button " + (i + 1) + ": ";
                if (this.getGamepadButtonState(i)) html += " pressed";
                html += "<br/>";
            }

            var v: Vector3 = this.getGamepadStick1();

            html += "Stick 1" + ": " + v.x + "," + v.y + "<br/>";

            v = this.getGamepadStick2();
            html += "Stick 2" + ": " + v.x + "," + v.y + "<br/>";

            //Debug.instance.trace(html);
        }

        //private detectShake(evt: DeviceMotionEvent) {

        //    var accl = evt.acceleration; //acceleration 排除重力影响的加速度  accelerationIncludingGravity(含重力的加速度)
        //    //x、y 和 z 轴方向加速
        //    if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {

        //    } else {

        //    }

        //    //if (this._ondevicemotion && this._ondevicemotion.length > 0) {

        //    //    var x: number = Math.ceil(accl.x * 1000) / 1000;
        //    //    var y: number = Math.ceil(accl.y * 1000) / 1000;
        //    //    var z: number = Math.ceil(accl.z * 1000) / 1000;

        //    //    this._ondevicemotion[0](x, y, z);
        //    //}
        //}

        //private _caheX: number;
        //private _caheY: number;
        //private _caheZ: number;

        //private _delayX: number;
        //private _delayY: number;
        //private _delayZ: number;
        //private _first: boolean = true;
        //private _initAngle: Vector3 = new Vector3();
        //private ondeviceorientation(e: DeviceOrientationEvent) {
        //    //alpha rotation around the z-axis  between 0 and 360 degrees 
        //    //在围绕 z 轴旋转时（即左右旋转时），y 轴的度数差 0 到 360度 。
        //    //beta Rotation around the x-axis cause the beta angle to change. The range of beta is between -180 and 180 degrees 
        //    //在围绕 x 轴旋转时（即前后旋转时），z 轴的度数差 -180到180度。  
        //    //gamma The gamma angle is associated with the y-axis between -90 and 90 degrees 
        //    //在围绕 y 轴旋转时（即扭转设备时），z 轴的度数差 -90到90度。  


        //    //if (this._ondeviceorientation && this._ondeviceorientation.length > 0) {

        //    //    var alpha: number = Math.round(e.alpha * 100) * 0.01;
        //    //    var beta: number = Math.round(e.beta * 100) * 0.01;
        //    //    var gamma: number = Math.round(e.gamma * 100) * 0.01;

        //    //    if (this._first) {
        //    //        this._initAngle["x"] = alpha;
        //    //        this._initAngle["y"] = beta;
        //    //        this._initAngle["z"] = gamma;
        //    //    }

        //    //    this._delayX = alpha - this._caheX;
        //    //    this._delayY = beta - this._caheY;
        //    //    this._delayZ = gamma - this._caheZ;

        //    //    this._caheX = alpha;
        //    //    this._caheY = beta;
        //    //    this._caheZ = gamma;

        //    //    this._initAngle.x += this._delayX;
        //    //    this._initAngle.y += this._delayY;
        //    //    this._initAngle.z += this._delayZ;

        //    //    for (var i: number = 0; i < this._ondeviceorientation.length; i++) {
        //    //        this._ondeviceorientation[i].callback.call(this._ondeviceorientation[i].thisObject, this._initAngle);
        //    //    }
        //    //}
        //}



        private onPinch(x: number, y: number, x1: number, y1: number) {
            this._oldPosition1 = new Point(x, y);
            this._oldPosition2 = new Point(x1, y1);

        }

        private onSwipe(x: number, y: number) {

            Input.mouseX = x;
            Input.mouseY = y;

            this._oldPosition1 = null;
            this._oldPosition2 = null;

            this._time = new Date().getTime();
        }

        private touchStart(e: TouchEvent) {
            if (!this.deliverMessage()) {
                return;
            }

            //e.preventDefault();

            var x1: number = Input.getX(e.targetTouches[0].clientX)// - Input.canvas.x + Input.canvas.offsetX;
            var y1: number = Input.getY(e.targetTouches[0].clientY)// - Input.canvas.y + Input.canvas.offsetY;

            if (e.targetTouches.length == 2) {

                var x2: number = Input.getX(e.targetTouches[1].clientX)// - Input.canvas.x + Input.canvas.offsetX;
                var y2: number = Input.getY(e.targetTouches[1].clientY)// - Input.canvas.y + Input.canvas.offsetY;

                this.onPinch(x1, y1, x2, y2);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(x1, y1);
                this._mouseStatus[MouseCode.Mouse_Left] = true;
            }
            this._touchEvent3d.reset();
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;

            if (!this._isTouchStart) {
                this._isTouchStart = true;
                this._touchEvent3d.eventType = TouchEvent3D.TOUCH_START;
                this.dispatchEvent(this._touchEvent3d);
            }
        }

        private _oldPosition1: Point = null;
        private _oldPosition2: Point = null;

        private touchEnd(e: TouchEvent) {

            if (e.targetTouches.length > 1) {

                var x: number = Input.getX(e.targetTouches[0].clientX)// - Input.canvas.x + Input.canvas.offsetX;
                var y: number = Input.getY(e.targetTouches[0].clientY)// - Input.canvas.y + Input.canvas.offsetY;
                var x1: number = Input.getX(e.targetTouches[1].clientX)// - Input.canvas.x + Input.canvas.offsetX;
                var y1: number = Input.getY(e.targetTouches[1].clientY)// - Input.canvas.y + Input.canvas.offsetY;

                this.onPinch(x, y, x1, y1);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(Input.getX(e.targetTouches[0].clientX), Input.getY(e.targetTouches[0].clientY));
                this._mouseStatus[MouseCode.Mouse_Left] = false;
            }
            else {

                this._oldPosition1 = null;
                this._oldPosition2 = null;
                this._time = 0;
            }

            this._touchEvent3d.reset();
            this._isTouchStart = false;
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;
            this._touchEvent3d.eventType = TouchEvent3D.TOUCH_END;
            this.dispatchEvent(this._touchEvent3d);
        }


        private touchMove(e: TouchEvent) {

            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;

            Input.mouseX = Input.getX(e.targetTouches[0].clientX)// - Input.canvas.x + Input.canvas.offsetX;
            Input.mouseY = Input.getY(e.targetTouches[0].clientY)// - Input.canvas.y + Input.canvas.offsetY;

            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;

            e.preventDefault();


            if (e.targetTouches.length > 1) {

                var newPosition1: Point = new Point(Input.mouseX, Input.mouseY);
                var newPosition2: Point = new Point(Input.getX(e.targetTouches[1].clientX), Input.getY(e.targetTouches[1].clientY));

                if (this._oldPosition1 == null)
                    this._oldPosition1 = newPosition1;
                if (this._oldPosition2 == null)
                    this._oldPosition2 = newPosition2;

                if (this.isEnlarge(this._oldPosition1, this._oldPosition2, newPosition1, newPosition2))
                    Input.wheelDelta = 120;
                else
                    Input.wheelDelta = -120;


                this._oldPosition1 = newPosition1;
                this._oldPosition2 = newPosition2;
            }
            else {

            }

            this._touchEvent3d.reset();
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;
            this._touchEvent3d.eventType = TouchEvent3D.TOUCH_MOVE;
            this.dispatchEvent(this._touchEvent3d);
        }

        private GetTargetTouches(targetTouches: TouchList): Array<TouchData> {
            var array: Array<TouchData> = new Array<TouchData>();
            for (var i = 0; i < targetTouches.length; i++) {
                var touchData = new TouchData(targetTouches[i]);
                array.push(touchData);
            }
            return array;
        }

        private mouseClick(e: MouseEvent) {
            if (!this.deliverMessage()) {
                return;
            }
            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_CLICK;
            this.dispatchEvent(this._mouseEvent3d);
        }

        private mouseEnd(e: MouseEvent) {
            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;

            this._mouseStatus[this._mouseEvent3d.mouseCode] = false;
            this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_UP;
            this.dispatchEvent(this._mouseEvent3d);
        }

        protected deliverMessage(): boolean {
            var view3ds: Array<View3D> = Input.canvas.view3Ds;
            for (var i: number = 0; i < view3ds.length; ++i) {
                if (view3ds[i].inView3D(Input.mouseX, Input.mouseY)) {
                    return true;
                }
            }
            return false;
        }

        private mouseStart(e: MouseEvent) {
            if (!this.deliverMessage()) {
                return;
            }

            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;

            if (!this._mouseStatus[this._mouseEvent3d.mouseCode]) {
                this._mouseStatus[this._mouseEvent3d.mouseCode] = true;
                this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_DOWN;
                this.dispatchEvent(this._mouseEvent3d);
            }
        }

        private mouseMove(e: MouseEvent) {
            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;

            Input.mouseX = Input.getX(e.clientX)// - Input.canvas.x + Input.canvas.offsetX;
            Input.mouseY = Input.getY(e.clientY)// - Input.canvas.y + Input.canvas.offsetY;

            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;

            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_MOVE;


            this.dispatchEvent(this._mouseEvent3d);
        }

        private mouseOver(e: MouseEvent) {
            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_OVER;
            this.dispatchEvent(this._mouseEvent3d);
        }

        private mouseWheel(e: MouseWheelEvent) {
            Input.wheelDelta = e.wheelDelta;
            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = MouseEvent3D.MOUSE_WHEEL;
            this.dispatchEvent(this._mouseEvent3d);
        }

        private keyDown(e: KeyboardEvent) {
            this._keyEvent3d.reset();
            this._keyEvent3d.keyCode = e.keyCode;
            this._keyEvent3d.target = this;

            if (!this._keyStatus[e.keyCode]) {
                this._keyStatus[e.keyCode] = true;
                //this._keyEvent3d.eventType = KeyEvent3D.KEY_CLICK;
                //this.dispatchEvent(this._keyEvent3d);
                this._keyEvent3d.eventType = KeyEvent3D.KEY_DOWN;
                this.dispatchEvent(this._keyEvent3d);
            }
        }

        private keyUp(e: KeyboardEvent) {
            this._keyEvent3d.reset();
            this._keyEvent3d.keyCode = e.keyCode;
            this._keyEvent3d.target = this;

            //if (this._keyStatus[e.keyCode]) {
            //    this._keyEvent3d.eventType = KeyEvent3D.KEY_CLICK;
            //    this.dispatchEvent(this._keyEvent3d);
            //}

            this._keyStatus[e.keyCode] = false;

            this._keyEvent3d.eventType = KeyEvent3D.KEY_UP;
            this.dispatchEvent(this._keyEvent3d);
        }


        private onWindowsResize(e: UIEvent) {
            this._windowsEvent3d.target = this;
            this._windowsEvent3d.eventType = Event3D.RESIZE;
            this.dispatchEvent(this._windowsEvent3d);
        }


        private onOrientationChange(e: Event): void {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = OrientationEvent3D.ORIENTATION_CHANGE;
            this.dispatchEvent(this._orientationEvent3d);
        }
        private onDeviceMotion(e: DeviceMotionEvent): void {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = OrientationEvent3D.DEVICE_MOTION;
            this._orientationEvent3d.acceleration = e.acceleration;
            this._orientationEvent3d.accelerationIncludingGravity = e.accelerationIncludingGravity;
            this._orientationEvent3d.rotationRate = e.rotationRate;
            this.dispatchEvent(this._orientationEvent3d);
        }
        private onDeviceOrientation(e: DeviceOrientationEvent): void {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = OrientationEvent3D.DEVICE_ORIENTATION;
            this._orientationEvent3d.absolute = e.absolute;
            this._orientationEvent3d.alpha = e.alpha;
            this._orientationEvent3d.beta = e.beta;
            this._orientationEvent3d.gamma = e.gamma;
            this.dispatchEvent(this._orientationEvent3d);
        }

        //返回角度
        private GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        /**
        * @language zh_CN
        * 根据起点和终点返回方向
        * @param  startX {Number} 起点X坐标
        * @param  startY {Number} 起点Y坐标
        * @param  endX   {Number} 终点X坐标
        * @param  endY   {Number} 终点Y坐标
        * @returns result {number} 1：向上，2：向下，3：向左，4：向右,0：未滑动
        */
        public GetSlideDirection(startX: number, startY: number, endX: number, endY: number): number {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;

            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            var angle = this.GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }

            return result;
        }

        private isEnlarge(op1: Point, op2: Point, np1: Point, np2: Point): boolean {
            //函数传入上一次触摸两点的位置与本次触摸两点的位置计算出用户的手势
            var leng1 = Math.sqrt((op1.x - op2.x) * (op1.x - op2.x) + (op1.y - op2.y) * (op1.y - op2.y));
            var leng2 = Math.sqrt((np1.x - np2.x) * (np1.x - np2.x) + (np1.y - np2.y) * (np1.y - np2.y));

            if (leng1 < leng2) {
                //放大手势
                return true;
            } else {
                //缩小手势
                return false;
            }
        }
    }
}