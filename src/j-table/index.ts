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
        html: ``
    },
    observers: {
        'data,option': function () {
            if (this.properties.data.length && Object.keys(this.properties.option).length) this.initHtml();
        }
    },
    methods: {
        async setSystemInfo() {
            return new Promise(resolve => {
                wx.getSystemInfo({
                    success: (result: any) => {
                        this.data.systemInfo.windowWidth = result.windowWidth;
                        this.data.systemInfo.rate = result.windowWidth / 375;
                        resolve();
                    },
                })
            })
        },
        initHtml() {
            console.log('执行initHtml')
            const option = this.properties.option;
            const data = this.properties.data;
            const r = this.data.systemInfo.rate;
            const bgColor = option.headOption.bgColor;
            const tableWidth = option.colOption.reduce((p: number, v: number) => p + v);
            let col = ``;
            let thead = `<thead>`;
            let tbody = `<tbody>`;
            let html = `<div style="width: ${option.width ? option.width : this.data.systemInfo.windowWidth}px; overflow: auto;border-left: #f0f0f0 solid 1px;border-top: #f0f0f0 solid 1px;">
        <table style="table-layout: fixed;border-collapse: separate;border-spacing: 0;width: ${tableWidth * r}px;">`
            option.colOption.forEach((v: number) => {
                col += `<col style="width: ${v * r}px" />`
            })
            option.headOption.row.forEach((row: [], rowIndex: number, rowArr: []) => {
                thead += `<tr>`;
                row.forEach((cell: any, cellIndex: number) => {
                    if (cell.sticky) {
                        thead += `<th class="thead-cell tcell ${cell.isLastSticky ? 'tcell-fix-left-last' : ''}" style="background-color:${bgColor};position: sticky; left: ${cell.left * r}px"  rowspan="${cell.rowspan}" colspan="${cell.colspan}">${cell.value}</th>`
                    } else {
                        thead += ` <th class="thead-cell tcell" style="background-color:${bgColor}" rowspan="${cell.rowspan}" colspan="${cell.colspan}">${cell.value}</th>`
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
                option.bodyOptiton.row.forEach((row: []) => {
                    tbody += `<tr>`;
                    row.forEach((cell: any, cellIndex: number) => {
                        if (cell.sticky) {
                            tbody += `<td class="tcell ${cell.isLastSticky ? 'tcell-fix-left-last' : ''}" style="position: sticky; left: ${cell.left * r}px"  rowspan="${cell.rowspan}">${cell.value ? cell.value : data[cell.prop]}</td>`
                        } else {
                            tbody += ` <td class="tcell" colspan="${cell.rowspan}">${cell.value ? cell.value : data[cell.prop]}</td>`
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
        async attached() {
            await this.setSystemInfo();
        }
    },
})