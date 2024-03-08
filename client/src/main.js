import './styles/globals.css';

const CLIENT_ONLY = globalThis.__RUN_MODE__ === 'clientOnly';

async function main() {
  const response = await fetch('/api/posts?page=1');
  if (response.ok) {
    const posts = await response.json();
    console.log(posts);
  } else {
    console.error(
      'Proxy (개발) 서버에 문제가 발생했습니다.\n  서버가 구동되었는지 확인하세요.'
    );
  }
}

if (!CLIENT_ONLY) {
  main();
}
