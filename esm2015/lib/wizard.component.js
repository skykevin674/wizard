/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { merge, cloneDeep } from 'lodash-es';
import { fromEvent } from 'rxjs';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { LocalStorageHelper } from './storage.helper';
/**
 * @record
 */
export function WizardConfig() { }
if (false) {
    /** @type {?} */
    WizardConfig.prototype.steps;
    /** @type {?|undefined} */
    WizardConfig.prototype.scroller;
    /** @type {?|undefined} */
    WizardConfig.prototype.skipForever;
    /** @type {?|undefined} */
    WizardConfig.prototype.skipKey;
    /** @type {?|undefined} */
    WizardConfig.prototype.boundaryWidth;
    /** @type {?|undefined} */
    WizardConfig.prototype.scrollTopOffset;
    /** @type {?|undefined} */
    WizardConfig.prototype.scrollBottomOffset;
    /** @type {?|undefined} */
    WizardConfig.prototype.tipWidth;
    /** @type {?|undefined} */
    WizardConfig.prototype.tipHeight;
    /** @type {?|undefined} */
    WizardConfig.prototype.priority;
}
/**
 * @record
 */
export function Step() { }
if (false) {
    /** @type {?} */
    Step.prototype.id;
    /** @type {?} */
    Step.prototype.title;
    /** @type {?} */
    Step.prototype.content;
    /** @type {?|undefined} */
    Step.prototype.next;
    /** @type {?|undefined} */
    Step.prototype.prev;
}
/** @enum {number} */
const TipDirection = {
    TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3,
};
export { TipDirection };
TipDirection[TipDirection.TOP] = 'TOP';
TipDirection[TipDirection.RIGHT] = 'RIGHT';
TipDirection[TipDirection.BOTTOM] = 'BOTTOM';
TipDirection[TipDirection.LEFT] = 'LEFT';
/** @type {?} */
const defaultConfig = {
    steps: undefined, skipForever: true, skipKey: 'skipWizard', boundaryWidth: 15, scrollTopOffset: 0, scrollBottomOffset: 0,
    scroller: document.body, tipHeight: 180, tipWidth: 320, priority: [2, 0, 1, 3]
};
export class WizardComponent {
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
if (false) {
    /** @type {?} */
    WizardComponent.prototype.config;
    /** @type {?} */
    WizardComponent.prototype.stepChange;
    /** @type {?} */
    WizardComponent.prototype.carousel;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.position;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.arrowWidth;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype._noWizard;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.current;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.retryCount;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.detector;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.domStyle;
    /**
     * @type {?}
     * @private
     */
    WizardComponent.prototype.tipStyle;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3hjLXdpemFyZC8iLCJzb3VyY2VzIjpbImxpYi93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBdUMsaUJBQWlCLEVBQ3ZGLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRXRELGtDQVdDOzs7SUFWQyw2QkFBYzs7SUFDZCxnQ0FBdUI7O0lBQ3ZCLG1DQUFzQjs7SUFDdEIsK0JBQWlCOztJQUNqQixxQ0FBdUI7O0lBQ3ZCLHVDQUF5Qjs7SUFDekIsMENBQTRCOztJQUM1QixnQ0FBa0I7O0lBQ2xCLGlDQUFtQjs7SUFDbkIsZ0NBQTBCOzs7OztBQUc1QiwwQkFNQzs7O0lBTEMsa0JBQVc7O0lBQ1gscUJBQWM7O0lBQ2QsdUJBQWdCOztJQUNoQixvQkFBa0I7O0lBQ2xCLG9CQUFrQjs7OztJQUlsQixNQUFPLEVBQUUsUUFBUyxFQUFFLFNBQVUsRUFBRSxPQUFROzs7Ozs7OztNQUdwQyxhQUFhLEdBQUc7SUFDcEIsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLENBQUM7SUFDeEgsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVB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QUFDLFlBQVksRUFBRTs7c0JBQ2pHLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNoRCxRQUFRLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztnQkFDNUIsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUMvRCxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0JBQ2pFLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O1lBMVJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsMHJDQUFzQztnQkFFdEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7OztxQkFHRSxLQUFLO3lCQUVMLE1BQU07dUJBSU4sU0FBUyxTQUFDLG1CQUFtQjs7OztJQU45QixpQ0FBOEI7O0lBRTlCLHFDQUVLOztJQUVMLG1DQUE4Qzs7Ozs7SUFFOUMsbUNBQStCOzs7OztJQUUvQixxQ0FBd0I7Ozs7O0lBRXhCLG9DQUF5Qjs7Ozs7SUFDekIsa0NBQW9COzs7OztJQUNwQixxQ0FBdUI7Ozs7O0lBRXZCLG1DQUFzQjs7Ozs7SUFDdEIsbUNBQXNCOzs7OztJQUN0QixtQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIGNsb25lRGVlcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE56Q2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vc3RvcmFnZS5oZWxwZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdpemFyZENvbmZpZyB7XG4gIHN0ZXBzOiBTdGVwW107XG4gIHNjcm9sbGVyPzogSFRNTEVsZW1lbnQ7XG4gIHNraXBGb3JldmVyPzogYm9vbGVhbjtcbiAgc2tpcEtleT86IHN0cmluZztcbiAgYm91bmRhcnlXaWR0aD86IG51bWJlcjtcbiAgc2Nyb2xsVG9wT2Zmc2V0PzogbnVtYmVyO1xuICBzY3JvbGxCb3R0b21PZmZzZXQ/OiBudW1iZXI7XG4gIHRpcFdpZHRoPzogbnVtYmVyO1xuICB0aXBIZWlnaHQ/OiBudW1iZXI7XG4gIHByaW9yaXR5PzogVGlwRGlyZWN0aW9uW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RlcCB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgbmV4dD86ICgpID0+IHZvaWQ7XG4gIHByZXY/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZW51bSBUaXBEaXJlY3Rpb24ge1xuICBUT1AgPSAwLCBSSUdIVCA9IDEsIEJPVFRPTSA9IDIsIExFRlQgPSAzXG59XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIHN0ZXBzOiB1bmRlZmluZWQsIHNraXBGb3JldmVyOiB0cnVlLCBza2lwS2V5OiAnc2tpcFdpemFyZCcsIGJvdW5kYXJ5V2lkdGg6IDE1LCBzY3JvbGxUb3BPZmZzZXQ6IDAsIHNjcm9sbEJvdHRvbU9mZnNldDogMCxcbiAgc2Nyb2xsZXI6IGRvY3VtZW50LmJvZHksIHRpcEhlaWdodDogMTgwLCB0aXBXaWR0aDogMzIwLCBwcmlvcml0eTogWzIsIDAsIDEsIDNdXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItd2l6YXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dpemFyZC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFdpemFyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGNvbmZpZzogV2l6YXJkQ29uZmlnO1xuXG4gIEBPdXRwdXQoKSBzdGVwQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgcHJldjogbnVtYmVyOyBuZXh0OiBudW1iZXJcbiAgfT4oKTtcblxuICBAVmlld0NoaWxkKE56Q2Fyb3VzZWxDb21wb25lbnQpIGNhcm91c2VsOiBhbnk7XG5cbiAgcHJpdmF0ZSBwb3NpdGlvbjogVGlwRGlyZWN0aW9uO1xuXG4gIHByaXZhdGUgYXJyb3dXaWR0aCA9IDE1O1xuXG4gIHByaXZhdGUgX25vV2l6YXJkID0gdHJ1ZTtcbiAgcHJpdmF0ZSBjdXJyZW50ID0gMDtcbiAgcHJpdmF0ZSByZXRyeUNvdW50ID0gMDtcblxuICBwcml2YXRlIGRldGVjdG9yOiBhbnk7XG4gIHByaXZhdGUgZG9tU3R5bGU6IGFueTtcbiAgcHJpdmF0ZSB0aXBTdHlsZTogYW55O1xuXG4gIGdldCBwb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gIH1cblxuICBnZXQgbm9XaXphcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vV2l6YXJkO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgZ2V0IHN0eWxlKCkge1xuICAgIGlmICghdGhpcy5kb21TdHlsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogYCR7dGhpcy5kb21TdHlsZS53aWR0aH1weGAsXG4gICAgICBoZWlnaHQ6IGAke3RoaXMuZG9tU3R5bGUuaGVpZ2h0ID4gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgPyBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA6IHRoaXMuZG9tU3R5bGUuaGVpZ2h0fXB4YCxcbiAgICAgICdib3JkZXItd2lkdGgnOiBgJHt0aGlzLmRvbVN0eWxlLmJvcmRlclRvcH1weCAke3RoaXMuZG9tU3R5bGUuYm9yZGVyUmlnaHR9cHggXFxcbiAgICAgICAgJHt0aGlzLmRvbVN0eWxlLmJvcmRlckJvdHRvbX1weCAke3RoaXMuZG9tU3R5bGUuYm9yZGVyTGVmdH1weGBcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGJ1dHRvbigpIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy50aXBTdHlsZSkge1xuICAgICAgdGhpcy50aXBTdHlsZS53aWR0aCA9IGAke3RoaXMuY29uZmlnLnRpcFdpZHRofXB4YDtcbiAgICAgIHRoaXMudGlwU3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5jb25maWcudGlwSGVpZ2h0fXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGlwU3R5bGU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuX25vV2l6YXJkID0gdHJ1ZTtcbiAgICB9XG4gICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGVjdCgpKTtcbiAgfVxuXG4gIGNsb3NlKHN0b3JlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbm9XaXphcmQgPSB0cnVlO1xuICAgIGlmIChzdG9yZSAmJiB0aGlzLmNvbmZpZy5za2lwRm9yZXZlcikge1xuICAgICAgTG9jYWxTdG9yYWdlSGVscGVyLnN0b3JlKGAke3RoaXMuY29uZmlnLnNraXBLZXl9YCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnN0ZXBDaGFuZ2UuZW1pdCh7XG4gICAgICBwcmV2OiB0aGlzLmN1cnJlbnQsIG5leHQ6IGluZGV4XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50ID0gaW5kZXg7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRldGVjdCgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZGV0ZWN0b3IpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZyAmJiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZShjbG9uZURlZXAoZGVmYXVsdENvbmZpZyksIHRoaXMuY29uZmlnKTtcbiAgICB0aGlzLl9ub1dpemFyZCA9ICh0aGlzLmNvbmZpZy5zdGVwcyAmJiB0aGlzLmNvbmZpZy5zdGVwcy5sZW5ndGgpID9cbiAgICAgICh0aGlzLmNvbmZpZy5za2lwRm9yZXZlciA/IChMb2NhbFN0b3JhZ2VIZWxwZXIuZ2V0KHRoaXMuY29uZmlnLnNraXBLZXkpID8gdHJ1ZSA6IGZhbHNlKSA6IGZhbHNlKVxuICAgICAgOiB0cnVlO1xuICAgIGlmICghdGhpcy5ub1dpemFyZCkge1xuICAgICAgdGhpcy5kZXRlY3RFbGVtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3QoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnN0ZXBzICYmIHRoaXMuY29uZmlnLnN0ZXBzLmxlbmd0aCAmJiB0aGlzLmN1cnJlbnQgPCB0aGlzLmNvbmZpZy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLnN0ZXBzW3RoaXMuY3VycmVudF0uaWQpO1xuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgY29uc3QgYm91bmRpbmcgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBzY3JvbGxlciA9IHRoaXMuY29uZmlnLnNjcm9sbGVyO1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsVG9Qb3NpdGlvbihib3VuZGluZywgc2Nyb2xsZXIpICYmIHRoaXMucmV0cnlDb3VudCA8IDMpIHtcbiAgICAgICAgICB0aGlzLnJldHJ5Q291bnQrKztcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGV0ZWN0KCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJldHJ5Q291bnQgPSAwO1xuICAgICAgICB0aGlzLmNhbGNEb20oYm91bmRpbmcpO1xuICAgICAgICB0aGlzLmNhbGNUaXBEb20oYm91bmRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXRlY3RFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RFbGVtZW50KCkge1xuICAgIHRoaXMuZGV0ZWN0b3IgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kZXRlY3QuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIGNhbGNEb20oYm91bmRpbmc6IGFueSkge1xuICAgIHRoaXMuZG9tU3R5bGUgPSB7XG4gICAgICB3aWR0aDogYm91bmRpbmcud2lkdGggKyAyICogdGhpcy5jb25maWcuYm91bmRhcnlXaWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRpbmcuaGVpZ2h0ICsgMiAqIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGgsXG4gICAgICBib3JkZXJUb3A6IHRoaXMubGltaXRUb1Bvc2l0aXZlKGJvdW5kaW5nLnRvcCAtIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGgpLFxuICAgICAgYm9yZGVyTGVmdDogdGhpcy5saW1pdFRvUG9zaXRpdmUoYm91bmRpbmcubGVmdCAtIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGgpLFxuICAgICAgYm9yZGVyQm90dG9tOiB0aGlzLmxpbWl0VG9Qb3NpdGl2ZShkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAtIGJvdW5kaW5nLnRvcCAtIGJvdW5kaW5nLmhlaWdodCAtIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGgpLFxuICAgICAgYm9yZGVyUmlnaHQ6IHRoaXMubGltaXRUb1Bvc2l0aXZlKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBib3VuZGluZy5sZWZ0IC0gYm91bmRpbmcud2lkdGggLSB0aGlzLmNvbmZpZy5ib3VuZGFyeVdpZHRoKVxuICAgIH07XG4gIH1cblxuICBwcmV2KCkge1xuICAgIGNvbnN0IHRtcCA9IHRoaXMuY3VycmVudDtcbiAgICB0aGlzLmN1cnJlbnQtLTtcbiAgICBpZiAodGhpcy5jdXJyZW50IDwgMCkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gMDtcbiAgICB9XG4gICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNvbmZpZy5zdGVwc1t0bXBdLnByZXY7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICB0aGlzLnN0ZXBDaGFuZ2UuZW1pdCh7XG4gICAgICBwcmV2OiB0bXAsIG5leHQ6IHRoaXMuY3VycmVudFxuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jYXJvdXNlbC5nb1RvKHRoaXMuY3VycmVudCk7XG4gICAgICB0aGlzLmRldGVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICBjb25zdCB0bXAgPSB0aGlzLmN1cnJlbnQ7XG4gICAgdGhpcy5jdXJyZW50Kys7XG4gICAgaWYgKHRoaXMuY3VycmVudCA+PSB0aGlzLmNvbmZpZy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY29uZmlnLnN0ZXBzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jb25maWcuc3RlcHNbdG1wXS5uZXh0O1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdGhpcy5zdGVwQ2hhbmdlLmVtaXQoe1xuICAgICAgcHJldjogdG1wLCBuZXh0OiB0aGlzLmN1cnJlbnRcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2Fyb3VzZWwuZ29Ubyh0aGlzLmN1cnJlbnQpO1xuICAgICAgdGhpcy5kZXRlY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY1RpcERvbShib3VuZGluZzogYW55KSB7XG4gICAgY29uc3QgdG9wU3BhY2UgPSBib3VuZGluZy50b3AgLSAyICogdGhpcy5jb25maWcuYm91bmRhcnlXaWR0aCAtIHRoaXMuYXJyb3dXaWR0aCAtIHRoaXMuY29uZmlnLnRpcEhlaWdodDtcbiAgICBjb25zdCBib3R0b21TcGFjZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC0gMiAqIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGhcbiAgICAgIC0gYm91bmRpbmcudG9wIC0gYm91bmRpbmcuaGVpZ2h0IC0gdGhpcy5hcnJvd1dpZHRoIC0gdGhpcy5jb25maWcudGlwSGVpZ2h0O1xuICAgIGNvbnN0IGxlZnRTcGFjZSA9IGJvdW5kaW5nLmxlZnQgLSAyICogdGhpcy5jb25maWcuYm91bmRhcnlXaWR0aCAtIHRoaXMuYXJyb3dXaWR0aCAtIHRoaXMuY29uZmlnLnRpcFdpZHRoO1xuICAgIGNvbnN0IHJpZ2h0U3BhY2UgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gMiAqIHRoaXMuY29uZmlnLmJvdW5kYXJ5V2lkdGggLSBib3VuZGluZy5sZWZ0XG4gICAgICAtIGJvdW5kaW5nLndpZHRoIC0gdGhpcy5hcnJvd1dpZHRoIC0gdGhpcy5jb25maWcudGlwV2lkdGg7XG4gICAgY29uc3Qgc3BhY2VzID0gdGhpcy5jb25maWcucHJpb3JpdHkubWFwKHAgPT4ge1xuICAgICAgbGV0IHNwYWNlO1xuICAgICAgc3dpdGNoIChwKSB7XG4gICAgICAgIGNhc2UgVGlwRGlyZWN0aW9uLkJPVFRPTTpcbiAgICAgICAgICBzcGFjZSA9IGJvdHRvbVNwYWNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRpcERpcmVjdGlvbi5UT1A6XG4gICAgICAgICAgc3BhY2UgPSB0b3BTcGFjZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUaXBEaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgICBzcGFjZSA9IGxlZnRTcGFjZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUaXBEaXJlY3Rpb24uUklHSFQ6XG4gICAgICAgICAgc3BhY2UgPSByaWdodFNwYWNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZGlyZWN0aW9uOiBwLCBzcGFjZSB9O1xuICAgIH0pO1xuICAgIGNvbnN0IGJ1bmRsZSA9IHNwYWNlcy5maW5kKHMgPT4gcy5zcGFjZSA+PSAwKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gYnVuZGxlID8gYnVuZGxlLmRpcmVjdGlvbiA6IFRpcERpcmVjdGlvbi5CT1RUT007XG4gICAgc3dpdGNoIChidW5kbGUuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIFRpcERpcmVjdGlvbi5UT1A6XG4gICAgICAgIHRoaXMudGlwU3R5bGUgPSB7XG4gICAgICAgICAgbGVmdDogYCR7dGhpcy5saW1pdFRpcEluV2luZG93KHRoaXMuZG9tU3R5bGUuYm9yZGVyTGVmdCwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgdGhpcy5jb25maWcudGlwV2lkdGgpfXB4YCxcbiAgICAgICAgICB0b3A6IGAke3RoaXMubGltaXRUaXBJbldpbmRvdyh0aGlzLmRvbVN0eWxlLmJvcmRlclRvcCAtIHRoaXMuY29uZmlnLnRpcEhlaWdodCAtIHRoaXMuYXJyb3dXaWR0aCxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCB0aGlzLmNvbmZpZy50aXBIZWlnaHQpfXB4YFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGlwRGlyZWN0aW9uLlJJR0hUOlxuICAgICAgICB0aGlzLnRpcFN0eWxlID0ge1xuICAgICAgICAgIGxlZnQ6IGAke3RoaXMubGltaXRUaXBJbldpbmRvdyh0aGlzLmRvbVN0eWxlLmJvcmRlckxlZnQgKyB0aGlzLmRvbVN0eWxlLndpZHRoICsgdGhpcy5hcnJvd1dpZHRoLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgdGhpcy5jb25maWcudGlwV2lkdGgpfXB4YCxcbiAgICAgICAgICB0b3A6IGAke3RoaXMubGltaXRUaXBJbldpbmRvdyh0aGlzLmRvbVN0eWxlLmJvcmRlclRvcCxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCB0aGlzLmNvbmZpZy50aXBIZWlnaHQpfXB4YFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGlwRGlyZWN0aW9uLkJPVFRPTTpcbiAgICAgICAgdGhpcy50aXBTdHlsZSA9IHtcbiAgICAgICAgICBsZWZ0OiBgJHt0aGlzLmxpbWl0VGlwSW5XaW5kb3codGhpcy5kb21TdHlsZS5ib3JkZXJMZWZ0LFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgdGhpcy5jb25maWcudGlwV2lkdGgpfXB4YCxcbiAgICAgICAgICB0b3A6IGAke3RoaXMubGltaXRUaXBJbldpbmRvdyh0aGlzLmRvbVN0eWxlLmJvcmRlclRvcCArIHRoaXMuZG9tU3R5bGUuaGVpZ2h0ICsgdGhpcy5hcnJvd1dpZHRoLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIHRoaXMuY29uZmlnLnRpcEhlaWdodCl9cHhgXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUaXBEaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgdGhpcy50aXBTdHlsZSA9IHtcbiAgICAgICAgICBsZWZ0OiBgJHt0aGlzLmxpbWl0VGlwSW5XaW5kb3codGhpcy5kb21TdHlsZS5ib3JkZXJMZWZ0IC0gdGhpcy5hcnJvd1dpZHRoIC0gdGhpcy5jb25maWcudGlwV2lkdGgsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCB0aGlzLmNvbmZpZy50aXBXaWR0aCl9cHhgLFxuICAgICAgICAgIHRvcDogYCR7dGhpcy5saW1pdFRpcEluV2luZG93KHRoaXMuZG9tU3R5bGUuYm9yZGVyVG9wLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIHRoaXMuY29uZmlnLnRpcEhlaWdodCl9cHhgXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHBsYWNlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGltaXRUb1Bvc2l0aXZlKG46IG51bWJlcikge1xuICAgIGlmIChuIDwgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBuO1xuICB9XG5cbiAgcHJpdmF0ZSBsaW1pdFRpcEluV2luZG93KG46IG51bWJlciwgbGltaXQ/OiBudW1iZXIsIGFkZG9uPzogbnVtYmVyKSB7XG4gICAgaWYgKG4gPCAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxpbWl0ICYmIGFkZG9uICYmIG4gKyBhZGRvbiA+IGxpbWl0KSB7XG4gICAgICByZXR1cm4gbGltaXQgLSBhZGRvbjtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH1cblxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Qb3NpdGlvbihib3VuZGluZzogYW55LCBzY3JvbGxlcjogYW55LCBhZGRvbj86IG51bWJlcikge1xuICAgIGlmIChzY3JvbGxlcikge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gYm91bmRpbmcudG9wICsgYm91bmRpbmcuaGVpZ2h0ICsgdGhpcy5jb25maWcuYm91bmRhcnlXaWR0aCArIHRoaXMuY29uZmlnLnNjcm9sbEJvdHRvbU9mZnNldCArIChhZGRvbiB8fCAwKTtcbiAgICAgIGlmIChhZGRvbikge1xuICAgICAgICBjb25zdCBkZWwgPSBoZWlnaHQgLSAvKmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0Ki9zY3JvbGxlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGlmIChzY3JvbGxlci5zY3JvbGxUb3AgPiBkZWwpIHtcbiAgICAgICAgICBzY3JvbGxlci5zY3JvbGxUb3AgLT0gZGVsO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgc2NCb3VuZGluZyA9IHNjcm9sbGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKGJvdW5kaW5nLnRvcCAtIHRoaXMuY29uZmlnLnNjcm9sbFRvcE9mZnNldCA+IHNjQm91bmRpbmcudG9wIC8qMCovICYmIGhlaWdodCA+IHNjcm9sbGVyLmNsaWVudEhlaWdodCkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IGhlaWdodCArIDEgLSBzY3JvbGxlci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHNjcm9sbGVyLnNjcm9sbFRvcCArPSBkZWx0YTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGJvdW5kaW5nLnRvcCAtIHRoaXMuY29uZmlnLnNjcm9sbFRvcE9mZnNldCA8IHNjQm91bmRpbmcudG9wKSB7XG4gICAgICAgIHNjcm9sbGVyLnNjcm9sbFRvcCAtPSBib3VuZGluZy50b3AgLSB0aGlzLmNvbmZpZy5zY3JvbGxUb3BPZmZzZXQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufVxuIl19