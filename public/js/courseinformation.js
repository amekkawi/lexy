/**
 * Created by lexy on 10/25/15.
 */
$.ajax({
	url: '/public/coursedata/' + window.guid + '.json',
	success: function (data) {
		console.log('success');
		$("#CourseTitle").text(data.title);

		$("#Subtitle").text(data.subtitle);

		//$("#CourseDescription").html(data.description);

		var $Staff = $('#Staff');

		for (var i = 0; i < data.staff.length; i++) {
			var $EachStaffMember = $("<li></li>").text(data.staff[i].title);
			$EachStaffMember.appendTo($Staff);
		}

		var $IteratedSubjects = $("#IteratedSubjects");

		for (var i = 0; i < data.subjects.length; i++) {
			//console.log(i)
			var $EachSubjectInArray = $("<li></li>").text(data.subjects[i].title);
			$EachSubjectInArray.appendTo($IteratedSubjects);
		}

		//console.log (data.labels.honor.title);
		var $HonorLabel = $('#HonorLabel')
		if (data.labels.honor.title === 'Honor') {
			$HonorLabel.html("<span>(Honor Course)</span>");
		}

		//console.log (data.description);
		var splitArray = data.description.split('</p>');
		//console.log (splitArray);
		var desiredHtml = splitArray[0];
		//console.log (desiredHtml);
		var $CourseDescription = $('#CourseDescription');
		$CourseDescription.html(desiredHtml);

	}
});