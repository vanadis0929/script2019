# script2019

todo / geolocation / greeting javascript / jquery

# 필수 프로그램 설치

## git 설치

https://git-scm.com/download/win

## VScode

https://code.visualstudio.com/download

## node 설치 (npm 포함)

https://nodejs.org/dist/v12.4.0/node-v12.4.0-x64.msi 로 설치

https://d2fault.github.io/2018/04/30/20180430-install-and-upgrade-nodejs-or-npm/ 에서 2번 참

## yarn 설치 (npm과 유사한 패키지 프로그램)

https://yarnpkg.com/en/docs/install

# git 세팅

1. 임의의 폴더 세팅
2. vsCode 터미널 (컨트롤 + `) 열어서 명령어 입력
3. git clone https://github.com/vanadis0929/script2019.git ./
4. 다 내려받아지면. npm install

# 폴더 구조

/index.html
/jquery/index.html

/asset/css/style.css (scss 작업 한것이 이곳으로 컴파일 되어 출력)
/asset/scss/style.scss (실제 css는 여기에 작업)

# 서버 실행 (위 과정을 모두 거친 후 )

1. npm start 후 localhost:8080/index.html
2. 새로운 터미널을 열고 npm run scss 하게되면 scss를 저장할 때 마다 자동으로 컴파일 함 (서버중단 은 컨트롤 + C)
