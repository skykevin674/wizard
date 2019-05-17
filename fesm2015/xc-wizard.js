import { merge, cloneDeep } from 'lodash-es';
import { fromEvent } from 'rxjs';
import { Component, Input, ViewEncapsulation, ViewChild, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselComponent, NzCarouselModule, NzButtonModule, NzGridModule } from 'ng-zorro-antd';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocalStorageHelper {
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    static store(key, value) {
        if (window.localStorage) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            }
            catch (e) {
                console.log('no storage');
            }
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static get(key) {
        if (window.localStorage) {
            try {
                return localStorage.getItem(key);
            }
            catch (e) {
                return null;
            }
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static remove(key) {
        if (window.localStorage) {
            try {
                localStorage.removeItem(key);
            }
            catch (e) {
                console.log('no storage');
            }
        }
    }
    /**
     * @return {?}
     */
    static clearAll() {
        if (window.localStorage) {
            try {
                localStorage.clear();
            }
            catch (e) {
                console.log('no storage');
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TipDirection = {
    TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3,
};
TipDirection[TipDirection.TOP] = 'TOP';
TipDirection[TipDirection.RIGHT] = 'RIGHT';
TipDirection[TipDirection.BOTTOM] = 'BOTTOM';
TipDirection[TipDirection.LEFT] = 'LEFT';
/** @type {?} */
const defaultConfig = {
    steps: undefined, skipForever: true, skipKey: 'skipWizard', boundaryWidth: 15, scrollTopOffset: 0, scrollBottomOffset: 0,
    scroller: document.body, tipHeight: 180, tipWidth: 320, priority: [2, 0, 1, 3]
};
class WizardComponent {
    constructor() {
        this.stepChange = new EventEmitter();
        this.arrowWidth = 15;
        this._noWizard = true;
        this.current = 0;
        this.retryCount = 0;
    }
    /**
     * @return {?}
     */
    get pos() {
        return this.position;
    }
    /**
     * @return {?}
     */
    get noWizard() {
        return this._noWizard;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        return this.current;
    }
    /**
     * @return {?}
     */
    get style() {
        if (!this.domStyle) {
            return null;
        }
        return {
            width: `${this.domStyle.width}px`,
            height: `${this.domStyle.height > document.body.clientHeight ? document.body.clientHeight : this.domStyle.height}px`,
            'border-width': `${this.domStyle.borderTop}px ${this.domStyle.borderRight}px \
        ${this.domStyle.borderBottom}px ${this.domStyle.borderLeft}px`
        };
    }
    /**
     * @return {?}
     */
    get button() {
        if (this.config && this.tipStyle) {
            this.tipStyle.width = `${this.config.tipWidth}px`;
            this.tipStyle.height = `${this.config.tipHeight}px`;
        }
        return this.tipStyle;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.config) {
            this._noWizard = true;
        }
        fromEvent(window, 'resize').subscribe((/**
         * @return {?}
         */
        () => this.detect()));
    }
    /**
     * @param {?} store
     * @return {?}
     */
    close(store) {
        this._noWizard = true;
        if (store && this.config.skipForever) {
            LocalStorageHelper.store(`${this.config.skipKey}`, true);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    change(index) {
        this.stepChange.emit({
            prev: this.current, next: index
        });
        this.current = index;
        setTimeout((/**
         * @return {?}
         */
        () => this.detect()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        cancelAnimationFrame(this.detector);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.config && changes.config.currentValue) {
            this.update();
        }
    }
    /**
     * @private
     * @return {?}
     */
    update() {
        this.config = merge(cloneDeep(defaultConfig), this.config);
        this._noWizard = (this.config.steps && this.config.steps.length) ?
            (this.config.skipForever ? (LocalStorageHelper.get(this.config.skipKey) ? true : false) : false)
            : true;
        if (!this.noWizard) {
            this.detectElement();
        }
    }
    /**
     * @private
     * @return {?}
     */
    detect() {
        if (this.config && this.config.steps && this.config.steps.length && this.current < this.config.steps.length) {
            /** @type {?} */
            const elem = document.querySelector(this.config.steps[this.current].id);
            if (elem) {
                /** @type {?} */
                const bounding = elem.getBoundingClientRect();
                /** @type {?} */
                const scroller = this.config.scroller;
                if (!this.scrollToPosition(bounding, scroller) && this.retryCount < 3) {
                    this.retryCount++;
                    setTimeout((/**
                     * @return {?}
                     */
                    () => this.detect()));
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
    }
    /**
     * @private
     * @return {?}
     */
    detectElement() {
        this.detector = requestAnimationFrame(this.detect.bind(this));
    }
    /**
     * @private
     * @param {?} bounding
     * @return {?}
     */
    calcDom(bounding) {
        this.domStyle = {
            width: bounding.width + 2 * this.config.boundaryWidth,
            height: bounding.height + 2 * this.config.boundaryWidth,
            borderTop: this.limitToPositive(bounding.top - this.config.boundaryWidth),
            borderLeft: this.limitToPositive(bounding.left - this.config.boundaryWidth),
            borderBottom: this.limitToPositive(document.body.clientHeight - bounding.top - bounding.height - this.config.boundaryWidth),
            borderRight: this.limitToPositive(document.body.clientWidth - bounding.left - bounding.width - this.config.boundaryWidth)
        };
    }
    /**
     * @return {?}
     */
    prev() {
        /** @type {?} */
        const tmp = this.current;
        this.current--;
        if (this.current < 0) {
            this.current = 0;
        }
        /** @type {?} */
        const callback = this.config.steps[tmp].prev;
        if (callback) {
            callback();
        }
        this.stepChange.emit({
            prev: tmp, next: this.current
        });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.carousel.goTo(this.current);
            this.detect();
        }));
    }
    /**
     * @return {?}
     */
    next() {
        /** @type {?} */
        const tmp = this.current;
        this.current++;
        if (this.current >= this.config.steps.length) {
            this.current = this.config.steps.length - 1;
        }
        /** @type {?} */
        const callback = this.config.steps[tmp].next;
        if (callback) {
            callback();
        }
        this.stepChange.emit({
            prev: tmp, next: this.current
        });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.carousel.goTo(this.current);
            this.detect();
        }));
    }
    /**
     * @private
     * @param {?} bounding
     * @return {?}
     */
    calcTipDom(bounding) {
        /** @type {?} */
        const topSpace = bounding.top - 2 * this.config.boundaryWidth - this.arrowWidth - this.config.tipHeight;
        /** @type {?} */
        const bottomSpace = document.body.clientHeight - 2 * this.config.boundaryWidth
            - bounding.top - bounding.height - this.arrowWidth - this.config.tipHeight;
        /** @type {?} */
        const leftSpace = bounding.left - 2 * this.config.boundaryWidth - this.arrowWidth - this.config.tipWidth;
        /** @type {?} */
        const rightSpace = document.body.clientWidth - 2 * this.config.boundaryWidth - bounding.left
            - bounding.width - this.arrowWidth - this.config.tipWidth;
        /** @type {?} */
        const spaces = this.config.priority.map((/**
         * @param {?} p
         * @return {?}
         */
        p => {
            /** @type {?} */
            let space;
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
            return { direction: p, space };
        }));
        /** @type {?} */
        const bundle = spaces.find((/**
         * @param {?} s
         * @return {?}
         */
        s => s.space >= 0));
        this.position = bundle ? bundle.direction : TipDirection.BOTTOM;
        switch (bundle.direction) {
            case TipDirection.TOP:
                this.tipStyle = {
                    left: `${this.limitTipInWindow(this.domStyle.borderLeft, document.body.clientWidth, this.config.tipWidth)}px`,
                    top: `${this.limitTipInWindow(this.domStyle.borderTop - this.config.tipHeight - this.arrowWidth, document.body.clientHeight, this.config.tipHeight)}px`
                };
                break;
            case TipDirection.RIGHT:
                this.tipStyle = {
                    left: `${this.limitTipInWindow(this.domStyle.borderLeft + this.domStyle.width + this.arrowWidth, document.body.clientWidth, this.config.tipWidth)}px`,
                    top: `${this.limitTipInWindow(this.domStyle.borderTop, document.body.clientHeight, this.config.tipHeight)}px`
                };
                break;
            case TipDirection.BOTTOM:
                this.tipStyle = {
                    left: `${this.limitTipInWindow(this.domStyle.borderLeft, document.body.clientWidth, this.config.tipWidth)}px`,
                    top: `${this.limitTipInWindow(this.domStyle.borderTop + this.domStyle.height + this.arrowWidth, document.body.clientHeight, this.config.tipHeight)}px`
                };
                break;
            case TipDirection.LEFT:
                this.tipStyle = {
                    left: `${this.limitTipInWindow(this.domStyle.borderLeft - this.arrowWidth - this.config.tipWidth, document.body.clientWidth, this.config.tipWidth)}px`,
                    top: `${this.limitTipInWindow(this.domStyle.borderTop, document.body.clientHeight, this.config.tipHeight)}px`
                };
                break;
            default:
                console.log('no place');
                break;
        }
    }
    /**
     * @private
     * @param {?} n
     * @return {?}
     */
    limitToPositive(n) {
        if (n < 0) {
            return 0;
        }
        return n;
    }
    /**
     * @private
     * @param {?} n
     * @param {?=} limit
     * @param {?=} addon
     * @return {?}
     */
    limitTipInWindow(n, limit, addon) {
        if (n < 0) {
            return 0;
        }
        if (limit && addon && n + addon > limit) {
            return limit - addon;
        }
        return n;
    }
    /**
     * @private
     * @param {?} bounding
     * @param {?} scroller
     * @param {?=} addon
     * @return {?}
     */
    scrollToPosition(bounding, scroller, addon) {
        if (scroller) {
            /** @type {?} */
            const height = bounding.top + bounding.height + this.config.boundaryWidth + this.config.scrollBottomOffset + (addon || 0);
            if (addon) {
                /** @type {?} */
                const del = height - /*document.body.clientHeight*/ scroller.clientHeight;
                if (scroller.scrollTop > del) {
                    scroller.scrollTop -= del;
                    return false;
                }
            }
            /** @type {?} */
            const scBounding = scroller.getBoundingClientRect();
            if (bounding.top - this.config.scrollTopOffset > scBounding.top /*0*/ && height > scroller.clientHeight) {
                /** @type {?} */
                const delta = height + 1 - scroller.clientHeight;
                scroller.scrollTop += delta;
                return false;
            }
            if (bounding.top - this.config.scrollTopOffset < scBounding.top) {
                scroller.scrollTop -= bounding.top - this.config.scrollTopOffset;
                return false;
            }
        }
        return true;
    }
}
WizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-wizard',
                template: "<div *ngIf=\"!noWizard\">\n  <div class=\"wizard-frame\" [ngStyle]=\"style\" [ngClass]=\"'psn' + pos\"></div>\n  <div class=\"wizard-tip\" [ngStyle]=\"button\" *ngIf=\"config\">\n    <nz-carousel nzEffect=\"fade\" [nzDotRender]=\"dot\" (nzAfterChange)=\"change($event)\">\n      <div nz-carousel-content *ngFor=\"let p of config.steps;let i=index\">\n        <h3>{{p.title}}</h3>\n        <p>{{p.content}}</p>\n      </div>\n    </nz-carousel>\n    <div nz-row nzType=\"flex\" nzJustify=\"space-between\">\n      <a (click)=\"close(true)\">\u8DF3\u8FC7\u5F15\u5BFC</a>\n      <div class=\"wizard-buttons\">\n        <button nz-button nzSize=\"small\" nzType=\"default\" *ngIf=\"currentIndex > 0\" (click)=\"prev()\">\u4E0A\u4E00\u6B65</button>\n        <button nz-button nzSize=\"small\" nzType=\"primary\" *ngIf=\"currentIndex < config.steps.length -1\"\n          (click)=\"next()\">\u4E0B\u4E00\u6B65</button>\n        <button nz-button nzSize=\"small\" nzType=\"primary\" *ngIf=\"currentIndex === config.steps.length -1\"\n          (click)=\"close(false)\">\u7ED3\u675F</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<ng-template #dot>\n  <span class=\"dot\"></span>\n</ng-template>",
                encapsulation: ViewEncapsulation.None,
                styles: [".wizard-frame{position:fixed;display:block;z-index:9998;background:0 0;left:0;top:0;border-width:calc((100vh - 100px)/ 2) calc((100vw - 400px)/ 2);border-style:solid;border-color:rgba(0,0,0,.5);box-sizing:content-box;transition:.2s ease-in}.wizard-frame::before{position:absolute;content:'';width:0;height:0;border-style:solid;border-width:15px}.wizard-frame.psn0::before{border-color:#fff transparent transparent;top:-15px;left:15px}.wizard-frame.psn1::before{border-color:transparent #fff transparent transparent;right:-15px;top:15px}.wizard-frame.psn2::before{border-color:transparent transparent #fff;bottom:-15px;left:15px}.wizard-frame.psn3::before{border-color:transparent transparent transparent #fff;left:-15px;top:15px}.wizard-tip{position:fixed;width:320px;height:180px;background:#fff;z-index:9999;padding:12px;transition:.2s ease-in;box-sizing:border-box}.wizard-tip nz-carousel{height:130px}.wizard-tip [nz-carousel-content]{width:100%;overflow:hidden}.wizard-tip [nz-carousel-content] p{height:63px}.slick-active .dot{background:#1890ff;border-color:#1890ff}.dot{display:inline-block;width:12px;height:12px;border-radius:100%;background:#e6e6e6;border:1px solid #0478aa}.wizard-buttons button:not(:first-child){margin-left:8px}"]
            }] }
];
/** @nocollapse */
WizardComponent.ctorParameters = () => [];
WizardComponent.propDecorators = {
    config: [{ type: Input }],
    stepChange: [{ type: Output }],
    carousel: [{ type: ViewChild, args: [NzCarouselComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WizardModule {
}
WizardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [WizardComponent],
                imports: [
                    CommonModule, NzCarouselModule, NzButtonModule, NzGridModule
                ],
                exports: [WizardComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TipDirection, WizardComponent, WizardModule };

//# sourceMappingURL=xc-wizard.js.map