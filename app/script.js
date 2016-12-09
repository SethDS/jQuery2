var listo = [];

window.onload = function(){
    if(localStorage['storageListo'] !== null){
        listo = JSON.parse(localStorage['storageListo']);
    } else {
        localStorage['storageListo'] = JSON.stringify([]);
    }

    for(i=0; i<listo.length; i++){
        if(listo[i].id === "new"){
            addIn('#newList', listo[i], "item");
        }
        else if(listo[i].id === "inProgress"){
            addIn('#currentList', listo[i], "inProgress");
        }
        else if(listo[i].id === "archived"){
            addIn('#archivedList', listo[i], "archived");
        }

    }

}

function addIn(element, task, random){
    $(element).append(
        '<a href="#finish" class="" id="'+ random +'">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
    );
}


$(document).ready(function(){

    $('#newTaskForm').hide();


    var Task = function(task) {
        this.task = task;
        this.id = "new";
    }

    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task.toUpperCase() === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                } else {
                    listo.splice(i, 1);
                }
                break;
            }
        }
        task.remove();
    };

    $(document).on('click', '#item', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        localStorage['storageListo'] = JSON.stringify(listo);
        $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function(e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        localStorage['storageListo'] = JSON.stringify(listo);
        $('#archivedList').append(changeIcon);

    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        localStorage['storageListo'] = JSON.stringify(listo);
    });


    var addTask = function(task) {
        if(task) {
            task = new Task(task);
            listo.push(task);
            localStorage['storageListo'] = JSON.stringify(listo);
            $('#newItemInput').val('');
             addIn('#newList', task, "item");


        }
        $('#newTaskForm').slideToggle('fast', 'linear');

    };




    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

    $('#add-todo').on('click', function (){
        $('#newTaskForm').fadeToggle('fast', 'linear');

    });

    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });



})