const guessInput = document.getElementById('guess_num')
const hint = document.querySelector('.hint')
const guessBtn = document.getElementById('guess_btn')
const restartBtn = document.getElementById('restart_btn')
const seeAnsBtn = document.getElementById('see_ans_btn')

let min, max, ans, guessNum;
let emoji = '🫣';
let emoji1 = '🎉🎉🎉';

// seeAnsBtn掛載alert(ans)
seeAnsBtn.addEventListener("click", function () {
    alert(`The anser is ${emoji} ${ans}`);
});

// 重新產生亂數
restartBtn.addEventListener("click", function () {
    numInAns();
});

// 只掛guess的function名稱，執行guess event
guessBtn.addEventListener("click", guess);


// 掛載還是要呼叫numInAns先執行產亂碼
window.onload = function () {
    numInAns();
}

function guess(event) {
    console.log(event);
    const inputNum = guessInput.value.trim();
    // 判斷是否輸入數字
    if (inputNum === '' || isNaN(inputNum) || inputNum[0] === '0') {
        alert('Please input a number')
        guessInput.value = '';
        return;
    }
    // 將字串轉為數字
    guessNum = parseInt(inputNum);

    // 判斷猜數字區間
    if (guessNum < min || guessNum > max) {
        showHint();
        guessInput.value = '';
        alert('Please input the limited range');
        return;
    }

    // 判斷是否猜對數字
    if (guessNum === ans) {
        alert(`congrates${emoji1}`);
        return;
    }
    // 猜數字小於答案
    else if (guessNum < ans) {
        // 最小值替換成猜數字
        min = guessNum;

    }
    else if (guessNum > ans) {
        max = guessNum;

    }
    guessInput.value = '';
    // 進入if執行 - return跳出方法，else if執行 - showHint();
    showHint();

}

function showHint() {
    hint.textContent = `Please input a number between ${min} ~ ${max}`
}

//ans取得亂數的運算結果 
function numInAns() {
    guessInput.value = '';
    min = 1;
    max = 100;
    ans = numGenerator();
    // hint div內提示
    showHint();

}



function numGenerator() {
    // 要使用return才會拿到結果
    return getRandomIntInclusive(min, max);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}