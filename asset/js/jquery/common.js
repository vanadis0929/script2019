$(function(){

    function setBackground(){
        const IMGCOUNT = 7;
        const imgRdm = Math.floor(Math.random() * IMGCOUNT) + 1;
        $('#bg').html(`<img src="/asset/images/${imgRdm}.jpg" alt="" />`);   
        setTimeout(() => {
            $('#bg > img').addClass('complete');
        }, 200);     
    }


    function init() {
        setBackground();
    }
    init();

    
});


