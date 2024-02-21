import express from 'express';
import { readStoredPosts, writeStoredPosts } from './api/posts.js';
import delay from './utils/delay.js';

const API_ROOT = '/api/v1';
const APPLY_DELAY_TIME = !true;
const DELAY_TIME = 1600;
const PORT = 4000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // CORS 헤더 연결
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get(`${API_ROOT}/posts`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));
  const storedPosts = await readStoredPosts();
  let { author, q, page, perPage } = req.query;

  // 작성자 쿼리
  if (author) {
    const authorName = decodeURIComponent(author);
    return res.status(200).json({
      post: storedPosts.filter(
        (post) => post.author.toLowerCase() === authorName.toLowerCase()
      ),
    });
  }

  // 검색어 쿼리
  if (q) {
    const query = decodeURIComponent(q);
    return res.status(200).json({
      post: storedPosts.filter((post) =>
        post.body.toLowerCase().includes(query.toLowerCase())
      ),
    });
  }

  // 페이지네이션 쿼리
  if (page || perPage) {
    page = parseInt(page ?? 1, 10);
    perPage = parseInt(perPage ?? 10, 10);
    const start = page === 1 ? page - 1 : (page - 1) * perPage;
    const end = start + perPage;
    const paginatedStoredPosts = storedPosts.slice(start, end);
    return res.status(200).json({
      post: paginatedStoredPosts,
      page,
      perPage,
      total: storedPosts.length,
      hasNext: page * perPage <= storedPosts.length,
    });
  }

  res.status(200).json({
    posts: storedPosts,
  });
});

app.get(`${API_ROOT}/posts/:id`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));
  const storedPosts = await readStoredPosts();

  const { id } = req.params;
  const post = storedPosts.find((post) => post.id === parseInt(id, 10));

  if (!post) {
    return res.status(404).json({
      message: `${id}와 일치하는 포스트가 데이터베이스에 존재하지 않습니다.`,
    });
  }

  res.status(200).json({ post });
});

app.post(`${API_ROOT}/posts`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));
  const existingPosts = await readStoredPosts();
  const postData = req.body;

  const newPost = {
    ...postData,
    uid: crypto.randomUUID(),
    id: existingPosts.length + 1,
  };

  const updatedPosts = [...existingPosts, newPost];

  await writeStoredPosts(updatedPosts);

  res.status(201).json({
    message: `포스트 "#${newPost.uid}"가 성공적으로 생성되었습니다.`,
    post: newPost,
  });
});

app.put(`${API_ROOT}/posts/:id`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));
  const existingPosts = await readStoredPosts();
  let { id } = req.params;
  id = parseInt(id, 10);

  const postData = req.body;

  const post = existingPosts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: `"${id}"와 일치하는 포스트가 데이터베이스에 존재하지 않습니다.`,
    });
  }

  const updatedPost = {
    ...post,
    author: postData.author ?? post.author,
    body: postData.body ?? post.body,
  };

  const updatedPosts = existingPosts.map((post) => {
    return post.id === id ? updatedPost : post;
  });

  await writeStoredPosts(updatedPosts);

  res.status(201).json({
    message: `포스트 "#${updatedPost.uid}"가 성공적으로 수정되었습니다.`,
    post: updatedPost,
  });
});

app.delete(`${API_ROOT}/posts/reset`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));

  const reset_posts = [
    {
      uid: '986a9ae5-eea1-4fdc-a704-8dbb4a34eee8',
      id: 1,
      author: '야무',
      body: '리액트 러닝 가이드!',
    },
  ];

  await writeStoredPosts(reset_posts);

  const storedPosts = await readStoredPosts();

  res.status(200).json({
    message: `포스트 리스트가 성공적으로 초기화되었습니다.`,
    posts: storedPosts,
  });
});

app.delete(`${API_ROOT}/posts/:id`, async (req, res) => {
  APPLY_DELAY_TIME && (await delay(DELAY_TIME));

  const existingPosts = await readStoredPosts();

  let { id } = req.params;

  if (!id) return;

  id = parseInt(id, 10);

  const post = existingPosts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: `"${id}"와 일치하는 포스트가 데이터베이스에 존재하지 않습니다.`,
    });
  }

  const updatedPosts = existingPosts.filter((post) => post.id !== id);

  await writeStoredPosts(updatedPosts);

  res.status(200).json({
    message: `포스트 "#${post.uid}"가 성공적으로 삭제되었습니다.`,
    post: {},
  });
});

app.get('*', (req, res) => {
  res.redirect(`${API_ROOT}/posts`);
});

app.listen(PORT, () => {
  console.log(`API 서버 구동 → http://localhost:${PORT}${API_ROOT}/posts`);
});
