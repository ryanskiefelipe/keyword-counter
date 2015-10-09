var app = (function () {
	var fileConents,
		reservedKeywords = [],
		operators = ["+", "-", "*", "/", "="],
		exclusions = ["/*", "*/", "//"];

	var $reservedKeywords = $("#reserved_keywords"),
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

		var fileContents = $fileContents.html();
		// var fileContents = "+ + + ab+cd+ef";

		// gets the stats of keywords
		for(var i = 0; i < reservedKeywords.length; i++) {
			keywordsCount[reservedKeywords[i]] = fileContents.split(" " + reservedKeywords[i] + " ").length - 1;
		}

		// gets the stats of operators
		for(var i = 0; i < operators.length; i++) {
			operatorsCount[operators[i]] = fileContents.split(operators[i]).length - 1;
		}

		// gets the number of operands
		// var tempOperands = (fileContents.match(/[0-9a-z] + |[()/*+-] + |[0-9a-z]*/g) || []),
		// 	operands = [];
		var tempOperands = (fileContents.match(/[0-9a-zA-Z]+|(\\+|-|\\*)/g) || []),
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

		console.log("Word: " + fileContents);
		console.log("Keywords Count:");
		console.log(keywordsCount);
		console.log("Operators Count:");
		console.log(operatorsCount);
		console.log("Operands Count:");
		console.log(operandsCount);
		console.log("Number of lines: " + numOfLines);
	};

	var events = (function () {
		$inputKeyword.keypress(function (event) {
			if(event.keyCode == "13") {
				$btnAddKeyword.click();
			}
		});

		$btnAddKeyword.click(function () {
			var keyword = $inputKeyword.val().trim();

			if(keyword != "") {
				$reservedKeywords.append("<option value='" + keyword + "'>" + keyword  + "</option>");
				$inputKeyword.val("");
				$inputKeyword.focus();

				reservedKeywords = $.map($("#reserved_keywords option"), function (option) {
					return option.value;
				});
			}
		});

		$btnRemoveKeyword.click(function () {
			$("#reserved_words option:selected").remove();

			reservedKeywords = $.map($("#reserved_keywords option"), function (option) {
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