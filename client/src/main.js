import './styles/globals.css';

async function main() {
  const response = await fetch('/api/posts?page=1');
  const posts = await response.json();
  console.log(posts);
}

main();
