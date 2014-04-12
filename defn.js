/**
 * This file contains the components for the storage of the nodes (notes). 
 *  author : temandr
 */

/**
* This object is used for each node
* It has three properties: 
* ->beginning		=	the location of the start of the phrase (inclusive)
* ->end 		= 	the end of the phrase (not inclusive)
* ->comment		=	the text that the object holds (user input)
* ->key		=	This is the text that the person highlighted
* ->outKey		=	the type in the html file... also used as a key
*/
function node(beg, end, comm, key, outKey) {
	this.beginning 		= beg;
	this.end 		= end;
	this.comment 		= comm;
	this.key		= key;
	this.outKey		= outKey;
}

/**
 * Site is the class that encompasses all of the nodes
 * URL - the url of the website
 * length - the length of the nodes array
 * array - array that holds paragraph objects 
 */
function Site(url){
	this.url 			= url; 
	this.length		=  0;
	this.node 		= new Array();
}

/**
 * Insert a new node
 */
Site.prototype.insert  = function(beg, end, comm, key, outKey) {
	this.node.push(new node(beg, end, comm, key, outKey));
	this.length += 1;
};

 /**
  * Store the array in the chrome storage space
  */
Site.prototype.storeToChrome = function() {
	//Create the JSON representation of the array
	localStorage["defn" + this.url] = JSON.stringify(this.node);
};

 /**
  * Get the array in the chrome storage space
  */
Site.prototype.getFromChrome= function() {
	//Clear the array
	this.node = [];
	length = 0;

	//Retrieve the array from storage
	this.node = JSON.parse(localStorage["defn"+this.url]);
	this.length = this.node.length;
};

 /**
  * testing
  */

function aplay() {
	var test1 = "beg";
	var test2 = "end";
	var test3 = "comm";
	var test4 = "key"; 
	var test5 = "outKey"; 
	var site1 = new Site("google.com");
	site1.insert(test1, test2, test3, test4, test5);
	alert(site1.node[0].beginning);
	site1.storeToChrome();
	alert("ehehehehehe");
}
