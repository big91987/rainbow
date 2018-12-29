var randomScalingFactor = function(){ return Math.round(Math.random()*1000)};

var getJSON = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				resolve(xhr.response);
			} else {
				reject(status);
			}
		};
		xhr.send();
	});
};


//function add_test_info () {
//	var request_str = 'http://127.0.0.1:8000/api/add_test_info?'
//		+ "test_name=" + this.test_name + "&"
//		+ "test_type=" + this.test_type + "&"
//		+ "sub_id=" + this.sub_id + "&"
//		+ "device_type=" + this.device_type + "&"
//		+ "value_param=" + this.value_param + "&"
//		+ "seed=" + this.seed + "&"
//		+ "mae=" + this.mae + "&"
//		+ "mse=" + this.mse + "&"
//		+ "mae_threshold="+this.mae_threshold + "&"
//		+ "mse_threshold="+this.mse_threshold + "&"
//		+ "hardware_time="+this.hardware_time
//
//	this.$http.get('http://127.0.0.1:8000/api/add_test_info?'
//		+ "test_name=" + this.test_name + "&"
//		+ "test_type=" + this.test_type + "&"
//		+ "sub_id=" + this.sub_id + "&"
//		+ "device_type=" + this.device_type + "&"
//		+ "value_param=" + this.value_param + "&"
//		+ "seed=" + this.seed + "&"
//		+ "mae=" + this.mae + "&"
//		+ "mse=" + this.mse + "&"
//		+ "mae_threshold="+this.mae_threshold + "&"
//		+ "mse_threshold="+this.mse_threshold + "&"
//		+ "hardware_time="+this.hardware_time
//	)
//		.then((response) => {
//			var res = JSON.parse(response.bodyText)
//			if (res.error_num === 0) {
//				this.show_test_infos()
//			} else {
//				this.$message.error('新增test失败，请重试')
//				console.log(res['msg'])
//				console.log(request_str)
//			}
//		})
//}
//
//show_test_infos () {
//	this.$http.get('http://127.0.0.1:8000/api/show_test_infos')
//		.then((response) => {
//			var res = JSON.parse(response.bodyText)
//			console.log(res)
//			if (res.error_num === 0) {
//				this.test_info_list = res['list']
//			} else {
//				this.$message.error('查询test失败')
//				console.log(res['msg'])
//			}
//		})
//}

var lineChartData = {
	labels : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u"],
	datasets : [
		{
			label: "My First dataset",
			fillColor : "rgba(220,220,220,0.2)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		},
		{
			label: "My Second dataset",
			fillColor : "rgba(37, 190, 174, 0.2)",
			strokeColor : "rgba(37, 190, 174, 1)",
			pointColor : "rgba(37, 190, 174, 1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(37, 190, 174, 1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		}
	]

}
		
	var barChartData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			},
			{
				fillColor : "rgba(37, 190, 174, 0.2)",
				strokeColor : "rgba(37, 190, 174, 0.8)",
				highlightFill : "rgba(37, 190, 174, 0.75)",
				highlightStroke : "rgba(37, 190, 174, 1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			}
		]

	} 

	var pieData = [
			{
				value: 300,
				color: "#35cebe",
				highlight: "#25beae",
				label: "Value 1"
			},
			{
				value: 50,
				color: "#a0a0a0",
				highlight: "#999999",
				label: "Value 2"
			},
			{
				value: 100,
				color:"#dfdfdf",
				highlight: "#cccccc",
				label: "Value 3"
			},
			{
				value: 120,
				color: "#f7f7f7",
				highlight: "#eeeeee",
				label: "Value 4"
			}

		];
			
	var doughnutData = [
			{
				value: 300,
				color: "#35cebe",
				highlight: "#25beae",
				label: "Value 1"
			},
			{
				value: 50,
				color: "#a0a0a0",
				highlight: "#999999",
				label: "Value 2"
			},
			{
				value: 100,
				color:"#dfdfdf",
				highlight: "#cccccc",
				label: "Value 3"
			},
			{
				value: 120,
				color: "#f7f7f7",
				highlight: "#eeeeee",
				label: "Value 4"
			}
		];
			
	var radarData = {
	    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 90, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor : "rgba(37, 190, 174, 0.2)",
	            strokeColor : "rgba(37, 190, 174, 0.8)",
	            pointColor : "rgba(37, 190, 174, 1)",
	            pointStrokeColor : "#fff",
	            pointHighlightFill : "#fff",
	            pointHighlightStroke : "rgba(37, 190, 174, 1)",
	            data: [28, 48, 40, 19, 96, 27, 100]
	        }
	    ]
	};
	
	var polarData = [
	    {
	    	value: 300,
	    	color: "#35cebe",
	    	highlight: "#25beae",
	    	label: "Value 1"
	    },
	    {
	    	value: 140,
	    	color: "#a0a0a0",
	    	highlight: "#999999",
	    	label: "Value 2"
	    },
	    {
	    	value: 220,
	    	color:"#dfdfdf",
	    	highlight: "#cccccc",
	    	label: "Value 3"
	    },
	    {
	    	value: 250,
	    	color: "#f7f7f7",
	    	highlight: "#eeeeee",
	    	label: "Value 4"
	    }
		
	];

