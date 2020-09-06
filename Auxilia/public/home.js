$(".drop").click(function() {
	$(".leaf00").addClass("r");
});


$(".drop2").click(function() {
	$(".stem").addClass("rain");
	$(".leaf00").addClass("leaf1_1");
});


$(".drop3").click(function() {
	$(".stem").addClass("one");
	
	setTimeout(function () { 
		$('.stem').removeClass('one');
	}, 1200);  
});

$(".drop3").click(function() {
	$(".stem").addClass("one");
	
	setTimeout(function () { 
		$('.stem').removeClass('one');
	}, 1200);  
});
