window.addEventListener('load', function() {
	// 1.获取元素
	var focus = document.querySelector('.focus');
	var arrow_l = document.querySelector('.arrow_l');
	var arrow_r = document.querySelector('.arrow_r');
	var focusWidth = focus.offsetWidth;
	//2.鼠标经过就显示两侧按钮
	focus.addEventListener('mouseenter', function() {
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		clearInterval(timer); //清楚定时器
		timer = null;
	})
	focus.addEventListener('mouseleave', function() {
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
		timer = setInterval(function() {
			//手动调用点击事件
			arrow_r.click();
		}, 3000);
	})
	//3.动态生成小圆圈
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('.circle');
	for (var i = 0; i < ul.children.length; i++) {
		//创建一个li
		var li = document.createElement('li');
		//记录当前小圆圈的索引号 通过自定义属性来做
		li.setAttribute('index', i);
		//把小li插入到ol里面
		ol.appendChild(li);
		//4.小圆圈的排他思想
		li.addEventListener('mouseover', function() {
			for (var i = 0; i < ol.children.length; i++) {
				//干掉所有人
				ol.children[i].className = '';
			}
			//留下自己
			this.className = 'current';
			//5.点击小圆圈,移动图片 当然移动的是ul
			//ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负数
			//当我们点击了某个小li 就拿到当前小li的索引号
			var index = this.getAttribute('index');
			//当我们点击了某个小li 就要吧这个li的索引号给num
			num = index;
			//当我们点击了某个小li 就要吧这个li的索引号给circle
			circle = index;
			animate(ul, -index * focusWidth);
		})
	}
	ol.children[0].className = 'current';
	//6.克隆第一张图li放到ul最后面
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	//7.点击右侧按钮,图片滚动一张
	var num = 0;
	var circle = 0;
	//右侧按钮
	var flag = true;
	arrow_r.addEventListener('click', function() {
		if (flag) {
			flag = false;//关闭节流阀
			//如果走到了最后一张图片,此时 我们的ul 要快速复原 left改为0
			if (num == ul.children.length - 1) {
				ul.style.left = 0;
				num = 0;
			}
			num++;
			animate(ul, -num * focusWidth,function(){
				flag = true;//开启节流阀
			});
			//8.点击右侧按钮,小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
			circle++;
			//如果circle == 4 说明走到最后我们克隆这张图片了 我们就复原
			if (circle == ol.children.length) {
				circle = 0;
			}

			circleChange(); //调用函数
		}
	});

	//左侧按钮
	arrow_l.addEventListener('click', function() {
		//如果走到了第一张图片,此时 我们的ul 要快速复原 left改为(ul.children.length-1)*focusWidth
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -num * focusWidth + 'px';

		}
		num--;
		animate(ul, -num * focusWidth);
		//8.点击右侧按钮,小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
		circle--;
		//如果circle < 0 说明第一张图片,则小圆圈要改为第4个小圆圈(3)
		// if (circle < 0) {
		// 	circle = ol.children.length - 1;
		// }
		circle = circle < 0 ? ol.children.length - 1 : circle;
		circleChange();
	});

	function circleChange() {
		//先清除小圆圈的current类名
		for (i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		//留下当前小圆圈的current类名
		ol.children[circle].className = 'current';
	}
	//10.自动播放轮播图
	var timer = setInterval(function() {
		//手动调用事件
		arrow_r.click();
	}, 2000);
});
