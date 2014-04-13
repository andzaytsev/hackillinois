var storage = chrome.storage.local;
var test=[
		    {
		    	"paragraph_num": 2, //I do not know how to do this
		    	"text": "During his youth, Alexander was tutored by the philosopher Aristotle until the age of 16.",
		    	//"element": '<p> \nDuring his youth, Alexander was tutored by the philosopher Aristotle until the age of 16. When he succeeded his father to the throne in 336 BC, after Philip was assassinated, Alexander inherited a strong kingdom and an experienced army. He had been awarded the generalship of Greece and used this authority to launch his father\'s military expansion plans. In 334 BC, he invaded the Achaemenid empire, ruled Asia Minor, and began a series of campaigns that lasted ten years. Alexander broke the power of Persia in a series of decisive battles, most notably the battles of Issus and Gaugamela. He subsequently overthrew the Persian King Darius III and conquered the entirety of the Persian Empire.i[›] At that point, his empire stretched from the Adriatic Sea to the Indus River.\n</p>',
	            "insertions":[
	            {
	            	"pos_begin": 0,
	            	"pos_end": 16,
	            	"content": "Alexander has a good youth",
	            },
	            {
	            	"pos_begin": 20,
	            	"pos_end": 24,
	            	"content": "Alexander is famous for this",
	            }
	            ]
			},
		    {
		    	"paragraph_num": 3, //I do not know how to do this
		    	"text": "During his youth, Alexander was tutored by the philosopher Aristotle until the age of 16.",
		    	//"element": '<p> \nDuring his youth, Alexander was tutored by the philosopher Aristotle until the age of 16. When he succeeded his father to the throne in 336 BC, after Philip was assassinated, Alexander inherited a strong kingdom and an experienced army. He had been awarded the generalship of Greece and used this authority to launch his father\'s military expansion plans. In 334 BC, he invaded the Achaemenid empire, ruled Asia Minor, and began a series of campaigns that lasted ten years. Alexander broke the power of Persia in a series of decisive battles, most notably the battles of Issus and Gaugamela. He subsequently overthrew the Persian King Darius III and conquered the entirety of the Persian Empire.i[›] At that point, his empire stretched from the Adriatic Sea to the Indus River.\n</p>',
	            "insertions":[
	            {
		    	"pos_begin": 0,
		    	"pos_end": 16,
		    	"content": "Alexander has",
	            }
	            ]
			}

		];
storage.set({"good.html": test});
localStorage["good.html"]=JSON.stringify(test);

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

var insert_to_data_storage= function(url, paragraph_text, pos_begin, pos_end, content, data) {
	console.log(data);
		if(!data){
			data=[
			   {"paragraph_text": paragraph_text, 
			   "insertions":[
			   {"pos_begin": pos_begin, "pos_end": pos_end, "content": content}
			   ]}];
		}else{
			var find=false;
			for (var i=0; i<data.length; data++){
				if(data[i].paragraph_text == paragraph_text){
					find = true;
					var inserted = false;
					for (var j=0; j<data[i].insertions.length; j++){
						if (pos_end<data[i].pos_end){
							data.insertions[i].insert(j, {"pos_begin":pos_begin, "pos_end":pos_end, "content": content});
							inserted = true;
							break;
						}
					}
					if (!inserted){
						data[i].insertions.insert(data.insertion[i].length,{"pos_begin":pos_begin, "pos_end":pos_end, "content": content, "paragraph_num": paragraph_num});
					}
				}
			}
			if (!find){
				data.push({"paragraph_text": paragraph_text, "insertions":[{"pos_begin": pos_begin, "pos_end": pos_end, "content": content}]});
			}
		}
		console.log("data");
		console.log(data);
		return data;
}

chrome.extension.onRequest.addListener(
	function (request, sender, send_response) {
		// storage.get(request.url_request,function(data){
		// 	send_response(data[request.url_request]);
		// });
	
        var data = localStorage[request.url_request]?jQuery.parseJSON(localStorage[request.url_request]):[];	
        send_response(data);
});

var highlightItem = {
	"title": "Highlight",
	"id": "highlightItem",
	"contexts": ["all"],
	"onclick": function(info, tab) {
		console.log(tab.id);
		chrome.tabs.sendMessage(tab.id, {type: "highlight"}, function(response){
			console.log(response.selectedText);
		});

	}
};

chrome.contextMenus.create(highlightItem, function(obj)
{
	console.log("highlightItem has been created");
});

var addNoteItem = {
	"title": "Add Note",
	"id": "addNoteItem",
	"contexts": ["all"],
	"onclick": function(info, tab) {
		// var loc = {
		// 	"pos.beg": "1",
		// 	"pos.end": "1",
		// 	"pos.comm": "1",
		// 	"pos.key":"1",
		// 	"pos.outKey": "1"
		// }
		//noteCreator.displayDialog('google.com', loc);
		
		chrome.windows.create({url:"popup.html", "type": "popup", height: 50, width:400}, function(window){
			chrome.runtime.onMessage.addListener(function window_listener(request, sender, send_response){
				if (request.comment){
					//console.log("in the background js file: " + request.comment);
					//console.log("the submit button was clicked");
					//console.log("window.id " + window.id);

					chrome.windows.remove(window.id);
					chrome.runtime.onMessage.removeListener(window_listener);
					//pos-begin, pos-end, paragraph
					chrome.tabs.sendMessage(tab.id, {type: "addNote"}, function(response){
						//var selection = response;
						//console.log("response received");
						//console.log(selection);
						
						//selection.comment = request.comment;
						//selText: selectedStr,
						//parentEl: outerHTML,
						//begin: outerHTML.indexOf(selectedStr),
						console.log(response.parentEl);
						var parentEl = response.parentEl;
						var data = localStorage[tab.url]?jQuery.parseJSON(localStorage[tab.url]):undefined;
						var position_end = response.selText.length+response.begin;
						var position_begin = response.begin;
						var paragraph_num = response.paragraph_num+1;
						var new_obj = {"pos_begin": position_begin, "pos_end": position_end, "parentEl": parentEl, "comment":request.comment, "paragraph_num": paragraph_num};
						if (!data) data=new Array();
						data.push(new_obj);
						localStorage[tab.url] = JSON.stringify(data);
					});
				}
			});
		});
	}
};
				

					//storage.set({tab.url: });

chrome.contextMenus.create(addNoteItem, function(obj) {
	console.log("addNoteItem has been created");
});
