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
        },
        lineHeight: {
            type: String
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
                                    resolve(1);
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
            var thStickyStyle = option.headOption.thStickyStyle;
            var thStyle = option.headOption.thStyle;
            var tdStickyStyle = option.bodyOption.tdStickyStyle;
            var tdStyle = option.bodyOption.tdStyle;
            var tableWidth = option.colOption.reduce(function (p, v) { return p + v; });
            var col = "";
            var thead = option.headOption.lineHeight ? "<thead style=\"line-height:" + option.headOption.lineHeight + ";\">" : "<thead>";
            var tbody = option.bodyOption.lineHeight ? "<tbody style=\"line-height:" + option.bodyOption.lineHeight + ";\">" : "<tbody>";
            var html = "<div style=\"width: " + (option.width ? option.width * r : this.data.systemInfo.windowWidth) + "px; overflow: auto;border-left: #f0f0f0 solid 1px;border-top: #f0f0f0 solid 1px;\">\n        <table style=\"table-layout: fixed;border-collapse: separate;border-spacing: 0;width: " + tableWidth * r + "px;\">";
            option.colOption.forEach(function (v) {
                col += "<col style=\"width: " + v * r + "px\" />";
            });
            option.headOption.row.forEach(function (row, rowIndex, rowArr) {
                thead += "<tr>";
                row.forEach(function (cell, cellIndex) {
                    if (cell.sticky) {
                        thead += "<th class=\"thead-cell tcell " + (cell.isLastSticky ? 'tcell-fix-left-last' : '') + "\" style=\"position: sticky; left: " + cell.left * r + "px;" + thStickyStyle + "\" rowspan=\"" + cell.rowspan + "\" colspan=\"" + cell.colspan + "\">" + cell.value + "</th>";
                    }
                    else {
                        thead += " <th class=\"thead-cell tcell\" style=" + thStyle + " rowspan=\"" + cell.rowspan + "\" colspan=\"" + cell.colspan + "\">" + cell.value + "</th>";
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
                option.bodyOption.row.forEach(function (row) {
                    tbody += "<tr>";
                    row.forEach(function (cell, cellIndex) {
                        if (cell.sticky) {
                            tbody += "<td class=\"tcell " + (cell.isLastSticky ? 'tcell-fix-left-last' : '') + "\" style=\"position: sticky; left: " + cell.left * r + "px;" + tdStickyStyle + "\" rowspan=\"" + cell.rowspan + "\">" + (cell.value ? cell.value : data[cell.prop]) + "</td>";
                        }
                        else {
                            tbody += " <td class=\"tcell\" style=" + tdStyle + " rowspan=\"" + cell.rowspan + "\">" + (cell.value ? cell.value : data[cell.prop]) + "</td>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxLQUFLO1NBQ2Q7UUFDRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDekMsSUFBSSxFQUFFLEVBQUU7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNQLGFBQWEsRUFBRTs7Ozs7aUNBQ1AsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQSxFQUF6RSxjQUF5RTtpQ0FDckUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQTFCLGNBQTBCOzRCQUFFLFdBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzs0QkFBMUIsU0FBMEIsQ0FBQzs7OzRCQUMzRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7OztTQUV2QjtLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0MsYUFBYSxFQUFuQjs7OztvQkFDSSxXQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzs0QkFDdEIsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixPQUFPLEVBQUUsVUFBQyxNQUFXO29DQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FB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RixJQUFJLFNBQVMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbEMsS0FBSyxJQUFJLFVBQVUsQ0FBQTtpQkFDdEI7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztRQUNQLENBQUM7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLFFBQVEsZ0JBQUssQ0FBQztLQUNqQjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgb3B0aW9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZUhlaWdodDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHN5c3RlbUluZm86IHsgd2luZG93V2lkdGg6IDM3NSwgcmF0ZTogMCB9LFxyXG4gICAgICAgIGh0bWw6IGBgXHJcbiAgICB9LFxyXG4gICAgb2JzZXJ2ZXJzOiB7XHJcbiAgICAgICAgJ2RhdGEsb3B0aW9uJzogYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmRhdGEubGVuZ3RoICYmIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcy5vcHRpb24pLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlKSBhd2FpdCB0aGlzLnNldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgYXN5bmMgc2V0U3lzdGVtSW5mbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zeXN0ZW1JbmZvLndpbmRvd1dpZHRoID0gcmVzdWx0LndpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlID0gcmVzdWx0LndpbmRvd1dpZHRoIC8gMzc1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdEh0bWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMucHJvcGVydGllcy5vcHRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BlcnRpZXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuZGF0YS5zeXN0ZW1JbmZvLnJhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoU3RpY2t5U3R5bGUgPSBvcHRpb24uaGVhZE9wdGlvbi50aFN0aWNreVN0eWxlO1xyXG4gICAgICAgICAgICBjb25zdCB0aFN0eWxlID0gb3B0aW9uLmhlYWRPcHRpb24udGhTdHlsZTtcclxuICAgICAgICAgICAgY29uc3QgdGRTdGlja3lTdHlsZSA9IG9wdGlvbi5ib2R5T3B0aW9uLnRkU3RpY2t5U3R5bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRkU3R5bGUgPSBvcHRpb24uYm9keU9wdGlvbi50ZFN0eWxlO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZHRoID0gb3B0aW9uLmNvbE9wdGlvbi5yZWR1Y2UoKHA6IG51bWJlciwgdjogbnVtYmVyKSA9PiBwICsgdik7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBgYDtcclxuICAgICAgICAgICAgbGV0IHRoZWFkID0gb3B0aW9uLmhlYWRPcHRpb24ubGluZUhlaWdodCA/IGA8dGhlYWQgc3R5bGU9XCJsaW5lLWhlaWdodDoke29wdGlvbi5oZWFkT3B0aW9uLmxpbmVIZWlnaHR9O1wiPmAgOiBgPHRoZWFkPmA7XHJcbiAgICAgICAgICAgIGxldCB0Ym9keSA9IG9wdGlvbi5ib2R5T3B0aW9uLmxpbmVIZWlnaHQgPyBgPHRib2R5IHN0eWxlPVwibGluZS1oZWlnaHQ6JHtvcHRpb24uYm9keU9wdGlvbi5saW5lSGVpZ2h0fTtcIj5gIDogYDx0Ym9keT5gO1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6ICR7b3B0aW9uLndpZHRoID8gb3B0aW9uLndpZHRoICogciA6IHRoaXMuZGF0YS5zeXN0ZW1JbmZvLndpbmRvd1dpZHRofXB4OyBvdmVyZmxvdzogYXV0bztib3JkZXItbGVmdDogI2YwZjBmMCBzb2xpZCAxcHg7Ym9yZGVyLXRvcDogI2YwZjBmMCBzb2xpZCAxcHg7XCI+XHJcbiAgICAgICAgPHRhYmxlIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO2JvcmRlci1zcGFjaW5nOiAwO3dpZHRoOiAke3RhYmxlV2lkdGggKiByfXB4O1wiPmBcclxuICAgICAgICAgICAgb3B0aW9uLmNvbE9wdGlvbi5mb3JFYWNoKCh2OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbCArPSBgPGNvbCBzdHlsZT1cIndpZHRoOiAke3YgKiByfXB4XCIgLz5gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIG9wdGlvbi5oZWFkT3B0aW9uLnJvdy5mb3JFYWNoKChyb3c6IFtdLCByb3dJbmRleDogbnVtYmVyLCByb3dBcnI6IFtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGVhZCArPSBgPHRyPmA7XHJcbiAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCgoY2VsbDogYW55LCBjZWxsSW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLnN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgPHRoIGNsYXNzPVwidGhlYWQtY2VsbCB0Y2VsbCAke2NlbGwuaXNMYXN0U3RpY2t5ID8gJ3RjZWxsLWZpeC1sZWZ0LWxhc3QnIDogJyd9XCIgc3R5bGU9XCJwb3NpdGlvbjogc3RpY2t5OyBsZWZ0OiAke2NlbGwubGVmdCAqIHJ9cHg7JHt0aFN0aWNreVN0eWxlfVwiIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIiBjb2xzcGFuPVwiJHtjZWxsLmNvbHNwYW59XCI+JHtjZWxsLnZhbHVlfTwvdGg+YFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkICs9IGAgPHRoIGNsYXNzPVwidGhlYWQtY2VsbCB0Y2VsbFwiIHN0eWxlPSR7dGhTdHlsZX0gcm93c3Bhbj1cIiR7Y2VsbC5yb3dzcGFufVwiIGNvbHNwYW49XCIke2NlbGwuY29sc3Bhbn1cIj4ke2NlbGwudmFsdWV9PC90aD5gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IHJvdy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8L3RyPmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZGV4ID09PSByb3dBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8L3RoZWFkPmBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChkYXRhLCBkYXRhSW5kZXgsIGRhdGFBcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5ib2R5T3B0aW9uLnJvdy5mb3JFYWNoKChyb3c6IFtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDx0cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsOiBhbnksIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLnN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDx0ZCBjbGFzcz1cInRjZWxsICR7Y2VsbC5pc0xhc3RTdGlja3kgPyAndGNlbGwtZml4LWxlZnQtbGFzdCcgOiAnJ31cIiBzdHlsZT1cInBvc2l0aW9uOiBzdGlja3k7IGxlZnQ6ICR7Y2VsbC5sZWZ0ICogcn1weDske3RkU3RpY2t5U3R5bGV9XCIgcm93c3Bhbj1cIiR7Y2VsbC5yb3dzcGFufVwiPiR7Y2VsbC52YWx1ZSA/IGNlbGwudmFsdWUgOiBkYXRhW2NlbGwucHJvcF19PC90ZD5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgIDx0ZCBjbGFzcz1cInRjZWxsXCIgc3R5bGU9JHt0ZFN0eWxlfSByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCI+JHtjZWxsLnZhbHVlID8gY2VsbC52YWx1ZSA6IGRhdGFbY2VsbC5wcm9wXX08L3RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEluZGV4ID09PSByb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDwvdHI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YUluZGV4ID09PSBkYXRhQXJyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPC90Ym9keT5gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sICsgY29sICsgdGhlYWQgKyB0Ym9keSArIGA8L3RhYmxlPjwvZGl2PmA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiBodG1sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsaWZldGltZXM6IHtcclxuICAgICAgICBhdHRhY2hlZCgpIHsgfVxyXG4gICAgfSxcclxufSkiXX0=