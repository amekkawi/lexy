/**
 * Created by lexy on 10/1/15.
 */
var $CourseNumber = $('#CourseNumber');
var $CourseTitle = $('#CourseTitle');
var $Courses = $('#Courses');
var $CourseBox = $('#CourseBox');
var $Level = $('#Level > span');
var $Staff = $('#Staff');
var $Subjects = $('#Subjects');

$.ajax({
	url: 'all.json',
	success: function(data) {
		console.log('got the data!');

		//for (var i = 0; i < data.length; i++) {
			//var $EachCourseInArray = $("<li></li>").text(data[i].l);
			//$EachCourseInArray.appendTo($Courses);
		//}

		$('#FindACourse').on('submit', function(evt) {
			evt.preventDefault();

			// Hide the results before doing a new search.
			$CourseBox.css('display', 'none');

			var UserInput = $CourseNumber.val();
			console.log(UserInput);
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i].l, data[i].guid, UserInput, UserInput == data[i].guid, UserInput === data[i].guid);
				if (UserInput == data[i].guid) {
					$CourseBox.css('display', '');
					console.log([i]);
					$CourseTitle.text(data[i].l);
					$Level.text(data[i].level);
					$Staff.empty();
					for (var a = 0; a < data[i].staff.length; a++) {
						var $EachStaffName = $("<li></li>").text(data[i].staff[a]);
						$EachStaffName.appendTo($Staff);
					}
					$Subjects.empty();
					for (var b = 0; b < data[i].subjects.length; b++) {
						var $EachSubject = $("<li></li>").text(data[i].subjects[b]);
						$EachSubject.appendTo($Subjects);
					}


					break;
				}
			}
		});


	}
});

