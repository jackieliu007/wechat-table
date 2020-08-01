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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxLQUFLO1NBQ2Q7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUN6QyxJQUFJLEVBQUUsRUFBRTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsYUFBYSxFQUFFO1lBQ1gsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07Z0JBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25HLENBQUM7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNDLGFBQWEsRUFBbkI7Ozs7b0JBQ0ksV0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87NEJBQ3RCLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsT0FBTyxFQUFFLFVBQUMsTUFBVztvQ0FDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7b0NBQ3RELEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztvQ0FDckQsT0FBTyxFQUFFLENBQUM7Z0NBQ2QsQ0FBQzs2QkFDSixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7OztTQUNMO1FBQ0QsUUFBUSxFQUFSO1lBQ0ksT0FB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QUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFPLENBQUE7eUJBQ2pOOzZCQUFNOzRCQUNILEtBQUssSUFBSSxvQ0FBK0IsSUFBSSxDQUFDLE9BQU8sWUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFPLENBQUE7eUJBQzVHO3dCQUNELElBQUksU0FBUyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUM5QixLQUFLLElBQUksT0FBTyxDQUFBO3lCQUNuQjtvQkFDTCxDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLFNBQVMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbEMsS0FBSyxJQUFJLFVBQVUsQ0FBQTtpQkFDdEI7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztRQUNQLENBQUM7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNELFFBQVE7Ozs7Z0NBQ1YsV0FBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7OzRCQUExQixTQUEwQixDQUFDOzs7OztTQUM5QjtLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQ29tcG9uZW50KHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBvcHRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEFycmF5XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBzeXN0ZW1JbmZvOiB7IHdpbmRvd1dpZHRoOiAzNzUsIHJhdGU6IDEgfSxcclxuICAgICAgICBodG1sOiBgYFxyXG4gICAgfSxcclxuICAgIG9ic2VydmVyczoge1xyXG4gICAgICAgICdkYXRhLG9wdGlvbic6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5kYXRhLmxlbmd0aCAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMub3B0aW9uKS5sZW5ndGgpIHRoaXMuaW5pdEh0bWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGFzeW5jIHNldFN5c3RlbUluZm8oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3lzdGVtSW5mby53aW5kb3dXaWR0aCA9IHJlc3VsdC53aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN5c3RlbUluZm8ucmF0ZSA9IHJlc3VsdC53aW5kb3dXaWR0aCAvIDM3NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdEh0bWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiafooYxpbml0SHRtbCcpXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMucHJvcGVydGllcy5vcHRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BlcnRpZXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuZGF0YS5zeXN0ZW1JbmZvLnJhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGJnQ29sb3IgPSBvcHRpb24uaGVhZE9wdGlvbi5iZ0NvbG9yO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZHRoID0gb3B0aW9uLmNvbE9wdGlvbi5yZWR1Y2UoKHA6IG51bWJlciwgdjogbnVtYmVyKSA9PiBwICsgdik7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBgYDtcclxuICAgICAgICAgICAgbGV0IHRoZWFkID0gYDx0aGVhZD5gO1xyXG4gICAgICAgICAgICBsZXQgdGJvZHkgPSBgPHRib2R5PmA7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDogJHtvcHRpb24ud2lkdGggPyBvcHRpb24ud2lkdGggOiB0aGlzLmRhdGEuc3lzdGVtSW5mby53aW5kb3dXaWR0aH1weDsgb3ZlcmZsb3c6IGF1dG87Ym9yZGVyLWxlZnQ6ICNmMGYwZjAgc29saWQgMXB4O2JvcmRlci10b3A6ICNmMGYwZjAgc29saWQgMXB4O1wiPlxyXG4gICAgICAgIDx0YWJsZSBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7Ym9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtib3JkZXItc3BhY2luZzogMDt3aWR0aDogJHt0YWJsZVdpZHRoICogcn1weDtcIj5gXHJcbiAgICAgICAgICAgIG9wdGlvbi5jb2xPcHRpb24uZm9yRWFjaCgodjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb2wgKz0gYDxjb2wgc3R5bGU9XCJ3aWR0aDogJHt2ICogcn1weFwiIC8+YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBvcHRpb24uaGVhZE9wdGlvbi5yb3cuZm9yRWFjaCgocm93OiBbXSwgcm93SW5kZXg6IG51bWJlciwgcm93QXJyOiBbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhlYWQgKz0gYDx0cj5gO1xyXG4gICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGw6IGFueSwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5zdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDx0aCBjbGFzcz1cInRoZWFkLWNlbGwgdGNlbGwgJHtjZWxsLmlzTGFzdFN0aWNreSA/ICd0Y2VsbC1maXgtbGVmdC1sYXN0JyA6ICcnfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2JnQ29sb3J9O3Bvc2l0aW9uOiBzdGlja3k7IGxlZnQ6ICR7Y2VsbC5sZWZ0ICogcn1weFwiICByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCIgY29sc3Bhbj1cIiR7Y2VsbC5jb2xzcGFufVwiPiR7Y2VsbC52YWx1ZX08L3RoPmBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgIDx0aCBjbGFzcz1cInRoZWFkLWNlbGwgdGNlbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtiZ0NvbG9yfVwiIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIiBjb2xzcGFuPVwiJHtjZWxsLmNvbHNwYW59XCI+JHtjZWxsLnZhbHVlfTwvdGg+YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbEluZGV4ID09PSByb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgPC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmRleCA9PT0gcm93QXJyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVhZCArPSBgPC90aGVhZD5gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YSwgZGF0YUluZGV4LCBkYXRhQXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYm9keU9wdGl0b24ucm93LmZvckVhY2goKHJvdzogW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGw6IGFueSwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRkIGNsYXNzPVwidGNlbGwgJHtjZWxsLmlzTGFzdFN0aWNreSA/ICd0Y2VsbC1maXgtbGVmdC1sYXN0JyA6ICcnfVwiIHN0eWxlPVwicG9zaXRpb246IHN0aWNreTsgbGVmdDogJHtjZWxsLmxlZnQgKiByfXB4XCIgIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIj4ke2NlbGwudmFsdWUgPyBjZWxsLnZhbHVlIDogZGF0YVtjZWxsLnByb3BdfTwvdGQ+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkgKz0gYCA8dGQgY2xhc3M9XCJ0Y2VsbFwiIHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIj4ke2NlbGwudmFsdWUgPyBjZWxsLnZhbHVlIDogZGF0YVtjZWxsLnByb3BdfTwvdGQ+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IHJvdy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5kZXggPT09IGRhdGFBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGA8L3Rib2R5PmBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwgKyBjb2wgKyB0aGVhZCArIHRib2R5ICsgYDwvdGFibGU+PC9kaXY+YDtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxpZmV0aW1lczoge1xyXG4gICAgICAgIGFzeW5jIGF0dGFjaGVkKCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldFN5c3RlbUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KSJdfQ==