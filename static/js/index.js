$(function(){
			// 执行代码
			// 初始化
			$("#mae-chart").hide()
			$("#mse-chart").hide()
			$("#ht-chart").hide()

			let test_list = [];

			$.ajax({
				url:'http://127.0.0.1:8000/api/list_test',
				async: false,
				type: 'GET',
				data: {},
				success: function (result) {
					test_list = result['list']
				}
			});

			//console.log('test_list = ' + JSON.stringify(test_list))

			let total_timestamp = []

			let test_infos = [];

			$.ajax({
				url:'http://127.0.0.1:8000/api/show_test_infos',
				async: false,
				type: 'GET',
				data: {},
				success: function (result) {
					test_infos = result['list'].map( o=> {
						return o.fields
					})
				}
			});

			//console.log('test_infos = ' + JSON.stringify(test_infos))

			test_list.forEach(function (value) {
				let filtered = test_infos.filter( o => {
					//console.log('value = '+JSON.stringify(value))
					//console.log('o = '+JSON.stringify(o))
					return  o.test_name === value.test_name &&
							o.test_type === value.test_type &&
							o.device_type === value.device_type &&
							o.sub_id === value.sub_id
				});

				//console.log('filtered = ' + JSON.stringify(filtered))

				let info_buffer = []

				filtered.forEach( function (v) {
					total_timestamp.push(v.timestamp)
					info_buffer.push({
						'timestamp': v.timestamp,
						'mae': v.mae,
						'mse': v.mse,
						'hardware_time': v.hardware_time,
						'mae_threshold': v.mae_threshold,
						'mse_threshold': v.mae_threshold,
					});
				})

				value.info_buffer = info_buffer
			});

			//console.log(JSON.stringify(test_list))
			//console.log('total_timestamp = ' + total_timestamp)
			let time_set = Array.from(new Set(total_timestamp)).sort()

			let thead_mae="<thead><tr>";
			thead_mae += '<th>name</th>';
			thead_mae += '<th>type</th>';
			thead_mae += '<th>device</th>';
			thead_mae += '<th>subid</th>';
			time_set.forEach(value => {
				thead_mae += '<th>'+value+'</th>';
			})
			var tbody_mae="<tbody>";
			$.each(test_list,function (index,item) {

				tbody_mae += '<tr>' +
						'<td>'+item.test_name+'</td>' +
						'<td>'+item.test_type+'</td>' +
						'<td>'+item.sub_id+'</td>' +
						'<td>'+item.device_type+'</td>'

				time_set.forEach(t => {
					let ret = item.info_buffer.find( o => {
						//console.log('t ===== ' + t + 'o ======' + JSON.stringify(o))
						return t == o.timestamp
					})
					if (ret === undefined){
						tbody_mae += '<td>--</td>';
					} else {
						if (ret['mae'] > ret['mae_threshold']) {
							tbody_mae += '<td><font color="red">'+ret['mae'] + '/' + ret['mae_threshold']+'</font></td>'
						} else {
							tbody_mae += '<td>'+ret['mae'] + '/' + ret['mae_threshold']+'</td>'
						}

					}
				});

				tbody_mae += '</tr>'
			})

			thead_mae += "</tr></thead>"
			tbody_mae += "</tbody>"
			//var html = ;
			$("#showtable_mae").html(thead_mae + tbody_mae);


			let thead_mse="<thead><tr>";
			thead_mse += '<th>name</th>';
			thead_mse += '<th>type</th>';
			thead_mse += '<th>device</th>';
			thead_mse += '<th>subid</th>';
			time_set.forEach(value => {
				thead_mse += '<th>'+value+'</th>';
			})
			var tbody_mse="<tbody>";
			$.each(test_list,function (index,item) {

				tbody_mse += '<tr>' +
						'<td>'+item.test_name+'</td>' +
						'<td>'+item.test_type+'</td>' +
						'<td>'+item.sub_id+'</td>' +
						'<td>'+item.device_type+'</td>'

				time_set.forEach(t => {
					let ret = item.info_buffer.find( o => {
						//console.log('t ===== ' + t + 'o ======' + JSON.stringify(o))
						return t == o.timestamp
					})
					if (ret === undefined){
						tbody_mse += '<td>--</td>';
					} else {
						if (ret['mse'] > ret['mse_threshold']) {
							tbody_mse += '<td><font color="red">'+ret['mse'] + '/' + ret['mse_threshold']+'</font></td>'
						} else {
							tbody_mse += '<td>'+ret['mse'] + '/' + ret['mse_threshold']+'</td>'
						}

					}
				});

				tbody_mse += '</tr>'
			})

			thead_mse += "</tr></thead>"
			tbody_mse += "</tbody>"
			//var html = ;
			$("#showtable_mse").html(thead_mse + tbody_mse);


			let thead_hw="<thead><tr>";
			thead_hw += '<th>name</th>';
			thead_hw += '<th>type</th>';
			thead_hw += '<th>device</th>';
			thead_hw += '<th>subid</th>';
			time_set.forEach(value => {
				thead_hw += '<th>'+value+'</th>';
			})
			let tbody_hw="<tbody>";
			$.each(test_list,function (index,item) {

				tbody_hw += '<tr>' +
						'<td>'+item.test_name+'</td>' +
						'<td>'+item.test_type+'</td>' +
						'<td>'+item.sub_id+'</td>' +
						'<td>'+item.device_type+'</td>'

				time_set.forEach(t => {
					let ret = item.info_buffer.find( o => {
						//console.log('t ===== ' + t + 'o ======' + JSON.stringify(o))
						return t == o.timestamp
					})
					if (ret === undefined){
						tbody_hw += '<td>--</td>';
					} else {
						tbody_hw += '<td>'+ret['hardware_time'] +'</td>'
					}
				});

				tbody_hw += '</tr>'
			})

			thead_hw += "</tr></thead>"
			tbody_hw += "</tbody>"
			//var html = ;
			$("#showtable_hw").html(thead_hw + tbody_hw);


			// 响应绘图
			$("#check_property_trend").click(function(){

				$("#mae-chart").show()
				$("#mse-chart").show()
				$("#ht-chart").show()

				var query_str =  'http://127.0.0.1:8000/api/query_test_info?'
						+ "test_name=" + $("#test_name").val() + "&"
						+ "test_type=" + $("#test_type").val() + "&"
						+ "sub_id=" + $("#sub_id").val() + "&"
						+ "device_type=" + $("#device_type").val()

				$.ajax({
					url: query_str,
					async: false, //同步方式发送请求，true为异步发送
					type: "GET",
					data: {},
					success: function (result) {

						let mae = result.list.map(o => {
							//console.log('o =============================== > ' + JSON.stringify(o))
							//console.log('o =============================== > ' + o['fields'][$("#viz_property").val()])
							return o['fields']['mae']
						})

						let mse = result.list.map(o => {
							//console.log('o =============================== > ' + JSON.stringify(o))
							//console.log('o =============================== > ' + o['fields'][$("#viz_property").val()])
							return o['fields']['mse']
						})

						let hardward_time = result.list.map(o => {
							//console.log('o =============================== > ' + JSON.stringify(o))
							//console.log('o =============================== > ' + o['fields'][$("#viz_property").val()])
							return o['fields']['hardware_time']
						})

						let timestamp = result.list.map(o => {
							//console.log('o =============================== > ' + JSON.stringify(o))
							//console.log('o =============================== > ' + o['fields'][timestamp])
							return o['fields']['timestamp']
						})

						console.log('mae == ' + mae)
						console.log('mse == ' + mse)
						console.log('ht == ' + hardward_time)
						let maeData = {
							labels : timestamp,
							datasets : [
								{
									label: "mae data",
									fillColor : "rgba(37,190,174,0.2)",
									strokeColor : "rgba(37,190,174,1)",
									pointColor : "rgba(37,190,174,1)",
									pointStrokeColor : "#fff",
									pointHighlightFill : "#fff",
									pointHighlightStroke : "rgba(220,220,220,1)",
									data : mae
								}
							]
						}

						let mseData = {
							labels : timestamp,
							datasets : [
								{
									label: "mse data",
									fillColor : "rgba(37,190,174,0.2)",
									strokeColor : "rgba(37,190,174,1)",
									pointColor : "rgba(37,190,174,1)",
									pointStrokeColor : "#fff",
									pointHighlightFill : "#fff",
									pointHighlightStroke : "rgba(220,220,220,1)",
									data : mse
								}
							]
						}

						let hwData = {
							labels : timestamp,
							datasets : [
								{
									label: "hardware data",
									fillColor : "rgba(37,190,174,0.2)",
									strokeColor : "rgba(37,190,174,1)",
									pointColor : "rgba(37,190,174,1)",
									pointStrokeColor : "#fff",
									pointHighlightFill : "#fff",
									pointHighlightStroke : "rgba(220,220,220,1)",
									data : hardward_time
								}
							]
						}

						var chart1 = document.getElementById("line-chart-1").getContext("2d");
						//console.log('lcd = ' + lineChartData)
						window.myLine = new Chart(chart1).Line(maeData, {
							responsive: true,
							scaleLineColor: "rgba(0,0,0,.2)",
							scaleGridLineColor: "rgba(0,0,0,.05)",
							scaleFontColor: "#c5c7cc"
						});

						var chart2 = document.getElementById("line-chart-2").getContext("2d");
						//console.log('lcd = ' + lineChartData)
						window.myLine = new Chart(chart2).Line(mseData, {
							responsive: true,
							scaleLineColor: "rgba(0,0,0,.2)",
							scaleGridLineColor: "rgba(0,0,0,.05)",
							scaleFontColor: "#c5c7cc"
						});

						var chart3 = document.getElementById("line-chart-3").getContext("2d");
						//console.log('lcd = ' + lineChartData)
						window.myLine = new Chart(chart3).Line(hwData, {
							responsive: true,
							scaleLineColor: "rgba(0,0,0,.2)",
							scaleGridLineColor: "rgba(0,0,0,.05)",
							scaleFontColor: "#c5c7cc"
						});
					}
				});

			});

		});
