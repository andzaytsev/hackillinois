Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

var insert= function(url, paragraph_text, pos_begin, pos_end, content, data) {
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
						data[i].insertions.insert(data.insertion[i].length,{"pos_begin":pos_begin, "pos_end":pos_end, "content": content});
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
/*
var find_paragraph= function(tab, text){
	var result = {};
	chrome.tabs.executeScript(null, { file: "jquery-1.11.0.min.js" }, function(){
		result.paragraph_num = $(document).index(":contains("+text+")");
		result.pos_begin = $(":contains("+text+")").prop('outerHTML').indexOf(text);
		result.pos_end = result[pos_begin]+ text.length;
	});
	return result;
}*/