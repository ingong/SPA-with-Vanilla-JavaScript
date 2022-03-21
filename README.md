## VanillaJS SPA

순수 JavaScript와 번들링 도구를 활용해 개발한 프로젝트입니다.

### 기술스택

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

### 실행 방법

```
// dev
1. npm install
2. npm run dev

// build
1. npm run install
2. npm run build
3. npm run start
```

### 구현 사항

- 추상화된 컴포넌트 기반 설계
- flux 디자인 패턴에 기반 상태 관리
- history API를 활용한 라우팅 기능
- 디바운싱을 활용한 칸반보드 이벤트 최적화
- 칸반보드 아이템 순서 유지를 위한 Order에 대한 테스트 코드 작성

### 기능

- 항목 추가 버튼 클릭 후 이슈 아이템 생성
- 드래그 앤 드랍을 통해 이슈 아이템 순서 및 속성 변경

<div>
  <img src="/src/assets/readme/Kanban.png" width="400">
</div>

- 이슈 제목과 담당자 ID 수정
- 이슈 삭제 기능
<div>
  <img src="/src/assets/readme/Modal.png" width="500">
</div>

<br>
