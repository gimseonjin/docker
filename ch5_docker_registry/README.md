## Docker 어플리케이션 공유하기

<aside>
🔥 우리가 만든 어플리케이션을 어디에서든 공유할 수 있게 만들어 보겠습니다!

</aside>

도커 레지스트리는 소프트웨어 어플리케이션인 도커 이미지를 저장하고 다른 사용자들이 접근할 수 있도록 하는 디지털 라이브러리입니다. 도커 이미지는 애플리케이션의 코드, 설정 파일 및 다른 필수 구성 요소와 같은 것들을 포함하는 패키지로 생각할 수 있습니다. 레지스트리는 이러한 패키지를 저장하므로 다른 사람들이 쉽게 공유하고 사용할 수 있습니다.

도커를 사용하여 작성된 애플리케이션을 사용하려면, 먼저 사용자는 해당 애플리케이션의 도커 이미지를 로컬 컴퓨터에서 만듭니다. 그런 다음 이미지를 도커 레지스트리에 업로드하여 다른 사용자들이 접근하고 다운로드할 수 있습니다.

다양한 공개 및 비공개 도커 레지스트리가 있으며, 일부는 무료로 사용 가능하고 대중에게 공개되어 있으며, 다른 것들은 인증이 필요하고 기업 및 조직에서 자체적으로 이미지를 비공개로 유지하는 데 사용됩니다.

인기있는 공개 도커 레지스트리에는 Docker Hub, Quay 및 Google Container Registry가 있습니다. 이러한 레지스트리는 전 세계의 개발자들이 만든 이미지를 호스팅하며 사용자들은 다양한 응용 프로그램에 대한 이미지를 검색하고 다운로드할 수 있습니다.

도커 레지스트리는 도커 이미지를 저장하는 것 외에도, 이미지를 관리하고 배포하는 데 필요한 기능을 제공합니다. 예를 들어, Docker Hub는 이미지 버전 관리, 태그 등 이미지 공유를 위한 기능을 제공하여 개발자들이 프로젝트를 협업하고 다른 사람들과 작업을 공유할 수 있도록 쉽게 만듭니다.

도커 레지스트리는 도커 이미지가 저장되고 공유되는 중요한 역할을 합니다. 도커 이미지로 작성된 소프트웨어 애플리케이션을 쉽게 사용할 수 있도록 중앙 위치에서 제공되며 사용자들이 필요한 소프트웨어 애플리케이션을 쉽게 찾아 사용할 수 있도록 도와줍니다. 이러한 기능들은 개발자들이 프로젝트를 협업하고 다른 사람들과 작업을 공유할 수 있도록 하는 데 큰 도움을 줍니다.

총괄적으로, 도커 레지스트리는 도커 이미지가 저장되고 공유되는 중앙 위치로, 사용자들이 도커로 작성된 소프트웨어 애플리케이션을 쉽게 액세스하고 사용할 수 있도록 합니다.

## **Docker Hub를 registry로 사용해보기**

1. Docker hub에 가입하기(이 부분은 생략)
2. docker hub에 repository를 만듭니다.
    
    
    ![Untitled 3](https://user-images.githubusercontent.com/66009926/222083897-dc5a5b76-e5de-4bb7-8c63-9c0466767679.png)

3. 로컬로 돌아와서 docker hub에 로그인합니다.
    
    ```bash
    docker login
    # 후에 나오는 username, password에 치면 됩니다!
    ```
    
4. docker image를 빌드합니다. 이때 도커 이미지의 이름을 repository와 동일하게 만들어주어야 합니다.
    
    ```bash
    docker build -t {user_id}/docker-memo:version2 .
    ```
    
5. github처럼 docker image를 push합니다.
    
    ```bash
    docker push carrykim/docker-memo:version2
    ```
    ![Untitled 4](https://user-images.githubusercontent.com/66009926/222083793-bbe34785-39c2-4ece-b6d2-0308b252a83f.png)
    
    
6. docker image 가져오는 방법은 아래 명령어를 통해 가져옵니다.
    
    ```bash

    docker pull carrykim/docker-memo:version2
    ```
    
7. 만약 기존에 docker image가 존재한다면 docker image를 삭제해줘야합니다.
    
    ```bash
    docker rmi carrykim/docker-memo:version2
    ```
    
8. docker image 실행하기
    
    ```bash
    docker run -p 80:3000 carrykim/docker-memo:version2
    ```
