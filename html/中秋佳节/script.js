function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新底部导航状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据页面ID激活对应导航项
    const navMap = {
        'home': 0,
        'activities': 1,
        'profile': 2
    };
    
    const activeNavIndex = navMap[pageId];
    if (activeNavIndex !== undefined && navItems[activeNavIndex]) {
        navItems[activeNavIndex].classList.add('active');
    }
}

// 为活动报名按钮添加交互效果
document.addEventListener('DOMContentLoaded', function() {
    const joinButtons = document.querySelectorAll('.join-btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 创建成功提示
            const originalText = this.textContent;
            this.textContent = '报名成功 ✓';
            this.style.background = '#27ae60';
            
            // 2秒后恢复原状
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 2000);
        });
    });
    
    // 为菜单项添加点击效果
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 创建点击反馈动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 模拟页面跳转效果
            const loadingToast = document.createElement('div');
            loadingToast.textContent = '功能开发中...';
            loadingToast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 9999;
                animation: fadeInOut 2s ease-in-out;
            `;
            
            document.body.appendChild(loadingToast);
            setTimeout(() => {
                document.body.removeChild(loadingToast);
            }, 2000);
        });
    });
    
    // 为功能卡片添加交互效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 200);
        });
    });
});

// 添加页面滚动时的视差效果
window.addEventListener('scroll', function() {
    const moon = document.querySelector('.moon');
    if (moon) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        moon.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
    }
});

// 添加触摸友好的交互体验
document.addEventListener('touchstart', function() {}, {passive: true});

// 模拟实时数据更新
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        // 模拟积分变化
        const pointsElement = statNumbers[2];
        if (pointsElement) {
            let currentPoints = parseInt(pointsElement.textContent);
            // 随机增加1-5积分
            const increase = Math.floor(Math.random() * 5) + 1;
            pointsElement.textContent = currentPoints + increase;
        }
    }
}

// 每30秒更新一次统计数据
setInterval(updateStats, 30000);

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const navItems = document.querySelectorAll('.nav-item');
        const activeNav = document.querySelector('.nav-item.active');
        let currentIndex = 0;
        
        navItems.forEach((item, index) => {
            if (item === activeNav) {
                currentIndex = index;
            }
        });
        
        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
        } else {
            newIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
        }
        
        const pageMap = ['home', 'activities', 'profile'];
        showPage(pageMap[newIndex]);
    }
});