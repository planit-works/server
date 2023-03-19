# Planit 서버

<!-- ## 서버 구조

<hr>
<br> -->

## 📚 기술 스택

<h2>Back-End</h2>
<div>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">
<img src="https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white">
<img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
</div>

<h2>DevOps</h2>
<div>
<img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"> 
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/discordjs-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>

<h2>Cloud(AWS)</h2>
<div>
<img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
<img src="https://img.shields.io/badge/rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/cloudwatch-FF4F8B?style=for-the-badge&logo=amazoncloudwatch&logoColor=white">
<img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/api%20gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white">
<img src="https://img.shields.io/badge/lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white">
</div>
<hr>
<br>

## ERD
![ER 다이어그램](/docs/erd.png)

## 기능 명세서
#### ✅: 완료
#### 🔜: 개발 중
#### ❌: 개발 예정
### 1. Auth
#### 1) Local
- ✅ Email & PW로 회원가입을 진행할 수 있다.
- ❌ 이메일 인증을 거친 유저만 서비스 이용이 가능하다.
- ❌ 비밀번호가 3개월 동안 변경되지 않았을 경우 변경 요청을 할 수 있다.
- ✅ 로그인 시 JWT를 담은 쿠키를 발급하고 인증에 사용할 수 있다.
#### 2) Social
- ✅ 구글 계정으로 로그인할 수 있다.
- ❌ 카카오톡 계정으로 로그인할 수 있다.

### 2. User
#### 1) 프로필
- ✅ 프로필 사진과 닉네임, 자기소개를 변경할 수 있다.
- ✅ 다른 유저의 프로필을 조회할 수 있다.
- ✅ Soft-Delete 방식의 회원탈퇴가 가능하다.
#### 2) 검색
- ✅ 닉네임으로 다른 유저를 검색할 수 있다.
- ✅ 유저 검색 결과에서 팔로우 여부를 확인할 수 있다.

### 3. Follow
- ✅ 다른 유저를 팔로우할 수 있다.
- ✅ 다른 유저를 언팔로우할 수 있다.
- 🔜 내가 팔로우 중인 유저를 조회할 수 있다.
- 🔜 나를 팔로우 중인 유저를 조회할 수 있다.
- ❌ 다른 유저를 차단할 수 있다.

### 4. Background
- ❌ 자신만의 배경화면을 최대 10장까지 등록할 수 있다.

### 5. Schedule
- ✅ 특정 일자와 시간으로 스케쥴을 등록할 수 있다.
- 🔜 특정 월의 전체 일정을 확인할 수 있다.
- ❌ 일정에 다른 유저를 추가하여 일정을 공유할 수 있다.
- ❌ 일정을 수정할 수 있다.
- ❌ 일정을 삭제할 수 있다.

### 6. Routine
- ❌ 시간대별 루틴을 등록할 수 있다.
- ❌ 프로필 화면에서 일자별 루틴 달성 성과를 확인할 수 있다.
- ❌ 루틴을 수정할 수 있다.
- ❌ 루틴을 삭제할 수 있다.


<hr>
<br>