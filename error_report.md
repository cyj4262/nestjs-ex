# 에러사항 기록

## RepositoryNotFoundError: No repository for "BoardRepository" was found.
- 0814
- boards.module.ts에서 import 부분의 forfeature 안에를 BoardRepository가 아닌 Board(Entity)로 변경
- boards.service.ts에서 @InjectRepository 어노테이션을 BoardRepository에서 Board로 변경
- https://velog.io/@wonjun1995/RepositoryNotFoundError-No-repository-for-BoardRepository-was-found.-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
