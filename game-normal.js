window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;
	let lastHoleNum = -1;


    startBtn.addEventListener('click', function () {
        showBtnAnimation();
        startGame();
    }, false);

	//给每个hole设置监听事件，监听单击
	for(let i = 0; i < holes.length; i++){
		holes[i].onclick = function(){	//监听单击事件
			if(this.classList.contains('up')){	//判断hole的class里是否包含'up'
				scoreBoard.innerHTML = ++score ;	//分数+1
				this.classList.remove('up');	//老鼠下洞
				lastHole = '';
			}
		};
	}
	
	
    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }


    function startGame() {
        // TODO: 写开始新游戏后发生的事
		let game = setInterval(function(){
			randomHole();
		}, 1100);	//老鼠出洞
		
		//结束
		setTimeout(function(){
			
			if('' != lastHole && undefined != lastHole){
				lastHole.classList.remove('up');	//最后一个地鼠下洞
			}
			clearInterval(game);	//关闭老鼠出洞
			alert('最终得分：' + score);	//alert最终得分
			titleH1.innerHTML = 'TIME UP!';	
			startBtn.innerHTML = 'Replay!';
			startBtn.style.display = '';	//显示Replay!按钮
		}, gameTime);
    }
	
	//老鼠随机出洞并在随机ms后进洞
	function randomHole(){
		
		let holeNum = Math.floor(Math.random() * 6);	//生成出洞编号
		
		//出洞编号与上次相同时重新生成
		while(lastHoleNum == holeNum){
			holeNum = Math.floor(Math.random() * 6);
		}
		
		lastHoleNum = holeNum;
		
		let hole = holes[holeNum];    //选洞
		
		laoshuAction(hole);	//触发老鼠动作
		
	}
	
	//老鼠动作
	function laoshuAction(hole){
		upHole(hole);
		downHole(hole);
	}
	
	//老鼠出洞
	function upHole(hole){
		lastHole = hole;
		hole.classList.add('up');
	}
	
	//老鼠进洞
	function downHole(hole){
		
		let downTime = 500 + Math.random() * 300;	//随机进洞时间
		
		setTimeout(function(){
			hole.classList.remove('up');
		}, downTime);
	}

};
