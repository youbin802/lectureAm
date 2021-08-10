window.onload = function() {
    const log = console.log;
    
    let imgList= $(".slide-image");
    let current = 0;
    let isSlide = false;
    let interval = false;

    setInterval(function() {
        interval = true;
        slide(current+1,1);
    },5000);

    function slide(target, dir) {
        if(target >= $(".slide-image").length) target = 0;
        if(target < 0) target=6;
        if(isSlide) return;

        isSlide = true;
        
        $(".slide-image")
        .eq(target)
        .css({"left": `${dir * 100}%` })
        .animate({"left":0},800);
        
        $(".slide-image").eq(current).animate({"left":`${-100 * dir}%`},800, function() {
            isSlide = false;
        });
        
        interval=false;
        current = target;
        $(".pin").removeClass("active");    
        $(".pin").eq(target).addClass('active');
    }

    imgList.css({"left":"100%"});
    imgList.eq(current).css({"left":0});

    $(".pin").on("click", function(){
        if(interval) return;
        let idx = $(this).index();
        slide(idx, idx-current < 0? -1:1);

        $(".pin").removeClass("active");    
        $(".pin").eq(idx).addClass('active');
    });

    $(".slide-btn").on("click", function() {
        if(interval) return;
        let dir = $(this).data("dir") * 1;
        slide(current+dir ,dir);
    });
};