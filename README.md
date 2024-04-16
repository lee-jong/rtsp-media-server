# RTSP Media Server

# 목차

- [실행](#실행)
- [Node Version](#node-version)
- [파일구조](#파일구조)
- [code convention](#code-convention)

<br/>
<br/>

# 실행

```
git clone https://github.com/lee-jong/rtsp-media-server.git

npm ci or yarn install
```

<br/>
<br/>

# Node Version

```
v18.18.0
```

<br/>
<br/>

# 파일구조

```
* controller - 사용자의 입력을 처리 및 DB에 데이터를 넣기전 선행 작업을 진행
	L [ API 기능 별 분리 ]
* database - postgre DB 연결 정보 및 연결
	L config - postgre 연결 정보
	L index - postgre 연결 instance
* interceptor - middleware단에서 client 요청 정보를 공통적인 선행 작업
	L index - API에 따른 token validation 확인
	L error - middleware error handler
* json
	L status-codes.json - error handling을 편하게 하기 위한 http 상태 코드, description
* lib - 라이브러리를 사용한 함수 / class 보관
	L crypto - crypto를 사용한 사용자 정보 (password) 암호화 / 복호화
	L token - jsonwebtoken를 사용하여 token 생성 및 검증 기능
	L logger - winston를 사용한 서버 로그 수집
	L schedule - node-schedule를 사용한 정해진 일정에 대한 기능 수행
	L rtsp - node-rtsp-stream & ffmpeg를 사용하여 rtsp 패킷을 받아 비디오 스트림으로 변환하여 송출 기능
* logs - logger로 수집한 파일 보관
* query - DB 요청을 위한 SQL문
	L [ API 기능 별 분리 ]
* route - 기능별 경로 분리 및 설정
	L index - 경로를 한 곳에서 관리 할 수 있도록 중심이 되는 파일
	L [ API 기능 별 분리 ] - 기능 별 경로를 한 곳에서 관리 및 설정
* swagger - API 가이드 문서 설정 및 작성
	L api - API 기능 별 swagger에 나타낼 문서 작성 관리
		L index - API 기능 별 한 곳에서 관리
		L [ API 기능 별 분리]
	L handler - swagger 프로세스를 처리
		L setting - swaager config 파일 모음
		L swagger - setting 기반 프로세스 처리 파일
	L property - API 기능 별 swagger에 나타낼 properties 정의
		L req - API request에 사용될 properties 정의
		L res - API response에 사용될 properties 정의
		L index - property 관리 파일
	L index - 최종적으로 api 정보를 바탕으로 handler를 통해 문서화
* types - interface 작성
	L [ API 기능 별 분리 ]
* util - 간편하게 사용할 수 있는 함수 및 class
	L global ( 전체적으로 공통되게 사용되는 함수 및 class를 한 곳에서 사용할 수 있도록 정의 )
server.ts ( 서버 구동 및 설정 )
.env ( 보안이 필요한 정보 및 환경에 따른 변수 설정 )

```

<br/>
<br/>

# Code Convention

```
DB 데어터 & request data : snake case
Server 변수 상수 : camel case
Query문 : upper case + snake case
```

<br/>
<br/>

# 참조

[swagger js 참조 블로그](https://development-crow.tistory.com/32)
