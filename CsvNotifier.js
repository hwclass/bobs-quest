var fs = require("fs"),
		CsvToJsonConverter = require('csvtojson').Converter,
		lines = 0,
		latestCsvData = [],
		config = {
			data : {
				path : './data/',
				fileName : 'sample.csv'
			}
		}

fs.watchFile(config.data.path + config.data.fileName, function (event, fileName) {
	var converterIns = new CsvToJsonConverter({});
	fs.createReadStream(config.data.path + config.data.fileName).pipe(converterIns);
	converterIns.on('end_parsed', function (jsonArr) {
		console.dir(jsonArr);
	});
});