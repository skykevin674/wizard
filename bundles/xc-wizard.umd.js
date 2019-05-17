(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es'), require('rxjs'), require('@angular/core'), require('@angular/common'), require('ng-zorro-antd')) :
    typeof define === 'function' && define.amd ? define('xc-wizard', ['exports', 'lodash-es', 'rxjs', '@angular/core', '@angular/common', 'ng-zorro-antd'], factory) :
    (factory((global['xc-wizard'] = {}),global['lodash-es'],global.rxjs,global.ng.core,global.ng.common,global['ng-zorro-antd']));
}(this, (function (exports,lodashEs,rxjs,core,common,ngZorroAntd) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocalStorageHelper = /** @class */ (function () {
        function LocalStorageHelper() {
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        LocalStorageHelper.store = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                if (window.localStorage) {
                    try {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                    catch (e) {
                        console.log('no storage');
                    }
                }
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalStorageHelper.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (window.localStorage) {
                    try {
                        return localStorage.getItem(key);
                    }
                    catch (e) {
                        return null;
                    }
                }
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalStorageHelper.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (window.localStorage) {
                    try {
                        localStorage.removeItem(key);
                    }
                    catch (e) {
                        console.log('no storage');
                    }
                }
            };
        /**
         * @return {?}
         */
        LocalStorageHelper.clearAll = /**
         * @return {?}
         */
            function () {
                if (window.localStorage) {
                    try {
                        localStorage.clear();
                    }
                    catch (e) {
                        console.log('no storage');
                    }
                }
            };
        return LocalStorageHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var TipDirection = {
        TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3,
    };
    TipDirection[TipDirection.TOP] = 'TOP';
    TipDirection[TipDirection.RIGHT] = 'RIGHT';
    TipDirection[TipDirection.BOTTOM] = 'BOTTOM';
    TipDirection[TipDirection.LEFT] = 'LEFT';
    /** @type {?} */
    var defaultConfig = {
        steps: undefined, skipForever: true, skipKey: 'skipWizard', boundaryWidth: 15, scrollTopOffset: 0, scrollBottomOffset: 0,
        scroller: document.body, tipHeight: 180, tipWidth: 320, priority: [2, 0, 1, 3]
    };
    var WizardComponent = /** @class */ (function () {
        function WizardComponent() {
            this.stepChange = new core.EventEmitter();
            this.arrowWidth = 15;
            this._noWizard = true;
            this.current = 0;
            this.retryCount = 0;
        }
        Object.defineProperty(WizardComponent.prototype, "pos", {
            get: /**
             * @return {?}
             */ function () {
                return this.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WizardComponent.prototype, "noWizard", {
            get: /**
             * @return {?}
             */ function () {
                return this._noWizard;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WizardComponent.prototype, "currentIndex", {
            get: /**
             * @return {?}
             */ function () {
                return this.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WizardComponent.prototype, "style", {
            get: /**
             * @return {?}
             */ function () {
                if (!this.domStyle) {
                    return null;
                }
                return {
                    width: this.domStyle.width + "px",
                    height: (this.domStyle.height > document.body.clientHeight ? document.body.clientHeight : this.domStyle.height) + "px",
                    'border-width': this.domStyle.borderTop + "px " + this.domStyle.borderRight + "px         " + this.domStyle.borderBottom + "px " + this.domStyle.borderLeft + "px"
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WizardComponent.prototype, "button", {
            get: /**
             * @return {?}
             */ function () {
                if (this.config && this.tipStyle) {
                    this.tipStyle.width = this.config.tipWidth + "px";
                    this.tipStyle.height = this.config.tipHeight + "px";
                }
                return this.tipStyle;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        WizardComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.config) {
                    this._noWizard = true;
                }
                rxjs.fromEvent(window, 'resize').subscribe(( /**
                 * @return {?}
                 */function () { return _this.detect(); }));
            };
        /**
         * @param {?} store
         * @return {?}
         */
        WizardComponent.prototype.close = /**
         * @param {?} store
         * @return {?}
         */
            function (store) {
                this._noWizard = true;
                if (store && this.config.skipForever) {
                    LocalStorageHelper.store("" + this.config.skipKey, true);
                }
            };
        /**
         * @param {?} index
         * @return {?}
         */
        WizardComponent.prototype.change = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                var _this = this;
                this.stepChange.emit({
                    prev: this.current, next: index
                });
                this.current = index;
                setTimeout(( /**
                 * @return {?}
                 */function () { return _this.detect(); }));
            };
        /**
         * @return {?}
         */
        WizardComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                cancelAnimationFrame(this.detector);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        WizardComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.config && changes.config.currentValue) {
                    this.update();
                }
            };
        /**
         * @private
         * @return {?}
         */
        WizardComponent.prototype.update = /**
         * @private
         * @return {?}
         */
            function () {
                this.config = lodashEs.merge(lodashEs.cloneDeep(defaultConfig), this.config);
                this._noWizard = (this.config.steps && this.config.steps.length) ?
                    (this.config.skipForever ? (LocalStorageHelper.get(this.config.skipKey) ? true : false) : false)
                    : true;
                if (!this.noWizard) {
                    this.detectElement();
                }
            };
        /**
         * @private
         * @return {?}
         */
        WizardComponent.prototype.detect = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.config && this.config.steps && this.config.steps.length && this.current < this.config.steps.length) {
                    /** @type {?} */
                    var elem = document.querySelector(this.config.steps[this.current].id);
                    if (elem) {
                        /** @type {?} */
                        var bounding = elem.getBoundingClientRect();
                        /** @type {?} */
                        var scroller = this.config.scroller;
                        if (!this.scrollToPosition(bounding, scroller) && this.retryCount < 3) {
                            this.retryCount++;
                            setTimeout(( /**
                             * @return {?}
                             */function () { return _this.detect(); }));
                            return;
                        }
                        this.retryCount = 0;
                        this.calcDom(bounding);
                        this.calcTipDom(bounding);
                    }
                    else {
                        this.detectElement();
                    }
                }
            };
        /**
         * @private
         * @return {?}
         */
        WizardComponent.prototype.detectElement = /**
         * @private
         * @return {?}
         */
            function () {
                this.detector = requestAnimationFrame(this.detect.bind(this));
            };
        /**
         * @private
         * @param {?} bounding
         * @return {?}
         */
        WizardComponent.prototype.calcDom = /**
         * @private
         * @param {?} bounding
         * @return {?}
         */
            function (bounding) {
                this.domStyle = {
                    width: bounding.width + 2 * this.config.boundaryWidth,
                    height: bounding.height + 2 * this.config.boundaryWidth,
                    borderTop: this.limitToPositive(bounding.top - this.config.boundaryWidth),
                    borderLeft: this.limitToPositive(bounding.left - this.config.boundaryWidth),
                    borderBottom: this.limitToPositive(document.body.clientHeight - bounding.top - bounding.height - this.config.boundaryWidth),
                    borderRight: this.limitToPositive(document.body.clientWidth - bounding.left - bounding.width - this.config.boundaryWidth)
                };
            };
        /**
         * @return {?}
         */
        WizardComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var tmp = this.current;
                this.current--;
                if (this.current < 0) {
                    this.current = 0;
                }
                /** @type {?} */
                var callback = this.config.steps[tmp].prev;
                if (callback) {
                    callback();
                }
                this.stepChange.emit({
                    prev: tmp, next: this.current
                });
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.carousel.goTo(_this.current);
                    _this.detect();
                }));
            };
        /**
         * @return {?}
         */
        WizardComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var tmp = this.current;
                this.current++;
                if (this.current >= this.config.steps.length) {
                    this.current = this.config.steps.length - 1;
                }
                /** @type {?} */
                var callback = this.config.steps[tmp].next;
                if (callback) {
                    callback();
                }
                this.stepChange.emit({
                    prev: tmp, next: this.current
                });
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.carousel.goTo(_this.current);
                    _this.detect();
                }));
            };
        /**
         * @private
         * @param {?} bounding
         * @return {?}
         */
        WizardComponent.prototype.calcTipDom = /**
         * @private
         * @param {?} bounding
         * @return {?}
         */
            function (bounding) {
                /** @type {?} */
                var topSpace = bounding.top - 2 * this.config.boundaryWidth - this.arrowWidth - this.config.tipHeight;
                /** @type {?} */
                var bottomSpace = document.body.clientHeight - 2 * this.config.boundaryWidth
                    - bounding.top - bounding.height - this.arrowWidth - this.config.tipHeight;
                /** @type {?} */
                var leftSpace = bounding.left - 2 * this.config.boundaryWidth - this.arrowWidth - this.config.tipWidth;
                /** @type {?} */
                var rightSpace = document.body.clientWidth - 2 * this.config.boundaryWidth - bounding.left
                    - bounding.width - this.arrowWidth - this.config.tipWidth;
                /** @type {?} */
                var spaces = this.config.priority.map(( /**
                 * @param {?} p
                 * @return {?}
                 */function (p) {
                    /** @type {?} */
                    var space;
                    switch (p) {
                        case TipDirection.BOTTOM:
                            space = bottomSpace;
                            break;
                        case TipDirection.TOP:
                            space = topSpace;
                            break;
                        case TipDirection.LEFT:
                            space = leftSpace;
                            break;
                        case TipDirection.RIGHT:
                            space = rightSpace;
                            break;
                    }
                    return { direction: p, space: space };
                }));
                /** @type {?} */
                var bundle = spaces.find(( /**
                 * @param {?} s
                 * @return {?}
                 */function (s) { return s.space >= 0; }));
                this.position = bundle ? bundle.direction : TipDirection.BOTTOM;
                switch (bundle.direction) {
                    case TipDirection.TOP:
                        this.tipStyle = {
                            left: this.limitTipInWindow(this.domStyle.borderLeft, document.body.clientWidth, this.config.tipWidth) + "px",
                            top: this.limitTipInWindow(this.domStyle.borderTop - this.config.tipHeight - this.arrowWidth, document.body.clientHeight, this.config.tipHeight) + "px"
                        };
                        break;
                    case TipDirection.RIGHT:
                        this.tipStyle = {
                            left: this.limitTipInWindow(this.domStyle.borderLeft + this.domStyle.width + this.arrowWidth, document.body.clientWidth, this.config.tipWidth) + "px",
                            top: this.limitTipInWindow(this.domStyle.borderTop, document.body.clientHeight, this.config.tipHeight) + "px"
                        };
                        break;
                    case TipDirection.BOTTOM:
                        this.tipStyle = {
                            left: this.limitTipInWindow(this.domStyle.borderLeft, document.body.clientWidth, this.config.tipWidth) + "px",
                            top: this.limitTipInWindow(this.domStyle.borderTop + this.domStyle.height + this.arrowWidth, document.body.clientHeight, this.config.tipHeight) + "px"
                        };
                        break;
                    case TipDirection.LEFT:
                        this.tipStyle = {
                            left: this.limitTipInWindow(this.domStyle.borderLeft - this.arrowWidth - this.config.tipWidth, document.body.clientWidth, this.config.tipWidth) + "px",
                            top: this.limitTipInWindow(this.domStyle.borderTop, document.body.clientHeight, this.config.tipHeight) + "px"
                        };
                        break;
                    default:
                        console.log('no place');
                        break;
                }
            };
        /**
         * @private
         * @param {?} n
         * @return {?}
         */
        WizardComponent.prototype.limitToPositive = /**
         * @private
         * @param {?} n
         * @return {?}
         */
            function (n) {
                if (n < 0) {
                    return 0;
                }
                return n;
            };
        /**
         * @private
         * @param {?} n
         * @param {?=} limit
         * @param {?=} addon
         * @return {?}
         */
        WizardComponent.prototype.limitTipInWindow = /**
         * @private
         * @param {?} n
         * @param {?=} limit
         * @param {?=} addon
         * @return {?}
         */
            function (n, limit, addon) {
                if (n < 0) {
                    return 0;
                }
                if (limit && addon && n + addon > limit) {
                    return limit - addon;
                }
                return n;
            };
        /**
         * @private
         * @param {?} bounding
         * @param {?} scroller
         * @param {?=} addon
         * @return {?}
         */
        WizardComponent.prototype.scrollToPosition = /**
         * @private
         * @param {?} bounding
         * @param {?} scroller
         * @param {?=} addon
         * @return {?}
         */
            function (bounding, scroller, addon) {
                if (scroller) {
                    /** @type {?} */
                    var height = bounding.top + bounding.height + this.config.boundaryWidth + this.config.scrollBottomOffset + (addon || 0);
                    if (addon) {
                        /** @type {?} */
                        var del = height - /*document.body.clientHeight*/ scroller.clientHeight;
                        if (scroller.scrollTop > del) {
                            scroller.scrollTop -= del;
                            return false;
                        }
                    }
                    /** @type {?} */
                    var scBounding = scroller.getBoundingClientRect();
                    if (bounding.top - this.config.scrollTopOffset > scBounding.top /*0*/ && height > scroller.clientHeight) {
                        /** @type {?} */
                        var delta = height + 1 - scroller.clientHeight;
                        scroller.scrollTop += delta;
                        return false;
                    }
                    if (bounding.top - this.config.scrollTopOffset < scBounding.top) {
                        scroller.scrollTop -= bounding.top - this.config.scrollTopOffset;
                        return false;
                    }
                }
                return true;
            };
        WizardComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lib-wizard',
                        template: "<div *ngIf=\"!noWizard\">\n  <div class=\"wizard-frame\" [ngStyle]=\"style\" [ngClass]=\"'psn' + pos\"></div>\n  <div class=\"wizard-tip\" [ngStyle]=\"button\" *ngIf=\"config\">\n    <nz-carousel nzEffect=\"fade\" [nzDotRender]=\"dot\" (nzAfterChange)=\"change($event)\">\n      <div nz-carousel-content *ngFor=\"let p of config.steps;let i=index\">\n        <h3>{{p.title}}</h3>\n        <p>{{p.content}}</p>\n      </div>\n    </nz-carousel>\n    <div nz-row nzType=\"flex\" nzJustify=\"space-between\">\n      <a (click)=\"close(true)\">\u8DF3\u8FC7\u5F15\u5BFC</a>\n      <div class=\"wizard-buttons\">\n        <button nz-button nzSize=\"small\" nzType=\"default\" *ngIf=\"currentIndex > 0\" (click)=\"prev()\">\u4E0A\u4E00\u6B65</button>\n        <button nz-button nzSize=\"small\" nzType=\"primary\" *ngIf=\"currentIndex < config.steps.length -1\"\n          (click)=\"next()\">\u4E0B\u4E00\u6B65</button>\n        <button nz-button nzSize=\"small\" nzType=\"primary\" *ngIf=\"currentIndex === config.steps.length -1\"\n          (click)=\"close(false)\">\u7ED3\u675F</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<ng-template #dot>\n  <span class=\"dot\"></span>\n</ng-template>",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".wizard-frame{position:fixed;display:block;z-index:9998;background:0 0;left:0;top:0;border-width:calc((100vh - 100px)/ 2) calc((100vw - 400px)/ 2);border-style:solid;border-color:rgba(0,0,0,.5);box-sizing:content-box;transition:.2s ease-in}.wizard-frame::before{position:absolute;content:'';width:0;height:0;border-style:solid;border-width:15px}.wizard-frame.psn0::before{border-color:#fff transparent transparent;top:-15px;left:15px}.wizard-frame.psn1::before{border-color:transparent #fff transparent transparent;right:-15px;top:15px}.wizard-frame.psn2::before{border-color:transparent transparent #fff;bottom:-15px;left:15px}.wizard-frame.psn3::before{border-color:transparent transparent transparent #fff;left:-15px;top:15px}.wizard-tip{position:fixed;width:320px;height:180px;background:#fff;z-index:9999;padding:12px;transition:.2s ease-in;box-sizing:border-box}.wizard-tip nz-carousel{height:130px}.wizard-tip [nz-carousel-content]{width:100%;overflow:hidden}.wizard-tip [nz-carousel-content] p{height:63px}.slick-active .dot{background:#1890ff;border-color:#1890ff}.dot{display:inline-block;width:12px;height:12px;border-radius:100%;background:#e6e6e6;border:1px solid #0478aa}.wizard-buttons button:not(:first-child){margin-left:8px}"]
                    }] }
        ];
        /** @nocollapse */
        WizardComponent.ctorParameters = function () { return []; };
        WizardComponent.propDecorators = {
            config: [{ type: core.Input }],
            stepChange: [{ type: core.Output }],
            carousel: [{ type: core.ViewChild, args: [ngZorroAntd.NzCarouselComponent,] }]
        };
        return WizardComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WizardModule = /** @class */ (function () {
        function WizardModule() {
        }
        WizardModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [WizardComponent],
                        imports: [
                            common.CommonModule, ngZorroAntd.NzCarouselModule, ngZorroAntd.NzButtonModule, ngZorroAntd.NzGridModule
                        ],
                        exports: [WizardComponent]
                    },] }
        ];
        return WizardModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TipDirection = TipDirection;
    exports.WizardComponent = WizardComponent;
    exports.WizardModule = WizardModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=xc-wizard.umd.js.map