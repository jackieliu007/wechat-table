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
Object.defineProperty(exports, "__esModule", { value: true });
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
        systemInfo: { windowWidth: 375, rate: 1 },
        html: ""
    },
    observers: {
        'data,option': function () {
            if (this.properties.data.length && Object.keys(this.properties.option).length)
                this.initHtml();
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
            console.log('执行initHtml');
            var option = this.properties.option;
            var data = this.properties.data;
            var r = this.data.systemInfo.rate;
            var bgColor = option.headOption.bgColor;
            var tableWidth = option.colOption.reduce(function (p, v) { return p + v; });
            var col = "";
            var thead = "<thead>";
            var tbody = "<tbody>";
            var html = "<div style=\"width: " + (option.width ? option.width : this.data.systemInfo.windowWidth) + "px; overflow: auto;border-left: #f0f0f0 solid 1px;border-top: #f0f0f0 solid 1px;\">\n        <table style=\"table-layout: fixed;border-collapse: separate;border-spacing: 0;width: " + tableWidth * r + "px;\">";
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
                            tbody += " <td class=\"tcell\" colspan=\"" + cell.rowspan + "\">" + (cell.value ? cell.value : data[cell.prop]) + "</td>";
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
        attached: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.setSystemInfo()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQVMsQ0FBQztJQUNOLFVBQVUsRUFBRTtRQUNSLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1NBQ2Y7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsS0FBSztTQUNkO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDekMsSUFBSSxFQUFFLEVBQUU7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNQLGFBQWEsRUFBRTtZQUNYLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNO2dCQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRyxDQUFDO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDQyxhQUFhLEVBQW5COzs7O29CQUNJLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPOzRCQUN0QixFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLE9BQU8sRUFBRSxVQUFDLE1BQVc7b0NBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO29DQUN0RCxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7b0NBQ3JELE9BQU8sRUFBRSxDQUFDO2dDQUNkLENBQUM7NkJBQ0osQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzs7U0FDTDtRQUNELFFBQVEsRUFBUjtZQUNJLE9B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QUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTyxDQUFBO3lCQUNqTjs2QkFBTTs0QkFDSCxLQUFLLElBQUksb0NBQStCLElBQUksQ0FBQyxPQUFPLFlBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTyxDQUFBO3lCQUM1Rzt3QkFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDOUIsS0FBSyxJQUFJLE9BQU8sQ0FBQTt5QkFDbkI7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUssSUFBSSxVQUFVLENBQUE7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDRCxRQUFROzs7O2dDQUNWLFdBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzs0QkFBMUIsU0FBMEIsQ0FBQzs7Ozs7U0FDOUI7S0FDSjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IH07XHJcbkNvbXBvbmVudCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgb3B0aW9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgc3lzdGVtSW5mbzogeyB3aW5kb3dXaWR0aDogMzc1LCByYXRlOiAxIH0sXHJcbiAgICAgICAgaHRtbDogYGBcclxuICAgIH0sXHJcbiAgICBvYnNlcnZlcnM6IHtcclxuICAgICAgICAnZGF0YSxvcHRpb24nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuZGF0YS5sZW5ndGggJiYgT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzLm9wdGlvbikubGVuZ3RoKSB0aGlzLmluaXRIdG1sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBhc3luYyBzZXRTeXN0ZW1JbmZvKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN5c3RlbUluZm8ud2luZG93V2lkdGggPSByZXN1bHQud2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zeXN0ZW1JbmZvLnJhdGUgPSByZXN1bHQud2luZG93V2lkdGggLyAzNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRIdG1sKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5omn6KGMaW5pdEh0bWwnKVxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLnByb3BlcnRpZXMub3B0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wZXJ0aWVzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlO1xyXG4gICAgICAgICAgICBjb25zdCBiZ0NvbG9yID0gb3B0aW9uLmhlYWRPcHRpb24uYmdDb2xvcjtcclxuICAgICAgICAgICAgY29uc3QgdGFibGVXaWR0aCA9IG9wdGlvbi5jb2xPcHRpb24ucmVkdWNlKChwOiBudW1iZXIsIHY6IG51bWJlcikgPT4gcCArIHYpO1xyXG4gICAgICAgICAgICBsZXQgY29sID0gYGA7XHJcbiAgICAgICAgICAgIGxldCB0aGVhZCA9IGA8dGhlYWQ+YDtcclxuICAgICAgICAgICAgbGV0IHRib2R5ID0gYDx0Ym9keT5gO1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6ICR7b3B0aW9uLndpZHRoID8gb3B0aW9uLndpZHRoIDogdGhpcy5kYXRhLnN5c3RlbUluZm8ud2luZG93V2lkdGh9cHg7IG92ZXJmbG93OiBhdXRvO2JvcmRlci1sZWZ0OiAjZjBmMGYwIHNvbGlkIDFweDtib3JkZXItdG9wOiAjZjBmMGYwIHNvbGlkIDFweDtcIj5cclxuICAgICAgICA8dGFibGUgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6IGZpeGVkO2JvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7Ym9yZGVyLXNwYWNpbmc6IDA7d2lkdGg6ICR7dGFibGVXaWR0aCAqIHJ9cHg7XCI+YFxyXG4gICAgICAgICAgICBvcHRpb24uY29sT3B0aW9uLmZvckVhY2goKHY6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29sICs9IGA8Y29sIHN0eWxlPVwid2lkdGg6ICR7diAqIHJ9cHhcIiAvPmBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgb3B0aW9uLmhlYWRPcHRpb24ucm93LmZvckVhY2goKHJvdzogW10sIHJvd0luZGV4OiBudW1iZXIsIHJvd0FycjogW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8dHI+YDtcclxuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsOiBhbnksIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8dGggY2xhc3M9XCJ0aGVhZC1jZWxsIHRjZWxsICR7Y2VsbC5pc0xhc3RTdGlja3kgPyAndGNlbGwtZml4LWxlZnQtbGFzdCcgOiAnJ31cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtiZ0NvbG9yfTtwb3NpdGlvbjogc3RpY2t5OyBsZWZ0OiAke2NlbGwubGVmdCAqIHJ9cHhcIiAgcm93c3Bhbj1cIiR7Y2VsbC5yb3dzcGFufVwiIGNvbHNwYW49XCIke2NlbGwuY29sc3Bhbn1cIj4ke2NlbGwudmFsdWV9PC90aD5gXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYCA8dGggY2xhc3M9XCJ0aGVhZC1jZWxsIHRjZWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7YmdDb2xvcn1cIiByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCIgY29sc3Bhbj1cIiR7Y2VsbC5jb2xzcGFufVwiPiR7Y2VsbC52YWx1ZX08L3RoPmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxJbmRleCA9PT0gcm93Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDwvdHI+YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kZXggPT09IHJvd0Fyci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDwvdGhlYWQ+YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGRhdGEsIGRhdGFJbmRleCwgZGF0YUFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmJvZHlPcHRpdG9uLnJvdy5mb3JFYWNoKChyb3c6IFtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDx0cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsOiBhbnksIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLnN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDx0ZCBjbGFzcz1cInRjZWxsICR7Y2VsbC5pc0xhc3RTdGlja3kgPyAndGNlbGwtZml4LWxlZnQtbGFzdCcgOiAnJ31cIiBzdHlsZT1cInBvc2l0aW9uOiBzdGlja3k7IGxlZnQ6ICR7Y2VsbC5sZWZ0ICogcn1weFwiICByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCI+JHtjZWxsLnZhbHVlID8gY2VsbC52YWx1ZSA6IGRhdGFbY2VsbC5wcm9wXX08L3RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGAgPHRkIGNsYXNzPVwidGNlbGxcIiBjb2xzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCI+JHtjZWxsLnZhbHVlID8gY2VsbC52YWx1ZSA6IGRhdGFbY2VsbC5wcm9wXX08L3RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEluZGV4ID09PSByb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYDwvdHI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YUluZGV4ID09PSBkYXRhQXJyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPC90Ym9keT5gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGh0bWwgPSBodG1sICsgY29sICsgdGhlYWQgKyB0Ym9keSArIGA8L3RhYmxlPjwvZGl2PmA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiBodG1sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsaWZldGltZXM6IHtcclxuICAgICAgICBhc3luYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSkiXX0=