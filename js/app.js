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
    },1000);
}


resetCard();

// 重置游戏
const restart = document.querySelector('.restart');

restart.addEventListener('click',refresh);

// 刷新页面函数
function refresh(){
    window.location.reload();
}

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
* 创建一个包含所有重置后卡片的数组
*/
const cardList = document.querySelectorAll('.card');
const deck = document.querySelector("#deck");
let cards = [].slice.call(cardList); 
let openCards = [];
let matchCards = [];
let moves = 0;    

deck.addEventListener('click',addEvent,true);

function addEvent(card){
    let event = card || window.event;
    let target = event.target || event.srcElement;
    if (target.nodeName === "LI") {
        if(target.classList.contains('open') === true) {
            target.removeEventListener('click',addEvent);
        }
        openCard(target);
    }
}
/*
* 每张卡牌设置一个事件监听器
*/
// for(let i = 0; i < cards.length ; i++){
//     cards[i].addEventListener('click',openCard);
// }

/*
* 显示卡片的符号
*/
function openCard(target){
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
    if(openCards.length  === 2) {
        // 检查卡牌时移除点击卡牌事件，检查
        deck.removeEventListener('click',addEvent,true);        
        if(target.innerHTML === openCards[0].innerHTML){
            /*
            * 如果卡片匹配，将卡片从openCards数组中移除,然后添加到matchCards数组中
            */
            openCards[0].classList.add('match');
            target.classList.add('match');
            matchCards.push(openCards[0]);
            matchCards.push(target)
            console.log(matchCards);
            setTimeout(function(){
                deck.addEventListener("click",addEvent,true);
                target.removeEventListener('click',addEvent);
                openCards[0].removeEventListener('click',addEvent);
                openCards.pop();
                openCards.pop();
            },999);
        } else {
            /*
            * 如果卡片不匹配，将卡片从openCards数组中移除并隐藏卡片的符号
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
        * 增加移动计数器并将其显示在页面上
        */
        move();
    }
    if(target.classList.contains('open') === true) {
        target.removeEventListener('click',addEvent);
    }
    if(matchCards.length === 16){
        /*
        * 如果所有卡都匹配，则显示带有最终分数的消息
        */
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
    const moveNum = document.querySelector('#moves');
    const stars = document.querySelector('#stars-number');


    complete.classList.remove('hide');

    // 重置游戏
    button.addEventListener('click',refresh);

    container.style.display = 'none';
    
    moveNum.innerHTML = moves;
    if(moves < 13) {
        stars.innerHTML = '3 Stars.';
    } else if (moves >= 13 && moves < 16) {
        stars.innerHTML = '2 Stars.';
    } else {
        stars.innerHTML = '1  Star.';
    }
}