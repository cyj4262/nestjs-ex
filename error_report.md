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

## Delete request with 2 Params 
- Repository.d.ts의 delete 함수에는 하나의 인수만 입력받게 되어있어서 강의에서 나오는
```
const query = await this.boardRepository.delete({id,user});
```
- 코드를 구현할 수가 없었다.
- 그래서 createQueryBuilder 함수를 이용하여 자신이 생성한 게시문인지 유저id로 leftjoin하여 유저id가 작성한 board만 간추린 후 id를 비교하여 찾아내도록 구성하였다.
<pre>
<code>
async deleteBoard(id: number, user: User): Promise<void> {

        const query = this.boardRepository.createQueryBuilder("board")
        .leftJoinAndSelect("board.user", "user", "user.id = :user1", { user1: user.id })
        .where('board.id = :id', { id })  
        .delete();

        const result = await query.execute();

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
</code>
</pre>
