$(function () {
  let TODO_ARRAY = [];
  let WEATHER_ARRAY = [];
  const TODOLIST_ITEMS = JSON.parse(localStorage.getItem('todo'));
  const WEATHER_API_KEY = '3f9404e51a676528522e910eefbc4158';

  /* 배경 */
  function setBackground() {
    const IMGCOUNT = 7;
    const imgRdm = Math.floor(Math.random() * IMGCOUNT) + 1;
    $('#bg').html(`<img src='/asset/images/${imgRdm}.jpg' alt='' />`);
    setTimeout(() => {
      $('#bg > img').addClass('complete');
    }, 200);
  }


  /* 초기화 버튼*/
  function checkReset(event) {
    const isName = localStorage.getItem('name');
    const isTodo = localStorage.getItem('todo');
    const target = $(this);

    if (event !== undefined && event.type === 'click') {
      alert(`${target.text()}를 진행합니다.`);
      const delTarget = target.attr('id').split('reset_');
      //console.log(delTarget[1])
      delLocalStorage(delTarget[1]);

      if (delTarget[1] == 'name') {
        getGreeting();
      } else if (delTarget[1] == 'todo') {
        delTodo();
      }


    }

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
      $('#reset_name').show();
    } else {
      $('#greeting').removeClass('apply');
      $('#reset_name').hide();
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

        $('#todo').append(
          `<li id="${TODO_JSON.id}">${
            TODO_JSON.title
          } <button type="button">✂️</button></li>`
        );
        TODO_ARRAY.push(TODO_JSON);
        //console.log(TODO_ARRAY);
        saveTodo();
        TODO_ARRAY.length > 0 ? $('#reset_todo').show() : $('#reset_todo').hide();
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
      $('#todo > li').length > 0 ? $('#reset_todo').show() : $('#reset_todo').hide();
    }
  }

  function delTodo() {
    const LIST_ARRAY = $('#todo > li');

    function allRemoveTodo() {
      LIST_ARRAY.parent().empty();
      delLocalStorage('todo');
      $('#reset_todo').hide();
    };

    if ($(this).is('#reset_todo')) {
      allRemoveTodo()
    } else {
      $(this).parent().removeAttr('id').hide();

      const processTodo = $.grep(TODOLIST_ITEMS, function (result, i) {
        return (LIST_ARRAY.eq(i).attr('id') !== TODOLIST_ITEMS[i].id);
      }, true);

      TODO_ARRAY = processTodo;
      //console.log(TODO_ARRAY);
      if (TODO_ARRAY.length <= 0) {
        allRemoveTodo();
      }
      saveTodo();
      checkReset();
    }
  }

  /* 날씨 관련 */

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function getCoords(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //console.log(`Latitude: ${lat} \n Longitude: + ${long}`);

    WEATHER_ARRAY = {
      latitude: latitude,
      longitude: longitude
    }
    if (WEATHER_ARRAY != null) {
      saveLocalStorage('weather', JSON.stringify(WEATHER_ARRAY));
      getWeather(latitude, longitude);
    }
  }


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }

  function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`).then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      const temp = json.main.temp;
      const place = json.name;
      const humidity = json.main.humidity;
      const weatherStatus = json.weather[0].main;
      $('#weather').text(`기온: ${temp}C° / 지역: ${place} / 날씨 = ${weatherStatus} / 습도: ${humidity}%`);

    });



  };
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
    checkReset();
    $('.btn_reset').on('click', checkReset);

    getGreeting();
    $('#greeting_text').on('keydown', setGreeting);


    if (TODOLIST_ITEMS != null) {
      getTodo();
    }
    $(document).on('click', '#todo > li > button, #reset_todo', delTodo);
    $('#todo_text').on('keydown', setTodo);


    getLocation();
  }
  init();
});