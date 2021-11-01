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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxLQUFLO1NBQ2Q7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUN6QyxJQUFJLEVBQUUsRUFBRTtLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsYUFBYSxFQUFFOzs7OztpQ0FDUCxDQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFBLEVBQXpFLGNBQXlFO2lDQUNyRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBMUIsY0FBMEI7NEJBQUUsV0FBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7OzRCQUExQixTQUEwQixDQUFDOzs7NEJBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7O1NBRXZCO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDQyxhQUFhLEVBQW5COzs7O29CQUNJLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPOzRCQUN0QixFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLE9BQU8sRUFBRSxVQUFDLE1BQVc7b0NBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO29DQUN0RCxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7b0NBQ3JELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDZixDQUFDOzZCQUNKLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7O1NBQ0w7UUFDRCxRQUFRLEVBQVI7WUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDMUMsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDMUMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FBQztZQUM1RSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFHLDBCQUFzQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyw0TEFDaEIsVUFBVSxHQUFHLENBQUMsV0FBTyxDQUFBO1lBQ3hHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBUztnQkFDL0IsR0FBRyxJQUFJLHlCQUFzQixDQUFDLEdBQUcsQ0FBQyxZQUFRLENBQUE7WUFDOUMsQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFPLEVBQUUsUUFBZ0IsRUFBRSxNQUFVO2dCQUNoRSxLQUFLLElBQUksTUFBTSxDQUFDO2dCQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUyxFQUFFLFNBQWlCO29CQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2IsS0FBSyxJQUFJLG1DQUErQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSw0Q0FBb0MsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFdBQU0sYUFBYSxxQkFBYyxJQUFJLENBQUMsT0FBTyxxQkFBYyxJQUFJLENBQUMsT0FBTyxXQUFLLElBQUksQ0FBQyxLQUFLLFVBQU8sQ0FBQTtxQkFDdk87eUJBQU07d0JBQ0gsS0FBSyxJQUFJLDJDQUF1QyxPQUFPLG1CQUFhLElBQUksQ0FBQyxPQUFPLHFCQUFjLElBQUksQ0FBQyxPQUFPLFdBQUssSUFBSSxDQUFDLEtBQUssVUFBTyxDQUFBO3FCQUNuSTtvQkFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDOUIsS0FBSyxJQUFJLE9BQU8sQ0FBQTtxQkFDbkI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxRQUFRLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLEtBQUssSUFBSSxVQUFVLENBQUE7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPO2dCQUNsQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFPO29CQUNsQyxLQUFLLElBQUksTUFBTSxDQUFDO29CQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUyxFQUFFLFNBQWlCO3dCQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ2IsS0FBSyxJQUFJLHdCQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSw0Q0FBb0MsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFdBQU0sYUFBYSxxQkFBYyxJQUFJLENBQUMsT0FBTyxZQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQU8sQ0FBQTt5QkFDak87NkJBQU07NEJBQ0gsS0FBSyxJQUFJLGdDQUE0QixPQUFPLG1CQUFhLElBQUksQ0FBQyxPQUFPLFlBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBTyxDQUFBO3lCQUM3SDt3QkFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDOUIsS0FBSyxJQUFJLE9BQU8sQ0FBQTt5QkFDbkI7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUssSUFBSSxVQUFVLENBQUE7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDUCxRQUFRLGdCQUFLLENBQUM7S0FDakI7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG9wdGlvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdHlwZTogQXJyYXlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHN5c3RlbUluZm86IHsgd2luZG93V2lkdGg6IDM3NSwgcmF0ZTogMCB9LFxyXG4gICAgICAgIGh0bWw6IGBgXHJcbiAgICB9LFxyXG4gICAgb2JzZXJ2ZXJzOiB7XHJcbiAgICAgICAgJ2RhdGEsb3B0aW9uJzogYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmRhdGEubGVuZ3RoICYmIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcy5vcHRpb24pLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlKSBhd2FpdCB0aGlzLnNldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgYXN5bmMgc2V0U3lzdGVtSW5mbygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zeXN0ZW1JbmZvLndpbmRvd1dpZHRoID0gcmVzdWx0LndpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3lzdGVtSW5mby5yYXRlID0gcmVzdWx0LndpbmRvd1dpZHRoIC8gMzc1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdEh0bWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMucHJvcGVydGllcy5vcHRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BlcnRpZXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuZGF0YS5zeXN0ZW1JbmZvLnJhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoU3RpY2t5U3R5bGUgPSBvcHRpb24uaGVhZE9wdGlvbi50aFN0aWNreVN0eWxlO1xyXG4gICAgICAgICAgICBjb25zdCB0aFN0eWxlID0gb3B0aW9uLmhlYWRPcHRpb24udGhTdHlsZTtcclxuICAgICAgICAgICAgY29uc3QgdGRTdGlja3lTdHlsZSA9IG9wdGlvbi5ib2R5T3B0aW9uLnRkU3RpY2t5U3R5bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRkU3R5bGUgPSBvcHRpb24uYm9keU9wdGlvbi50ZFN0eWxlO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZHRoID0gb3B0aW9uLmNvbE9wdGlvbi5yZWR1Y2UoKHA6IG51bWJlciwgdjogbnVtYmVyKSA9PiBwICsgdik7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSBgYDtcclxuICAgICAgICAgICAgbGV0IHRoZWFkID0gYDx0aGVhZD5gO1xyXG4gICAgICAgICAgICBsZXQgdGJvZHkgPSBgPHRib2R5PmA7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDogJHtvcHRpb24ud2lkdGggPyBvcHRpb24ud2lkdGggKiByIDogdGhpcy5kYXRhLnN5c3RlbUluZm8ud2luZG93V2lkdGh9cHg7IG92ZXJmbG93OiBhdXRvO2JvcmRlci1sZWZ0OiAjZjBmMGYwIHNvbGlkIDFweDtib3JkZXItdG9wOiAjZjBmMGYwIHNvbGlkIDFweDtcIj5cclxuICAgICAgICA8dGFibGUgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6IGZpeGVkO2JvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7Ym9yZGVyLXNwYWNpbmc6IDA7d2lkdGg6ICR7dGFibGVXaWR0aCAqIHJ9cHg7XCI+YFxyXG4gICAgICAgICAgICBvcHRpb24uY29sT3B0aW9uLmZvckVhY2goKHY6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29sICs9IGA8Y29sIHN0eWxlPVwid2lkdGg6ICR7diAqIHJ9cHhcIiAvPmBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgb3B0aW9uLmhlYWRPcHRpb24ucm93LmZvckVhY2goKHJvdzogW10sIHJvd0luZGV4OiBudW1iZXIsIHJvd0FycjogW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8dHI+YDtcclxuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsOiBhbnksIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkICs9IGA8dGggY2xhc3M9XCJ0aGVhZC1jZWxsIHRjZWxsICR7Y2VsbC5pc0xhc3RTdGlja3kgPyAndGNlbGwtZml4LWxlZnQtbGFzdCcgOiAnJ31cIiBzdHlsZT1cInBvc2l0aW9uOiBzdGlja3k7IGxlZnQ6ICR7Y2VsbC5sZWZ0ICogcn1weDske3RoU3RpY2t5U3R5bGV9XCIgcm93c3Bhbj1cIiR7Y2VsbC5yb3dzcGFufVwiIGNvbHNwYW49XCIke2NlbGwuY29sc3Bhbn1cIj4ke2NlbGwudmFsdWV9PC90aD5gXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYCA8dGggY2xhc3M9XCJ0aGVhZC1jZWxsIHRjZWxsXCIgc3R5bGU9JHt0aFN0eWxlfSByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCIgY29sc3Bhbj1cIiR7Y2VsbC5jb2xzcGFufVwiPiR7Y2VsbC52YWx1ZX08L3RoPmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxJbmRleCA9PT0gcm93Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDwvdHI+YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kZXggPT09IHJvd0Fyci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlYWQgKz0gYDwvdGhlYWQ+YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGRhdGEsIGRhdGFJbmRleCwgZGF0YUFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmJvZHlPcHRpb24ucm93LmZvckVhY2goKHJvdzogW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGw6IGFueSwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPHRkIGNsYXNzPVwidGNlbGwgJHtjZWxsLmlzTGFzdFN0aWNreSA/ICd0Y2VsbC1maXgtbGVmdC1sYXN0JyA6ICcnfVwiIHN0eWxlPVwicG9zaXRpb246IHN0aWNreTsgbGVmdDogJHtjZWxsLmxlZnQgKiByfXB4OyR7dGRTdGlja3lTdHlsZX1cIiByb3dzcGFuPVwiJHtjZWxsLnJvd3NwYW59XCI+JHtjZWxsLnZhbHVlID8gY2VsbC52YWx1ZSA6IGRhdGFbY2VsbC5wcm9wXX08L3RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGAgPHRkIGNsYXNzPVwidGNlbGxcIiBzdHlsZT0ke3RkU3R5bGV9IHJvd3NwYW49XCIke2NlbGwucm93c3Bhbn1cIj4ke2NlbGwudmFsdWUgPyBjZWxsLnZhbHVlIDogZGF0YVtjZWxsLnByb3BdfTwvdGQ+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IHJvdy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keSArPSBgPC90cj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5kZXggPT09IGRhdGFBcnIubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGA8L3Rib2R5PmBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwgKyBjb2wgKyB0aGVhZCArIHRib2R5ICsgYDwvdGFibGU+PC9kaXY+YDtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxpZmV0aW1lczoge1xyXG4gICAgICAgIGF0dGFjaGVkKCkgeyB9XHJcbiAgICB9LFxyXG59KSJdfQ==