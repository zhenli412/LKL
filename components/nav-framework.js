// 导航框架组件 - 用于统一管理所有页面的导航
function loadNavigation() {
    // 导航HTML结构 - 与index.html保持完全一致的结构和样式
    const navHTML = `
        <!-- 左侧导航菜单 -->
        <aside class="sidebar">
            <nav class="main-nav">
                <!-- 企业知识库 -->
                <div class="nav-item level-1">
                    <div class="nav-header">
                        <span class="nav-icon">📚</span>
                        <span class="nav-title">企业知识库</span>
                        <span class="expand-icon">▶</span>
                    </div>
                    <div class="nav-children">
                        <div class="nav-item level-2">
                            <span class="nav-icon">📂</span>
                            <span class="nav-title">自定义目录1</span>
                        </div>
                        <div class="nav-item level-2">
                            <span class="nav-icon">📂</span>
                            <span class="nav-title">自定义目录2</span>
                        </div>
                    </div>
                </div>

                <!-- 个人知识库 -->
                <div class="nav-item level-1">
                    <div class="nav-header">
                        <span class="nav-icon">📝</span>
                        <span class="nav-title">个人知识库</span>
                        <span class="expand-icon">▶</span>
                    </div>
                    <div class="nav-children">
                        <div class="nav-item level-2">
                            <span class="nav-icon">📋</span>
                            <span class="nav-title">选题库</span>
                        </div>
                        <div class="nav-item level-2">
                            <span class="nav-icon">📄</span>
                            <span class="nav-title">文案库</span>
                        </div>
                        <div class="nav-item level-2">
                            <span class="nav-icon">💾</span>
                            <span class="nav-title">备选库</span>
                        </div>
                        <div class="nav-item level-2">
                            <span class="nav-icon">📂</span>
                            <span class="nav-title">自定义目录1</span>
                        </div>
                    </div>
                </div>

                <!-- 营销获客部 -->
                <div class="nav-item level-1">
                    <div class="nav-header">
                        <span class="nav-icon">🚀</span>
                        <span class="nav-title">营销获客部</span>
                        <span class="expand-icon">▶</span>
                    </div>
                    <div class="nav-children">
                        <div class="nav-item level-2">
                            <div class="nav-header">
                                <span class="nav-icon">🎯</span>
                                <span class="nav-title">选题策划岗</span>
                                <span class="expand-icon">▶</span>
                            </div>
                            <div class="nav-children">
                                <a href="../marketing/info-extraction.html" class="nav-item level-3">
                                    <span class="nav-icon">🔍</span>
                                    <span class="nav-title">信息提取助手</span>
                                </a>
                                <a href="../marketing/copy-extraction.html" class="nav-item level-3">
                                    <span class="nav-icon">📄</span>
                                    <span class="nav-title">文案提取助手</span>
                                </a>
                                <a href="../marketing/structure-analysis.html" class="nav-item level-3">
                                    <span class="nav-icon">📊</span>
                                    <span class="nav-title">结构分析助手</span>
                                </a>
                                <a href="../marketing/topic-generation.html" class="nav-item level-3">
                                    <span class="nav-icon">💡</span>
                                    <span class="nav-title">违禁词检查助手</span>
                                </a>
                                <a href="../marketing/influencer-analysis.html" class="nav-item level-3">
                                    <span class="nav-icon">👥</span>
                                    <span class="nav-title">达人分析助手</span>
                                </a>
                                <a href="../marketing/copy-creation.html" class="nav-item level-3">
                                    <span class="nav-icon">✍️</span>
                                    <span class="nav-title">文案二创助手</span>
                                </a>
                            </div>
                        </div>
                        <div class="nav-item level-2">
                            <div class="nav-header">
                                <span class="nav-icon">✅</span>
                                <span class="nav-title">校审岗</span>
                                <span class="expand-icon">▶</span>
                            </div>
                            <div class="nav-children">
                                <a href="../marketing/keyword-check.html" class="nav-item level-3">
                                    <span class="nav-icon">🚫</span>
                                    <span class="nav-title">违禁词检查助手</span>
                                </a>
                            </div>
                        </div>
                        <div class="nav-item level-2">
                            <div class="nav-header">
                                <span class="nav-icon">🎬</span>
                                <span class="nav-title">视频剪辑岗</span>
                                <span class="expand-icon">▶</span>
                            </div>
                            <div class="nav-children">
                                <a href="../marketing/digital-human.html" class="nav-item level-3">
                                    <span class="nav-icon">👤</span>
                                    <span class="nav-title">数字人生成助手</span>
                                </a>
                                <a href="../marketing/video-mix.html" class="nav-item level-3">
                                    <span class="nav-icon">🎥</span>
                                    <span class="nav-title">视频混剪助手</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 品牌助手 -->
                <div class="nav-item level-1 active">
                    <div class="nav-header">
                        <span class="nav-icon">🏢</span>
                        <span class="nav-title">品牌助手</span>
                        <span class="expand-icon">▼</span>
                    </div>
                    <div class="nav-children">
                        <a href="../brand/brand-story.html" class="nav-item level-2 active">
                            <span class="nav-icon">📖</span>
                            <span class="nav-title">品牌助手</span>
                        </a>
                    </div>
                </div>
                
                <!-- 公司管理 -->
                <div class="nav-item level-1">
                    <div class="nav-header">
                        <span class="nav-icon">🏢</span>
                        <span class="nav-title">公司管理</span>
                        <span class="expand-icon">▶</span>
                    </div>
                    <div class="nav-children">
                        <div class="nav-item level-2">
                            <span class="nav-icon">👥</span>
                            <span class="nav-title">成员管理</span>
                        </div>
                        <div class="nav-item level-2">
                            <span class="nav-icon">⚙️</span>
                            <span class="nav-title">系统设置</span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>`;
    
    // 将导航HTML插入到页面中
    document.addEventListener('DOMContentLoaded', function() {
        // 尝试找到导航容器 - 支持多种选择器以兼容不同页面
        const navContainers = [
            document.getElementById('navigation-container'),
            document.querySelector('.nav-container'),
            document.querySelector('.sidebar-container')
        ];
        
        let navContainer = navContainers.find(container => container !== null);
        
        if (navContainer) {
            navContainer.innerHTML = navHTML;
            
            // 添加导航交互逻辑
            initNavInteraction();
        }
    });
}

// 初始化导航交互
function initNavInteraction() {
    // 处理导航展开/收起
    const navHeaders = document.querySelectorAll('.nav-header');
    navHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.closest('.nav-item');
            const childrenContainer = parent.querySelector('.nav-children');
            const expandIcon = this.querySelector('.expand-icon');
            
            if (childrenContainer) {
                // 切换显示状态
                const isExpanded = childrenContainer.style.display === 'block';
                childrenContainer.style.display = isExpanded ? 'none' : 'block';
                expandIcon.textContent = isExpanded ? '▶' : '▼';
                
                // 切换活动状态
                parent.classList.toggle('active', !isExpanded);
            }
        });
    });
    
    // 处理导航链接点击
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的活动状态
            navLinks.forEach(item => item.classList.remove('active'));
            // 添加当前链接的活动状态
            this.classList.add('active');
        });
    });
    
    // 高亮当前页面对应的导航项
    highlightCurrentPage();
}

// 高亮当前页面
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace('../', ''))) {
            // 高亮当前链接
            link.classList.add('active');
            
            // 展开父级菜单
            let parent = link.closest('.nav-item.level-2');
            if (parent) {
                parent.classList.add('active');
                parent.querySelector('.nav-children')?.style.display = 'block';
            }
            
            parent = link.closest('.nav-item.level-1');
            if (parent) {
                parent.classList.add('active');
                const childrenContainer = parent.querySelector('.nav-children');
                const expandIcon = parent.querySelector('.expand-icon');
                
                if (childrenContainer && expandIcon) {
                    childrenContainer.style.display = 'block';
                    expandIcon.textContent = '▼';
                }
            }
        }
    });
}

// 导出导航函数
loadNavigation();