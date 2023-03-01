## Docker-compose 알아보기

<aside>
🔥 편하게 여러 docker 컨테이너를 한 번에 띄워주는 docker-compose에 대해 알아봅시다.

</aside>

Docker Compose는 멀티 컨테이너 Docker 어플리케이션을 정의하고 실행할 수 있는 도구입니다. 멀티 컨테이너 어플리케이션은 여러 서비스 또는 컴포넌트로 구성된 어플리케이션으로, 각각의 서비스는 독립적으로 자신의 Docker 컨테이너에서 실행됩니다. 예를 들어, 웹 어플리케이션은 웹 서버, 데이터베이스, 캐시 등 여러 서비스로 구성될 수 있습니다.

Docker Compose는 간단한 YAML 파일인 "docker-compose.yml" 파일을 통해 각 서비스의 구성을 정의할 수 있습니다. 이 파일은 어플리케이션을 구성하는 서비스와 그 구성 옵션(어떤 Docker 이미지를 사용할 것인지, 컨테이너 간 링크 방법, 노출할 포트 등)을 지정합니다.

"docker-compose.yml" 파일을 작성하면, Docker Compose를 사용하여 하나의 명령으로 모든 컨테이너를 시작할 수 있습니다. 이렇게 하면 어플리케이션을 전체적으로 쉽게 시작, 중지 및 관리할 수 있습니다.

## **Docker Compose를 사용하여 express & mysql 환경 구축하기**

Docker Compose를 사용하면 멀티 컨테이너 Docker 어플리케이션을 정의하고 실행할 수 있습니다. 이 예제에서는 Docker Compose를 사용하여 Express.js 웹 어플리케이션과 MySQL 데이터베이스를 구성하고, 사용자 정의 네트워크와 영구 저장 볼륨을 사용합니다:

1. 프로젝트를 위한 새로운 디렉토리를 생성하고, 해당 디렉토리에 "docker-compose.yml" 파일을 생성합니다.
    
    <aside>
    🙋‍♂️ docker-compose.yaml이라는 이름으로 만들면 docker-compose command를 사용할 때 기본으로 사용됩니다.
    
    </aside>
    
2. "docker-compose.yml" 파일에서 어플리케이션을 구성하는 서비스를 정의합니다. 이 예제에서는 Express.js 어플리케이션을 실행하는 "web" 서비스와 MySQL 데이터베이스를 실행하는 "db" 서비스를 정의합니다.
    
    <aside>
    🙋‍♂️ 맨 위에 version은 docker-compose의 스키마의 버젼을 뜻합니다.
    
    </aside>
    
    <aside>
    🙋‍♂️ services 밑에 container의 정의를 적어서 사용합니다.
    
    </aside>
    
    <aside>
    🙋‍♂️ build를 적어두면 이미지를 빌드하여 사용합니다.
    
    </aside>
    
    ```yaml
      version: '3.9'

      services:
        web:
          build: .
          ports:
            - "3000:3000"
          depends_on:
            mysql:
              condition: service_healthy
          restart: unless-stopped
        mysql:
          image: mysql:8.0
          environment:
            MYSQL_ROOT_PASSWORD: example
            MYSQL_DATABASE: my_db
          volumes:
            - db-data:/var/run/mysql
          ports:
            - "3306:3306"
          healthcheck:
            test: ["CMD", "curl", "-f", "http://localhost:3306"]
            interval: 10s
            timeout: 5s
            retries: 10

      volumes:
        db-data:

      networks:
        my-network:
    ```
    
    <aside>
    👉 "docker-compose.yml" 파일은 "web"과 "db" 두 개의 서비스를 정의합니다.
    
    </aside>
    
    <aside>
    👉 "web" 서비스는 현재 디렉토리에서 Dockerfile을 사용하여 빌드되며, 3000번 포트를 노출하고 "db" 서비스에 의존하며, "my-network"라는 사용자 정의 네트워크에 연결되며 "/app"에 영구 저장 볼륨이 마운트됩니다.
    
    </aside>
    
    <aside>
    👉 "db" 서비스는 MySQL 8.0 이미지를 사용하며, root 암호를 "example"로 설정하고, "my-network" 네트워크에 연결되며 "/var/lib/mysql"에 영구 저장 볼륨이 마운트됩니다.
    
    </aside>
    
3. Express.js 어플리케이션의 이미지를 정의하기 위해 프로젝트 디렉토리에 Dockerfile을 생성합니다. 다음은 Express.js 어플리케이션을 위한 Dockerfile의 예입니다:
    
    ```docker
    FROM node:14
    
    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD ["node", "app.js"]
    ```
    
    이 Dockerfile은 Node.js 환경을 설정하고, 작업 디렉토리를 "/app"로 설정하고, 의존성을 설치하고, 어플리케이션 코드를 컨테이너로 복사하고, 3000번 포트를 노출하며, "npm start" 명령을 사용하여 어플리케이션을 시작합니다.
    
4. "docker-compose up" 명령을 사용하여 어플리케이션을 시작합니다:
    
    ```bash
    docker-compose up
    ```
    
    이 명령은 "web"과 "db" 서비스를 시작하고, 사용자 정의 네트워크와 영구 저장 볼륨을 생성하고, 컨테이너를 서로 연결합니다.
    
5. 어플리케이션이 실행되면, 웹 브라우저에서 "localhost:3000"으로 이동하여 Express.js 어플리케이션이 리스닝하는 3000번 포트로 접속할 수 있습니다.
6. docker-compose down 명령어로로 container를 삭제할 수 있습니다.
    
    ```bash
    docker-compose down
    ```
    

이렇게 Docker Compose를 사용하여 사용자 정의 네트워크와 영구 저장 볼륨을 사용하여 멀티 컨테이너 Docker 어플리케이션을 쉽게 구성할 수 있습니다. 이를 통해 다양한 서비스와 컴포넌트를 사용하는 어플리케이션을 개발하고 배포하는 것이 쉬워지며, 개발자와 시스템 관리자 모두에게 강력한 도구를 제공합니다.