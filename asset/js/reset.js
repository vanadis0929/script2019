  const resetTarget = document.querySelector('.btn_reset');

  /* 초기화 버튼*/
  function checkReset(event) {
    const isName = localStorage.getItem('name');
    const isTodo = localStorage.getItem('todo');
    const isWeather = localStorage.getItem('weather');
    const target = this;

    if (event !== undefined && event.type === 'click') {
      alert(`${target.text()}를 진행합니다.`);
      const delTarget = target.attr('id').split('reset_');
      //console.log(delTarget[1])
      delLocalStorage(delTarget[1]);

      if (delTarget[1] == 'name') {
        getGreeting();
      } else if (delTarget[1] == 'todo') {
        delTodo();
      } else if (delTarget[1] == 'weather') {
        delWeather();
      }
    }
  }


  window.addEventListener('load', checkReset);
  resetTarget.addEventListener('click', checkReset);