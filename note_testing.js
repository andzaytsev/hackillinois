

var insert_text=function(paragraph) {
	var insertions = paragraph.insertions;
	for (var i = insertions.length - 1; i >= 0; i--) {
		var html_m = $("p:nth-child("+paragraph.paragraph_num+")").outerHTML;
		var note = '<a class="note_show" id="note'+
		i+'_show" style="display: inline;">show note</a><span class="note_container" id="note'+
		i+'_hide" style="display: none;">'+
		insertions[i].content+'<a class="note_hide" id="note'+
		i+'">(hide note)</a></span>';
		console.log(insertions[0]);
		html_m = html_m.substr(0,insertions[i].pos_end)+note+html_m.substr(insertions[i].pos_end);
		$("p:nth-child("+paragraph.paragraph_num+")").outerHTML = html_m;
		console.log(paragraph.paragraph_num+"hehe");
		console.log(html_m);
	};
	console.log("HelloWorld");
}





$(document).ready(function(){
	chrome.extension.sendRequest({url_request : /*document.URL*/"good.html"}, function(response){
		console.log(response);
		if (response){
			console.log(response.length);
			for (var i = response.length - 1; i >= 0; i--) {
				console.log(i+"  ");
				insert_text(response[i]);
			}
		}
	});
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

