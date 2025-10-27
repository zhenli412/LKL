// 统一导航组件加载函数

/**
 * 统一导航加载入口函数
 * @param {string} basePath - 基础路径，相对于当前页面到根目录的路径
 * @param {string} activeRole - 当前激活的角色（front/company/admin等）
 * @param {string} currentPath - 当前页面的路径，用于高亮对应的导航项
 */
function loadNavigation(basePath = '', activeRole = 'front', currentPath = '') {
    // 确保basePath格式正确
    if (basePath && !basePath.endsWith('/')) {
        basePath += '/';
    }
    
    // 先加载顶部导航
    loadTopNavigation(basePath, activeRole)
        .then(() => {
            // 再加载左侧导航
            return loadSideNavigation(basePath, activeRole);
        })
        .then(() => {
            // 初始化导航交互
            initNavigationInteractions();
            
            // 初始化角色切换器
            if (typeof initRoleSwitcher === 'function') {
                initRoleSwitcher();
            } else {
                // 如果initRoleSwitcher未定义，我们需要手动实现角色切换功能
                initRoleSwitcherManual();
            }
            
            // 如果提供了当前页面路径，则高亮对应的导航项
            if (currentPath) {
                highlightCurrentNavigationItem(currentPath);
            }
        })
        .catch(error => {
            console.error('加载导航组件失败:', error);
        });
}

/**
 * 根据当前页面路径高亮对应的导航项
 * @param {string} currentPath - 当前页面的路径
 */
function highlightCurrentNavigationItem(currentPath) {
    // 移除所有导航项的活跃状态
    const allNavLinks = document.querySelectorAll('.nav-item a');
    allNavLinks.forEach(link => {
        link.closest('.nav-item').classList.remove('active');
    });
    
    // 查找并高亮匹配当前路径的导航项
    allNavLinks.forEach(link => {
        // 获取链接的href属性
        const href = link.getAttribute('href');
        
        // 检查href是否包含当前路径
        if (href && (href === currentPath || href.endsWith('/' + currentPath) || href.includes('/' + currentPath + '?') || href.includes('/' + currentPath + '#'))) {
            const navItem = link.closest('.nav-item');
            navItem.classList.add('active');
            
            // 确保父级菜单是展开状态
            let parent = navItem.parentElement.closest('.nav-item');
            while (parent) {
                parent.classList.add('expanded');
                parent = parent.parentElement.closest('.nav-item');
            }
        }
    });
}

/**
 * 手动实现角色切换器 - 与menu.js保持一致的功能
 */
function initRoleSwitcherManual() {
    const roleBtns = document.querySelectorAll('.role-btn');
    
    if (roleBtns.length > 0) {
        roleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的活跃状态
                roleBtns.forEach(b => b.classList.remove('active'));
                
                // 添加当前按钮的活跃状态
                this.classList.add('active');
                
                // 获取角色类型
                const role = this.id.replace('role-', '');
                
                // 更新body类名以控制菜单显示
                updateBodyClassByRole(role);
                
                // 重置所有菜单的展开状态
                const allNavItems = document.querySelectorAll('.nav-item');
                allNavItems.forEach(item => item.classList.remove('expanded'));
                
                // 根据角色更新内容
                updateContentByRoleManual(role);
                
                // 根据角色自动展开菜单
                autoExpandMenusByRole(role);
            });
        });
    }
}

/**
 * 更新body类名根据角色
 */
function updateBodyClassByRole(role) {
    document.body.className = '';
    if (role === 'company') {
        document.body.classList.add('company-role');
    } else if (role === 'admin') {
        document.body.classList.add('admin-role');
    } else if (role === 'knowledge') {
        document.body.classList.add('knowledge-role');
    } else if (role === 'personal') {
        document.body.classList.add('personal-role');
    }
}

/**
 * 手动实现根据角色更新内容
 */
function updateContentByRoleManual(role) {
    // 根据不同角色加载不同的内容或更新页面显示
    console.log(`切换到${role}角色`);
    
    // 这里可以根据需要添加更多的内容更新逻辑
    // 例如：根据角色显示/隐藏特定的内容区域
    
    // 重新加载侧边导航以反映角色变化
    const basePath = '';
    loadSideNavigation(basePath, role);
}

/**
 * 加载顶部导航栏组件
 * @param {string} basePath - 基础路径，相对于当前页面到根目录的路径
 * @param {string} activeRole - 当前激活的角色（front/company/admin等）
 * @returns {Promise} 加载完成的Promise
 */
function loadTopNavigation(basePath = '', activeRole = 'front') {
    // 确保basePath以/结尾
    if (basePath && !basePath.endsWith('/')) {
        basePath += '/';
    }
    
    return fetch(`${basePath}components/top-nav.html`)
        .then(response => response.text())
        .then(html => {
            // 处理模板变量
            const processedHtml = processTemplate(html, {
                basePath: basePath,
                isFrontActive: activeRole === 'front',
                isCompanyActive: activeRole === 'company',
                isMarketingActive: activeRole === 'marketing',
                isSalesActive: activeRole === 'sales',
                isBrandActive: activeRole === 'brand',
                isSupportActive: activeRole === 'support',
                isAdminActive: activeRole === 'admin',
                isKnowledgeActive: activeRole === 'knowledge',
                isPersonalActive: activeRole === 'personal'
            });
            
            // 将导航栏插入到页面顶部
            const navContainer = document.createElement('div');
            navContainer.innerHTML = processedHtml;
            
            // 获取header元素，如果不存在则使用navContainer本身
            let header = navContainer.querySelector('header');
            if (!header) {
                console.warn('未找到header元素，使用整个navContainer');
                header = navContainer;
            }
            
            // 将现有内容向下移动
            const bodyContent = document.body.innerHTML;
            document.body.innerHTML = '';
            
            // 确保header是有效的DOM节点
            if (header instanceof Node) {
                document.body.appendChild(header);
            } else {
                console.error('header不是有效的DOM节点');
            }
            
            // 重新添加原有内容
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = bodyContent;
            document.body.appendChild(contentDiv);
            
            // 设置当前角色为激活状态
            const roleBtn = document.getElementById(`role-${activeRole}`);
            if (roleBtn) {
                const allRoleBtns = document.querySelectorAll('.role-btn');
                allRoleBtns.forEach(btn => btn.classList.remove('active'));
                roleBtn.classList.add('active');
                
                // 更新body类名以控制菜单显示
                updateBodyClassByRole(activeRole);
            }
            
            // 触发角色切换的初始化
            if (typeof initRoleSwitcher === 'function') {
                initRoleSwitcher();
            } else {
                initRoleSwitcherManual();
            }
            
            // 设置登录用户信息
            updateUserInfo(basePath);
            
            return Promise.resolve();
        });
}

/**
 * 加载左侧导航组件
 * @param {string} basePath - 基础路径，相对于当前页面到根目录的路径
 * @param {string} activeRole - 当前激活的角色（front/company/admin等）
 * @returns {Promise} 加载完成的Promise
 */
function loadSideNavigation(basePath = '', activeRole = 'front') {
    const navUrl = `${basePath}components/side-nav.html`;
    return fetch(navUrl)
        .then(response => response.text())
        .then(html => {
            // 处理模板变量
            const processedHtml = processTemplate(html, {
                basePath: basePath,
                isCompanyActive: activeRole === 'company',
                isKnowledgeActive: activeRole === 'knowledge',
                isPersonalActive: activeRole === 'personal',
                isAdminActive: activeRole === 'admin',
                isFrontActive: activeRole === 'front',
                isMarketingActive: activeRole === 'marketing',
                isSalesActive: activeRole === 'sales',
                isBrandActive: activeRole === 'brand',
                isSupportActive: activeRole === 'support',
                isCurrentPage: (page) => window.location.pathname.includes(page)
            });
            
            // 查找侧边栏容器并插入左侧导航
            // 首先尝试查找ID为side-nav-container的元素（这是页面中定义的容器）
            const sideNavContainer = document.getElementById('side-nav-container');
            if (sideNavContainer) {
                sideNavContainer.innerHTML = processedHtml;
            } else {
                // 然后尝试查找class为sidebar的元素
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.innerHTML = processedHtml;
                } else {
                    // 如果都没有找到，则创建一个
                    const sidebarElement = document.createElement('aside');
                    sidebarElement.className = 'sidebar';
                    sidebarElement.innerHTML = processedHtml;
                    
                    // 尝试插入到合适位置
                    const functionContainer = document.querySelector('.function-container');
                    if (functionContainer) {
                        functionContainer.insertBefore(sidebarElement, functionContainer.firstChild);
                    }
                }
            }
            
            // 根据当前角色自动展开菜单
            autoExpandMenusByRole(activeRole);
            
            return Promise.resolve();
        })
        .catch(error => {
            console.error('加载导航组件失败:', error);
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.innerHTML = '<div class="error-message">导航加载失败</div>';
            }
            return Promise.reject(error);
        });
}

// 处理模板变量
function processTemplate(html, data) {
    let result = html;
    
    // 替换简单的变量 {{variable}}
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`\{\{${key}\}\}`,'g');
        result = result.replace(regex, data[key]);
    });
    
    // 替换三元表达式 {{condition ? 'true' : 'false'}}
    const ternaryRegex = /\{\{([\w]+)\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"]([^'"]*)['"]\}\}/g;
    result = result.replace(ternaryRegex, (match, condition, trueValue, falseValue) => {
        return data[condition] ? trueValue : falseValue;
    });
    
    // 替换函数调用 {{functionName(arg) ? 'true' : 'false'}}
    const functionRegex = /\{\{([\w]+)\(['"]([^'"]*)['"]\)\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"]([^'"]*)['"]\}\}/g;
    result = result.replace(functionRegex, (match, funcName, arg, trueValue, falseValue) => {
        if (typeof data[funcName] === 'function') {
            return data[funcName](arg) ? trueValue : falseValue;
        }
        return match;
    });
    
    return result;
}

// 根据角色自动展开菜单
function autoExpandMenusByRole(role) {
    // 重置所有菜单的展开状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('expanded');
    });
    
    // 根据角色展开对应菜单
    switch(role) {
        case 'company':
            // 展开企业管理相关菜单
            const companyMenu = document.querySelector('.company-menu');
            autoExpandMenuWithMatchingChild(companyMenu);
            break;
        case 'knowledge':
            // 展开知识库相关菜单
            const knowledgeMenu = document.querySelector('.knowledge-menu');
            autoExpandMenuWithMatchingChild(knowledgeMenu);
            break;
        case 'admin':
            // 展开管理员相关菜单
            const adminMenu = document.querySelector('.admin-menu');
            autoExpandMenuWithMatchingChild(adminMenu);
            break;
        case 'personal':
            // 展开个人中心相关菜单
            const personalMenu = document.querySelector('.personal-menu');
            autoExpandMenuWithMatchingChild(personalMenu);
            break;
        case 'marketing':
            // 展开营销获客部菜单
            const marketingMenu = document.querySelector('.marketing-menu');
            autoExpandMenuWithMatchingChild(marketingMenu);
            break;
        case 'sales':
            // 展开销售转化部菜单
            const salesMenu = document.querySelector('.sales-menu');
            autoExpandMenuWithMatchingChild(salesMenu);
            break;
    }
}

/**
 * 自动展开菜单，并查找匹配当前页面的子菜单项
 * @param {HTMLElement} parentMenu - 父级菜单元素
 */
function autoExpandMenuWithMatchingChild(parentMenu) {
    if (!parentMenu) return;
    
    // 展开父级菜单
    parentMenu.classList.add('expanded');
    
    // 获取当前页面URL
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    
    // 查找所有二级菜单
    const level2Items = parentMenu.querySelectorAll('.nav-item.level-2');
    let matchedLevel2Menu = null;
    
    // 遍历所有二级菜单，检查其下的三级菜单是否匹配当前页面
    level2Items.forEach(level2Item => {
        const level3Links = level2Item.querySelectorAll('.nav-item.level-3 a, .nav-children a');
        
        level3Links.forEach(link => {
            const href = link.getAttribute('href') || '';
            // 检查链接是否匹配当前页面
            if (href && 
                (currentUrl.includes(href) || 
                 currentPathname.includes(href) || 
                 href.includes(currentPathname.substring(currentPathname.lastIndexOf('/') + 1)))) {
                matchedLevel2Menu = level2Item;
            }
        });
    });
    
    // 如果找到匹配的二级菜单，则展开它
    if (matchedLevel2Menu) {
        matchedLevel2Menu.classList.add('expanded');
        // 确保三级菜单可见
        const level3Container = matchedLevel2Menu.querySelector('.nav-children');
        if (level3Container) {
            level3Container.style.display = 'block';
        }
    } else if (level2Items.length > 0) {
        // 如果没有找到匹配的二级菜单且存在二级菜单，则展开第一个
        const firstLevel2Item = level2Items[0];
        firstLevel2Item.classList.add('expanded');
        const level3Container = firstLevel2Item.querySelector('.nav-children');
        if (level3Container) {
            level3Container.style.display = 'block';
        }
    }
}

/**
 * 更新用户信息显示
 * @param {string} basePath - 基础路径，相对于当前页面到根目录的路径
 */
function updateUserInfo(basePath = '') {
    const userElement = document.getElementById('current-user');
    if (userElement) {
        // 从本地存储获取用户名
        const storedUser = localStorage.getItem('loggedInUser') || localStorage.getItem('currentUsername') || '登录用户名';
        userElement.textContent = storedUser;
    }
    
    // 绑定登出事件
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // 显示确认对话框
            if (confirm('确定要退出登录吗？')) {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('currentUsername');
                localStorage.removeItem('userLoggedIn');
                
                // 重定向到登录页
                window.location.href = `${basePath}login.html`;
            }
        });
    }
}

/**
 * 初始化导航交互功能
 */
function initNavigationInteractions() {
    // 添加导航项展开/收起功能
    const navHeaders = document.querySelectorAll('.nav-header');
    navHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // 阻止事件冒泡，防止触发父级菜单的点击事件
            e.stopPropagation();
            
            // 获取当前导航项
            const navItem = this.closest('.nav-item');
            
            // 切换expanded状态
            const isExpanded = navItem.classList.toggle('expanded');
            
            // 同步更新子菜单的显示状态
            const navChildren = navItem.querySelector('.nav-children');
            if (navChildren) {
                navChildren.style.display = isExpanded ? 'block' : 'none';
            }
            
            // 更新展开图标样式
            const expandIcon = this.querySelector('.expand-icon');
            if (expandIcon) {
                expandIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });
    
    // 确保所有带有.expanded类的菜单项的子菜单可见
    const expandedItems = document.querySelectorAll('.nav-item.expanded');
    expandedItems.forEach(item => {
        const navChildren = item.querySelector('.nav-children');
        if (navChildren) {
            navChildren.style.display = 'block';
        }
        const expandIcon = item.querySelector('.expand-icon');
        if (expandIcon) {
            expandIcon.style.transform = 'rotate(180deg)';
        }
    });
    
    // 添加移动端菜单切换功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('show');
        });
    }
    
    // 点击主内容区域关闭移动端菜单
    const mainContent = document.querySelector('.content');
    if (mainContent && sidebar) {
        mainContent.addEventListener('click', () => {
            if (sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    }
    
    // 点击侧边栏本身不关闭菜单
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// 导出函数供其他页面使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadNavigation, loadTopNavigation, loadSideNavigation, updateUserInfo, initNavigationInteractions };
}