// パスワード保護スクリプト
document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = 'smile315';
    const sessionKey = 'oya_lp_authenticated';
    
    // セッションチェック
    if (sessionStorage.getItem(sessionKey) === 'true') {
        return; // 認証済みの場合は何もしない
    }
    
    // ページコンテンツを隠す
    document.body.style.display = 'none';
    
    // パスワード入力を求める
    let attempts = 0;
    const maxAttempts = 3;
    
    function askPassword() {
        const password = prompt('このサイトを閲覧するにはパスワードが必要です:');
        
        if (password === null) {
            // キャンセルされた場合
            document.body.innerHTML = '<div style="text-align:center; padding:50px; font-family:Arial,sans-serif;"><h2>アクセスがキャンセルされました</h2><p>パスワードを入力してサイトにアクセスしてください。</p><button onclick="location.reload()">再試行</button></div>';
            document.body.style.display = 'block';
            return;
        }
        
        if (password === correctPassword) {
            sessionStorage.setItem(sessionKey, 'true');
            document.body.style.display = 'block';
            alert('認証成功！サイトをご覧ください。');
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                document.body.innerHTML = '<div style="text-align:center; padding:50px; font-family:Arial,sans-serif;"><h2>アクセスが拒否されました</h2><p>パスワードの入力に' + maxAttempts + '回失敗しました。</p><button onclick="location.reload()">再試行</button></div>';
                document.body.style.display = 'block';
            } else {
                alert('パスワードが間違っています。（残り' + (maxAttempts - attempts) + '回）');
                askPassword();
            }
        }
    }
    
    askPassword();
});