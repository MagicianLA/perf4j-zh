$(function () {
    try {
        var charts = $("#runningInfo").html();
        var parseData = JSON.parse(charts);


        var tags = parseData['tags'];
        var currentTag = $("#currentTag").html();
        for (var n = 0; n < tags.length; n++) {
            var node = $("<option>").html(tags[n]);
            if (currentTag != null && tags[n] == currentTag) node.attr("selected", "true");
            $("#tag").append(node);
        }

        $("#chart").html("");
        for (var n = 0; n < parseData['graph'].length; n++) {
            var graph = parseData['graph'][n];
            var container = $("<div>").attr("class", "col-md-12");
            //var title =  $("<h2>").attr("class","sub-header").html(graph.graphType)
            var node = $("<div>").attr("id", "chart" + n).attr("style", "height:300px;");
            //container.append(title);
            container.append(node);
            $("#chart").append(container);
            //alert(config)
            var myChart = echarts.init(document.getElementById("chart" + n));
            var series = []
            for (var tag in graph.tags) {
                var symbol = 'heart';
                if (graph.tagsToYData.length > 168) {
                    symbol = "none";
                }
                var tagData = {
                    name: graph.tags[tag],
                    type: 'line',
                    data: graph.tagsToYData,
                    symbol: symbol,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            //{type : 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
                series.push(tagData)
            }
            var option = {
                title: {
                    text: graph.graphType,
                    //subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: graph.tags,
                    orient: 'horizontal', // 'vertical'
                    x: 'center', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    padding: [20, 5, 5, 5],    // [5, 10, 15, 20]
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: false},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: graph.labels,
                        axisTick: {
                            interval: 0

                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} '
                        },
                        axisTick: {
                            interval: 0

                        }
                    }
                ],
                series: series
            };


            // 为echarts对象加载数据
            myChart.setOption(option);
        }

    } catch (e) {

    }

});

