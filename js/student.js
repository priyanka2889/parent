var page1="" ,pagetype="", sentdate="" , time="" ;
var page=1;
	$(document).ready(function(){
		
		/*Get User Id & Fetch Details From Database*/
		if(!localStorage.userId)
			{
			  window.location="index.html";
			}
		else
			{
			var id=localStorage.userId;
			var username=localStorage.username;
			var school_id=localStorage.school_id;
			$("#username").text(username);
			$("#Id").val(id);
			$("#school_id").val(school_id);	
			 var id=$("#Id").val();
			 getcount(id);	
				//****	get calander holiday list***//

		    	$.ajax({
					type : "GET",
					url  : base_url+"holidaylist/"+school_id,
					cache: false,
					dataType:'json',
					success:getdate	,
					error:function(){
						jAlert("Connection Error", 'Alert Dialog');
						}
				});
				
		 
		}
		
		
			$("#listinbox").on("scrollstart",function(){
	       
			$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});
			$("#read_box").on("scrollstart",function(){
	        
			$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});
			$("#unread_box").on("scrollstart",function(){
	        
			$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});
			$("#trash_read_msg").on("scrollstart",function(){
	       
			$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});
			
			$('.search').donetyping(function(){ 
		
							searchcat();

				});
				
		
		
	});//document ready ends
 	
	//-------Logout -----------//
	$(document).on('click','#logout',function(){
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		localStorage.removeItem("cntr_Id");
	});

	$(document).on('click','#show_inbox',function(){
		$(function() {
    $( "[data-role='navbar']" ).navbar();
    $( "[data-role='footer']" ).toolbar();
});
// Update the contents of the toolbars
$( document ).on( "pagecontainerchange", function() {
    var current = $( ".ui-page-active" ).jqmData( "title" );
	$( "[data-role='header'] h1" ).text( current );
    $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
    $( "[data-role='navbar'] a" ).each(function() {
        if ( $( this ).text() === current ) {
            $( this ).addClass( "ui-btn-active" );
        }
    });
});
		page1="#show_inbox";
		pagetype="inbox";
		searchlist="inboxMsg";
		pageinit();
		$("#listinbox").empty();
	    $.extend($.mobile.pagination.prototype.options, {perPage: 5});
	    inboxMsg(page);
		page=2;
		
	});

	//get count of all message
function getcount(id)
{
	$.ajax({
		type:"GET",
		url: base_url+"msgcount/"+id,
		dataType:"json",
		success:function(data)
		{
			 $("#count").html(data.unread+'/' +data.inbox);
			 $("#count_mssg").html(data.inbox);
			 
			
			 $("#read_count").html(data.read);
			 $("#unread_count").html(data.unread);	
			 $("#trashcount").html(data.trash);
		},
		error:function()
			{
			jAlert("Connection Error", 'Alert Dialog');
			}
		});
}

	
	function inboxMsg(page){
		var user_id=$("#Id").val();
		var msgtype="inbox";
		var usrtype="parent";
	
		$.ajax({
			 type:"GET",
			 url: base_url+"msglist/"+msgtype+"/"+usrtype+"/"+user_id,
			 dataType:"json",
			 data:{ pagination: $.mobile.pagination.prototype.getResults() },
			 success:function(data){
			   

				  if(data==null){
				   
				   $("#listinbox").append("<li> <h4>No more Item </h4></li>");
				   
			   }else{		   
					 $.each(data.msglist,function(value,item){
							var time=item.msg_sent_date;
							//time=new Date(time);
							//time=  time.toDateString();
							
							
				
						 var subject =item.msg_title;
						 var msg =item.msg_content;
						 var name="<font size='3'>"+item.usr_name+"</font>";

						 var data = subject+"_"+msg+"_"+item.msg_sent_date+"_"+item.usr_name+"_"+item.msg_read_flag;
						
						if(item.msg_read_flag=="U"){
							//$("#listinbox").append('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-li-has-count ui-first-child">'+sentdate+'</li>');
							$("#listinbox").append('<li data-icon="false" id="'+item.Id+'" data="'+data+'" class="read"><a href="#displaymsg"><img src="images/user1.png" alt="pic" width="50px;"><b>'+name+'</b><span style="display:inline-block; float:right;">'+time+'</span><b>'+subject+'</b></a></li>');
							
						}
						else{
							//$("#listinbox").append('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-li-has-count ui-first-child">'+sentdate+'</li>');
							$("#listinbox").append('<li data-icon="false"  id="'+item.Id+'" data="'+data+'" class="read"><a href="#displaymsg"><img src="images/user1.png" alt="pic" width="50px;" ><p>'+name+'<span style="display:inline-block; float:right;">'+time+' </span></p><p>'+subject+'</p></a></li>');
							}
							
						});
					   }
					  $('#listinbox').listview().listview('refresh');
										 
					 },
					 error:function(){
						 jAlert("Connection Error", 'Alert Dialog');
						 }
					});
				
			}
		
		$(document).on('click','#show_read',function(){
			page1="#show_inbox";
			pagetype="read_page";
			searchlist="read";
			pageinit();
			 $("#read_box").empty();
			$.extend($.mobile.pagination.prototype.options, {perPage: 5});
			read(page);
			page=2;

		});
	
		function read(page){
			var user_id=$("#Id").val();
			var msgtype="inbox";
			var usrtype="R";
			$.ajax({
				 type:"GET",
				 url: base_url+"msglist/"+msgtype+"/"+usrtype+"/"+user_id,
				 dataType:"json",
				 data:{ pagination: $.mobile.pagination.prototype.getResults() },
				 success:function(data){
				 

					  if(data==null){
					   
					   $("#read_box").append("<li> <h4>No more Item </h4></li>");
					   
				   }else{
				   
				 $.each(data.msglist,function(value,item){
					var time=item.msg_sent_date;
			
					 var subject =item.msg_title;
					 var msg =item.msg_content;
					 var name="<font size='3'>"+item.usr_name+"</font>";
					 var data = subject+"_"+msg+"_"+item.msg_sent_date+"_"+item.usr_name+"_"+item.msg_read_flag;
					
					//$("#read_box").append('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">'+sentdate+'</li>');
					$("#read_box").append('<li data-icon="false"  id="'+item.Id+'" data="'+data+'" class="read"><a href="#displaymsg"><img src="images/user1.png" alt="pic" width="50px;" ><p>'+name+'<span style="display:inline-block; float:right;">'+time+' </span></p><p>'+subject+'</p></a></li>');	
					});
				   }
					$('#read_box').listview().listview('refresh');
					
				 },
				 error:function(){
					 jAlert("Connection Error", 'Alert Dialog');
					 }
				});
			
		}
		
		
		$(document).on('click','#show_unread',function(){
			 page1="#show_inbox";
			 pagetype="unread_page";
			 searchlist="unread";
			 pageinit();
			  $("#unread_box").empty();
	         $.extend($.mobile.pagination.prototype.options, {perPage: 5});
	         unread(page);
			 page=2;
		});
	
		function unread(page){
			var user_id=$("#Id").val();
			var msgtype="inbox";
			var usrtype="U";
			$.ajax({
				 type:"GET",
				 url: base_url+"msglist/"+msgtype+"/"+usrtype+"/"+user_id,
				 dataType:"json",
				 data:{ pagination: $.mobile.pagination.prototype.getResults() },
				 success:function(data){
				    

					  if(data==null){
					   
					   $("#unread_box").append("<li> <h4>No more Item </h4></li>");
					   
				   }else{
				   
				 $.each(data.msglist,function(value,item){
					var time=item.msg_sent_date;
			
					 var subject =item.msg_title;
					 var msg =item.msg_content;
 var name="<font size='3'>"+item.usr_name+"</font>";
					 var data = subject+"_"+msg+"_"+item.msg_sent_date+"_"+item.usr_name+"_"+item.msg_read_flag;
						//$("#unread_box").append('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-li-has-count ui-first-child">'+sentdate+'</li>');
						$("#unread_box").append('<li data-icon="false" id="'+item.Id+'" data="'+data+'" class="read"><a href="#displaymsg"><img src="images/user1.png" alt="pic" width="50px;"><b>'+name+'</b><span style="display:inline-block; float:right;">'+time+'</span><b>'+subject+'</b></a></li>');
						
					});
				   }
					$('#unread_box').listview().listview('refresh');
				 },
				 error:function(){
					 jAlert("Connection Error", 'Alert Dialog');
					 }
				});
			
		}
		
		$(document).on('click','#show_trash',function(){
			page1="#show_trash";
			pagetype="trash";
			searchlist="trashMsg";
			pageinit();
			 $("#listTrash").empty();
			$.extend($.mobile.pagination.prototype.options, {perPage:4});
			trashMsg(page);
			page=2;
		});
		
		function trashMsg(page){
			var user_id=$("#Id").val();
			var msgtype="trash";
			var usrtype="parent";
			$.ajax({
				 type:"GET",
				 url: base_url+"msglist/"+msgtype+"/"+usrtype+"/"+user_id,
				 dataType:"json",
				 data:{ pagination: $.mobile.pagination.prototype.getResults() },
				 success:function(data){
			    
				
				   if(data==null){
					   
					   $("#listTrash").append("<li> <h4>No more Item </h4></li>");
					   
				   }else{			   
						$.each(data.msglist,function(value,item){
							var subject =item.msg_title;
							var msg =item.msg_content;
							if(item.msg_sent==1 && item.msg_delete=='T'){								 
								var msgFrom ="inbox";
							}else if(item.msg_sent==1 && item.msg_flag=='T'){								 
								var msgFrom ="sent";
							}else if(item.msg_sent==0 && item.msg_flag=="T"){								 
								var msgFrom ="draft";
							 }
							 time=item.msg_sent_date;
							var data = subject+"_"+msg+"_"+item.msg_sent_date+"_"+item.usr_name+"_"+item.msg_read_flag+"_"+msgFrom;
							
							$("#listTrash").append('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-li-has-count ui-first-child">'+msgFrom+'</li>');
							$("#listTrash").append('<li data-icon="false"  id="'+item.Id+'" data="'+data+'" class="read" id="restore"><a href="#trash_displaymsg"><img src="images/user1.png" alt="pic" width="50px;" ><p>'+item.usr_name+'<span style="display:inline-block; float:right;">'+time+' </span></p><p>'+subject+'</p></a></li>');	
							$("#listTrash").listview().listview('refresh');
						   });
					
							
					 }
				},
				 error:function(){
					 jAlert("Connection Error", 'Alert Dialog');
					 }
				});
			
		}

		$(document).on("click",".read",function(){
			var id = $(this).attr("id");
			var data= $(this).attr("data");
			var content = data.split("_");
			var subject =  content[0];
			var msg = content[1];
			var sent_date = content[2];
			var sent_by = content[3];
			var readFlag= content[4];
			var restoreTO = content[5];
			
			if(readFlag=="U"){
				
				$.ajax({
						type: "PUT",
						url: base_url+"message/"+id,
						success:function(data){
							//alert(data);
							},
						error:function(){
							jAlert("Connection Error", 'Alert Dialog');
							}
			
					});
				
			}
			
			if(sent_by=="undefined"||sent_by==null){
				sent_by="";
			}
			
			
			if(pagetype=="trash"){
				$("#resend").attr('title',"restore");
				$("#resend").attr('id',"restore");
				$("#restore").parent('li').attr('id',id);
				$("#restore").parent('li').attr('data',restoreTO);
				$("#restore ").removeClass("ui-icon-mail-reply-all");
				$("#restore ").addClass("ui-icon-archive");
			}
			else
			{
				$("#restore").attr('title',"resend");
				$("#restore").attr('id',"resend");
				$("#resend").parent('li').attr('id',id);
				$("#resend").parent('li').attr('data',restoreTO);
				$("#resend").removeClass("ui-icon-archive");
				$("#resend ").addClass("ui-icon-mail-reply-all");
				
			}
			
			
			$("#delete").parent('li').attr('id',id);
			$("#resend").parent('li').attr('id',id);
			$("#date").html(sent_date);
			$("#sender").html(sent_by);
			$("#subject").html(subject);
			$("#message_cont").html("<pre>"+msg+"</pre>");
			$("#message_cont1").html("<pre>"+msg+"</pre>");
			 $("#read_msg").empty();
			$("#read_msg").append('<li data-role="list-divider" role="heading" class="mssg_title ui-li-divider ui-bar-a ui-first-child"><b>From:</b>'+sent_by+'<br><b>Subject:</b>'+subject+'<br><b>Date:</b>'+sent_date+' </li>');
			$("#read_msg").listview().listview('refresh');
			 $("#trash_read_msg").empty();
			$("#trash_read_msg").append('<li data-role="list-divider" role="heading" class="mssg_title ui-li-divider ui-bar-a ui-first-child"><b>From:</b>'+sent_by+'<br><b>Subject:</b>'+subject+'<br><b>Date:</b>'+sent_date+' </li>');
			$("#trash_read_msg").listview().listview('refresh');
		});

		//-------Edit Profile -----------//
		$(document).on('click','#self_profile',function(){
			setFields();
		});
		
		function setFields(){
			var id=$("#Id").val();//value must be logged userId;
				$.ajax({
					type:"GET",
					url:base_url+"user/"+id+"/edit",
					cache:false,
					dataType:"json",
					success:function(data){
						$('#edit_profile_form #userId').val(data.Id);
						$('#edit_profile_form #usr_name').val(data.usr_name);
						$('#edit_profile_form #usr_name').css({'background-color' : '#FFFFEEE'});
						$('#edit_profile_form #usr_name').css({'border' : '1px solid #990000'});
						$('#edit_profile_form #usr_name').attr('readonly', true);
						$('#edit_profile_form #usr_username').val(data.usr_username);
						$('#edit_profile_form #usr_username').css({'background-color' : '#FFFFEEE'});
						$('#edit_profile_form #usr_username').css({'border' : '1px solid #990000'});
						$('#edit_profile_form #usr_username').attr('readonly', true);
						$('#edit_profile_form #usr_email').val(data.usr_mail);
						$('#edit_profile_form #usr_registerDate').text(data.usr_registerDate);
						$('#edit_profile_form #usr_lastvisitDate').text(data.usr_lastvisitDate);
					},
					error:function(){
							jAlert("Connection Error", 'Alert Dialog');
						}
				});
		}

		$(document).on("click",".msgdelete",function(){
			var id = $('.read').attr("id");

			$.ajax({
				type: "DELETE",
				url: base_url+"message/"+id,
				data:"type=D&msgtype="+pagetype+"&usrtype=parent",
				success:function(data){
					trashMsg();
					//$(page1).click();
					reload();
				},
				error:function(){
					jAlert("Connection Error", 'Alert Dialog');
					}
				
			});
		});	
		
		$(document).on("click","#restore",function(){	
			var id = $(this).parent("li").attr("id");
			
			var restoreTO= $(this).parent("li").attr("data");

			$.ajax({
			   
				type: "DELETE",
				url: base_url+"message/"+id,
				data:"type=R&msgtype="+restoreTO,                                
				success:function(data){
				   console.log(data);
					var show = "#show_"+restoreTO;
					trashMsg();
					$(show).click();
			   },
			   error:function(){
				//jAlert("Connection Error", 'Alert Dialog');	
				}
				
				
			});
		});		
		

		$(document).on("click",".delete",function(){
			var id = $("#restore").parent("li").attr("id");
			
	$.ajax({   
		type: "DELETE",
		url: base_url+"message/"+id,
		data:"type=D&msgtype="+pagetype+"&usrtype=parent",
		success:function(data){
			trashMsg();
			$(page1).click();
			console.log(data);
		
		},
		error:function(){
			jAlert("Connection Error", 'Alert Dialog');
			}
		
	});
});


//edit profile 
	$(document).on("blur","#usr_username",function(){
		var usr_username=$("#usr_username").val();
		checkusername(usr_username);
	});
	
	function checkusername(usr_username)
	{
		$.ajax({
			type:"GET",
			url:base_url+"user/"+usr_username,
			dataType:"json",
			success:function(data){ 
				if(data=="1"){
						alertpopup("Username Exists");
						$("#msg #okbtn").click(function(){
							$("#tchr_usr_username").val("");
						});
				}
			},
			error:function(){
				jAlert("Connection Error", 'Alert Dialog');
				},
		});
	}
		
	$(document).on('click','#update',function(){
		$('#edit_profile_form').validate({
			rules: {
				usr_name:{
					required:true
				},
				usr_username:{
					required:true
				},
				usr_email:{
					email:true,
					required:true
				},
				usr_password:{
					required:true
				},
				c_password:{
					required:true,
					equalTo:usr_password
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				id=$("#Id").val();
				var formdata= $('#edit_profile_form').serialize();
				$.ajax({
					type:"PUT",
					url:base_url+"user/"+id,
					data:formdata,
					dataType:"json",
					success:function(data){
						reload();
							
					},
					error:function(){
						jAlert("Connection Error", 'Alert Dialog');
						},
				});
			}
		});//validation close
	});//update function close
	function reload(){ 
		window.location.hash = "#dashboard";
		document.location.reload();
	}

	

window.searchcat= function (){
		pageinit();
		var search_term;
	
		 if(searchlist=='inboxMsg')
			{
				var msg_content=$("#inbox_msg_text").val();

				$("#listinbox").empty();
			    search_term=msg_content;
			}

			if(searchlist=='unread')
			{
				var msg_content=$("#unread_msg_text").val();
				 $("#unread_box").empty();
			    search_term=msg_content;
			}
		if(searchlist=='read')
			{
				var msg_content=$("#read_msg_text").val();
				 $("#read_box").empty();
			    search_term=msg_content;
			}

	    if(searchlist=='trashMsg')
		{
			var msg_content=$("#trash_msg_text").val();
			 $("#listTrash").empty();
			search_term=msg_content;
		}
			$.mobile.pagination.prototype.search(search_term,window[searchlist]);
			page=2;
}

$(document).on("click",".pagination a",function(e)
{
			page = $(this).attr("data-page");
			$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
});	

function pageinit()
{
			page=1;
			$.mobile.pagination.prototype.setoffset(0);
			$.mobile.pagination.prototype.setSearchTerm('');
}
$(document).on("click",".searchbtn",function(){
         var toggleTextbox = "#"+pagetype+" .searchText";
		 var togglebtn ="#"+pagetype+" .searchbtn";
		$(toggleTextbox).toggleClass("hiddentext");
	    $(togglebtn).toggleClass("ui-icon-search");
		$(togglebtn).toggleClass("ui-icon-arrow-u");
	 
	  });
	  

//rightclick disabled//

$(document).on("contextmenu","img" ,function(){
 
 return false;

});

$(document).on("click",".ui-input-clear",function(){
searchcat();
});



function dateTime(date){
			 var d= new Date(date);
			 var now = new Date();
			 var day = d.getDate();
			 var montharr = ["jan", "feb" , "mar" , "apr", "may", "jun" ,"jul","aug","sep" ,"oct" ,"nov" , "dec"];
			 var month = montharr[d.getMonth()];
			 var todayDate = now.getDate();
			 if(day==todayDate){
				 sentdate ="today";
				 
			 }else if(day==(todayDate-1)){
				 
				 sentdate ="yesterday";
			 }
			 else{
				  sentdate = day+"-"+month;
			 }
			 time = d.getHours()+":"+d.getMinutes();
}

/*get holiday list*/
 function getdate(data){
				var count =data.length;
				
				all=[];
				holiday=[];
					$.each(data,function(i,item) {
						var natDays1=item.date;	
						var hname=item.name;
						holiday.push(hname);
						dteSplit = natDays1.split("-");
						yr = dteSplit[0][0] + dteSplit[0][1]+dteSplit[0][2] + dteSplit[0][3]; //special yr format, take last 2 digits
						month = dteSplit[1];
						day = dteSplit[2];
						finalDate=[];
						finalDate.push(month);
						finalDate.push(day);
						finalDate.push(yr);
						all.push(finalDate);
						});
						natDays=all;
					

			var dateMin = new Date();
			var weekDays = AddBusinessDays(3);

			dateMin.setDate(dateMin.getDate() + weekDays);

        function AddBusinessDays(weekDaysToAdd) {
          var curdate = new Date();
          var realDaysToAdd = 0;
          while (weekDaysToAdd > 0){
            curdate.setDate(curdate.getDate()+1);
            realDaysToAdd++;
           
            if (noWeekendsOrHolidays(curdate)[0]) {
              weekDaysToAdd--;
            }
          }
          return realDaysToAdd;

        }

        function noWeekendsOrHolidays(date) {
            var noWeekend = $.datepicker.noWeekends(date);
            if (noWeekend[0]) {
                return nationalDays(date);
            } else {
                return noWeekend;
            }
        }
        function nationalDays(date) {
		
          for (i = 0; i < natDays.length; i++) {
                if (date.getMonth() == natDays[i][0] - 1 && date.getDate() == natDays[i][1] && date.getFullYear() == natDays[i][2]) {
                   	  return [true, "event",  holiday[i] + natDays[i][2]+''];
					
                }
            }
			
            return [true, ''];
        }

        $(function() {
            $( "#datepicker" ).datepicker({
                beforeShowDay: noWeekendsOrHolidays,
				inline: true,
				  minDate: new Date(2015, 1 - 1, 1),
				  maxDate: new Date(2015, 12 - 1, 31),
				   dateFormat: "mm-yy-dd",
           
            });
            $(this).focus();
        });      		
}