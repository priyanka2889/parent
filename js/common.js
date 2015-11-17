//var base_url="http://localhost/schoolapp/public/";
var base_url="http://bluesys.in/dev/schoolappbackend/public/";
/*------- common function to display Popup -------*/
function alertpopup(msg)
{
$("#msg" ).popup( "open" );
$("#msg p ").empty();
$("#msg p ").text(msg);
} 

function pagestart()
{
		$(".account").click(function()
			{
			var X=$(this).attr('id');
			if(X==1)
			{
			$(".submenu").hide();
			$(this).attr('id', '0'); 
			}
			else
			{
			$(".submenu").show();
			$(this).attr('id', '1');
			}
			});

			//Mouse click on sub menu
			$(".submenu").mouseup(function()
			{
			return false
			});

			//Mouse click on my account link
			$(".account").mouseup(function()
			{
			return false
			});

			//Document Click
			$(document).mouseup(function()
			{
			$(".submenu").hide();
			$(".account").attr('id', '');
			});
}