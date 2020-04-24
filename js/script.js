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
 * Shows the given page number of student list elements and hides the rest
 * @param {object} listElements 
 * @param {number} pageNum 
 */
function showPage(listElements, pageNum) {
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

showPage(studentListElements, 6);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

// Remember to delete the comments that came with this file, and replace them with your own code comments.
