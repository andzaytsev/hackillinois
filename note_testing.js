
var insert_text=function(paragraph) {
	var insertions = paragraph.insertions;
	for (var i = insertions.length - 1; i >= 0; i--) {
		var html_m = $("p:nth-child("+paragraph.paragraph_num+")").prop('outerHTML');
		var note = '<a class="note_show" id="note'+
		i+'a'+paragraph.paragraph_num+'_show" style="display: inline;">show note</a><span class="note_container" id="note'+
		i+'a'+paragraph.paragraph_num+'_hide" style="display: none;">'+
		insertions[i].content+'<a class="note_hide" id="note'+
		i+'a'+paragraph.paragraph_num+'">(hide note)</a></span>';
		html_m = html_m.substr(0,insertions[i].pos_end)+note+html_m.substr(insertions[i].pos_end);
		$(html_m).insertAfter("p:nth-child("+paragraph.paragraph_num+")");
		$("p:nth-child("+paragraph.paragraph_num+")").remove();
		//$(note).insertAt(insertions[i].pos_end, $("p:nth-child("+paragraph.paragraph_num+")"));
		//console.log(html_m);
	};
}


chrome.extension.sendRequest({url_request : /*document.URL*/"good.html"}, function(response){
	console.log(response);
	if (response){
		console.log(response);
		for (var i = response.length - 1; i >= 0; i--) {
			console.log(i+"  ");
			insert_text(response[i]);
		}
	}
});


$(document).ready(function(){
	$(".note_show").click(function(event){
		var show_id = event.target.id;
		var hide_id = show_id.replace("_show", "_hide");
		$("#"+show_id).hide();
		$("#"+hide_id).show();
	});
	$(".note_hide").click(function(event) {
		var hide_id = event.target.id+"_hide";
		var show_id = event.target.id+"_show";
		$("#"+show_id).show();
		$("#"+hide_id).hide(); 
	});
});

/*
var getSelectedText = function()
{
	var focused = document.activeElement;
  	var selectedText;
  	if (focused) {
	    try {
	      	selectedText = focused.value.substring(focused.selectionStart, focused.selectionEnd);
	    } catch (err) {
	    }
 	}
	if (selectedText == undefined) {
		var sel = window.getSelection();
		var selectedText = sel.toString();
	}
	return selectedText;
}*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.type == "highlight") {
		//artyom part
    	sendResponse({selectedText: window.getSelection().toString()});
	} else if(request.type == "addNote") {
		//georgy part
	}
});
