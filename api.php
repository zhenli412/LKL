<?php
// api.php - 用于接收HTML并生成链接

header('Content-Type: application/json');

// 1. 检查是不是POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['code' => 400, 'msg' => '请使用POST方式提交']);
    exit;
}

// 2. 获取提交的HTML内容
// 假设Coze传过来的参数名是 "html_content"
$input = json_decode(file_get_contents('php://input'), true);
$html = isset($input['html_content']) ? $input['html_content'] : '';

if (empty($html)) {
    echo json_encode(['code' => 400, 'msg' => 'HTML内容不能为空']);
    exit;
}

// 3. 生成一个随机的文件名 (比如: a1b2c3d4.html)
$randomName = substr(md5(time() . rand()), 0, 8) . '.html';

// 4. 定义保存路径 (保存在 html_share 文件夹下)
$savePath = 'html_share/' . $randomName;

// 5. 把HTML写入文件
if (file_put_contents($savePath, $html)) {
    // 6. 拼接出访问链接
    // 注意：请把下面的 https://www.yourdomain.com 换成你自己的真实域名
    $domain = 'https://www.likelai.ren'; 
    $fullUrl = $domain . '/html_share/' . $randomName;

    // 7. 返回结果给Coze
    echo json_encode([
        'code' => 200,
        'msg' => 'success',
        'data' => [
            'url' => $fullUrl
        ]
    ]);
} else {
    echo json_encode([
        'link' => $fullUrl  // 直接用 link 作为键名，对应你在 Coze 设置的参数名
    ]);}
?>
