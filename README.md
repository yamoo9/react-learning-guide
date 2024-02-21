# 리액트 러닝 가이드

리액트 라이브러리를 사용해 사용자 인터페이스를 구축하는 방법을 학습합니다.

## 학습 저장소 복제

학습 저장소를 복제하는 명령어를 복사하여 터미널에 붙여넣고 실행합니다.

```sh
npx degit yamoo9/react-learning-guide react-learning-guide
```

## 인스톨레이션

학습을 위해 종속성 패키지를 설치합니다.

```sh
pnpm install
```

## 커멘드

클라이언트 앱 실행 명령어입니다.

```sh
pnpm dev
```

```sh
pnpm dev:client
```

서버 앱 실행 명령어입니다.

```sh
pnpm dev:server
```

클라이언트 + 서버 앱 동시 실행 명령어입니다.

```sh
pnpm dev:all
```

## Post API

### 포스트 리스트 읽기

포스트 리스트를 응답합니다.

```sh
GET /api/v1/posts
```

### 포스트 검색

포스트를 검색하여 응답합니다.

#### 작성자 쿼리

요청한 작성자 이름으로 포스트를 검색하여 응답합니다.

```sh
GET /api/v1/posts?author={author-name}
```

#### 검색어 쿼리

요청한 포스트 본문 내용을 검색하여 응답합니다.

```sh
GET /api/v1/posts?q={search}
```

#### 페이지네이션 쿼리

요청한 페이지 번호 또는 페이지 갯수에 맞춰 포스트를 검색하여 응답합니다.

```sh
GET /api/v1/posts?page=2&perPage=3
```

### 포스트 읽기

요청한 아이디 속성 값과 일치하는 포스트를 응답합니다.

```sh
GET /api/v1/posts/:id
```

### 포스트 쓰기

새로운 포스트를 생성한 뒤 응답합니다.

```sh
POST /api/v1/posts
```

### 포스트 수정

요청한 아이디 속성 값과 일치하는 포스트 수정한 뒤 응답합니다.

```sh
PUT /api/v1/posts/:id
```

### 포스트 삭제

요청한 아이디 속성 값과 일치하는 포스트 삭제한 뒤 응답합니다.

```sh
DELETE /api/v1/posts/:id
```

### 포스트 초기화

포스트 리스트를 초기화합니다.

```sh
DELETE /api/v1/posts/reset
```