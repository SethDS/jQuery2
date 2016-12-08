$('document').ready(function(){

    var listo = [];
    var Task = function(task) {
        this.task = task;
        this.id = "new";
    }

    $('#newTaskForm').hide();



    var addTask = function(task){
        if(task){
            task = new Task(task);
            listo.push(task);
            $('#newItemInput').val('');
            $('#newList').append(
                '<a href="#finish" class="" id="item">'  +
                    '<li class="list-group-item">'  +
                    '<h3>' +task.task + '</h3>>'  +
                    '<span class="glyphicon glyphicon-arrow-right">'  +
                    '</span>' +
                    '</li>'  +
                    '</a>'
            );
        }
        $('#newTaskForm').slideToggle('fast', 'linear');
    };






})