<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<b>Reserved Words</b>
	<select id="reserved_words"></select>
	<input id="input_keyword" type="text" placeholder="Input keyword" />
	<button id="btn_add_keyword">Add Keyword</button>
	<button id="btn_remove_keyword">Remove Keyword</button>
	
	<br />
	<br />
	<input type="file" id="input_file_dialog" name="files" title="Load File" accept=".txt" />

	<br />
	<br />
	<b>File Contents</b>
	<div id="file_contents"></div>

	<br />
	<br />
	<b>File Stats</b> <button id="btn_process_file_stats">Process File Stats</button>
	<div id="file_stats"></div>

	<script type="text/javascript" src="js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</body>
</html>