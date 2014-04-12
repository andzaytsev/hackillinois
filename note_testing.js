console.log("HelloWorld");
console.log(document.URL);


chrome.extension.sendRequest({url_request : /*document.URL*/"good.html"}, function(response){
	console.log(response);
	if (response){
		for (var i = response.length - 1; i >= 0; i--) {
			insert_text(response[i]);
		}
	}
});

function insert_text (paragraph) {
	var insertions = paragraph.insertions;
	for (var i = insertions.length - 1; i >= 0; i--) {
		var html = $().html();
		var note = '<a class="note_show" id="note'+
		i+'_show" style="display: inline;">show note</a><span class="note_container" id="note'+
		i+'_hide" style="display: none;">'+
		insertions[i].+'<a class="note_hide" id="note'+
		i+'>(hide note)</a></span>;';
		html = html.substr(0,insertions[i].pos_end)+note+html.substr(insertions[i].pos_end);
		$(document).find(paragraph.element).html(html);
	};
}

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
	console.log($("p:nth-child(2)").html());
});

