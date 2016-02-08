/*
 * Trump Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Donald Trump from the web page.
 */

// Variables
var regex = /NYFW/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering NYFW with Mild filter...");
	return $(":contains('NYFW'), :contains('New York Fashion Week'), :contains('new york fashion week')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering NYFW with Default filter...");
	return $(":contains('NYFW'), :contains('New York Fashion Week'), :contains('#NYFW'), :contains('new york fashion week')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering NYFW with Vindictive filter...");
	return $(":contains('NYFW'), :contains('New York Fashion Week'), :contains('#NYFW'), :contains('new york fashion week')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("NYFW found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", trumps: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " trumps."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
