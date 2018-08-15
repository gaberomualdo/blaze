var finished_todo_items = 0;
var todo_items = [];

$("div.row.add_todo_item button").on("click",function(){
  if($('div.row.add_todo_item input').val() != ""){
    $("div.todo_item_list").prepend('<div class="row todo_item"><p onblur="this.contentEditable = \'false\';update_item_in_todo_items_array(this);">' + $('div.row.add_todo_item input').val() + '</p><button class="remove_todo_item" onclick="remove_item(this);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></button><button onclick="edit_item(this);" class="edit_todo_item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg></button><button class="finished_todo_item" onclick="finish_item(this);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></button></div>');

    todo_items.unshift($('div.row.add_todo_item input').val());
    push_to_local_storage();

    $('div.row.add_todo_item input').val("");
    $('div.row.add_todo_item input').focus();
    update_todo_meter();
  }
});
$("div.row.clear_meter button").on("click",function(){
  finished_todo_items = 0;
  push_to_local_storage();
  update_todo_meter();
});
function update_todo_meter(){
  var todo_meter_percentage = ((finished_todo_items) / (finished_todo_items + todo_items.length)) * 100;
  $("div.row div.progress_bar div.progress").attr("style","width: " + todo_meter_percentage + "%");
}
function remove_item(item){
  todo_items.splice($("div.todo_item_list div.todo_item").index($(item).parent()), 1);
  push_to_local_storage();
  $(item).parent().remove();
  update_todo_meter();
}
function edit_item(item){
  $(item).prev().prev()[0].contentEditable = "true";
  $(item).prev().prev().focus();
}
function finish_item(item){
  finished_todo_items += 1;
  remove_item(item);
  update_todo_meter();
}
function update_item_in_todo_items_array(item){
  todo_items[$("div.todo_item_list div.todo_item").index($(item).parent())] = $(item).text();
  push_to_local_storage();
}
function push_to_local_storage(){
  localStorage.setItem("blaze_app_todo_items",JSON.stringify(todo_items));
  localStorage.setItem("blaze_app_finished_todo_items",JSON.stringify(finished_todo_items));
}

(function(){
  if(localStorage.getItem("blaze_app_todo_items")){
    todo_items = JSON.parse(localStorage.getItem("blaze_app_todo_items"));
    todo_items.forEach(function(item,index){
      $("div.todo_item_list").append('<div class="row todo_item"><p onblur="this.contentEditable = \'false\';update_item_in_todo_items_array(this);">' + item + '</p><button class="remove_todo_item" onclick="remove_item(this);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></button><button onclick="edit_item(this);" class="edit_todo_item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg></button><button class="finished_todo_item" onclick="finish_item(this);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></button></div>');
    })
  }
  if(localStorage.getItem("blaze_app_finished_todo_items")){
    finished_todo_items = (JSON.parse(localStorage.getItem("blaze_app_finished_todo_items")));
    update_todo_meter();
  }
})();
