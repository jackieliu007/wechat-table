"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Component({
    properties: {
        option: {
            type: Object
        },
        data: {
            type: Array
        }
    },
    data: {
        systemInfo: { windowWidth: 375, rate: 0 },
        html: ""
    },
    observers: {
        'data,option': function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.properties.data.length && Object.keys(this.properties.option).length)) return [3, 3];
                            if (!!this.data.systemInfo.rate) return [3, 2];
                            return [4, this.setSystemInfo()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.initHtml();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        }
    },
    methods: {
        setSystemInfo: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            wx.getSystemInfo({
                                success: function (result) {
                                    _this.data.systemInfo.windowWidth = result.windowWidth;
                                    _this.data.systemInfo.rate = result.windowWidth / 375;
                                    resolve();
                                },
                            });
                        })];
                });
            });
        },
        initHtml: function () {
            var option = this.properties.option;
            var data = this.properties.data;
            var r = this.data.systemInfo.rate;
            var bgColor = option.headOption.bgColor;
            var tableWidth = option.colOption.reduce(function (p, v) { return p + v; });
            var col = "";
            var thead = "<thead>";
            var tbody = "<tbody>";
            var html = "<div style=\"width: " + (option.width ? option.width * r : this.data.systemInfo.windowWidth) + "px; overflow: auto;border-left: #f0f0f0 solid 1px;border-top: #f0f0f0 solid 1px;\">\n        <table style=\"table-layout: fixed;border-collapse: separate;border-spacing: 0;width: " + tableWidth * r + "px;\">";
            option.colOption.forEach(function (v) {
                col += "<col style=\"width: " + v * r + "px\" />";
            });
            option.headOption.row.forEach(function (row, rowIndex, rowArr) {
                thead += "<tr>";
                row.forEach(function (cell, cellIndex) {
                    if (cell.sticky) {
                        thead += "<th class=\"thead-cell tcell " + (cell.isLastSticky ? 'tcell-fix-left-last' : '') + "\" style=\"background-color:" + bgColor + ";position: sticky; left: " + cell.left * r + "px\"  rowspan=\"" + cell.rowspan + "\" colspan=\"" + cell.colspan + "\">" + cell.value + "</th>";
                    }
                    else {
                        thead += " <th class=\"thead-cell tcell\" style=\"background-color:" + bgColor + "\" rowspan=\"" + cell.rowspan + "\" colspan=\"" + cell.colspan + "\">" + cell.value + "</th>";
                    }
                    if (cellIndex === row.length - 1) {
                        thead += "</tr>";
                    }
                });
                if (rowIndex === rowArr.length - 1) {
                    thead += "</thead>";
                }
            });
            data.forEach(function (data, dataIndex, dataArr) {
                option.bodyOptiton.row.forEach(function (row) {
                    tbody += "<tr>";
                    row.forEach(function (cell, cellIndex) {
                        if (cell.sticky) {
                            tbody += "<td class=\"tcell " + (cell.isLastSticky ? 'tcell-fix-left-last' : '') + "\" style=\"position: sticky; left: " + cell.left * r + "px\"  rowspan=\"" + cell.rowspan + "\">" + (cell.value ? cell.value : data[cell.prop]) + "</td>";
                        }
                        else {
                            tbody += " <td class=\"tcell\" rowspan=\"" + cell.rowspan + "\">" + (cell.value ? cell.value : data[cell.prop]) + "</td>";
                        }
                        if (cellIndex === row.length - 1) {
                            tbody += "</tr>";
                        }
                    });
                });
                if (dataIndex === dataArr.length - 1) {
                    tbody += "</tbody>";
                }
            });
            html = html + col + thead + tbody + "</table></div>";
            this.setData({
                html: html
            });
        }
    },
    lifetimes: {
        attached: function () { }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxLQUFLO1NBQ2Q7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUN6QyxJQUFJLEVBQUUsRUFBRTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsYUFBYSxFQUFFOzs7OztpQ0FDUCxDQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFBLEVBQXpFLGNBQXlFO2lDQUNyRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBMUIsY0FBMEI7NEJBQUUsV0FBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7OzRCQUExQixTQUEwQixDQUFDOzs7NEJBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7O1NBRXZCO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDQyxhQUFhLEVBQW5COzs7O29CQUNJLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPOzRCQUN0QixFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLE9BQU8sRUFBRSxVQUFDLE1BQVc7b0NBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO29DQUN0RCxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJ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LENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLDRDQUFvQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsd0JBQWlCLElBQUksQ0FBQyxPQUFPLFlBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTyxDQUFBO3lCQUNqTjs2QkFBTTs0QkFDSCxLQUFLLElBQUksb0NBQStCLElBQUksQ0FBQyxPQUFPLFlBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTyxDQUFBO3lCQUM1Rzt3QkFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDOUIsS0FBSyxJQUFJLE9BQU8sQ0FBQTt5QkFDbkI7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUssSUFBSSxVQUFVLENBQUE7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDUCxRQUFRLGdCQUFLLENBQUM7S0FDakI7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG9wdGlvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdHlwZTogQXJyYXlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHN5c3RlbUluZm86IHsgd2luZG93V2lkdGg6IDM3NSwgcmF0ZTogMCB9LFxyXG4gICAgICAgIGh0bWw6IGBgXHJcbiAgICB9LFxyXG4gICAgb2JzZXJ2ZXJzOiB7XHJcbiAgICAgICAgJ2RhdGEsb3B0aW9uJzogYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmRhdGEubGVuZ3RoICYmIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcy5vcHRpb24pLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlKSBhd2FpdCB0aGlzLnNldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgYXN5bmMgc2V0U3lzdGVtSW5mbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zeXN0ZW1JbmZvLndpbmRvd1dpZHRoID0gcmVzdWx0LndpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlID0gcmVzdWx0LndpbmRvd1dpZHRoIC8gMzc1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0SHRtbCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5wcm9wZXJ0aWVzLm9wdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMucHJvcGVydGllcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCByID0gdGhpcy5kYXRhLnN5c3RlbUluZm8ucmF0ZTtcclxuICAgICAgICAgICAgY29uc3QgYmdDb2xvciA9IG9wdGlvbi5oZWFkT3B0aW9uLmJnQ29sb3I7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlV2lkdGggPSBvcHRpb24uY29sT3B0aW9uLnJlZHVjZSgocDogbnVtYmVyLCB2OiBudW1iZXIpID0+IHAgKyB2KTtcclxuICAgICAgICAgICAgbGV0IGNvbCA9IGBgO1xyXG4gICAgICAgICAgICBsZXQgdGhlYWQgPSBgPHRoZWFkPmA7XHJcbiAgICAgICAgICAgIGxldCB0Ym9keSA9IGA8dGJvZHk+YDtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBzdHlsZT1cIndpZHRoOiAke29wdGlvbi53aWR0aCA/IG9wdGlvbi53aWR0aCAqIHIgOiB0aGlzLmRhdGEuc3lzdGVtSW5mby53aW5kb3dXaWR0aH1weDsgb3ZlcmZsb3c6IGF1dG87Ym9yZGVyLWxlZnQ6ICNmMGYwZjAgc29saWQgMXB4O2JvcmRlci10b3A6ICNmMGYwZjAgc29saWQgMXB4O1wiPlxyXG4gICAgICAgIDx0YWJsZSBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7Ym9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtib3JkZXItc3BhY2luZzogMDt3aWR0aDogJHt0YWJsZVdpZHRoICogcn1weDtcIj5gXHJcbiAgICAgICAgICAgIG9wdGlvbi5jb2xPcHRpb24uZm9yRWFjaCgodjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb2wgKz0gYDxjb2wgc3R5bGU9XCJ3aWR0aDogJHt2ICogcn1weFwiIC8+YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBvcHRpb24uaGVhZE9wdGlvbi5yb3cuZm9yRWFjaCgocm93OiBbXSwgcm93SW5kZXg6IG51bWJlciwgcm93QXJyOiBbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhlYWQgKz0gYDx0cj5gO1xyXG4gICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGw6IGFueSwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5zdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDx0aCBjbGFzcz1cInRoZWFkLWNlbGwgdGNlbGwgJHtjZWxsLmlzTGFzdFN0aWNreSA/ICd0Y2VsbC1maXgtbGVmdC1sYXN0JyA6ICcnfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2JnQ29sb3J9O3Bvc2l0aW9uOiBzdGlja3k7IGxlZnQ6ICR7Y2VsbC5sZWZ0ICogcn1weFwiICByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCIgY29sc3Bhbj1cIiR7Y2VsbC5jb2xzcGFufVwiPiR7Y2VsbC52YWx1ZX08L3RoPmBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgIDx0aCBjbGFzcz1cInRoZWFkLWNlbGwgdGNlbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtiZ0NvbG9yfVwiIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIiBjb2xzcGFuPVwiJHtjZWxsLmNvbHNwYW59XCI+JHtjZWxsLnZhbHVlfTwvdGg+YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEluZGV4ID09PSByb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgPC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmRleCA9PT0gcm93QXJyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgPC90aGVhZD5gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YSwgZGF0YUluZGV4LCBkYXRhQXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYm9keU9wdGl0b24ucm93LmZvckVhY2goKHJvdzogW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGw6IGFueSwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRkIGNsYXNzPVwidGNlbGwgJHtjZWxsLmlzTGFzdFN0aWNreSA/ICd0Y2VsbC1maXgtbGVmdC1sYXN0JyA6ICcnfVwiIHN0eWxlPVwicG9zaXRpb246IHN0aWNreTsgbGVmdDogJHtjZWxsLmxlZnQgKiByfXB4XCIgIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIj4ke2NlbGwudmFsdWUgPyBjZWxsLnZhbHVlIDogZGF0YVtjZWxsLnByb3BdfTwvdGQ+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYCA8dGQgY2xhc3M9XCJ0Y2VsbFwiIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIj4ke2NlbGwudmFsdWUgPyBjZWxsLnZhbHVlIDogZGF0YVtjZWxsLnByb3BdfTwvdGQ+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IHJvdy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5kZXggPT09IGRhdGFBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGA8L3Rib2R5PmBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwgKyBjb2wgKyB0aGVhZCArIHRib2R5ICsgYDwvdGFibGU+PC9kaXY+YDtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxpZmV0aW1lczoge1xyXG4gICAgICAgIGF0dGFjaGVkKCkgeyB9XHJcbiAgICB9LFxyXG59KSJdfQ==