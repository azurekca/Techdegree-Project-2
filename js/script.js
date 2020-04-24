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
   linkDiv.classList = 'pagination';
   const ul = document.createElement('ul');

   // make pagination links
   for (let i = 1; i <= numPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute("href", "#");
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
   })
}



// Start on first page of students
showPage(studentListElements, 1);

appendPageLinks(studentListElements);