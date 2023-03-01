## **Docker 볼륨**

<aside>
🔥 도커 데이터를 보관해주는 Docker 볼륨에 대해 알아봅시다!

</aside>

Docker 볼륨은 Docker 컨테이너 내에서 데이터를 저장하고 관리하는 방법입니다. 호스트 머신의 파일 시스템과 격리된 가상 하드 드라이브와 같다고 생각하면 됩니다. Docker 볼륨을 사용하여 컨테이너가 중지되거나 삭제된 후에도 데이터를 지속적으로 보존할 수 있으므로 다른 컨테이너 간에 데이터를 저장하고 공유하기 쉬워집니다.

Docker 볼륨에는 익명 볼륨과 이름이 지정된 볼륨 두 가지 유형이 있습니다. 익명 볼륨은 컨테이너를 시작할 때 Docker가 자동으로 생성하며, 일반적으로 컨테이너 간에 공유할 필요가 없는 일시적인 데이터에 사용됩니다. 반면, 이름이 지정된 볼륨은 사용자가 만들며, 컨테이너 간에 공유할 수 있습니다.

다음은 Docker 볼륨을 사용하는 방법의 예입니다:

예를 들어 데이터베이스에 사용자 데이터를 저장하는 애플리케이션이 있다고 가정해 봅시다. 이 애플리케이션을 Docker 컨테이너에서 실행하고 데이터베이스 데이터를 별도의 볼륨에 저장하고 싶습니다. 이렇게 하면 컨테이너가 삭제되거나 다시 생성되더라도 사용자 데이터가 보존됩니다.

이를 위해 다음 명령을 사용하여 이름이 지정된 볼륨을 만듭니다:

```bash
docker volume create my-volume
```

이 명령은 **`my-volume`**라는 이름이 지정된 볼륨을 만듭니다. 그런 다음 다음 명령을 사용하여 볼륨을 마운트하여 컨테이너를 시작할 수 있습니다:

```bash
docker run -d --name my-container -v my-volume:/data my-image
```

이 명령은 **`my-image`** 이미지를 사용하여 컨테이너를 시작하고, **`my-volume`** 이름이 지정된 볼륨을 컨테이너의 **`/data`** 디렉터리에 마운트합니다. 컨테이너의 **`/data`** 디렉터리에 기록된 모든 데이터는 호스트 머신의 **`my-volume`** 이름이 지정된 볼륨에 저장됩니다.

또한 호스트 머신의 디렉터리를 Docker 컨테이너에 바인드 마운트하여 사용할 수도 있습니다. 예를 들어, 호스트 머신에 **`/path/to/my/data`** 디렉터리가 있고 이를 컨테이너에 마운트하려면 다음 명령을 사용할 수 있습니다:

```bash
docker run -d --name my-container -v /path/to/my/data:/data my-image
```

이 명령은 호스트 머신의 **`/path/to/my/data`** 디렉터리를 컨테이너의 **`/data`** 디렉터리에 마운트합니다. 컨테이너의 **`/data`** 디렉터리에 기록된 모든 데이터는 호스트 머신의 **`/path/to/my/data`** 디렉터리에 저장됩니다.

요약하면, Docker 볼륨은 Docker 컨테이너에서 데이터를 저장하고 관리하는 방법입니다. **`docker volume create`** 명령을 사용하여 이름이 지정된 볼륨을 만들고, **`docker run`** 명령의 **`-v`** 옵션을 사용하여 컨테이너에 볼륨을 마운트할 수 있습니다. Docker 볼륨을 사용하면 컨테이너가 중지되거나 삭제된 후에도 데이터를 지속적으로 보존할 수 있으므로 데이터를 저장하고 공유하기가 쉬워집니다.

## **Docker Volume을 사용하여 서버 데이터 유지하기**

1. 새로운 프로젝트 디렉터리를 만들고 해당 디렉터리로 이동합니다.
2. Express.js 애플리케이션을 위한 **`Dockerfile`**을 작성합니다:
    
    ```docker
    FROM node:14
    
    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD ["node", "app.js"]
    ```
    
    이 **`Dockerfile`**은 Node.js 환경을 설정하고 작업 디렉터리를 **`/app`**로 설정한 다음 의존성을 설치하고 컨테이너에 애플리케이션 코드를 복사하며 포트 3000을 노출합니다. **`npm start`** 명령을 사용하여 애플리케이션을 시작합니다.
    
3. Express.js 애플리케이션 이미지를 빌드합니다:
    
    ```bash
    docker build -t my-express-app .
    ```
    
    이 명령은 현재 디렉터리의 **`Dockerfile`**을 기반으로 **`my-express-app`**이라는 Docker 이미지를 생성합니다.
    
4. MySQL 데이터를 유지하기 위해 이름 있는 Docker 볼륨을 만듭니다:
    
    ```bash
    docker volume create mysql_data
    ```
    
    이렇게 하면 **`mysql_data`**라는 이름의 볼륨이 생성되어 MySQL 데이터를 유지하는 데 사용됩니다.
    
5. MySQL 서비스를 위한 컨테이너를 시작합니다:
    
    ```bash
    docker run --name mysql -e MYSQL_ROOT_PASSWORD=example -e MYSQL_DATABASE=mydatabase -e MYSQL_USER=myuser -e MYSQL_PASSWORD=mypassword -v mysql_data:/var/lib/mysql -d mysql:8.0
    ```
    
    이 명령은 MySQL 8.0 이미지를 사용하여 **`mysql`**이라는 이름의 컨테이너를 시작하고 루트 암호, 데이터베이스 이름, 사용자 및 암호를 환경 변수로 설정하며 **`mysql_data`** 볼륨을 마운트하여 MySQL 데이터를 유지합니다.
    
6. Express.js 애플리케이션을 위한 컨테이너를 시작합니다:
    
    ```bash
    docker run --name express-app -p 3000:3000 -v "$(pwd)":/app --link mysql:mysql -d my-express-app
    ```
    
    이 명령은 **`my-express-app`** 이미지를 사용하여 **`express-app`**이라는 이름의 컨테이너를 시작하고 포트 3000을 노출하며 현재 디렉터리를 **`/app`**에 마운트하여 애플리케이션 코드를 사용할 수 있게 합니다. 또한 **`--link`** 옵션을 사용하여 **`mysql`** 컨테이너를 연결합니다.
    
    이제 웹 브라우저에서 **`localhost:3000`**으로 이동하여 Express.js 애플리케이션에 액세스하면 됩니다. 이제 애플리케이션은 MySQL 데이터베이스에 연결하고 **`mysql_data`** 볼륨에 데이터를 유지할 수 있어야 합니다.
    

Docker 볼륨을 사용하여 MySQL 데이터를 유지하면 컨테이너가 중지되거나 다시 시작될 때 데이터가 손실되지 않도록 할 수 있습니다. 이를 통해 MySQL 및 기타 서비스를 사용하는 애플리케이션을 개발 및 배포하는 것이 쉬워지며, 개발자 및 시스템 관리자 모두에게 강력한 도구를 제공합니다.