/**
 * This file contains the components for the storage of the nodes (notes). 
 *  author : temandr
 */

/**
* This object is used for each node
* It has three properties: 
* ->paragraph_loc 	=	the paragraph location of the file 
* ->beginning		=	the location of the start of the phrase (inclusive)
* ->end 		= 	the end of the phrase (not inclusive)
* ->comment		=	the text that the object holds (user input)
*/
function node(pL, beg, end, comm) {
	this.paragraph_loc 	= pL;		
	this.beginning 		= beg;
	this.end 		= end;
	this.comment 		= comm;
}

/**
 * Site is the class that encompasses all of the nodes
 * URL - the url of the website
 * length - the length of the nodes array
 * array - array that holds node objects 
 */
function Site(url){
	this.url 			= url; 
	this.length		=  0;
	this.array 		= new Array();
}
/**
 * Insert a new node
 */
Site.prototype.insert  = function(pL, beg, end, comm) {

	this.array.push(new node(pL, beg, end, comm));
	this.length += 1;
};

/**
 * FInd a node
* ->pL 		=	the paragraph location of the file 
* ->beg		=	the location of the start of the phrase (inclusive)
* ->end 		= 	the end of the phrase (not inclusive)
 */
 Site.prototype.fInd = function(pL, beg, end) {

 };

 /**
  * Upload the info into the chrome storage
  */

function aplay() {
	var test1 = "test1";
	var test2 = "test2";
	var test3 = "test3";
	var test4 = "test4"; 
	var site1 = new Site("google.com");
	site1.insert(test1, test2, test3, test4);
	alert(site1.array[0].paragraph_loc);

	var test1 = prompt("1", "blah2");
	var test2 = prompt("2", "blah");
	var test3 = prompt("3", "blah");
	var test4 = prompt("4", "blah");
	insert(test1, test2, test3, test4);
	//alert(array[0].paragraph_loc);
	alert(length);
}
