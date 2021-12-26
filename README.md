## 이인송 카카오 과제 : 칸반보드

### 실행 방법

```
1. npm install
2. npm run start

* 테스트
npm run test 로 확인하실 수 있습니다.

* 빌드
npm run build 로 확인하실 수 있습니다.
```

<br>

### 기본 요구 사항

- Webpack, Babel 을 활용해 개발 환경을 구축하였습니다.
- 두 개 이상의 브라우저에서 동작이 보장되며, 크롬, 파이어폭스, 엣지에서 정상 동작을 확인했습니다.
- HTML, CSS, JS 로만 개발했습니다. (기본 요구 사항의 예외 사항을 제외)
- jest 를 활용해 테스트 환경을 구축하고, Unit 테스트에 대한 테스트 코드를 작성했습니다.
- flux pattern 와 클래스 기반 컴포넌트로 코드를 작성했습니다.

<br>

### 테스트

1. reducer 함수의 create, delete, update 에 대해 테스트 코드를 작성했습니다.
2. 칸반 보드의 정렬 상태를 유지시키는 order 를 반환하는 함수를 분리했으며, 이에 대한 테스트코드를 작성했습니다.

<br>

### 구현

다양한 구현 방법이 존재한다고 생각한 기능들에 대한 설명입니다.

1. 제목, 담당자가 없는 경우 생성 불가(필수항목) 안내를 해줍니다.

   - 사용자가 입력 후 해당 input 의 길이가 0 이 되면 input 밑에 해당하는 경고 메세지가 보입니다.
   - 사용자는 확인 버튼을 클릭해도, 생성되거나 수정되지 않습니다.

2. 삭제 시 경고를 보여줍니다.

   - 삭제 버튼을 클릭 시, 모달이 나타납니다.
   - 모달에는 해당 아이템의 id 가 나타나며, 사용자에게 삭제 의사를 묻습니다.

3. 보드의 내용은 로컬에 저장되어 재접속하면 복구됩니다.
   - localStorage 를 활용했습니다.
   - localStorage 에 아이템이 있다면, localStorage 에 접근해 상태를 최신화합니다.
   - localStorage 에 아이템이 없다면, db 폴더의 data.json 파일을 통해 상태를 최신화합니다.

<br>

### 규칙을 제외한 추가 구현 사항

- 칸반 보드의 UX 적인 개선을 목적으로, 칸반 아이템이 드랍될 영역에 대해 표시했습니다

<br>

### 작성자 Github 주소

|                         이인송                         |
| :----------------------------------------------------: |
| <img src="https://github.com/ingong.png" width="120"/> |
|          [이인송](https://github.com/ingong)           |
