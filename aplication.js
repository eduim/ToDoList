
$(document).ready(function(){


  //count elements
  var count_elements = function(){
    count = $("#toDoList").children().length - $("#toDoList").children().find('.markedCompleted').length;
    $('#taksLeft').text(count)

  }

  var get_task = function(){
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=233',
      dataType: 'json',

      success: function (response, textStatus) {
        $('#toDoList').empty(); 
        response.tasks.forEach(function (task) {
          if(task.completed == true){
            $('#toDoList').append('<div class = "row task">'+
              '<div class = "col" > <div class="input-group my-1">'+
              '<div class="input-group-text">'+
              '<input class="form-check-input mt-0 bg-secondary completedTask" type="checkbox" value="" aria-label="Radio button for following text input" checked>'+
              '</div>'+
              '<div class="form-control bg-transparent markedCompleted">' + task.content + '</div>'+
              '<div class="input-group-text">'+
              '<button type="button"  data-id = "'+task.id+'" class="btn-close btn-close remove" aria-label="Close"></button>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '</div>'
              );
          }
          else {
            $('#toDoList').append('<div class = "row task">'+
              '<div class = "col" > <div class="input-group my-1">'+
              '<div class="input-group-text">'+
              '<input class="form-check-input mt-0 bg-secondary completedTask" type="checkbox" value="" aria-label="Radio button for following text input">'+
              '</div>'+
              '<div class="form-control bg-transparent text-white">' + task.content + '</div>'+
              '<div class="input-group-text">'+
              '<button type="button"  data-id = "'+task.id+'" class="btn-close btn-close remove" aria-label="Close"></button>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '</div>'
              );
          }
          count_elements();
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };


  //create new task
  var post_task = function(task){
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=233',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: task
        }
      }),
      success: function (response, textStatus) {
        get_task();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
      
    });
  };

  //delete task
  var delete_task = function(id){
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'?api_key=233',
      contentType: 'application/json',
      dataType: 'json',

      success: function (response, textStatus) {
        console.log(response);
        get_task();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  //mark completed task
  var complete_task = function(id){
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_complete?api_key=233',
      contentType: 'application/json',
      dataType: 'json',

      success: function (response, textStatus) {
        console.log(response);
        count_elements();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  //mark uncompleted task
  var uncomplete_task = function(id){
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_active?api_key=233',
      contentType: 'application/json',
      dataType: 'json',

      success: function (response, textStatus) {
        console.log(response);
        count_elements();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };


  

  //new tasks
  $(document).on('change',"#newTask",function(event){
    task = $('#newTask').val();
    post_task(task)
    $('#newTask').val("");
    count_elements();  

  });


  //delete task
  
  $(document).on('click','.remove', function (event) {
    delete_task($(this).data('id'));
    $(this).closest('.row task').remove();
    count_elements();  
    get_task();
    

  });


  //completed/uncomplete task
  $(document).on('change','.completedTask', function (event) {
    count_elements();  

    if (this.checked){
      $(this).parent().next().addClass("markedCompleted");
      $(this).parent().next().removeClass("text-white");
      complete_task($(this).parent().next().next().children(".remove").data('id'));
    }
    else{
      $(this).parent().next().removeClass("markedCompleted");
      $(this).parent().next().addClass("text-white");
      uncomplete_task($(this).parent().next().next().children(".remove").data('id'));
    }
  });
  
  get_task();

  
  


})

