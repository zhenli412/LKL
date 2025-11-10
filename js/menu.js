// 等待DOM加载完成
window.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单切换功能
    initMenuToggle();
    
    // 初始化角色切换器
    initRoleSwitcher();
    
    // 初始化当前页面高亮
    initCurrentPageHighlight();
});

// 菜单展开/折叠功能
function initMenuToggle() {
    // 收起所有菜单的辅助函数，可选择性保留某些菜单不收起
    function collapseAllMenus(exceptionLevel1 = null, exceptionLevel2 = null) {
        // 收起所有一级菜单
        const allLevel1 = document.querySelectorAll('.nav-item.level-1');
        allLevel1.forEach(level1 => {
            // 不收起指定的一级菜单
            if (level1 !== exceptionLevel1) {
                level1.classList.remove('expanded');
            }
            
            // 收起所有二级菜单
            const childLevel2 = level1.querySelectorAll('.nav-item.level-2');
            childLevel2.forEach(level2 => {
                // 不收起指定的二级菜单
                if (level2 !== exceptionLevel2) {
                    level2.classList.remove('expanded');
                }
            });
        });
    }
    
    // 一级菜单点击事件
    const level1Headers = document.querySelectorAll('.nav-item.level-1 > .nav-header');
    level1Headers.forEach(header => {
        header.addEventListener('click', function(e) {
            // 阻止事件冒泡到更高层级
            e.stopPropagation();
            
            // 找到当前一级菜单
            const currentLevel1 = this.closest('.nav-item.level-1');
            const isCurrentlyExpanded = currentLevel1.classList.contains('expanded');
            
            // 收起所有菜单
            collapseAllMenus();
            
            // 如果当前菜单不是展开状态，则展开它
            if (!isCurrentlyExpanded) {
                currentLevel1.classList.add('expanded');
            }
        });
    });
    
    // 二级菜单点击事件
    const level2Headers = document.querySelectorAll('.nav-item.level-2 > .nav-header');
    level2Headers.forEach(header => {
        header.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免触发一级菜单的点击事件
            e.stopPropagation();
            
            // 找到当前二级菜单和父级一级菜单
            const currentLevel2 = this.closest('.nav-item.level-2');
            const parentLevel1 = this.closest('.nav-item.level-1');
            const isCurrentlyExpanded = currentLevel2.classList.contains('expanded');
            
            // 检查是否是链接点击
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                // 如果点击的是链接，收起所有其他菜单
                collapseAllMenus(parentLevel1);
                // 链接点击不需要额外展开操作，由导航跳转处理
                return;
            }
            
            // 强制收起所有其他一级类目，确保只保留当前操作的一级类目展开
            const allLevel1 = document.querySelectorAll('.nav-item.level-1');
            allLevel1.forEach(level1 => {
                if (level1 !== parentLevel1) {
                    level1.classList.remove('expanded');
                }
            });
            
            // 收起当前一级菜单下的其他二级菜单
            const siblingLevel2 = parentLevel1.querySelectorAll('.nav-item.level-2');
            siblingLevel2.forEach(level2 => {
                if (level2 !== currentLevel2) {
                    level2.classList.remove('expanded');
                }
            });
            
            // 确保当前父级一级菜单是展开的
            parentLevel1.classList.add('expanded');
            
            // 切换当前二级菜单的展开状态
            if (!isCurrentlyExpanded) {
                currentLevel2.classList.add('expanded');
            } else {
                currentLevel2.classList.remove('expanded');
            }
        });
    });
    
    // 三级菜单点击事件 - 确保点击时收起其他菜单
    const level3Items = document.querySelectorAll('.nav-item.level-3');
    level3Items.forEach(item => {
        item.addEventListener('click', function(e) {
            // 阻止事件冒泡
            e.stopPropagation();
            
            // 获取当前的一级和二级菜单
            const currentLevel1 = this.closest('.nav-item.level-1');
            const currentLevel2 = this.closest('.nav-item.level-2');
            
            // 收起所有其他菜单，保持当前的一级和二级菜单展开
            collapseAllMenus(currentLevel1, currentLevel2);
        });
    });
}

// 角色切换功能
function initRoleSwitcher() {
    const roleBtns = document.querySelectorAll('.role-btn');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的活跃状态
            roleBtns.forEach(b => {
                b.classList.remove('active');
            });
            
            // 添加当前按钮的活跃状态
            this.classList.add('active');
            
            // 获取角色类型
            const role = this.id.replace('role-', '');
            
            // 更新body类名以控制菜单显示
            document.body.className = '';
            if (role === 'company') {
                document.body.classList.add('company-role');
            } else if (role === 'admin') {
                document.body.classList.add('admin-role');
            }
            
            // 重置所有菜单的展开状态
            const allNavItems = document.querySelectorAll('.nav-item');
            allNavItems.forEach(item => {
                item.classList.remove('expanded');
            });
            
            // 根据角色显示对应的内容
            updateContentByRole(role);
            
            // 自动展开对应的菜单
            autoExpandMenus(role);
        });
    });
}

// 根据角色自动展开菜单
function autoExpandMenus(role) {
    if (role === 'company') {
        // 自动展开企业管理部的菜单
        const companyMenu = document.querySelector('.nav-item.level-1.company-menu');
        if (companyMenu) {
            companyMenu.classList.add('expanded');
            
            // 自动展开企业管理员二级菜单
            const companyAdminMenu = companyMenu.querySelector('.nav-item.level-2');
            if (companyAdminMenu) {
                companyAdminMenu.classList.add('expanded');
            }
        }
    } else if (role === 'admin') {
        // 自动展开平台管理部的菜单
        const adminMenu = document.querySelector('.nav-item.level-1.admin-menu');
        if (adminMenu) {
            adminMenu.classList.add('expanded');
            
            // 自动展开ADMIN管理二级菜单
            const adminSubMenu = adminMenu.querySelector('.nav-item.level-2');
            if (adminSubMenu) {
                adminSubMenu.classList.add('expanded');
            }
        }
    } else {
        // 默认角色（营销获客部），自动展开营销获客部和选题策划岗菜单
        const marketingMenu = document.querySelector('.nav-item.level-1.marketing-menu');
        if (marketingMenu) {
            marketingMenu.classList.add('expanded');
            
            // 自动展开选题策划岗二级菜单
            const level2Items = marketingMenu.querySelectorAll('.nav-item.level-2');
            let researchMenu = null;
            
            // 遍历查找包含"选题策划岗"文本的菜单项
            level2Items.forEach(item => {
                const navTitle = item.querySelector('.nav-title');
                if (navTitle && navTitle.textContent.trim() === '选题策划岗') {
                    researchMenu = item;
                }
            });
            
            if (researchMenu) {
                researchMenu.classList.add('expanded');
                
                // 确保三级菜单容器可见
                const level3Container = researchMenu.querySelector('.nav-children');
                if (level3Container) {
                    level3Container.style.display = 'block';
                }
            }
        }
    }
}

// 根据角色更新内容
function updateContentByRole(role) {
    // 这里可以根据不同角色加载不同的内容
    // 例如切换内容区域的显示，或者重新加载页面
    console.log('切换到角色:', role);
    
    // 如果是当前页面是首页，可以动态更新欢迎信息
    const pageHeader = document.querySelector('.page-header h2');
    if (pageHeader) {
        if (role === 'company') {
            pageHeader.textContent = '企业管理控制台';
        } else if (role === 'admin') {
            pageHeader.textContent = '平台管理中心';
        } else {
            pageHeader.textContent = '欢迎使用利客来智能营销获客平台';
        }
    }
}

// 当前页面高亮功能
function initCurrentPageHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item.level-3');
    
    navLinks.forEach(link => {
        // 获取链接的相对路径
        const linkPath = new URL(link.href).pathname;
        
        // 如果链接路径与当前页面路径匹配，则高亮显示
        if (currentPath.includes(linkPath)) {
            // 高亮当前链接
            link.classList.add('active');
            
            // 展开对应的二级菜单
            const parentLevel2 = link.closest('.nav-item.level-2');
            if (parentLevel2) {
                parentLevel2.classList.add('expanded');
                
                // 展开对应的一级菜单
                const parentLevel1 = parentLevel2.closest('.nav-item.level-1');
                if (parentLevel1) {
                    parentLevel1.classList.add('expanded');
                }
                
                // 确保三级菜单容器可见
                const level3Container = parentLevel2.querySelector('.nav-list.level-3');
                if (level3Container) {
                    level3Container.style.display = 'block';
                }
            }
        }
    });
}