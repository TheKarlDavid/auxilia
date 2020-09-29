$(".drop").click(function() {
	$(".leaf00").addClass("r");
	$(".drop").addClass("c");
	$(".textbox1").addClass("ct");
	
	$(".drop").data("clicked", true);

	if(	$(".drop2").data("clicked") || 
		$(".drop3").data("clicked") ||	
		$(".drop4").data("clicked") ||
		$(".drop5").data("clicked")) 
	{
		$(".stem").addClass("rain2")
		$(".leaf00").addClass("leaf1_2");
		$(".leaf01").addClass("r"); 
	}

	if(	$(".drop2").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop4").data("clicked") ||	
		$(".drop3").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain3")
		$(".leaf00").addClass("leaf1_3");
		$(".leaf01").addClass("r2");
		$(".leaf02").addClass("t");
	}

	if(	$(".drop2").data("clicked") && $(".drop3").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop3").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain4")
		$(".leaf00").addClass("leaf1_4");
		$(".leaf01").addClass("r3");
		$(".leaf02").addClass("t2");
		$(".leaf03").addClass("y");
	}

	if(	$(".drop2").data("clicked") && $(".drop3").data("clicked") && 
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain5")
		$(".leaf00").addClass("leaf1_5");
		$(".leaf01").addClass("r4");
		$(".leaf02").addClass("t3");
		$(".leaf03").addClass("y2");
		$(".leaf04").addClass("u");
	}

	console.log("DROP1")
	// console.log($(this).next().val())
	console.log($(this).next().next().val())

	$.ajax({
		url: "update-task",
		method: "post",
		data: {
			dropCount: $(this).next().val()             
		},
		success: function(){
			console.log("Task updated")
		}
	})
});




$(".drop2").click(function() {
	$(".leaf00").addClass("r");
	$(".drop2").addClass("c2");
	$(".textbox2").addClass("ct2");

	$(".drop2").data("clicked", true);

	if(	$(".drop").data("clicked") || $(".drop3").data("clicked") || $(".drop4").data("clicked") || $(".drop5").data("clicked")) 
	{
		$(".stem").addClass("rain2")
		$(".leaf00").addClass("leaf1_2");
		$(".leaf01").addClass("r"); 
	}

	if(	$(".drop").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop4").data("clicked") ||	
		$(".drop3").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain3")
		$(".leaf00").addClass("leaf1_3");
		$(".leaf01").addClass("r2");
		$(".leaf02").addClass("t");
	}

	if(	$(".drop").data("clicked") && $(".drop3").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop").data("clicked") && $(".drop3").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain4")
		$(".leaf00").addClass("leaf1_4");
		$(".leaf01").addClass("r3");
		$(".leaf02").addClass("t2");
		$(".leaf03").addClass("y");
	}

	if(	$(".drop").data("clicked") && $(".drop3").data("clicked") && 
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain5")
		$(".leaf00").addClass("leaf1_5");
		$(".leaf01").addClass("r4");
		$(".leaf02").addClass("t3");
		$(".leaf03").addClass("y2");
		$(".leaf04").addClass("u");
	}

	console.log("DROP2")

	$.ajax({
		url: "update-task",
		method: "post",
		data: {
			dropCount: $(this).next().val()             
		},
		success: function(){
			console.log("Task updated")
		}
	})
});

$(".drop3").click(function() {
	$(".leaf00").addClass("r");
	$(".drop3").addClass("c3");
	$(".textbox3").addClass("ct3");

	$(".drop3").data("clicked", true);

	if(	$(".drop").data("clicked") || $(".drop2").data("clicked") || $(".drop4").data("clicked") || $(".drop5").data("clicked")) 
	{
		$(".stem").addClass("rain2")
		$(".leaf00").addClass("leaf1_2");
		$(".leaf01").addClass("r"); 
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") ||
		$(".drop").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop4").data("clicked") ||	
		$(".drop2").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain3")
		$(".leaf00").addClass("leaf1_3");
		$(".leaf01").addClass("r2");
		$(".leaf02").addClass("t");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain4")
		$(".leaf00").addClass("leaf1_4");
		$(".leaf01").addClass("r3");
		$(".leaf02").addClass("t2");
		$(".leaf03").addClass("y");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && 
		$(".drop4").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain5")
		$(".leaf00").addClass("leaf1_5");
		$(".leaf01").addClass("r4");
		$(".leaf02").addClass("t3");
		$(".leaf03").addClass("y2");
		$(".leaf04").addClass("u");
	}

	console.log("DROP3")

	$.ajax({
		url: "update-task",
		method: "post",
		data: {
			dropCount: $(this).next().val()             
		},
		success: function(){
			console.log("Task updated")
		}
	})
});

$(".drop4").click(function() {
	$(".leaf00").addClass("r");
	$(".drop4").addClass("c4");
	$(".textbox4").addClass("ct4");

	$(".drop4").data("clicked", true);

	if(	$(".drop").data("clicked") || $(".drop2").data("clicked") || $(".drop3").data("clicked") || $(".drop5").data("clicked")) 
	{
		$(".stem").addClass("rain2")
		$(".leaf00").addClass("leaf1_2");
		$(".leaf01").addClass("r"); 
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") ||
		$(".drop").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop3").data("clicked") ||	
		$(".drop2").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain3")
		$(".leaf00").addClass("leaf1_3");
		$(".leaf01").addClass("r2");
		$(".leaf02").addClass("t");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop").data("clicked") && $(".drop3").data("clicked") && $(".drop5").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop3").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain4")
		$(".leaf00").addClass("leaf1_4");
		$(".leaf01").addClass("r3");
		$(".leaf02").addClass("t2");
		$(".leaf03").addClass("y");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && 
		$(".drop3").data("clicked") && $(".drop5").data("clicked") )
	{	
		$(".stem").addClass("rain5")
		$(".leaf00").addClass("leaf1_5");
		$(".leaf01").addClass("r4");
		$(".leaf02").addClass("t3");
		$(".leaf03").addClass("y2");
		$(".leaf04").addClass("u");
	}

	console.log("DROP4")

	$.ajax({
		url: "update-task",
		method: "post",
		data: {
			dropCount: $(this).next().val()             
		},
		success: function(){
			console.log("Task updated")
		}
	})
});

$(".drop5").click(function() {
	$(".leaf00").addClass("r");
	$(".drop5").addClass("c5");
	$(".textbox5").addClass("ct5");

	$(".drop5").data("clicked", true);

	if(	$(".drop").data("clicked") || $(".drop2").data("clicked") || $(".drop3").data("clicked") || $(".drop4").data("clicked")) 
	{
		$(".stem").addClass("rain2")
		$(".leaf00").addClass("leaf1_2");
		$(".leaf01").addClass("r"); 
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") ||
		$(".drop").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop3").data("clicked") ||	
		$(".drop2").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop3").data("clicked") && $(".drop4").data("clicked") )
	{	
		$(".stem").addClass("rain3")
		$(".leaf00").addClass("leaf1_3");
		$(".leaf01").addClass("r2");
		$(".leaf02").addClass("t");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop3").data("clicked") ||
		$(".drop").data("clicked") && $(".drop2").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop").data("clicked") && $(".drop3").data("clicked") && $(".drop4").data("clicked") ||
		$(".drop2").data("clicked") && $(".drop3").data("clicked") && $(".drop4").data("clicked") )
	{	
		$(".stem").addClass("rain4")
		$(".leaf00").addClass("leaf1_4");
		$(".leaf01").addClass("r3");
		$(".leaf02").addClass("t2");
		$(".leaf03").addClass("y");
	}

	if(	$(".drop").data("clicked") && $(".drop2").data("clicked") && 
		$(".drop3").data("clicked") && $(".drop4").data("clicked") )
	{	
		$(".stem").addClass("rain5")
		$(".leaf00").addClass("leaf1_5");
		$(".leaf01").addClass("r4");
		$(".leaf02").addClass("t3");
		$(".leaf03").addClass("y2");
		$(".leaf04").addClass("u");
	}

	console.log("DROP5")

	$.ajax({
		url: "update-task",
		method: "post",
		data: {
			dropCount: $(this).next().val()             
		},
		success: function(){
			console.log("Task updated")
		}
	})
});


