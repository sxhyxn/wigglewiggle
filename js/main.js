/* prevent */
$(function(){
    $('a:not(.not)').on("click",function(e){
        e.preventDefault();
    });
});

/* cookie */
let currentCookie = document.cookie;
let cookieCheck = currentCookie.indexOf("wiggle");
console.log(cookieCheck);

if (cookieCheck > -1) {
  document.querySelector(".notice").style.display = "none";
} else {
  document.querySelector(".notice").style.display = "block";
}

document.querySelector(".close").addEventListener("click", function () {
  console.log(this);
  const isCheckboxChecked = document.querySelector("#cb").checked;
  if (isCheckboxChecked) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let setCookie = "CookieName=wiggle;";
    setCookie += "expires=" + date.toUTCString();

    document.cookie = setCookie;
  }
  this.parentElement.style.display = "none";
});





//top

let mainMenu = document.querySelectorAll('.main>li'),
nav = document.querySelector('.gnb');

//mainMenu.forEach(function(item){})  
//  -> mainMenu의 item 각각의 할 일  /item은 요소 각각을 의미
mainMenu.forEach((item)=>{
    item.addEventListener('mouseover',function(){
        let submenuHeight = this.querySelector('.sub').offsetHeight;
        console.log(submenuHeight)
        nav.style.height = `${submenuHeight + 70}px`
    });
    item.addEventListener('mouseout',function(){
        nav.style.height=`70px`
    })
})

let myFunction;


/* myFunction =function(){
    console.log("실행")
}   */

let navbar=document.getElementById('navbar');
//.offsetTop -> 내 영역위의 공간의 높이값
let sticky=navbar.offsetTop;
console.log("sticky",sticky);
myFunction =()=>{
    if(window.pageYOffset>=sticky){
        navbar.classList.add('sticky')
    }else{
        navbar.classList.remove('sticky')
    }
}

/////////////////////////////
window.onscroll=myFunction;
/* function myFunction(){
    console.log("실행")
} */

//
const mask = document.querySelector(".mask");

document.body.addEventListener("mousemove", e => {
  const x = e.clientX;
  const y = e.clientY - 120;
  gsap.to(mask, {
    y: y
  });
  gsap.to(".menu-mask", {
    y: -y
  });
});



//sec2
$('.animate').scrolla({
    // default
    mobile: false, // disable animation on mobiles
    once: false, // only once animation play on scroll
    animateCssVersion: 4 // used animate.css version (3 or 4)
});


let button= $('button');
let contentWrap= $('.contentWrap');
let imgArr= $('img');
let divArr= $('.desc');
let pageNum = 0;
let totalNum= 0;


totalNum = contentWrap.length; 
//length => contentWrap의 총갯수를알수 있음
//console.log(totalNum);//3

pageSetFunc();

$('.btn1').click(function(){
    preFunc();
});
$('.btn2').click(function(){
    nextFunc();
});



function preFunc(){//210210
    if(pageNum>0){
       pageNum --;
    }else{
       pageNum =totalNum - 1;
    }
    pageSetFunc();
}

function nextFunc(){//012012
    if(pageNum<totalNum - 1){
            pageNum ++;
    }else{
            pageNum = 0;
    }
    pageSetFunc();
}


function pageSetFunc(){
    imgArr.removeClass('active');
    divArr.removeClass('active');
    contentWrap.eq(pageNum).find('img').addClass('active');
    contentWrap.eq(pageNum).find('.desc').addClass('active');
}


//wgheart


const colors = ["#e03776","#8f3e98","#4687bf","#3bab6f","#f9c25e","#f47274"];
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let heartsRy = []

function useTheHeart(n){
  let use = document.createElementNS(SVG_NS, 'use');
  use.n = n;
  use.setAttributeNS(SVG_XLINK, 'xlink:href', '#heart');
  use.setAttributeNS(null, 'transform', `scale(${use.n})`);
  use.setAttributeNS(null, 'fill', colors[n%colors.length]);
  use.setAttributeNS(null, 'x', -69);
  use.setAttributeNS(null, 'y', -69);
  use.setAttributeNS(null, 'width', 138);
  use.setAttributeNS(null, 'height', 138);
  
  heartsRy.push(use)
  hearts.appendChild(use);
}

for(let n = 18; n >= 0; n--){useTheHeart(n)}

function Frame(){
  window.requestAnimationFrame(Frame);
  for(let i = 0; i < heartsRy.length; i++){
    if(heartsRy[i].n < 18){heartsRy[i].n +=.01
     }else{
     heartsRy[i].n = 0;
     hearts.appendChild(heartsRy[i])
    }
    heartsRy[i].setAttributeNS(null, 'transform', `scale(${heartsRy[i].n})`);
  }
}

Frame()



//pano
let panoWrap = document.querySelector('.panorama .pano_wrap');
let listWrap = panoWrap.querySelector('.list');
let item = listWrap.children;
//console.log(item);
let listClone = null;
let itemWidth = item[0].offsetWidth; //이미지 하나의 넓이
let itemLength = item.length; //아이템의 갯수 -> 10개
let listWidth = itemWidth * itemLength; //400 x 10 = 4000px
let move = 0;
//let controls = panoWrap.parentElement.querySelector('.controls');
//같은 뜻
let controls = document.querySelector('.panorama .controls');
let timer;



let init = function(){
    panoWrap.style.width = listWidth*2 +'px';  //8000
    listWrap.style.width = listWidth+'px';  //4000
    panoWrap.appendChild(listWrap.cloneNode(true));
    //listWrap을 복사(cloneNode)하되 자식까지 포함(true)하여 복사한다.
    listClone = panoWrap.children;
    //console.log(listClone)
    render();
    add();
    event();
}

let render =function(){
    move += 1;
    //유사배열을 배열로 바꾸기
    //console.log(Array.from(listClone))
    Array.from(listClone).forEach(function(clone){
        clone.style.transform = `translateX(${-move}px)`
    })

    timer=window.requestAnimationFrame(render)
}

let add = function(){
    setInterval(function(){
        panoWrap.appendChild(listWrap.cloneNode(true));
        listClone = panoWrap.children;
    },10000);
}

let event = function(){
    controls.querySelector('.play_on').addEventListener('click',function(e){
        e.preventDefault();
        //console.log(this)
        if(this.classList.contains('active')){
            this.classList.remove('active')
            window.cancelAnimationFrame(timer)
        }else{
            this.classList.add('active')
            render()
        }
    })
}

window.addEventListener('load',function(){
    init()
})





//sec4
let scrollBody = document.querySelector('.fix_motion'),
    scrollHeight, //스크롤의 높이
    sectionOffsetTop, //스티키 시작전 영역 높이값
    sectionScrollTop,
    scrollRealHeight, //실제로 스크롤해야할 높이
    windowScrollTop, //스크롤바의 높이를 담을 변수
    scrollPercent, //스크롤 백분율 값
    percent;

let isMobile;
function scrollFuc(){
    setProperty();
    if(isMobile){
        contentInMobile();
    }else{
        contentIn();
    }
}

function setProperty(){
    isMobile = window.innerWidth<=1024?true:false;

    scrollHeight = scrollBody.offsetHeight;
    //.fix_motion의 높이값
    sectionOffsetTop = scrollBody.offsetTop;
    //문서에서 .fix_motion의 위까지의 높이값
    scrollRealHeight = scrollHeight - window.innerHeight;
    windowScrollTop = pageYOffset;
    sectionScrollTop = windowScrollTop - sectionOffsetTop;
    scrollPercent = sectionScrollTop / scrollRealHeight;
    //console.log(scrollPercent)
    percent = scrollPercent*100
    console.log(percent)

}

function contentIn(){
    let deviceImg = document.querySelectorAll('.slide figure');
    let imgWidth = deviceImg[0].offsetWidth; //이미지 하나의 넚이값

    document.querySelector('.text_box p.text01').classList.remove('active');
    document.querySelector('.text_box p.text02').classList.remove('active');
    document.querySelector('.text_box p.text03').classList.remove('active');
    document.querySelector('.text_box p.text04').classList.remove('active');
    document.querySelector('.text_box p.text05').classList.remove('active');
    document.querySelector('.text_box p.text06').classList.remove('active');

    if(percent>=3 && percent<19){
        document.querySelector('.text_box p.text01').classList.add('active');
        imageChange(imgWidth*0)
    }
    if(percent>=19  && percent<32){
        document.querySelector('.text_box p.text02').classList.add('active');
        imageChange(imgWidth*1)
    }
    if(percent>=32  && percent<48){
        document.querySelector('.text_box p.text03').classList.add('active');
        imageChange(imgWidth*2)
    }
    if(percent>=48  && percent<66){
        document.querySelector('.text_box p.text04').classList.add('active');
        imageChange(imgWidth*3)
    }
    if(percent>=66  && percent<87){
        document.querySelector('.text_box p.text05').classList.add('active');
        imageChange(imgWidth*4)
    }
    if(percent>=87){
        document.querySelector('.text_box p.text06').classList.add('active');
        imageChange(imgWidth*5)
    }

    if(percent<3){
        document.querySelector('.text_box p.text01').classList.remove('active');
        document.querySelector('.text_box p.text02').classList.remove('active');
        document.querySelector('.text_box p.text03').classList.remove('active');
        document.querySelector('.text_box p.text04').classList.remove('active');
        document.querySelector('.text_box p.text05').classList.remove('active');
        document.querySelector('.text_box p.text06').classList.remove('active');
    }
}


function imageChange(moveX){
    let img = document.querySelector('.slide_wrap .slide');
    img.style.transform = `translateX(${-moveX}px)`;
}

window.addEventListener('scroll',function(){
    scrollFuc();
})

window.addEventListener('resize',function(){
    scrollFuc();
})

scrollFuc();


//sec6
window.addEventListener('mousemove',function(e){
    document.querySelector('#slidephoto').style.top=`${e.clientY}px`;
    document.querySelector('#slidephoto').style.left=`${e.clientX}px`;
    document.querySelector('#slidephoto').style.transform=`translate(${-e.clientX * 0.2}px,${-e.clientY * 0.2}px)`;
})


document.querySelector('#soon').addEventListener('mousemove',function(){
    document.querySelector('#slidephotos').style.marginTop="0%"
    document.querySelector('#soon h1').style.color="#222"
})
document.querySelector('#soon').addEventListener('mouseleave',function(){
    document.querySelector('#soon h1').style.color="transparent";
})



document.querySelector('#zone').addEventListener('mousemove',function(){
    document.querySelector('#slidephotos').style.marginTop="-125%"
    document.querySelector('#zone h1').style.color="#222"
})
document.querySelector('#zone').addEventListener('mouseleave',function(){
    document.querySelector('#zone h1').style.color="transparent";
})



document.querySelector('#game').addEventListener('mousemove',function(){
    document.querySelector('#slidephotos').style.marginTop="-250%"
    document.querySelector('#game h1').style.color="#222"
})
document.querySelector('#game').addEventListener('mouseleave',function(){
    document.querySelector('#game h1').style.color="transparent";
})



document.querySelector('#shop').addEventListener('mousemove',function(){
    document.querySelector('#slidephotos').style.marginTop="-375%"
    document.querySelector('#shop h1').style.color="#222"
})
document.querySelector('#shop').addEventListener('mouseleave',function(){
    document.querySelector('#shop h1').style.color="transparent";
})




document.querySelector('#event_txt').addEventListener('mousemove',function(){
    document.querySelector('#slidephoto').style.display="initial"
    document.querySelector('#slidephoto').style.opacity=1;
})

document.querySelector('#event_txt').addEventListener('mouseleave',function(){
    document.querySelector('#slidephoto').style.display="none"
    document.querySelector('#slidephoto').style.opacity=0;
})



//upBtn
let scrollup=()=>{
    let scrollup=document.getElementById('upBtn');
    pageYOffset>=550?
    scrollup.classList.add('scrollup')
     : 
    scrollup.classList.remove('scrollup');
    /* pageYOffset>=350? true값:false 값 */
}

window.addEventListener("scroll",scrollup);
