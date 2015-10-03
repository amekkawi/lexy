/**
 * Created by lexy on 9/17/15.
 */
$.ajax({
	url: 'course.json',
	success: function(data) {
		console.log('success');
		$("#CourseTitle").text(data.title);
		if (data.subjects.length > 0) {
			//the line below will give you the first item in the array
			$("#SubjectTitle").text(data.subjects[0].title);
		}

		var $Subjects = $("#Subjects");

		//The statement on lines 17&18 does the same thing as the expression on lines 20-22!
		//the expression is more versatile but the statement is easier for me for now
		var $NewSubject = $("<li></li>").text(data.subjects[1].title);
		$NewSubject.appendTo($Subjects);

		$("<li></li>")
			.text(data.subjects[1].title)
			.addClass('very-red')
			.appendTo($Subjects);

		// ===================================
		// Vanilla way of doing the above.
		//var newLi = document.createElement('li');
		//newLi.innerText = data.subjects[1].title;1
		//document.getElementById('Subjects').appendChild(newLi);
		// ===================================

		//This is a for loop
		var $IteratedSubjects = $("#IteratedSubjects");
		for (var i = 0; i < data.subjects.length; i++) {
			//console.log(i)
			var $NewSubject = $("<li></li>").text(data.subjects[i].title);
			$NewSubject.appendTo($IteratedSubjects);
		}

		$("#CourseDescription").html(data.description);
	},
	error: function(xhr, textStatus, error) {
		console.log('error');
	}
});
