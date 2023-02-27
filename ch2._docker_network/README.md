## 도커 네트워크란?

여러 개의 도커 컨테이너를 실행할 때, 이들이 서로 통신할 수 있도록 하기 위해서 도커 네트워크를 사용합니다. 도커 네트워크는 도커 컨테이너끼리 연결하여 가상의 네트워크를 구성할 수 있게 해주는 기능입니다.

이것은 마치 서로 대화하려는 사람들이 일정한 네트워크를 통해 연결되어야 한다는 것과 비슷합니다. 전화망이나 인터넷망처럼 말이죠. 도커 컨테이너도 마찬가지입니다. 서로 통신하려면 어떤 네트워크를 통해 연결되어 있어야 합니다.

도커 네트워크를 생성할 때는 다양한 종류의 네트워크를 선택할 수 있습니다. 대표적으로 브릿지 네트워크, 오버레이 네트워크, 호스트 네트워크가 있습니다. 각각의 네트워크 유형은 각각의 특성과 사용 사례가 있습니다.

예를 들어, 브릿지 네트워크는 새로운 도커 컨테이너를 실행할 때 기본으로 생성되는 유형입니다. 이 네트워크를 통해 동일한 네트워크에 속한 컨테이너끼리 통신할 수 있지만, 다른 네트워크에 속한 컨테이너와는 통신할 수 없습니다. 다른 네트워크와의 연결이 필요한 경우에는 네트워크 간 링크를 만들어야 합니다.

반면, 오버레이 네트워크는 다른 도커 호스트에 있는 컨테이너끼리 통신할 수 있도록 해줍니다. 이는 여러 호스트에 걸쳐 다중 컨테이너 애플리케이션을 배포하는 데 유용합니다.

호스트 네트워크는 도커 컨테이너가 호스트의 네트워킹 리소스를 직접 사용할 수 있도록 해줍니다. 이는 호스트의 네트워킹 리소스에 직접적인 액세스가 필요한 고성능 애플리케이션에 유용합니다.

전반적으로 도커 네트워킹은 가상의 네트워크를 생성하여 도커 컨테이너끼리 연결하게 해주는 강력한 도구입니다. 다양한 유형의 네트워크를 이해하고, 각각의 사용 사례에 적합한 네트워크를 선택하여 적용함으로써, 특정 사용 사례에 최적화된 도커 네트워크를 생성할 수 있습니다.

## **Docker Networking를 사용하여 MySQL 및 Express 통합**

이 예제는 Docker Networking을 사용하여 MySQL 데이터베이스와 Express 앱 컨테이너를 통합하는 방법을 보여줍니다.

1. 프로젝트를 위한 새 디렉토리를 만들고 명령 줄에서 해당 디렉토리로 이동합니다.
2. Express 앱을 위한 **`app.js`** 파일을 만들고 다음 코드를 추가합니다:
    
    ```tsx
    const express = require('express');
    const mysql = require('mysql');
    
    const app = express();
    
    const connection = mysql.createConnection({
      host: 'mysql',
      user: 'root',
      password: 'root',
      database: 'my_db'
    });
    
    connection.connect((err) => {
      if (err) throw err;
      console.log('MySQL 데이터베이스에 연결되었습니다!');
    });
    
    app.get('/', (req, res) => {
      connection.query('SELECT * FROM my_table', (error, results) => {
        if (error) throw error;
        res.send(results);
      });
    });
    
    app.listen(3000, () => {
      console.log('앱이 포트 3000에서 실행되었습니다!');
    });
    ```
    
    이 코드는 Express 앱과 MySQL 데이터베이스 연결을 설정합니다. MySQL 데이터베이스에 연결하고 **`my_table`** 테이블에서 데이터를 검색합니다. 그런 다음 HTTP 응답에서 결과를 클라이언트에게 보냅니다.
    
    참고: **`mysql.createConnection()`** 메소드에서 **`host`** 속성을 **`mysql`**로 설정하면 MySQL 컨테이너의 호스트 이름입니다. 동일한 Docker 네트워크에서 컨테이너를 실행하므로 가능합니다.
    
3. Express 앱을 위한 Dockerfile을 만들고 다음 코드를 추가합니다
    
    ```docker
    FROM node:14-alpine
    
    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD [ "node", "app.js" ]
    ```
    
4. 다음 명령을 사용하여 **`my-network`**라는 Docker 네트워크를 만듭니다:
    
    ```bash
    docker network create my-network
    ```
    
    이 명령은 **`my-network`**라는 Docker 네트워크를 만듭니다.
    
5. 다음 명령을 사용하여 MySQL 컨테이너를 시작합니다:
    
    ```bash
    docker run --name mysql --network my-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=my_db -d mysql:8.0
    ```
    
    이 명령은 root 패스워드가 **`root`**이고 데이터베이스 이름이 **`my_db`**인 MySQL 컨테이너를 시작합니다. **`--network my-network`** 옵션은 MySQL 컨테이너를 **`my-network`** 네트워크에 연결합니다. 이로써 앱 컨테이너에서 MySQL 컨테이너에 연결할 수 있게 됩니다.
    
6. 다음 명령을 사용하여 앱 컨테이너를 시작합니다:
    
    ```bash
    docker run --name myapp --network my-network -p 3000:3000 -d myapp
    ```
    
    이 명령은 앱 컨테이너를 시작하고 **`my-network`** 네트워크에 추가합니다. 또한 컨테이너의 포트 3000을 컴퓨터의 포트 3000에 매핑합니다.
    
7. 웹 브라우저를 열고 **`http://localhost:3000`**으로 이동하여 MySQL 데이터베이스에서 검색한 데이터를 볼 수 있습니다.