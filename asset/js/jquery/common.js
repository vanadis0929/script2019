$(function () {
    function setBackground() {
        const IMGCOUNT = 7;
        const imgRdm = Math.floor(Math.random() * IMGCOUNT) + 1;
        $('#bg').html("<img src='/asset/images/" + imgRdm + ".jpg' alt='' />");
        setTimeout(function () {
            $('#bg > img').addClass('complete');
        }, 200);
    }

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
        delLocalStorge('name');
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

    function saveLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function delLocalStorge(key, value) {
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
    }
    init();
});