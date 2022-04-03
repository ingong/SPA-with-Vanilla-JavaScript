## SPA_Without_Library

순수 JS/TS 와 번들링 도구를 활용해 개발 중인 프로젝트입니다.

### 기술스택

[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)]()
[![JavaScript Badge](https://img.shields.io/badge/JavaScript-FFFFFF?style=flat-square&logo=JavaScript&logoColor=yellow)]()
[![Yarn Badge](https://img.shields.io/badge/Yarn-FFFFFF?style=flat-square&logo=Yarn&logoColor=black)]()
[![Webpack Badge](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=black)]()
[![Babel Badge](https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=yellow)]()

<br/>

## 구현 사항

- 추상화된 컴포넌트 기반 설계
- flux 디자인 패턴에 기반한 상태 관리
- history API를 활용한 라우팅 기능
- 디바운싱을 활용한 칸반보드 이벤트 최적화
- 칸반보드 아이템 순서 유지를 위한 Order에 대한 테스트 코드 작성

<br/>

## 기능

### 1. 페이지 목차

- 버튼 클릭을 통해 해당 페이지로 이동

<div>
  <img src="/src/assets/readme/Category.png" width="500">
</div>

### 2. 칸반보드

- 항목 추가 버튼 클릭 후 이슈 아이템 생성
- 드래그 앤 드랍을 통해 이슈 아이템 순서 및 속성 변경

<div>
  <img src="/src/assets/readme/Kanban.png" width="500">
</div>

- 이슈 제목과 담당자 ID 수정
- 이슈 삭제 기능
<div>
  <img src="/src/assets/readme/Modal.png" width="800">
</div>
<br/>

### 3. 언어 검색

## 실행 방법

```sh
// dev
1. yarn install
2. yarn dev

// build
1. yarn install
2. yarn build
3. yarn start
```
