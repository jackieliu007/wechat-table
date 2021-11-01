"use strict";
Page({
    data: {
        tableOption: {},
        tableData: []
    },
    onLoad: function () {
        var option = {
            headOption: {
                row: [
                    [{
                        value: '水果',
                        rowspan: 2,
                        sticky: true,
                        left: 0
                    }, {
                        value: '',
                        rowspan: 2,
                        sticky: true,
                        left: 120
                    }, {
                        value: '分类',
                        colspan: 2
                    }],
                    [{
                        value: '大果',
                    }, {
                        value: '小果',
                    }]
                ],
                thStickyStyle: 'background-color:#007f80;',
                thStyle: 'background-color:#428bca;'
            },
            bodyOption: {
                row: [
                    [{
                        value: '',
                        prop: 'fruitName',
                        rowspan: 2,
                        sticky: true,
                        left: 0
                    }, {
                        value: '单价(元/斤)',
                        sticky: true,
                        isLastSticky: true,
                        left: 120
                    }, {
                        prop: 'bigFruitPrice'
                    }, {
                        prop: 'smallFruitPrice'
                    }],
                    [{
                        value: '存量(吨)',
                        sticky: true,
                        isLastSticky: true,
                        left: 120
                    }, {
                        prop: 'bigFruitStock'
                    }, {
                        prop: 'smallFruitStock'
                    }]
                ],
                tdStickyStyle: 'background-color:#99ffff;',
                tdStyle: 'background-color:#b3ff66;'
            },
            colOption: [120, 120, 150, 150]
        };
        var data = [{
            fruitName: '苹果',
            bigFruitPrice: 7,
            smallFruitPrice: 4,
            bigFruitStock: 200,
            smallFruitStock: 300
        },
        {
            fruitName: '香蕉',
            bigFruitPrice: 5,
            smallFruitPrice: 3.5,
            bigFruitStock: 600,
            smallFruitStock: 1000
        }];
        this.setData({
            tableOption: option,
            tableData: data
        });
    },
});