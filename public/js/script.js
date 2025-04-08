const toggleMenu = document.querySelector('.toggle-menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-menu a');

if (toggleMenu && nav && navLinks) {
  toggleMenu.addEventListener('click', () => {
    toggleMenu.classList.toggle('open'); // トグルメニューのopenクラスを切り替え
    nav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

let API_URL;

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  // ローカル環境の場合
  API_URL = 'http://localhost:8000/mock_api.json';
} else {
  // 本番環境（Netlify）の場合
  API_URL = '/.netlify/functions/fetchData';
}

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayWorks(data.contents);
  } catch (error) {
    console.error('データの取得に失敗しました', error);
  }
}

function displayWorks(contents) {
  const worksContainer = document.getElementById('works');
  worksContainer.innerHTML = ''; // 既存データをクリア

  contents.forEach((work) => {
    // メインのコンテナ
    const workItem = document.createElement('div');
    workItem.classList.add('work-item');

    // ロゴ画像
    const img = document.createElement('img');
    img.src = work.logo.url;
    img.alt = work.title;
    img.classList.add('work-image');

    // タイトル
    const title = document.createElement('h2');
    title.textContent = work.title;
    title.classList.add('work-title');

    // 説明文
    const description = document.createElement('p');
    description.textContent = work.description;
    description.classList.add('work-description');

    // サービスURLリンク
    const link = document.createElement('a');
    link.href = work.url;
    link.textContent = 'Websiteにアクセス';
    link.target = '_blank';
    link.classList.add('work-link');

    // 各要素をworkItemに追加
    workItem.appendChild(img);
    workItem.appendChild(title);
    workItem.appendChild(description);
    workItem.appendChild(link);

    // 親のworksContainerに追加
    worksContainer.appendChild(workItem);
  });
}

fetchData();

// フェードインアニメーションの実装
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');

  function checkFadeIn() {
    if (!container) {
      return;
    }

    // 要素の画面上の位置を取得
    const rect = container.getBoundingClientRect();

    // 要素が画面内に入ったかを判定 (多少余裕を持たせることも可能)
    const isVisible =
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.bottom >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight));

    // 要素が画面内に入ったら fade-in クラスを追加
    if (isVisible && !container.classList.contains('fade-in')) {
      container.classList.add('fade-in');
    }
  }

  // スクロールイベントが発生するたびに checkFadeIn 関数を実行
  window.addEventListener('scroll', checkFadeIn);

  // ページロード時にも一度チェック (初期位置によっては表示されるべき場合もある)
  checkFadeIn();
});
