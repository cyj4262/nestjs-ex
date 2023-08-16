# 에러사항 기록

## RepositoryNotFoundError: No repository for "BoardRepository" was found.
- 0814
- boards.module.ts에서 import 부분의 forfeature 안에를 BoardRepository가 아닌 Board(Entity)로 변경
- boards.service.ts에서 @InjectRepository 어노테이션을 BoardRepository에서 Board로 변경
- https://velog.io/@wonjun1995/RepositoryNotFoundError-No-repository-for-BoardRepository-was-found.-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0

## typeorm 0.3.x 버전 오류
- 위와 같이 해결하였지만 강의를 진행하면서 repository 부분을 변경하였더니 오류가 생겨서 다시 0.3버전으로 install 하였음
- 그리고 아래의 주소에 나온 방법대로 수행하여 오류를 해결함
- https://www.inflearn.com/questions/688093/typeorm-0-3-x-%EB%B2%84%EC%A0%84-%EC%98%A4%EB%A5%98

- typeorm-ex.decorator.ts 와 typeorm-ex.module.ts 를 아래의 주소를 참고해 작성하여 0.3. 버전의  @EntityRepository가 deprecated 된 부분을 처리하였음
- @EntityRepository 를 대체할 데코레이터를 따로 만듬
- https://velog.io/@pk3669/typeorm-0.3.x-EntityRepository-%EB%8F%8C%EB%A0%A4%EC%A4%98
