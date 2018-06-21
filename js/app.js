//洗牌并将卡牌添加到HTML
function resetCard(){
    /*
    * 创建一个包含所有卡片的数组
    */
    const cardList = document.querySelectorAll('.card');
    let cards = [].slice.call(cardList); 

    /*
    * 显示页面上的卡片 
    */
    cards.forEach(function(card){
        card.classList.add('open','show');
    });
    
    /*
    * 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
    */
    shuffle(cards);
    
    
    /*
    *  - 删除deck盒子里面的卡牌
    *  - 循环遍历每张卡片，创建其 HTML
    *  - 将每张卡的 HTML 添加到页面
    */
    const deck = document.querySelector('.deck');
    deck.innerHTML = '';
    
    for(let x = 0 ; x < cards.length ; x ++){
        const cardDiv = document.createElement('li');
        cardDiv.classList.add('card','open','show');
        cardDiv.innerHTML = cards[x].innerHTML;
        deck.appendChild(cardDiv);
    }
    
    /*
    *  - 3秒钟的记忆时间，然后盖上卡牌
    */
    setTimeout(function(){
        const cardList = document.querySelectorAll('.card');
        let cards = [].slice.call(cardList); 
        cards.forEach(function(card){
            card.classList.remove('open','show');
        });
        // 盖上卡牌同时启动计数器开始计时
        timedCount();    
    },3000);
}


resetCard();



// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* 创建一个包含已打开未配对的空数组、一个已配对的空数组
*/
const deck = document.querySelector("#deck");
let openCards = [];
let matchCards = [];
let moves = 0;    

/*
* 卡牌的同一个父元素设置一个事件监听器
*/
deck.addEventListener('click',addEvent,true);

function addEvent(card){
    let event = card || window.event;
    let target = event.target || event.srcElement;
    if (target.nodeName === "LI") {
        openCard(target);
    }
}

/*
* 显示卡片的符号
*/
function openCard(target){
    // 卡牌同时拥有‘open’，‘show’类时，不执行以下代码
    if(target.classList.contains('open','show') === true) {
        return;
    }
    target.classList.add('open','show');
    addOpen(target);
}

/*
* 将卡片添加到状态为 “open” 的 *数组* 中
*/
function addOpen(target){
    openCards.push(target);
    checkCard(target);    
}

/*
* 请检查卡片是否匹配
*/
function checkCard(target){
    // 当openCards数组有两对象时执行
    if(openCards.length  === 2) {
        // 检查卡牌时移除点击卡牌事件
        deck.removeEventListener('click',addEvent,true);        
        if(target.innerHTML === openCards[0].innerHTML){
            /*
            * 如果卡片匹配，将openCards数组清空,然后添加到matchCards数组中，同时添加卡牌点击事件
            */
            openCards[0].classList.add('match');
            target.classList.add('match');
            matchCards.push(openCards[0]);
            matchCards.push(target)
            setTimeout(function(){
                deck.addEventListener("click",addEvent,true);
                openCards.pop();
                openCards.pop();
            },999);
        } else {
            /*
            * 如果卡片不匹配，将openCards数组清空,并加卡牌点击事件
            */
            openCards[0].classList.add('fault');
            target.classList.add('fault');
            setTimeout(function(){
                openCards[0].classList.remove('show','open','fault');
                target.classList.remove('show','open','fault');
                openCards.pop();
                openCards.pop();
                deck.addEventListener("click",addEvent,true);
            },999);
        }
        /*
        * 每检查一次表示增加移动此时，计数器将其显示在页面上
        */
        move();
    }
    /*
    * 如果matchCards数组有16张牌，代表所有卡都匹配，则显示带有最终分数的消息
    */
    if(matchCards.length === 16){
        complete();
    }
}


/*
* 增加移动计数器并将其显示在页面上的函数
*/
function move(){
    moves++;
    let moveNum = document.querySelector('.moves');
    const stars = document.querySelector('.stars');
    const star = document.querySelector('.star');

    const li = document.createElement('li');

    li.innerHTML = '<i class="fa fa-star-o"></i>';


    moveNum.innerHTML = moves;
    if(moves === 13){
        stars.removeChild(star);
        stars.appendChild(li);
    } else if (moves === 16) {
        stars.removeChild(star);
        stars.appendChild(li);
    }
}

/*
* 如果所有卡都匹配，则显示带有最终分数的消息的函数
*/
function complete(){
    const complete = document.querySelector('#complete');
    const container = document.querySelector('.container');
    const button = document.querySelector('button');
    const stars = document.querySelector('#stars-number');
    const moveNum = document.querySelector('#moves');
    const timeOver = document.querySelector('#timeOver');
    
    complete.classList.remove('hide');

    // 游戏结束刷新页面
    button.addEventListener('click',function(){
        window.location.reload();
    });

    container.style.display = 'none';
    
    moveNum.innerHTML = moves;

    if(moves < 13) {
        stars.innerHTML = '3 Stars.';
    } else if (moves >= 13 && moves < 16) {
        stars.innerHTML = '2 Stars.';
    } else {
        stars.innerHTML = '1  Star.';
    }

    timeOver.innerHTML = time;
}

// 计时器
let time = 0;
let timeText = document.querySelector('#time');
let t;
//计时器函数
function timedCount(){
    timeText.innerHTML = time;
    time += 1;
    t=setTimeout("timedCount()",1000)
}


// 重置游戏
const restart = document.querySelector('.restart');
const moveNum = document.querySelector('.moves');
const star = document.querySelector('.stars');

restart.addEventListener('click',refresh);

// 重置游戏函数
function refresh(){
    
    //清除计时器
    clearTimeout(t);
    //重设步数，用时
    time = 0;
    moveNum.innerHTML = 0;
    timeText.innerHTML = 0;
    stars.innerHTML = '';
    //重设星星
    stars.innerHTML = '<li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li>';

    //重置卡牌
    resetCard();    
}