import { OnInit, OnChanges, SimpleChanges, OnDestroy, EventEmitter } from '@angular/core';
export interface WizardConfig {
    steps: Step[];
    scroller?: HTMLElement;
    skipForever?: boolean;
    skipKey?: string;
    boundaryWidth?: number;
    scrollTopOffset?: number;
    scrollBottomOffset?: number;
    tipWidth?: number;
    tipHeight?: number;
    priority?: TipDirection[];
}
export interface Step {
    id: string;
    title: string;
    content: string;
    next?: () => void;
    prev?: () => void;
}
export declare enum TipDirection {
    TOP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3
}
export declare class WizardComponent implements OnInit, OnChanges, OnDestroy {
    config: WizardConfig;
    stepChange: EventEmitter<{
        prev: number;
        next: number;
    }>;
    carousel: any;
    private position;
    private arrowWidth;
    private _noWizard;
    private current;
    private retryCount;
    private detector;
    private domStyle;
    private tipStyle;
    readonly pos: TipDirection;
    readonly noWizard: boolean;
    readonly currentIndex: number;
    readonly style: {
        width: string;
        height: string;
        'border-width': string;
    };
    readonly button: any;
    constructor();
    ngOnInit(): void;
    close(store: boolean): void;
    change(index: number): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private update;
    private detect;
    private detectElement;
    private calcDom;
    prev(): void;
    next(): void;
    private calcTipDom;
    private limitToPositive;
    private limitTipInWindow;
    private scrollToPosition;
}
