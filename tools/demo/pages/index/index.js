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
                bgColor: 'rgb(66, 139, 202)'
            },
            bodyOptiton: {
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
                ]
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
            }
        ];
        this.setData({
            tableOption: option,
            tableData: data
        });
    },
});