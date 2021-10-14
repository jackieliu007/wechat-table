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
        html: ``
    },
    observers: {
        'data,option': async function () {
            if (this.properties.data.length && Object.keys(this.properties.option).length) {
                if (!this.data.systemInfo.rate) await this.setSystemInfo();
                this.initHtml();
            }
        }
    },
    methods: {
        async setSystemInfo() {
            return new Promise(resolve => {
                wx.getSystemInfo({
                    success: (result: any) => {
                        this.data.systemInfo.windowWidth = result.windowWidth;
                        this.data.systemInfo.rate = result.windowWidth / 375;
                        resolve(1);
                    },
                })
            })
        },
        initHtml() {
            const option = this.properties.option;
            const data = this.properties.data;
            const r = this.data.systemInfo.rate;
            const thStickyStyle = option.headOption.thStickyStyle;
            const thStyle = option.headOption.thStyle;
            const tdStickyStyle = option.bodyOption.tdStickyStyle;
            const tdStyle = option.bodyOption.tdStyle;
            const tableWidth = option.colOption.reduce((p: number, v: number) => p + v);
            let col = ``;
            let thead = `<thead>`;
            let tbody = `<tbody>`;
            let html = `<div style="width: ${option.width ? option.width * r : this.data.systemInfo.windowWidth}px; overflow: auto;border-left: #f0f0f0 solid 1px;border-top: #f0f0f0 solid 1px;">
        <table style="table-layout: fixed;border-collapse: separate;border-spacing: 0;width: ${tableWidth * r}px;">`
            option.colOption.forEach((v: number) => {
                col += `<col style="width: ${v * r}px" />`
            })
            option.headOption.row.forEach((row: [], rowIndex: number, rowArr: []) => {
                thead += `<tr>`;
                row.forEach((cell: any, cellIndex: number) => {
                    if (cell.sticky) {
                        thead += `<th class="thead-cell tcell ${cell.isLastSticky ? 'tcell-fix-left-last' : ''}" style="position: sticky; left: ${cell.left * r}px;${thStickyStyle}" rowspan="${cell.rowspan}" colspan="${cell.colspan}">${cell.value}</th>`
                    } else {
                        thead += ` <th class="thead-cell tcell" style=${thStyle} rowspan="${cell.rowspan}" colspan="${cell.colspan}">${cell.value}</th>`
                    }
                    if (cellIndex === row.length - 1) {
                        thead += `</tr>`
                    }
                })
                if (rowIndex === rowArr.length - 1) {
                    thead += `</thead>`
                }
            })
            data.forEach((data, dataIndex, dataArr) => {
                option.bodyOption.row.forEach((row: []) => {
                    tbody += `<tr>`;
                    row.forEach((cell: any, cellIndex: number) => {
                        if (cell.sticky) {
                            tbody += `<td class="tcell ${cell.isLastSticky ? 'tcell-fix-left-last' : ''}" style="position: sticky; left: ${cell.left * r}px;${tdStickyStyle}" rowspan="${cell.rowspan}">${cell.value ? cell.value : data[cell.prop]}</td>`
                        } else {
                            tbody += ` <td class="tcell" style=${tdStyle} rowspan="${cell.rowspan}">${cell.value ? cell.value : data[cell.prop]}</td>`
                        }
                        if (cellIndex === row.length - 1) {
                            tbody += `</tr>`
                        }
                    })
                })
                if (dataIndex === dataArr.length - 1) {
                    tbody += `</tbody>`
                }
            })
            html = html + col + thead + tbody + `</table></div>`;
            this.setData({
                html: html
            });
        }
    },
    lifetimes: {
        attached() { }
    },
})