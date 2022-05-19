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

### 1. Entry

- history API를 활용한 라우팅

### 2. 칸반보드

- flux 디자인 패턴에 기반한 상태 관리
- 개발자 도구를 활용한 메모리 누수 디버깅 및 개선
- 칸반보드 아이템 순서 유지를 위한 Order에 대한 테스트 코드 작성
- 디바운싱을 활용한 칸반보드 이벤트 최적화
- 드래그 앤 드랍을 통해 이슈 아이템 순서 및 속성 변경

<div>
  <img src="/src/assets/readme/Kanban.png" width="500">
</div>

### 3. Animation 최적화

- 크롬 예제 리팩토링을 통한 학습용 어플리케이션입니다. (기존 ES5 방식 => 최신 JS 문법으로 개선)
- requestAnimationFrame과 keyframe 각각 버전을 선택해서 애니메이션을 동작시킬 수 있습니다.
- 크롬 개발자 도구를 활용한 Runtime Performance 측정 및 개선할 수 있습니다.
- Add 버튼 클릭 시 요소가 10개씩 추가되며 최소 100개의 요소가 화면에 존재할 때 성능 이슈를 모니터링할 수 있습니다.
- idle 버튼 클릭 시 강제 동기 레이아웃 방식으로 적용되는 requestAnimationFrame 방식을 사용합니다.
- optWitrAF 버튼 클릭 시 강제 동기 레이아웃 방식을 제거한 requestAnimationFram 방식을 사용합니다.
- optWitkeyframe 버튼 클릭 시 Animation Keyframe 방식을 사용합니다.
- 첫 번째 이미지는 rAF를 활용한 애니메이션, 두 번째 이미지는 keyframe을 활용한 애니메이션입니다.
<div>
  <img src="/src/assets/readme/rAF.png" width="500">
</div>
<div>
  <img src="/src/assets/readme/keyframe.png" width="500">
</div>

<br/>
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
