var rawList = [];
var makeJsArray, removeDupes, minify, sortList, newStr;

$('#btnFormat').click(function() {


	//first check each checkbox status and set options accordingly
	if (document.getElementById('chkArray').checked) { 
		makeJsArray = true;
	} else {
		makeJsArray = false;
	}
	
	if (document.getElementById('chkRemoveDupes').checked) {
		removeDupes = true;
	} else {
		removeDupes = false;
	}
	
	if (document.getElementById('chkMinify').checked) {
		minify = true;
	} else {
		minify = false;
	}
		
	if (document.getElementById('chkSort').checked) {
		sortList = true;
	} else {
		sortList = false;
	}	

	
	var rawTextarea = document.getElementById('rawList');
	var lines = rawTextarea.value.split('\n');
	var specRegex = /[\/]|[\\]|[\[]|[']/g;//remove these characters
	//var escRegex = /[']/g;//escape these characters
	var match;
	var str;
	for(var i = 0; i < lines.length; i++){
		//console.log(lines[i])
		if(lines[i] != ' '){
			str = lines[i];
			str = str.replace(specRegex, ""); 
			
			//match, iterate over, and escape some problematic characters
			//match = escRegex.exec(str);
			//while (match != null) {
			  // matched text: match[0]
			  // match start: match.index
			  // capturing group n: match[n]
			  //console.log(match[0])
			//  str = str.replace(match, "/"+match); 
			//  match = escRegex.exec(str);
			//}
			
			
			//str = str.replace(escRegex, ""); 
			rawList.push(str);
		}
	}
	
	var rawArrLen = rawList.length;
	$('.rawAmount').text(rawArrLen);		
	var newList = [];
	
	if (removeDupes == true) {
		$.each(rawList, function(i, el){
			if($.inArray(el, newList) === -1) newList.push(el);
		});
	} else { 
		$.each(rawList, function(i, el){
			newList.push(el);
		});	
	}
	
	if (sortList == true) {
		newList = newList.sort();
	}
		
	var newListLen = newList.length;
	$('#newAmount').text(newListLen);	
	$('#dupesRemoved').text(rawArrLen - newListLen);
		
	var targetTextarea = $('#formattedList');	
	
	for(var i = 0; i < newListLen; i++){
			
		//if minify is true, don't add line break at the end of item
		if (minify == true) {
			//if makeJsArray is true, add quotes and commas, else add a white space to seperate items
			if (makeJsArray == true) {
				newStr = "'"+newList[i]+"',";
			} else {
				newStr = newList[i]+" ";
			}
		}else{
			if (makeJsArray == true) {
				newStr = "'"+newList[i]+"',\n";//make js list and add line break
			} else {
				newStr = newList[i]+"\n";//add only line break
			}
		}
		
		//append formatted item to the list
		targetTextarea.append(newStr);
	}	
});
