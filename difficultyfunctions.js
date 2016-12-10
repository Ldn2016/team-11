//remember to color indicate the buttons

if counter (counter === 1) {
function firstWrong(question) {
	var new_string = question;
	var i = 2;
	while (i < new_string.length) {
		i += 2;
		var second = new_string[i];
		var first = new_string[i-2];
		new_string[i-2] = second;
		new_string[i] = first;
	}
	return new_string;

	}
}

else if (counter === 2) {
	function secondWrong(question) {
		//swap true and false (right answer is wrong and wrong answer is right)
	}
else if (counter === 3) {

	function thirdWrong(question) {
	var new_string = question;
	for (var i = 0 ; i < new_string.length; i++) {
		if (i % 2 = 0) {
			new_string[]

		}
		i += 2;
		var second = new_string[i];
		var first = new_string[i-2];
		new_string[i-2] = second;
		new_string[i] = first;
	}
	return new_string;

	}


}
	
