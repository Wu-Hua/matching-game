/*
 * 创建一个包含所有卡片的数组
 */


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

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
let open = [];
let bingo = [];
let matching = [];
let openIndex = 0;

for(let i = 0;i < cardList.length; i++){
    cardList[i].addEventListener('click',openCard);
}

function openCard(card){
    card.target.classList.add('open','show');
    addOpen(card);
}

function addOpen(card){
    open[openIndex] = card.target.innerHTML;
    console.log(openIndex);
    console.log(open);
    openIndex++;
    // inspection(card);    
    bingoFun(card);    
    mistake(card);
}

function mistake(card){
    for(let cards of open){
        if(cards !== card.target.innerHTML){
            open.splice(0,2);
            openIndex = 0;
            setTimeout(function(){
                for(let i = 0;i < cardList.length; i++){
                    cardList[i].classList.remove('open','show');
                }
            },1000);
        }
    }
}

// function inspection(card){
//     bingoFun(card);
// }

function bingoFun(card){
    for(let cards of open){
        if(cards === card.target.innerHTML){
            
            bingo.concat(open);
            console.log(bingo);
        }
    }
}

