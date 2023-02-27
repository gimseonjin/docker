# Docker란 무엇인가요?

Docker는 개발자가 소프트웨어 응용 프로그램과 필요한 모든 구성 요소 및 종속성(예: 라이브러리 및 프레임워크)을 하나의 이식 가능한 패키지인 "컨테이너"로 패키징할 수있는 도구입니다. 이러한 컨테이너는 Docker가 설치된 어떤 컴퓨터나 서버에서도 추가 구성이나 설정없이 실행할 수 있습니다.

소프트웨어를 위한 운송용 컨테이너와 비슷하다고 생각해보세요! 운송용 컨테이너는 내용물을 풀거나 다시 싸지 않고 다른 위치로 쉽게 이동할 수 있듯이, Docker 컨테이너도 추가 설정 없이 다른 컴퓨터로 쉽게 이동할 수 있습니다.

이러한 기능으로 Docker는 소프트웨어가 개발, 테스트 및 운영과 같은 다른 환경에서 일관되게 작동하도록 보장하려는 개발자에게 특히 유용합니다. 또한 동일한 컨테이너를 모든 이러한 다른 환경에서 사용할 수 있으므로 배포 프로세스를 간소화하는 데 도움이 됩니다.

<br/>

## Docker를 이용한 간단한 Express 앱
<br/>

1. 프로젝트를 위한 새 디렉토리를 만들고 명령 줄에서 해당 디렉토리로 이동합니다.


    <br/>

2. `app.js`라는 새 파일을 만들고 다음 코드를 추가합니다.
    
    ```tsx
    const express = require('express')
    const app = express()
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')
    })
    ```
    
    <br/>
3. `Dockerfile`이라는 새 파일(확장자 없음)을 만들고 다음 코드를 추가합니다.

    <br/>

    <aside>
    👉 Dockerfile이란 docker image를 어떻게 생성할 것인지를 정의한 파일입니다.
    
    </aside>
    
    ```docker
    FROM node:14-alpine
    
    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD [ "node", "app.js" ]
    ```
    <br/>
    <aside>
    👉 `FROM` 이란 Docker image를 생성할 때 기본으로 사용할 base image를 적는 부분입니다.
    
    </aside>
    <br/>
    <aside>
    👉 `COPY src dst`  호스트 머신에 있는 파일이나 폴더를, dst라는 위치에 저장합니다.
    
    </aside>
    <br/>
    <aside>
    👉 `RUN script` 는 script를 실행합니다
    
    </aside>
    <br/>
    <aside>
    👉 `CMD` 는 생성된 docker image를 실행할 때 자동으로 실행되는 커맨드 입니다.
    
    </aside>
    <br/>
4. 프로젝트 디렉토리에서 터미널 창을 열고 다음 명령어를 실행하여 Docker 이미지를 빌드합니다.
    
    ```bash
    docker build -t my-express-app:version1 .
    ```
    
    ```bash
    docker build -t docker-memo:version1 .
    ```
    
    <aside>
    👉 -t 옵션을 사용하면 image에 원하는 이름을 붙일 수 있습니다. `{image_name}:{tag}` 의 형태로 사용하며, `{tag}`를 붙이지 않을경우 자동으로 `latest`가 됩니다.
    
    </aside>
    <br/>
    <aside>
    👉 `.` 는 docker build를 어느 위치에서 실행할 것인지 정의합니다. 이 위치에 따라 `COPY` 커맨드에서 호스트의 파일 위치를 사용하는게 바뀔 수 있습니다.
    
    </aside>
    <br/>
5. 이미지가 빌드되면 다음 명령어를 사용하여 새 컨테이너를 실행할 수 있습니다.
    
    ```bash
    docker run -p 3000:3000 my-express-app
    ```
    <br/>
6. 이제 웹 브라우저를 열고 **`http://localhost:3000`**으로 이동하여 "Hello World!" 메시지를 확인할 수 있습니다.

<br/>

## Docker를 이용한 간단한 Express 앱 업데이트 하기
    
<br/>

Docker 이미지는 한번 만들어진 경우, 수정되지 않습니다. 따라서 값이 변경될 경우, 새로 image를 만들고 tag를 새로 답니다.    
<br/>

1. Express 앱 수정하기
    
    ```tsx
    const express = require('express')
    const app = express()
    
    app.get('/', (req, res) => {
      res.send('Hello Kumoh42!')
    })
    
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')
    })
    ```
       
    <br/> 
2. Docker image 빌드하기
    
    ```bash
    docker build . -t docker-memo:version2
    ```
    
    <aside>
    👉 -t 옵션을 사용할 때 동일한 `image_name:tag` 를 사용할경우 override되게 됩니다.
    
    </aside>
    
    <br/>
3. Docker container 실행하기
    
    ```bash
    docker run -d -p 3000:3000 docker-memo:version2
    ```
