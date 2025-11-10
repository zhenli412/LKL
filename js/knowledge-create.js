/**
 * 知识库创建功能公共组件
 */

// 初始化新建功能
function initKnowledgeCreate() {
    // 点击文档其他地方关闭下拉菜单
    document.addEventListener('click', function(event) {
        const newBtn = document.getElementById('new-btn');
        const newMenu = document.getElementById('new-menu');
        if (newBtn && newMenu && !newBtn.contains(event.target) && !newMenu.contains(event.target)) {
            newMenu.classList.remove('show');
        }
    });
    
    // 文件上传相关事件
    const fileUpload = document.getElementById('file-upload');
    const dropArea = document.getElementById('drop-area');
    const uploadBtn = document.getElementById('upload-btn');
    
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            if (uploadBtn) uploadBtn.disabled = this.files.length === 0;
        });
    }
    
    if (dropArea) {
        // 拖拽事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.classList.add('drag-over');
        }
        
        function unhighlight() {
            dropArea.classList.remove('drag-over');
        }
        
        dropArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (fileUpload) {
                fileUpload.files = files;
                if (uploadBtn) uploadBtn.disabled = files.length === 0;
            }
        }
    }
    
    // 模拟文件上传
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const files = document.getElementById('file-upload')?.files;
            if (!files || files.length === 0) return;
            
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');
            
            if (progressContainer && progressBar) {
                progressContainer.style.display = 'block';
                uploadBtn.disabled = true;
                
                // 模拟上传进度
                let progress = 0;
                const interval = setInterval(function() {
                    progress += 5;
                    progressBar.style.width = progress + '%';
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(function() {
                            alert('文件上传成功');
                            closeLocalFileModal();
                            
                            // 刷新知识列表
                            if (typeof initKnowledgeList === 'function') {
                                initKnowledgeList();
                            }
                        }, 500);
                    }
                }, 200);
            }
        });
    }
}

// 切换新建下拉菜单
function toggleNewMenu() {
    const newMenu = document.getElementById('new-menu');
    if (newMenu) newMenu.classList.toggle('show');
}

// 显示本地文件上传模态框
function showLocalFileModal() {
    const newMenu = document.getElementById('new-menu');
    const modal = document.getElementById('local-file-modal');
    const fileUpload = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    
    if (newMenu) newMenu.classList.remove('show');
    if (modal) modal.style.display = 'block';
    
    // 重置上传状态
    if (fileUpload) fileUpload.value = '';
    if (uploadBtn) uploadBtn.disabled = true;
    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
}

// 关闭本地文件上传模态框
function closeLocalFileModal() {
    const modal = document.getElementById('local-file-modal');
    if (modal) modal.style.display = 'none';
}

// 显示网页链接模态框
function showWebLinkModal() {
    const newMenu = document.getElementById('new-menu');
    const modal = document.getElementById('web-link-modal');
    const linkName = document.getElementById('link-name');
    const linkUrl = document.getElementById('link-url');
    
    if (newMenu) newMenu.classList.remove('show');
    if (modal) modal.style.display = 'block';
    
    // 重置表单
    if (linkName) linkName.value = '';
    if (linkUrl) linkUrl.value = '';
}

// 关闭网页链接模态框
function closeWebLinkModal() {
    const modal = document.getElementById('web-link-modal');
    if (modal) modal.style.display = 'none';
}

// 显示知识笔记模态框
function showNoteModal() {
    const newMenu = document.getElementById('new-menu');
    const modal = document.getElementById('note-modal');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    
    if (newMenu) newMenu.classList.remove('show');
    if (modal) modal.style.display = 'block';
    
    // 重置表单
    if (noteTitle) noteTitle.value = '';
    if (noteContent) noteContent.value = '';
}

// 关闭知识笔记模态框
function closeNoteModal() {
    const modal = document.getElementById('note-modal');
    if (modal) modal.style.display = 'none';
}

// 保存网页链接
function saveWebLink() {
    const linkCategory = document.getElementById('link-category');
    const linkName = document.getElementById('link-name');
    const linkUrl = document.getElementById('link-url');
    
    if (!linkCategory || !linkName || !linkUrl) return;
    
    const category = linkCategory.value;
    const name = linkName.value.trim();
    const url = linkUrl.value.trim();
    
    if (!name || !url) {
        alert('请填写完整信息');
        return;
    }
    
    // 模拟保存操作
    console.log('保存网页链接:', { category, name, url });
    
    // 显示成功提示并关闭模态框
    alert('网页链接保存成功');
    closeWebLinkModal();
    
    // 刷新知识列表
    if (typeof initKnowledgeList === 'function') {
        initKnowledgeList();
    }
}

// 保存知识笔记
function saveNote() {
    const noteCategory = document.getElementById('note-category');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    
    if (!noteCategory || !noteTitle || !noteContent) return;
    
    const category = noteCategory.value;
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (!title || !content) {
        alert('请填写完整信息');
        return;
    }
    
    // 模拟保存操作
    console.log('保存知识笔记:', { category, title, content });
    
    // 显示成功提示并关闭模态框
    alert('知识笔记保存成功');
    closeNoteModal();
    
    // 刷新知识列表
    if (typeof initKnowledgeList === 'function') {
        initKnowledgeList();
    }
}

// 知识笔记保存成功后的回调
function onNoteSaved() {
    // 这里可以添加保存成功后的操作，如刷新页面等
    console.log('知识笔记保存成功');
}



// 将函数注册到window对象，方便页面调用
window.initKnowledgeCreate = initKnowledgeCreate;
window.toggleNewMenu = toggleNewMenu;
window.showLocalFileModal = showLocalFileModal;
window.closeLocalFileModal = closeLocalFileModal;
window.showWebLinkModal = showWebLinkModal;
window.closeWebLinkModal = closeWebLinkModal;
window.showNoteModal = showNoteModal;
window.closeNoteModal = closeNoteModal;
window.saveWebLink = saveWebLink;
window.saveNote = saveNote;
