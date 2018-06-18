
function resetCard(){
    /*
    * 创建一个包含所有卡片的数组
    */
    const cardList = document.querySelectorAll('.card');
    const cards = [].slice.call(cardList); 
    /*
    * 显示页面上的卡片
    *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
    *   - 循环遍历每张卡片，创建其 HTML
    *   - 将每张卡的 HTML 添加到页面
    */

    cards.forEach(function(card){
        card.classList.add('open','show');
    });
    
    shuffle(cards);
    
    
    const deck = document.querySelector('.deck');
    deck.innerHTML = '';
    
    for(let x = 0 ; x < cards.length ; x ++){
        const cardDiv = document.createElement('li');
        cardDiv.classList.add('card','open','show');
        cardDiv.innerHTML = cards[x].innerHTML;
        deck.appendChild(cardDiv);
    }

    close();
}

function close(){
    setTimeout(function(){
        cards.forEach(function(card){
            card.classList.remove('open','show');
        });
    },1000);
}


resetCard();

const restart = document.querySelector('.restart');

restart.addEventListener('click',resetCard);




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
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */


const cardList = document.querySelectorAll('.card');
const cards = [].slice.call(cardList); 

console.log(cardList);
console.log(cards);

document.querySelectorAll('.card').addEventListener('click', function (evt) {
    console.log('A span was clicked with text ' + evt.target.textContent);
});