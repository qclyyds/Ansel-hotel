// 更新状态栏时间
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 确保分钟数是两位数
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
    // 更新所有状态栏中的时间
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(element => {
        element.textContent = `${hours}:${minutes}`;
    });
}

// 在页面加载时更新时间，并每分钟更新一次
document.addEventListener('DOMContentLoaded', function() {
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
    
    // 激活当前标签页
    activateCurrentTab();
});

// 根据当前页面激活对应的底部导航项
function activateCurrentTab() {
    const currentPage = window.location.pathname.split('/').pop();
    
    let tabToActivate = 'home';
    
    if (currentPage.includes('home')) {
        tabToActivate = 'home';
    } else if (currentPage.includes('rooms') || currentPage.includes('room-detail') || currentPage.includes('booking')) {
        tabToActivate = 'rooms';
    } else if (currentPage.includes('order')) {
        tabToActivate = 'orders';
    } else if (currentPage.includes('member') || currentPage.includes('ai-chat')) {
        tabToActivate = 'member';
    } else if (currentPage.includes('about') || currentPage.includes('contact')) {
        tabToActivate = 'more';
    }
    
    // 移除所有active类
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 添加active类到当前标签
    const activeTab = document.getElementById(`tab-${tabToActivate}`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// 处理页面切换
function navigateTo(page) {
    window.location.href = page;
}

// 处理返回按钮
function goBack() {
    window.history.back();
}

// 动态加载AI助理脚本
(function loadAiAssistant() {
    // 提前创建基本样式，避免脚本加载延迟导致样式应用延迟
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
        .ai-assistant-floating-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background: linear-gradient(135deg, #AA8453, #8A6D42);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            cursor: pointer;
            font-size: 20px;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .ai-assistant-floating-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(170, 132, 83, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(170, 132, 83, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(170, 132, 83, 0);
            }
        }
    `;
    document.head.appendChild(baseStyle);
    
    // 直接创建AI助理按钮而不是依赖外部脚本
    const aiAssistantBtn = document.createElement('div');
    aiAssistantBtn.className = 'ai-assistant-floating-btn';
    aiAssistantBtn.innerHTML = '<i class="fas fa-robot"></i>';
    aiAssistantBtn.onclick = function() {
        // 处理相对路径问题
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        
        if (isInPagesDir) {
            navigateTo('ai-chat.html');
        } else {
            navigateTo('pages/ai-chat.html');
        }
    };
    
    // 当前页面不是AI聊天页面时才添加浮动按钮
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'ai-chat.html') {
        // 确保在DOM完全加载后添加按钮
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(aiAssistantBtn);
            });
        } else {
            document.body.appendChild(aiAssistantBtn);
        }
    }
})(); 