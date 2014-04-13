
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
var insert_text2=function(obj, index) {
	console.log(obj);
	var html_m = $("p:nth-child("+obj.paragraph_num+")").prop('outerHTML');
	var note = '<a class="note_show" id="note'+
		index+'_show" style="display: inline;">show note</a><span class="note_container" id="note'+
		index+'_hide" style="display: none;">'+
		obj.comment+'<a class="note_hide" id="note'+
		index+'">(hide note)</a></span>';

	html_m = html_m.substr(0,obj.pos_begin)+note+html_m.substr(obj.pos_begin);
	$(html_m).insertAfter("p:nth-child("+obj.paragraph_num+")");
	$("p:nth-child("+obj.paragraph_num+")").remove();
}


chrome.extension.sendRequest({url_request : document.URL}, function(response){
	console.log(response);
	if (response){
		console.log(response);
		var elements_pos={};
		for (var i = response.length - 1; i >= 0; i--) {
			insert_text2(response[i],i+1);
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
}
*/


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//This is the first position of the element
	var selectedTextFirstInst  = window.getSelection().getRangeAt(0);

	//This does the highlight
	if(request.type == "highlight") {

		//Create new element to edit
		var newNode = document.createElement("div");

		//Set the attribute to this element
		newNode.setAttribute(
		   "style",
		   "background-color: orange; display: inline;"
		);

		//Set these parameters
		selectedTextFirstInst.surroundContents(newNode);	

	} else if(request.type == "addNote") {
		//georgy part
		console.log("adding note");
		var selectionObj = window.getSelection(); 
		var selectedStr = window.getSelection().toString();
		//console.log("achor node parent element: " + $(selectionObj.anchorNode.parentElement)[0].outerHTML);
		//console.log("achor offset: " + selectionObj.anchorOffset);
		var outerHTML = $(selectionObj.anchorNode.parentElement)[0].outerHTML;
		var paragraph_num = $("p").index(selectionObj.anchorNode.parentElement);
		console.log(paragraph_num);
		var selectedObj = {
			selText: selectedStr,
			parentEl: outerHTML,
			begin: outerHTML.indexOf(selectedStr),
			paragraph_num: paragraph_num
		};
		sendResponse(selectedObj);
	}
});
