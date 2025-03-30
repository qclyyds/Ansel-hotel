// 动态添加AI助理浮动按钮到页面
document.addEventListener('DOMContentLoaded', function() {
    // 创建AI助理按钮元素
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
    
    // 添加样式到页面
    const style = document.createElement('style');
    style.textContent = `
        .ai-assistant-floating-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
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
    
    // 当前页面不是AI聊天页面时才添加浮动按钮
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'ai-chat.html') {
        document.head.appendChild(style);
        document.body.appendChild(aiAssistantBtn);
    }
}); 