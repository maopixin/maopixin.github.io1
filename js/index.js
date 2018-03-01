//绝对居中
$('.txt').each((i, e) => {
    
    $(e).css('left', ($(window).width() - e.offsetWidth) / 2 + 'px');
})
// 开场动画
$('#text').animate({
    bottom: '-60px',
    opacity: '1'
}, 800);
$('#text2').animate({
    top: '-60px',
    opacity: '1'
}, 800, '', function () {
    $('#text3').animate({
        top: "260px",
        opacity: "1"
    }, 800)
});

//获取数据
$.ajax({
    type: "GET",
    url: "http://39.106.20.194/phpcms/api.php",
    data: "op=autoload&modelid=1&catid=" + 27 + "&pagesize=60&page=" + 1 + "",
    async: true,
    jsonp: "callback",
    jsonpCallback: "fn",
    dataType: "jsonp",
    success: function (data) {
        $('#item-box').empty();
        data = JSON.parse(JSON.stringify(data));
        $.each(data, function (i, e) {
            var li = $('<li class="fl"><img src="' + e.thumb + '" alt=""><span class="work-name">' + e.title + '</span><span class="work-synopsis">'+e.description+'</span></li>');
            $(li[0]).click(function(){
                window.open('http://'+e.url);
            })
            $('#item-box').append(li);
        });
        // addTools();
    }
});

// centerEle(document.getElementById('jump'))

//body 点击后 进入主页面 并删除遮罩层
$('body').click(function () {

    $('#top').animate({
        top: '-50%'
    }, 800);
    $('#bottom').animate({
        bottom: '-50%'
    }, 800, '', function () {
        $('#shade').remove();
    });
    setTimeout(function () {
        // 高度居中
        $("#case").css({
            top: ($(window).height() - $("#case").outerHeight()) / 2
        });

        $(window).resize(function () {
            $("#case").css({
                top: ($(window).height() - $("#case").outerHeight()) / 2
            });
        });

        // 动画效果

        $("#case").animate({
                left: '120px',
                opacity: '1'
            },
            800, '',
            function () {
                //鼠标滚动效果
                wheel(
                    document.body,
                    () => {
                        if (document.getElementById('case').offsetLeft < 120) {
                            $('#case').css(
                                "left",
                                function (index, value) {
                                    return parseFloat(value) + 70;
                                }
                            )
                        }
                    },
                    () => {
                        if ((document.getElementById('case').offsetLeft * -1) < 3380) {
                            $('#case').css(
                                "left",
                                function (index, value) {
                                    return parseFloat(value) - 70;
                                }
                            )
                        }
                    }
                )
            }
        );
    }, 300);
    $('body').off('click');
})

//按钮渐变色

$('#ex-button').mouseover(function () {
    
    $('#ex-button').animate({
        backgroundColor: '#a6c1ee',
        color: '#fff'
    }, 200)
});
$('.exercise .button').mouseout(function () {
    $('.exercise .button').animate({
        backgroundColor: 'rgba(255,255,255,0)',
        color: "#a6c1ee"
    }, 200)
})

//按钮点击 渲染数据
$('#ex-button').click(function () {
    $('#jump').css('display', 'block');
    // $('#item-box').mCustomScrollbar({
    //     theme:"dark"
    // })
    centerEle(document.getElementById('jump'));
    
    $('#jump').animate({
        opacity: '1',
        top: '100px',
        bottom: "100px"
    })
});
$('#cancel').click(function () {
    $('#jump').animate({
        'top': '150px',
        'bottom': '50px',
        'opacity': '0'
    },500,'',function(){
        $('#jump').css('display', 'none') 
    });
})

//阻止冒泡
wheel(
    document.getElementById('jump'),
    function (e) {
        e.stopPropagation;
        e.cancelBubble = true;
    },
    function (e) {
        e.stopPropagation;
        e.cancelBubble = true;
    }
);



