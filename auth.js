// パスワード保護スクリプト
(function() {
    const correctPassword = 'smile315';
    const sessionKey = 'oya_lp_authenticated';
    
    // セッションチェック
    if (sessionStorage.getItem(sessionKey) === 'true') {
        return; // 認証済みの場合は何もしない
    }
    
    // パスワード入力を求める
    const password = prompt('このサイトを閲覧するにはパスワードが必要です:');
    
    if (password === correctPassword) {
        sessionStorage.setItem(sessionKey, 'true');
        alert('認証成功！サイトをご覧ください。');
    } else {
        alert('パスワードが間違っています。');
        // ページを空白にする
        document.body.innerHTML = '<div style="text-align:center; padding:50px; font-family:Arial,sans-serif;"><h2>アクセスが拒否されました</h2><p>正しいパスワードを入力してください。</p><button onclick="location.reload()">再試行</button></div>';
    }
})();