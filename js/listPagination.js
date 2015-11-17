/*
 * jQuery Mobile Listview Pagination ver - 1.0 
 */
 
(function($) {
	var listOffset = 0, listOffsetSearch = 0 , searchTerm ="" , page=1;
	$.widget( "mobile.pagination", $.mobile.widget, {
		options: {
			perPage: 10,
			initSelector: "[pagination],[data-type=search]"
			},
		  _create: function(e) {
					var inputElement = this.element;
					var opts = $.extend(this.options, inputElement.data("options"));
					$(document).trigger("paginationcreate");
			},
		getResults: function() {
			//console.log(searchTerm);
			if (listOffset==0){
					return { perPage:this.options.perPage,
							listOffset:listOffset,
							searchTerm:searchTerm
					};
				}
			else{	
					return {
								perPage:this.options.perPage,
								listOffset:listOffset,
								searchTerm:searchTerm
						};
				}
			},
		
		setoffset:function(p){
		 page = p;
		 if (page==0)
		 {
			 listOffset=0
		 }
		else{

		 listOffset = (page*this.options.perPage)-this.options.perPage;}
			//alert(listOffset);
		 
		},
		
		setSearchTerm : function(s){
		     searchTerm = s;
			// console.log(searchTerm);
			return searchTerm;
			
		},
		
		pagination_btn:function(page,total){
			var perpage = this.options.perPage;
			if(total>perpage){
			var current_page = Number(page);
					//alert("currentpage"+perpage);
					//console.log("per page= "+this.options.perPage);
					
					var total_pages =Math.ceil(total/perpage);
					//alert(total_pages);
					var right_links = current_page+2;
					var previous = current_page-1;
					var next = current_page+1;
					var first_link = true;
					var list_btn='';
					if(current_page>1){
					  var previous_link = (previous==0)?1:previous;
						list_btn = list_btn + '<a href="#" data-page="1" title="First"><li class="first">&laquo;</li></a>'; //first link
						list_btn = list_btn + '<a href="#" data-page="'+previous_link+'" title="previous"><li class="first">&lt;</li></a>'; //previous link
					   for(var i = (current_page-2); i < current_page; i++){ //Create left-hand side links
						if(i > 0){
							list_btn = list_btn + '<a href="#" data-page="'+i+'" title="Page'+i+'"><li>'+i+'</li></a>';
							}
						}
						first_link = false;
					}
					 if(first_link){ //if current active page is first link
									list_btn = list_btn + '<li class="first active">'+current_page+'</li>';
								}
					else{ 
					
					if(current_page == total_pages){ //if it's the last active link
							list_btn = list_btn + '<li class="last active">'+current_page+'</li>';
						}
						else{ //regular current link
							list_btn = list_btn + '<li class="active">'+current_page+'</li>';
							}
						}	
						 if(current_page < total_pages){ 
							//alert(right_links);
								for(var i = current_page+1; i < right_links ; i++){ //create right-hand side links
								if(i<=total_pages){
									list_btn = list_btn +'<a href="#" data-page="'+i+'" title="Page '+i+'"><li>'+i+'</li></a>';
									}
								}
								var next_link = ( next >= total_pages)? total_pages : next;
								list_btn = list_btn +'<a href="#" data-page="'+next_link+'" title="Next"><li>&gt;</li></a>'; //next link
								list_btn = list_btn +'<a href="#" data-page="'+total_pages+'" title="Last"><li class="last">&raquo;</li></a>'; //last link
							
							
							}
			return list_btn;
			}
			else{
				list_btn="";
				return list_btn;
			}
			
		},
		onclick_next:function(page,ajax_fun){
			//alert(ajax_fun);
			 //  console.log(page);
			if(page=="undefined"||page=="NULL"||page==""){
			ajax_fun(1);
			}
			else{
			ajax_fun(page);	
			}
			
								
		},
		search : function(search_term,ajax_fun){
			 			this.setSearchTerm(search_term);
						 listOffset =0;
						ajax_fun(1);
		},
		ajax_invoke : function(ajax_fun){
			//console.log(page);
			if(page=="undefined"||page=="NULL"||page==""){
			ajax_fun(1);
			}
			else{
			ajax_fun(page);	
			}
		}
		
	});
	 $(document).on("pageinit",function(e){
		 
		 
	 });
	 /* Handler which initialises all widget instances during page creation. */
  $(document).bind("pagecreate", function(e) {
    $(document).trigger("paginationbeforecreate");
    return $(":jqmData(role='pagination')", e.target).pagination();
  });
})(jQuery);