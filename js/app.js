var app = (function () {
	var fileConents,
		reservedKeywords = [],
		operators = ["+", "-", "*", "/", "="];

	var $reservedWords = $("#reserved_words"),
		$inputKeyword = $("#input_keyword"),
		$btnAddKeyword = $("#btn_add_keyword"),
		$btnRemoveKeyword = $("#btn_remove_keyword"),
		$fileContents = $("#file_contents"),
		$inputFileDialog = $("#input_file_dialog"),
		$fileStats = $("#file_stats"),
		$btnProcessFileStats = $("#btn_process_file_stats");

	var processFileStats = function () {
		var keywordsCount = {},
			operatorsCount = {},
			operandsCount = {},
			numOfLines = 0;

		// fileContents = $fileContents.html();
		fileContents = "asd+asd";

		// gets the stats of keywords
		for(var i = 0; i < reservedKeywords.length; i++) {
			keywordsCount[reservedKeywords[i]] = fileContents.split(" " + reservedKeywords[i] + " ").length - 1;
		}

		// gets the stats of operators
		for(var i = 0; i < operators.length; i++) {
			operatorsCount[operators[i]] = fileContents.split(operators[i]).length - 1;
		}

		// gets the number of operands
		var tempOperands = (fileContents.match(/[0-9a-z] + |[()/*+-] + |[0-9a-z]*/g) || []),
			operands = [];

		for(var i = 0; i < tempOperands.length; i++) {
			if(tempOperands[i]) {
				operands.push(tempOperands[i]);
			}
		}

		for(var i = 0; i < operands.length; i++) {
			if(operandsCount[operands[i]] == undefined) {
				operandsCount[operands[i]] = 1;
			}
			else {
				operandsCount[operands[i]] += 1;
			}
		}

		// gets the number of lines
		numOfLines = fileContents.split("\n").length;

		console.log("Keywords Count:");
		console.log(keywordsCount);
		console.log("Operators Count:");
		console.log(operatorsCount);
		console.log("Operands Count:");
		console.log(operandsCount);
		console.log("Number of lines: " + numOfLines);
	};

	var events = (function () {
		// var sampleString = "aa211+14+13+12";
		// var tempOperands = sampleString.match(/[0-9a-z] + [()/*+-] + |[0-9a-z]*/g),
		// 	operands = [];

		// for(var i = 0; i < tempOperands.length; i++) {
		// 	if(tempOperands[i]) {
		// 		operands.push(tempOperands[i]);
		// 	}
		// }

		// var sampleString = "a+b+c+d";
		// var tempOperators = (sampleString.match(/[0-9a-z] + |[()/*+-=] + [0-9a-z]/g) || []),
		// 	operators = [];

		// for(var i = 0; i < tempOperators.length; i++) {
		// 	if(tempOperators[i]) {
		// 		operators.push(tempOperators[i]);
		// 	}
		// }

		// console.log(tempOperators);

		$inputKeyword.keypress(function (event) {
			if(event.keyCode == "13") {
				$btnAddKeyword.click();
			}
		});

		$btnAddKeyword.click(function () {
			var keyword = $inputKeyword.val().trim();

			if(keyword != "") {
				$reservedWords.append("<option value='" + keyword + "'>" + keyword  + "</option>");
				$inputKeyword.val("");
				$inputKeyword.focus();

				reservedKeywords = $.map($("#reserved_words option"), function (option) {
					return option.value;
				});
			}
		});

		$btnRemoveKeyword.click(function () {
			$("#reserved_words option:selected").remove();

			reservedKeywords = $.map($("#reserved_words option"), function (option) {
				return option.value;
			});
		});

		$inputFileDialog.change(function (event) {
			$fileContents.empty();
			if(this.files.length >= 1) {
				var filename = this.files[0];
				var fileReader = new FileReader();

				fileReader.onload = function (e) {
					$fileContents.append(this.result);
					processFileStats();
				}

				fileReader.readAsText(filename);
			}
		});

		$btnProcessFileStats.click(function () {
			processFileStats();
		});
	})();
})();