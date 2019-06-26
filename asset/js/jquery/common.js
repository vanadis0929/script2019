$(function () {
  let TODO_ARRAY = [];
  const TODOLIST_ITEMS = JSON.parse(localStorage.getItem('todo'));

  /* 배경 */
  function setBackground() {
    const IMGCOUNT = 7;
    const imgRdm = Math.floor(Math.random() * IMGCOUNT) + 1;
    $('#bg').html(`<img src='/asset/images/${imgRdm}.jpg' alt='' />`);
    setTimeout(() => {
      $('#bg > img').addClass('complete');
    }, 200);
  }

  /* 인사메시지 */
  function setGreeting(event) {
    if (event.which === 13) {
      const msg = $(this).val();
      if (msg.length > 0) {
        $(this)
          .prev()
          .children('strong')
          .text(msg);
        saveLocalStorage('name', msg);
        getGreeting();
      } else {
        alert('이름을 입력해주세요.');
      }
    }
  }

  function removeGreeting() {
    alert('이름을 초기화 합니다.');
    delLocalStorage('name');
    $('#greeting').removeClass('apply');
    getGreeting();
  }

  function getGreeting() {
    const NAME = localStorage.getItem('name');
    if (NAME != null) {
      $('#greeting')
        .addClass('apply')
        .find('h1 > strong')
        .text(NAME);
      $('#greeting_text')
        .hide()
        .val('');
    } else {
      $('#greeting_text')
        .show()
        .val('')
        .focus();
    }
  }

  /* todo 리스트 */
  function setTodo(event) {
    const TODO_ITEM = $(this).val();
    const TODO_LENGTH = $('#todo > li').length;
    const TODO_JSON = {
      id: `todo_${TODO_LENGTH}`,
      title: TODO_ITEM
    };
    if (event.which === 13) {
      if (TODO_ITEM != null) {
        //console.log(typeof(TODO_JSON));

        $('#todo').append(
          `<li id="${TODO_JSON.id}">${
            TODO_JSON.title
          } <button type="button">✂️</button></li>`
        );
        TODO_ARRAY.push(TODO_JSON);
        console.log(TODO_ARRAY);
        saveLocalStorage('todo', JSON.stringify(TODO_ARRAY));
        $(this).val('');
      } else {
        alert('할 일을 입력해 주세요.');
      }
      //getTodo();
    }
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
    }
  }

  function delTodo() {
    $(this).parent().remove();

    const LIST_ARRAY = $('#todo > li');
    //console.log(LIST_ARRAY.get());
    // console.log(
    //   $('#todo > li')
    //     .eq(0)
    //     .attr('id')
    // );
    // console.log(
    //   TODOLIST_ITEMS[0].id !=
    //     $('#todo > li')
    //       .eq(0)
    //       .attr('id')
    // );
    //console.log(LIST_ARRAY.get());
    const processTodo = $.grep(TODOLIST_ITEMS, function (result, i) {
      return console.log(LIST_ARRAY.eq(i).index());
      //return (LIST_ARRAY.eq(i).attr('id') === TODOLIST_ITEMS[i].id);
    }, true);
    TODO_ARRAY = processTodo;
    console.log(TODO_ARRAY);
    //saveLocalStorage('todo', JSON.stringify(TODO_ARRAY));
  }

  /* 로컬스토리지 */
  function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function delLocalStorage(key, value) {
    if (key && value == null) {
      localStorage.removeItem(key);
    } else if (key && value != null) {
      localStorage.removeItem(key, value);
    } else if (key == null && value == null) {
      localStorage.clear();
    }
  }

  function init() {
    setBackground();

    getGreeting();
    $('#greeting_text').on('keydown', setGreeting);
    $('#greeting > div > button').on('click', removeGreeting);

    if (TODOLIST_ITEMS != null) {
      getTodo();
    }

    $(document).on('click', '#todo > li > button', delTodo);

    $('#todo_text').on('keydown', setTodo);
  }
  init();
});