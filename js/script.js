/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/**
 *  Global variables
 *  ITEMS_TO_SHOW - number of student list elements to show per page
 *  studentListElements - HTMLCollection of student list items
 */
const ITEMS_TO_SHOW = 10;
const studentListElements = document.getElementsByClassName('student-item');

/**
 * Shows the student list elements for the given page number
 * and hides the rest of the student list elements
 * @param {object} listElements - HTMLCollection of student list items
 * @param {number} pageNum - number of the page to show
 */
function showPage(listElements, pageNum) {
	// set start and end indexes of list items that will be shown
	const startIndex = ITEMS_TO_SHOW * pageNum - ITEMS_TO_SHOW;
	const endIndex = startIndex + ITEMS_TO_SHOW;
	for (let i = 0; i < listElements.length; i++) {
		// show the student list items of the current page
		if (i >= startIndex && i < endIndex) {
			listElements[i].style.display = '';
			// otherwise, do not display the student list item on the page
		} else {
			listElements[i].style.display = 'none';
		}
	}
}

/**
 * Generates a list of links that enable the user
 * to navigate the paginated student list
 * @param {object} listElements - HTMLCollection of student list items
 */
function appendPageLinks(listElements) {
	// Determine how many links will be required
	const numPages = Math.ceil(listElements.length / ITEMS_TO_SHOW);
	// set up new div and ul to add links to
	const pageDiv = document.getElementsByClassName('page')[0];
	const linkDiv = document.createElement('div');
	linkDiv.classList.add('pagination');
	const ul = document.createElement('ul');

	// make pagination links
	for (let i = 1; i <= numPages; i++) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.setAttribute('href', '#');
		a.innerText = i;
		li.appendChild(a);
		ul.appendChild(li);
	}
	// add 'active' class to first link
	ul.firstElementChild.firstElementChild.classList.add('active');

	// add ul with links to page
	linkDiv.appendChild(ul);
	pageDiv.appendChild(linkDiv);

	// add event handler to pagination links
	linkDiv.addEventListener('click', event => {
		if (event.target.tagName === 'A') {
			const a = event.target; // the 'a' element that was clicked
			const pageNum = a.innerText; // number of which link was clicked

			// call showPage function with the page number
			showPage(listElements, pageNum);
			// toggle 'active' class from previously active link to clicked link
			document.querySelector('a.active').classList.remove('active');
			a.classList.add('active');
		}
	});
}

/**
 * Add a search bar to the top of the page that allows
 * the user to search the student names
 * @param {object} listElements 
 */
function addSearchBar(listElements) {
	// create a form with a search input and search button
	const form = document.createElement('form');
   form.classList.add('student-search');
   // p to hold possible no results message
   const p = document.createElement('p');
   form.appendChild(p);
	// search input
	const input = document.createElement('input');
	input.setAttribute('type', 'search');
   input.setAttribute('id', 'search');
   input.placeholder = 'Search for students'
	form.appendChild(input);
	// submit button
	const button = document.createElement('button');
	button.setAttribute('type', 'search');
   button.textContent = 'search';
	form.appendChild(button);
	// append form to page-header div
   document.querySelector('.page-header').appendChild(form);
   
   // add event listener to perform search and show results
	form.addEventListener('submit', event => {
		event.preventDefault(); // stop page from refreshing
		const searchStr = input.value;
		const results = [];
      // search listElements for the searchStr
      // and push to results array if found
		for (let i = 0; i < listElements.length; i++) {
			const name = listElements[i].getElementsByTagName('h3')[0].textContent;
			if (name.includes(searchStr)) results.push(listElements[i]);
		}
      // hide all student-items and remove pagination links
      // and any previous no results message
		showPage(studentListElements, 0);
		const paginationDiv = document.querySelector('.pagination');
      if (paginationDiv) paginationDiv.remove();
      p.textContent = '';

		// if there are any results, call showPage and appendPageLinks with results
		if (results.length > 0) {
			showPage(results, 1);
			appendPageLinks(results);
		} else {
         // Sorry, nothing found         
         p.textContent = `Sorry, we couldn't find any results for '${searchStr}'`;
      }
	});
}

// Start on first page of students
showPage(studentListElements, 1);
// create pagination links
appendPageLinks(studentListElements);
// add search bar
addSearchBar(studentListElements);
