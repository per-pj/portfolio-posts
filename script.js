const API_URL = '/.netlify/functions/fetchData'; // Netlify Functionのエンドポイント

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
    link.textContent = '詳細を見る';
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
