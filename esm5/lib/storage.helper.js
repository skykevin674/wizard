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
export { LocalStorageHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly94Yy13aXphcmQvIiwic291cmNlcyI6WyJsaWIvc3RvcmFnZS5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQUE7SUF5Q0EsQ0FBQzs7Ozs7O0lBeENRLHdCQUFLOzs7OztJQUFaLFVBQWEsR0FBVyxFQUFFLEtBQVU7UUFDbEMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUk7Z0JBQ0YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTSxzQkFBRzs7OztJQUFWLFVBQVcsR0FBVztRQUNwQixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdkIsSUFBSTtnQkFDRixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVNLHlCQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3ZCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJO2dCQUNGLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRU0sMkJBQVE7OztJQUFmO1FBQ0UsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUk7Z0JBQ0YsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3RCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQjtTQUNGO0lBQ0gsQ0FBQztJQUVILHlCQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VIZWxwZXIge1xuICBzdGF0aWMgc3RvcmUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm8gc3RvcmFnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHN0b3JhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xlYXJBbGwoKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm8gc3RvcmFnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=