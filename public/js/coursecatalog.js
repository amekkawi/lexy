/**
 * Created by lexy on 10/6/15.
 */
var $subjectTitles = $('#subjectTitles');
var $coursesInSubjectBox = $('#coursesInSubjectBox');
var $coursesInSubject = $('#coursesInSubject');

// Search for the course quick info box template
var $courseQuickInfoBox = $('#courseQuickInfoBox');

// Remove the 'id' attribute from it
$courseQuickInfoBox.removeAttr('id');

$.ajax({
	url: '/public/all.json',
	success: function(data) {
		console.log('got the data!');

		var subjectToCourseMap = {};

		for (var i = 0; i < data.length; i++) {
			var course = data[i];
			for (var k = 0; k < course.subjects.length; k++) {
				var subjectName = course.subjects[k];

				/*Here is what is going on below. It's trying to access a property of the object with X subject name.
				If the object already has a property with x name, then this boils down to truthy.  So it will run the
				first option, which is pushing the course name into the array for that subject name's (x) property.
				if it boils down to not truthy, in the case that x property name can't be accessed yet (doesn't exist)
				then it will create a new property called x subject name.
				 */
				if (subjectToCourseMap[subjectName]) {
					subjectToCourseMap[subjectName].push(course);
				}
				else {
					subjectToCourseMap[subjectName] = [course];
				}
			}
		}

		//console.log(subjectToCourseMap);
		//console.log(Object.keys(subjectToCourseMap));
		var subjectTitlesArray = Object.keys(subjectToCourseMap);
		subjectTitlesArray.sort();
		//console.log(subjectTitlesArray);

		function subjectClickHandler($link, value) {
			$link.on('click', function(evt) {
				evt.preventDefault();
				//console.log('Clicked', value);
				var clickedSubject = value;
				$coursesInSubject.empty();

				//As of this line below, the list is made- it has the clicked subject and the list of course-objects.
				//The stuff on line 78 or so is creating the dom elements.
				var coursesArrayForTheSubject = subjectToCourseMap[clickedSubject];

				// If there is at least one course, make sure the subject box is visible again.
				if (coursesArrayForTheSubject.length > 0) {
					$coursesInSubjectBox.css('display', '');
				}
				else {
					$coursesInSubjectBox.css('display', 'none');
				}

				coursesArrayForTheSubject.sort(function(a, b) {
					var classA = a.l;
					var classB = b.l;
					if (classA < classB) {
						return -1;
					}
					else if (classA > classB) {
						return 1;
					}
					return 0;
				});

				function courseClickHandler($link, clickedCourse) {
					var notYetInserted = true;
					$link.on('click', function (evt) {
						evt.preventDefault();
						console.log('clicked course with title', clickedCourse);

						//var noSiblingYet = $link.parent().find('> .info-box').size() === 0;

						if (notYetInserted) {
							notYetInserted = false;

							// Clone (aka: copy) the course quick info template
							var $copyOfTheTemplate = $courseQuickInfoBox.clone();

							$copyOfTheTemplate.css('display', '');

							// Find the guid element within the cloned template
							var $guidText = $copyOfTheTemplate.find('.guid-text');
							$guidText.text(clickedCourse.guid);

							// Find the staff list element within the cloned template
							var $staffList = $copyOfTheTemplate.find('.staff-list');

							for (var s = 0; s < clickedCourse.staff.length; s++) {
								var $eachStaffMember = $("<li></li>").text(clickedCourse.staff[s]);
								$eachStaffMember.appendTo($staffList);

							}

							$copyOfTheTemplate.insertAfter($link);
						}




						/*for (var s = 0; s < clickedCourse.length; s++) {
							var $courseQuickInfoBox = $('#courseQuickInfoBox');
							$courseQuickInfoBox.css('display', '');

							var $guidText = $('.guid-text');
							$guidText.text(clickedCourse[s].guid);
						}*/

					})
				}


							//var $EachStaffMember = $("<li></li>").text(clickedCourse.staff[0]);
							//$EachStaffMember.appendTo($staffList);





						//var $CopyOfTheTemplate = $('#MyTemplate').clone();



				//The below turns the course names into links - WILL ADD THIS BACK IN, SLIGHTLY MODIFIED
				/*for (var p = 0; p < coursesArrayForTheSubject.length; p++) {
					var $eachNewCourseNameLink = $('<a href="/courseinformation/' + [coursesArrayForTheSubject[p].guid] + '"></a>');

					$eachNewCourseNameLink.text(coursesArrayForTheSubject[p].l);
					var $eachNewCourseListItem = $('<li></li>');
					$eachNewCourseNameLink.appendTo($eachNewCourseListItem);
					$eachNewCourseListItem.appendTo($coursesInSubject);
				}*/


				//the below turns the course names into links, list items, and puts them on the dom
				for (var p = 0; p < coursesArrayForTheSubject.length; p++) {
					var $eachNewCourseNameLink = $('<a href="javascript:"></a>');

					//coursesArrayForTheSubject[p], below, resolves to ONE distinct course (one item in an array of courses for ONE subject)
					courseClickHandler($eachNewCourseNameLink, coursesArrayForTheSubject[p]);
					$eachNewCourseNameLink.text(coursesArrayForTheSubject[p].l);

					var $eachNewCourseListItem = $('<li></li>');

					$eachNewCourseNameLink.appendTo($eachNewCourseListItem);
					$eachNewCourseListItem.appendTo($coursesInSubject);
				}


			});
		}

		//This for statement below is turning the array of subject titles into links, and then a list of links.
		for (var m = 0; m < subjectTitlesArray.length; m++) {
			var $eachNewSubjectLink = $('<a href="javascript:"></a>');

			//calling the function defined on line 44
			subjectClickHandler($eachNewSubjectLink, subjectTitlesArray[m]);
			$eachNewSubjectLink.text(subjectTitlesArray[m]);

			var $eachNewSubjectListItem = $('<li></li>');

			//This expression below is saying "take the value of eachnewlink and put it after whatever content is
			//in the element eachnewlistitem. thereby we now have list items that contain links.
			$eachNewSubjectLink.appendTo($eachNewSubjectListItem);
			$eachNewSubjectListItem.appendTo($subjectTitles);

		}


	}
})