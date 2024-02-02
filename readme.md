# &#128640; 내일배움캠프 숙련주차 개인과제

## 개요

<br>
1. <strong>API 명세서</strong>를 작성하여, 최종적 결과물을 미리 파악합니다.<br>
2. <strong>MySQL, Prisma</strong>를 이용해 데이터베이스를 설계하고 활용합니다.<br>
    &nbsp;&nbsp;&nbsp;&nbsp;- 데이터 모델링을 통해 <strong>ERD 작성</strong><br>
    &nbsp;&nbsp;&nbsp;- Prisma를 이용한 마이그레이션 코드 및 스키마 코드 작성<br>
    &nbsp;&nbsp;&nbsp;- <strong>JOIN</strong>을 통해 다른 Table의 데이터와 결합<br>
3. <strong>인증 관련 기능을 구현<strong>합니다.<br>
    &nbsp;&nbsp;&nbsp;- <strong>JWT(AccessToken)</strong>의 이해<br>
    &nbsp;&nbsp;&nbsp;- 회원가입 API, 로그인 API, 내 정보 조회 API, 인증 <strong>Middleware<strong> 구현<br>
    &nbsp;&nbsp;&nbsp;- 상품 관련 기능에 인증 로직 추가<br>
<br>
<hr>
<br>

## &#128296; 기술 스택

 <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/yarn-339AF0?style=for-the-badge&logo=기술스택아이콘&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=기술스택아이콘&logoColor=white">
<img src="https://img.shields.io/badge/prisma-47A248?style=for-the-badge&logo=기술스택아이콘&logoColor=white">
<img src="https://img.shields.io/badge/.env-F7DF1E?style=for-the-badge&logo=기술스택아이콘&logoColor=white">
 <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">

### API 명세서

<br>

[API명세서 노션페이지](https://gainful-bonsai-fe1.notion.site/API-933152851dff4395a74d931328dd5429?pvs=4)

API명세서는 리팩토링 과정중 계속 수정 될 수 있습니다.<br>
<br>

<hr>
<br>

### ERD 설계 링크

<br>

![텍스트](img/ERD.png)

User테이블과 UserInfo테이블은 1:1 관계
User테이블과 Resumes테이블은 1:N 관계

[ERD링크](https://www.erdcloud.com/p/6pgLDQpbf6z2KhtPK)<br>

<hr>
