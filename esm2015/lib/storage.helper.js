/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class LocalStorageHelper {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly94Yy13aXphcmQvIiwic291cmNlcyI6WyJsaWIvc3RvcmFnZS5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFXO1FBQ3BCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJO2dCQUNGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJO2dCQUNGLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdkIsSUFBSTtnQkFDRixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7SUFDSCxDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlSGVscGVyIHtcbiAgc3RhdGljIHN0b3JlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHN0b3JhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdubyBzdG9yYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsZWFyQWxsKCkge1xuICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHN0b3JhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19