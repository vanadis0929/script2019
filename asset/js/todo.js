  let TODO_ARRAY = [];

  function setTodo(event) {
    const TODO_ITEM = $(this).val();
    const TODO_LENGTH = $('#todo > li').length;
    const TODO_JSON = {
      id: `todo_${TODO_LENGTH}`,
      title: TODO_ITEM
    };
    if (event.which === 13) {
      if (TODO_ITEM != null) {
        $('#todo').append(
          `<li id="${TODO_JSON.id}">${
            TODO_JSON.title
          } <button type="button">✂️</button></li>`
        );
        TODO_ARRAY.push(TODO_JSON);
        //console.log(TODO_ARRAY);
        saveTodo();
        TODO_ARRAY.length > 0 ?
          $('#reset_todo').show() :
          $('#reset_todo').hide();
        $(this).val('');
      } else {
        alert('할 일을 입력해 주세요.');
      }
    }
  }

  function saveTodo() {
    saveLocalStorage('todo', JSON.stringify(TODO_ARRAY));
  }

  function getTodo() {
    if (TODOLIST_ITEMS != null) {
      /* 리스트를  담고 새로고침하면 기존 데이터를 다 날리고 새로 push하는 이슈방지(기존에 있던 리스트를 다시 배열에 집어넣는다)*/
      TODO_ARRAY = TODOLIST_ITEMS;
      for (i = 0; i < TODOLIST_ITEMS.length; i++) {
        $('#todo').append(
          `<li id="${TODOLIST_ITEMS[i].id}">${
            TODOLIST_ITEMS[i].title
          } <button type="button">✂️</button></li>`
        );
      }
      $('#todo > li').length > 0 ?
        $('#reset_todo').show() :
        $('#reset_todo').hide();
    }
  }

  function delTodo() {
    const LIST_ARRAY = $('#todo > li');

    if ($(this).is('#reset_todo')) {
      allRemoveTodo();
    } else {
      $(this)
        .parent()
        .removeAttr('id')
        .hide();

      const processTodo = $.grep(
        TODOLIST_ITEMS,
        function (result, i) {
          return LIST_ARRAY.eq(i).attr('id') !== TODOLIST_ITEMS[i].id;
        },
        true
      );

      TODO_ARRAY = processTodo;
      console.log(TODO_ARRAY.length);
      if (TODO_ARRAY.length == 0) {
        allRemoveTodo();
      }
      saveTodo();
      checkReset();
    }
  }

  function allRemoveTodo() {
    $('#todo > li')
      .parent()
      .empty();
    $('#reset_todo').hide();
    delLocalStorage('todo');
  }