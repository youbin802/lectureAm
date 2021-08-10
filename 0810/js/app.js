window.onload = function() {
    const log = console.log;
    
    let imgList= $(".slide-image");
    let current = 0;
    let isSlide = false;
    
    function slide(target, dir) {
        //타켓이 이미지 길이보다 크면 안됨. 그럼 더 이상 이미지가 없는 것.
        if(target >= $(".slide-image").length || target < 0 || isSlide) return;
        
        //슬라이드를 했다라는 것을 표시
        isSlide = true;
        
        
        //슬라이드 이미지 target번째 
        //ex) target = 1일때, 
        // 이미지 첫번째 꺼를 left 100해줌
        //dir 이 -1 이면 -100이 되므로 왼쪽으로 가는 것(그 말은 prev 버튼을 클릭한 것.)
        $(".slide-image")
        .eq(target)
        .css({"left": `${dir * 100}%` })
        .animate({"left":0},800);
        
        log(`current: ${current}, target : ${target}, dir : ${dir}`);
        //current는 현재 0일 때 이미지 0번째를 뒤로 넘기는 것임.
        $(".slide-image").eq(current).animate({"left":`${-100 * dir}%`},800, function() {
            //이미지 슬라이드 다시 돌리기 위해 false로 바꿈.
            isSlide = false;
        });
        
        //current를 타켓의 값을 주어 이전 값을 표시해야 함.
        current = target;
        
        //0)핀 액티브를 지움
        //1)현재 핀에 액티브에 추가함.    
        $(".pin").removeClass("active");
        $(".pin").eq(target).addClass('active');
    }

    imgList.css({"left":"100%"});
    imgList.eq(current).css({"left":0});

    $(".pin").on("click", function(){
        let idx = $(this).index();
        // log(idx,idx-current);
        slide(idx, idx-current < 0? -1:1);

        //0)핀 액티브를 지움
        //1)현재 핀에 액티브에 추가함. 
        $(".pin").removeClass("active");    
        $(".pin").eq(idx).addClass('active');
    });
    
    $(".slide-btn").on("click", function() {
        //버튼 -1 또는 1이 dir 값에 들어감
        let dir = $(this).data("dir") * 1;
        slide(current+dir ,dir);
    });
};