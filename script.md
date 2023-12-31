따라하면서 배우는 NestJS
=========================

## NestJS를 사용해서 만드는 앱 구조
- app module 안에 boardmodule과 authmodule이 있으면 각 모듈안에 controller entit service 등이 있습니다. 그래서 우선 모듈(module)이 무엇인지 알아보겠습니다.

## NestJS 모듈이란?
- 모듈은 @Module() 데코레이터로 주석인 달린 클래스입니다. @Module () 데코레이터는 Nest가 애플리케이션 구조를 구성하는데 사용하는 메타 데이터를 제공합니다.
- 각 응용프로그램에서는 하나 이상의 모듈(루트 모듈)이 있습니다. 루트 모듈은 Nest가 사용하는 시작점입니다.
- 모듈은 밀접하게 관련된 기능 집합으로 구성 요소를 구성하는 효과적인 방법입니다. (기능별로 만듭니다) ex)유저 모듈 , 주문 모듈, 챗 모듈....
- 같은 기능에 해당하는 것들은 하나의 모듈 폴더안에 넣어서 사용합니다. (Usercontroller, UserService, UserEntity 다 같은 기능이기에 UserModule 안에 넣습니다.)
- 모듈은 기본적으로 싱글 톤이므로 여러 모듈간에 쉽게 공급자의 동일한 인스턴스를 공유 할 수 있습니다.

## 모듈 생성하기
- board 모듈 생성 명령어 -> nest g module boards
- nest : using nestcli
- g : generate
- module : schematic that i want to create
- boards :  name of the schematic


## 방금 생성한 boardMoudule을 사용하기 위해서는...
- 루트 모듈인 app.module.ts에 등록해주어야 합니다. 이건 board 모듈을 생성할 때 자동으로 등록이 됩니다.

## Controller 란?
- 컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환합니다.
- 컨트롤러는 @Controller 데코레이터로 클래스를 데코레이션하여 정의됩니다.
- 데코레이터는 인자를 Controller에 의해서 처리되는 "경로"를 받습니다.

## Handler 란 ?
- 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식된 컨트롤러 클래스 내의 단순한 메서드입니다.

## Boards Controller 생성하기 
- boards Controllers 생성하기 -> nest g controller boards --no-spec
- nest : using nestcli
- g : generate
- controller : constroller schematic
- boards :  name of the schematic
- --no-spec : 테스트를 위한 소스 코드 생성 X

# NestJS Providers, Service 란?
## Providers 란?
- 프로바이더는 Nest의 기본 개념입니다. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 프로바이더로 취급될 수 있습니다. 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 것입니다. 즉, 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있습니다.

## Service 란?
- 서비스는 소프트웨어 개발내의 공통 개념이며, NestJS Javascript에서만 쓰이는 개념이 아닙니다. 
- @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용 될 수 있습니다.
- 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을처리합니다.

## Service를 Controller에서 이용할 수 있는 방법(Dependency Injection)
- 위에 보면 Controller에서 this.appService.getHello(); 이런식으로 Service에 정의해놓은 메소드를 Controller에서 가져와서 쓰는 걸 볼 수 있습니다.
- 위에 보면 BoardsService를 Contructor 클래스에서 가져오고(Injected) 있습니다. 그런 후에 Private 문법을 사용하고 있습니다. 이렇게 해서 boardsService를 정의해서 Controller안에서 사용할 수 있게 만들었습니다. 이렇게 할 수 있는 이유는 타입스크립트의 기능을 이용해서 종속성을 타입으로 해결할 수 있기 때문입니다.

## Provider 등록하기 
- Provider를 사용하기 위해서는 이것을 Nest에 등록해줘야지 사용할 수가 있습니다.
- 등록하기 위해서는 module 파일에서 할 수 있습니다. module 파일에 providers 항목안에 해당 모듈에서 사용하고자 하는 Provider 를 넣어주시면 됩니다.

## Board Service 만들기
- Service 안에서는 데이터베이스 관련된 로직을 처리하겠습니다. 데이터베이스에서 데이터를 가져오거나 데이터베이스 안에 거시판 생성할 때 그 생성한 게시판 정보를 넣어주는 등의 로직을 처리하겠습니다.
- board Service 생성하기 -> nest g service boards --no-spec
- nest : using nestcli
- g : generate
- service : service schematic
- boards :  name of the schematic
- --no-spec : 테스트를 위한 소스 코드 생성 X

## BoardService
- CLI를 이용해서 Service를 생성하면 이렇게 boards.service.ts 파일이 생성됩니다.
- 이 생성된 파일 안에는 Injectable 데코레이터가 있으며 이 NestJS는 이것을 이용해서 다른 컴포넌트에서 이 서비스를 사용할 수 있게(Injectable)만들어줍니다.
- 그리고 CLI로 Service 생성시에는 module에도 자동으로 Service가 추가됩니다.

## Board Service 를 Board Controller에서 이요할 수 있게 해주기 (Dependency Injection)
- NestJs 에서 Dependency Injection은 클래스의 Constructor안에서 이루어 집니다.

<pre>
<code>
@Controller('boards')
exprot class BoardsController {
    boardsService: BoardsService;
    constructor (boardsService: BoardsService){
        this.boardsService = boardsService;
    }
}
</code>
</pre>
1. boardsService 파라미터에 BoardsService 객체를 타입으로 지정해줍니다.
2. 이 boardsService 파라미터를 BoardsController 클래스 안에서 사용하기 위해서 this.boardsService 프로퍼티에 boardsService 파라미터를 할당해줍니다.
3. 하지만 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문에 위에 boardsService: BoardsService로 선언해줍니다.
4. 이렇게 갖게된 boardsService 프로퍼티를 이용해서  BoardsController 클래스안에서 활용을 할 수가 있습니다.

## 접근 제한자를 이용해서 소스 간단하게 하기
- 접근 제한자(public, protected, private)을 생성자(constructor) 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.

## 정리
- 클라이언트에서 요청을 보내면 먼저 컨트롤러로 가며 컨트롤러에서 알맞은 요청 경로에 라우팅해서 해당 핸들러로 가게 해줍니다.
- 그런 후에 요청을 처리해주기 위해서 서비스로 들어가며 그 요청에 맞는 로직을 서비스에서 처리해준 후 컨트롤러에 리텅값을 보내준 후 컨트롤러에서 클라이언트로 결과값을 보내줍니다.
- 그래서 컨트롤러에서는 요청을 처리하고 결과값을 리턴해주는 역할을 합니다.

## Board Model 정의하기
- 생성 기능을 만들기 전에 필요한 데이터가 어떤것이 필요한지를 정의해주기 위해서 모델을 만들어줍니다.
- board Model 파일 생성 -> board.model.ts
- 모델을 정의하기 위해서는 Class를 이용하거나 Interface를 이용하면 됩니다.
- Interface -> 변수의 타입만을 체크합니다.
- Class -> 번수의 타입도 체크하고 인스턴스 또한 생성할 수가 있습니다.

## board 모델 만들기
- board.model.ts 생성 -> interface로 구조 정의

## BoardStatus 란...?
- 이 게시물이 공개 게시물인지 아니면 비밀 게시물인지 나눠주는 것
- 그리고 이 두가지 상태 이외에는 나오면 안되기 때문에 이 두가지의 상태만 나올수 있게 하기 위해서 타입스크립트의 기능은 enumeration을 이용하겠습니다.
- 이렇게 status에 enum을 이용해서 정의한 BoardStatus를 넣어주면 BoardStatus에서 넣어준 PUBLIC이나 PRIVATE 상태만을 사용할 수 있습니다.

## 이렇게 타입을 정의해주면 좋은이유?
- 타입 정의해주는 것은 선택사항입니다.
- 하지만 이렇게 타입을 정의해주므로서 원하는 타입과 다른 코드를 사용할 시 에러가 발생합니다. 
- 그리고 코드를 읽는 입장에서 더 코드를 쉽게 이해하며 읽을 수 있습니다. (readbale)

## 기능을 만들기 위해서는...
- 게시물에 관한 로직을 처리하는 곳은 Service 입니다. 그래서 먼저 Service에서 로직을 처리해준 후에 Controller에서 서비스를 불러와주겠습니다. 
- Service -> Controller
- 게시물 ID는 유니크 해야함으로 현재는 데이터베이스를 안쓰기 때문에 임의로 uuid 모듈을 이용해서 유니크한 값을 주겠습니다.

## 로직 부분을 처리했다면 이제 Request와 Response 부분 처리
- request와 response 부분 처리는 Controller에서 해주면 됩니다.

## 클라이언트에서 보내온 값들은 핸들러에서 어떻게 가져오나요?
- Express에서는 bodyParser 모듈을이용해서 req.body 이런식으로 클라이언트에서 보내온 값을 받아왔습니다.
- NestJS에서는 어떻게 받아올까요? -> @Body() body를 이용해서 가져옵니다.
- 이렇게 하면 모든 requser에서 보내온 값을 가져올 수 있으며, 하나씩 가져오려면
- @Body('title') title 혹은 @Body('description') description 이런식으로 가져오시면 됩니다.

## 이제는 Service에서 로직 처리를 할 수 있게 값을 보내줍니다.
- Request에서 보내 온 값들을 Controller에서 받아오면 이 값들을 이용해서 Service에서 로직 처리를 해줘야 합니다.
- 그래서 param으로 넘겨줍니다. 

## DTO(Data Tranfer Object)는 무엇인가요?
- 계층간 데이터 교환을 위한 객체입니다.
- DB에서 데이터를 얻어 Service나 Controller등으로 보낼 때 사용하는 객체를 말합니다.
- DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체입니다.
- interface 나 class를 이용해서 정의 될 수 있습니다. (하지만 클래스를 이용하는 것을 NestJS에서는 추천하고 있습니다.)

## DTO(Data Tranfer Object)를 쓰는 이유는 무엇인가요?
- 데이터 유효성을 체크하는데 효율적입니다.
- 더 안정적인 코드로 만들어줍니다. 타입스크립트의 타입으로도 사용됩니다.

## Nest JS에서 데이터 처리의 흐름을 보면...
- Board를 위한 Property들을 여러 곳에서 사용하고 있습니다. 
- 지금은 간단한 애플리케이션을 만들기 때문에 몇개의 프로퍼티만 불러 주고 몇군데에서만 불러주면 됩니다. 하지만 정말 많은 프로퍼티를 갖고 정말 여러군데에서 이용하며 갑자기 한곳에서 property 이름을 바꿔줘야 한다면 어떻게 해야할까요?
- 이렇게 된다면 애플리케이션을 유지보수하기 정말 힘들어 질 수 있습니다.
- 이러한 경우에 DTO를 사용해서 이 문제를 해결해 줄 수 있습니다.

## Interface VS Class for DTO
- DTO는 Interface 나 Class를 사용해서 만들면 됩니다. 하지만 Class가 더 선호됩니다.

## DTO 파일 작성
- 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용합니다.
- 그래서 클래스를 사용해서 DTO를 작성합니다.

## DTO 적용하기
- 이렇게 DTO를 만들었으면 실제 Controller와 Service에서 Dto를 적용하겠습니다.
- 먼저 Controller에 적용하겠습니다. , Service

## Pipe은 무엇인가요?
- 파이프는 @Injectable() 데코레이터로 주석이 달린 클래스입니다.
- 파이프는 data transformation과 data validation을 위해서 사용됩니다.
- 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동합니다.
- Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다.

## Data Transformation?
- 입력 데이터를 원하는형식으로 변환 (예: 문자열에서 정수로)
- 만약 숫자를 받길 원하는데 문자열 형식으로 온다면 파이프에서 자동으로 숫자로 바꿔줍니다.
- String to Integer EX) string'7' => Integer 7

## Data Validation?
- 입력 데이터를 평가하고 유효한 경우 변경되지 않은 상태로 전달하면 됩니다. 
- 그렇지 않으면 데이터가 올바르지 않을 때 예외를 발생시킵니다.
- 만약 이름의 길이가 10자 이하여야 하는데 10자 이상 되면 에러를 발생시킵니다.

## 파이프는 위에 두가지 모든 경우에서...
- 라우트 헨들러(Route Handler)가 처리하는 인수에 대해서 작동합니다.
- 그리고 파이프는 메소드를 바로 직전에 작동해서 메소드로 향하는 인수에 대해서 변환 할 것이 있으면 변환하고 유효성 체크를 위해서도 호출됩니다.

## PIPE 사용하는 법(Binding Pipes) 
- 파이프를 사용하는 방법(Binding pipes)은 세가지로 나눠질수 있습니다.
- Handler-level Pipes, Parameter-level Pipes, Global-level Pipes 입니다.
- 이름에서 말하는 것 그대로 핸들러 레벨, 파라미터 레벨, 글로벌 레벨로 파이프를 사용할 수 있습니다.

## Handler-level PIpes
- 핸들러 레벨에서 @UsePipes() 데코레이터를 이용해서 사용할 수 있습니다.
- 이 파이프는 모든 파라미터에 적용이 됩니다. 

## Parameter-level Pipes
- 파라미터 레벨의 파이프 이기에 특정한 파라미터에게만 적용이 되는 파이프 입니다.

## Global pipes
- 글로벌 파이프로서 애플리케이션레벨의 파이브 입니다.
- 클라이언트에서 들어오는 모든 요청에 적용이 됩니다.
- 가장 상단 영역인 main.ts에 넣어주시면 됩니다.

## built-in pipes
- Nest JS에 기본적으로 사용할 수 있게 만들어 놓은 6가지의 파이프가 있습니다.
- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe
- 이름을 보면 각각의 파이프가 어떠한 역할을 하는지 짐작을 할 수 있습니다.

## 특정 게시물을 찾을 때 없는 경우 결과 값 처리
- 에러를 표출해주기 위해서는...
- 에외 인스턴스를 생성해서 이용해주시면 됩니다.
- NotFoundException()에 텍스트를 넣어주면 원하는 에러메세지를 출력할 수 있습니다.

## 없는 게시물을 지우려 할 때 결과 값 처리
- getBoardById를 이용해서 체크해준 후 에러면 처리하면 됩니다.

## 커스텀 파이프를 이용한 유효성 체크

### 커스텀 파이프 구현 방법
- 먼저 PipeTransform이란 인터페이스를 새롭게 만들 커스텀 파이프에 구현해줘야 합니다.
- 이 PipeTransform 인터페이스는 모든 파이프에서 구현해줘야하는 인터페이스입니다.
- 그리고 이것과 함께 모든 파이프는 transform() 메소드를 필요합니다.
- 이 메소드는 NestJS가 인자(arguments)를 처리하기 위해서 사용됩니다.

### transform() 메소드
- 이 메소드는 두개의 파라미터를 가집니다.
- 첫번째 파라미터는 처리가 된 인자의 값(value)이며
- 두번째 파라미터는 인자에 대한 메타 데이터를 포함한 객체입니다.
- transform()메소드에서 Return된 값은 Route 핸들러로 전해집니다.

## 실제로 value 와 metadata값 콘솔로 찍어보기
1. 커스텀 파이프 생성
2. 게시물에 업데이트 하는 핸들러에 커스텀 파이프 넣어주기
3. 포스트 맨으로 요청 보내기

## TypeORM (Object Relational Mapping)소개
### TypeORM이란?
- TypeORM은 node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리입니다.
- TypeORM은 MySQL, PostgreSQL, MariaDAB, SQKite,MS SQL Server, Oracle, SAP Hana 및 WebSQL과 같은 여러 데이터버이스를 지원합니다.

### ORM (Object Relational Mapping) 이란?
- 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업입니다.
- ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연한게 사용할 수 있습니다.


### TypeORM 특징과 이점
- 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성합니다.
- 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제할 수 있습니다.
- 테이블 간의 매필 (일대일, 일대다 및 다대다)을 만듭니다.
- 간단한 CLI 명령을 제공합니다.
- TypeORM은 간단한 코딩으로 ORM 프레임워크를 사용하기 쉽습니다.
- TypeORM은 다른 모듈과 쉽게 통합됩니다.

## TypeORM 애플리케이션에서 이용하기
### TypeORM을 사용하기 위해서 설치해야하는 모듈들
- @nestjs/typeorm : NestJS에서 TypeOrm을 사용하기 위해 연동시켜주는 모듈
- typeorm : TypeORM 모듈
- pg : Postgres 모듈
- npm install pg typeorm @nestjs/typeorm --save

### TypeORM 애플리케이션에 연결하기
1. TypeORM 설정파일 생성
2. TypeORM 설정파일 작성
3. 루트 Module에서 Import 합니다. (app.module.ts)
   
- Entities : 엔티티를 이용해서 데이터베이스 테이블을 생성해줍니다. 그래서 엔티티 파일이 어디에 있는지 설정해줍니다.
- synchronize : true 값을 주면 애플리케이션을 다시 실행할 때 엔티티 안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해줍니다.
   
## 게시물을 위한 엔티티(Entity) 생성하기
- TypeORM을 사용할 때는 데이터베이스 테이블로 변환 되는 Class이기 때문에 위에 처럼 하지 않고 클래스를 생성한 후 그안에 컬럼들을 정의해주시면 됩니다.
- @Entity : Entity() 데코레이터 클래스는 Board 클래스가 엔티티임을 나타내는데 사용됩니다.
옵션을 사용하여 테이블 이름을 지정할 수 있습니다.
@PrimaryGeneratedColumn(): id 필드를 정의하고, 자동으로 증가하는 기본키(primary key)를 설정합니다.
@Column(): title, description 같은 필드를 정의합니다. @Column() 데코레이터를 사용하여 열(column)을 정의하고, 해당 필드의 데이터 타입을 지정합니다. 이 경우, author와 name 필드는 각각 string 타입입니다.
@CreateDateColumn(): 생성될 때 자동으로 생성일자(createdAt)를 기록합니다.
@UpdateDateColumn(): 업데이트될 때 자동으로 업데이트 일자(updatedAt)를 기록합니다.
@DeleteDateColumn(): 삭제될 때 자동으로 삭제 일자(deletedAt)를 기록합니다. 이렇게 하면 실제로 데이터를 삭제하지 않고, 삭제된 데이터를 추적할 수 있습니다.

## Repository 생성하기
- repository : 리포지토리는 엔터티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등을 처리합니다.
1. 리포지토리 파일 생성하기
- board.repository.ts
2. 생성한 파일에 리포지토리를 위한 클래스 생성하기
- 생성 시 Reopsitory 클래스를 Extends 해줍니다. (Find, Insert, Delete 등 엔티티를 컨트롤 해줄 수 있습니다.)
- @EntityRepository()  
- : 클래스를 사용자 정의(CUSTOM) 저장소로 선언하는데 사용됩니다. 
- : 사용자 지정 저장소는 일부 특정 엔터티를 관리하거나 일반 저장소 일 수 있습니다.
3. 생성한 Repository를 다른 곳에서도 사용할 수 있기 위해서 (Injectable) board.module에서 import 해줍니다.
- board.module.ts

## 아이디를 이용해서 특정 게시물 가져오기
- 이제는 메모리에서 데이터를 가져오는게 아닌 데이터베이스에서 가져오고 TypeOTM을 쓸 때는 Repository 패턴을 사용할 것이기 때문에
- Board 서비스(service)에 Board 리포지터리(Repository)를 넣어주겠습니다. (Inject)
- @InjectRepository : 이 데코레이터를 이용해서 이 서비스에서 BoardRepository를 이용한다고 이걸 boardRepository 변수에 넣어줍니다.

## Service에서 getBoardById 메소드 생성하기
- typeOrm 에서 제공하는 findOne 메소드 사용하기
- astnc await을 이용해서 데이터베이스 작업이 끝난 후 결과값을 받을 수 있게 해주기

## 데이터베이스에 관련된 로직은 Repository로 이동 
- Repository Pattern에 대해 배웠습니다.
- 리포지토리 패턴은 서비스에 있는 데이터베이스 관련 로직을 Repository쪽으로 모아주면 됩니다.

## remove() vs delete() ?
- remove : 무조건 존재하는 아이템을 remove 메소드를 이용해서 지워야합니다. 그러지 않으면 에러가 발생합니다 (404 Error)
- delete : 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없습니다.
- 이러한 차이 때문에 remove를 이용하면 하나의 아이템을 지울 때 두번 데이터베이스를 이용해야하기 때문에 (아이템 유무+지우기) 데이터베이스에 한번만 접근해도 되는 delete 메소드를 사용해주겠습니다.

## 인증 기능 구현을 위한 준비
### CLI를 이용한 모듈, 컨트롤러, 서비스 생성
- nest g module auth : auth 모듈 생성
- nest g controller auth --no-spec : auth 컨트롤러 생성
- nest g service auth --no-spec : auth 서비스 생성
### User를 위한 Entity 생성
- 유저에 대한 인증을 하는 것이니 유저가 필요합니다. -> Entity 생성해주겠습니다.
1. user.entity.ts 파일 생성
2. 파일 소스 코드 작성

### Repository 생성
- User Entity를 생성, 수정, 삭제 등의 로직을 처리하기 위해서 Repository를 생성합니다
1. user.repository.ts 파일 생성
2. 소스 코드 작성

## 유저 데이터 유효성 체크
### Class0validator
- 유효성 체크를 하기 위해서는 class-validator 모듈을 이용하시면 됩니다.
- Dto 파일에서 Request로 들어오는 값을 정의해주고 있기 때문에 Dto 파일에 값들 하나하나에 class-validator를 이용해서 유효성 조건을 넣어주겠습니다.
### ValidationPipe
- 요청이 컨트롤러에 있는 핸들러로 들어왔을 때 Dto에 있는 유효성 조건에 맞게 체크를 해주려면 ValidationPipe을 넣어주셔야 합니다.

## 유저 이름에 유니크한 값 주기
### 두가지 방법
1. repository 에서 findOne 메소드를 이용해서 이미 같은 유저 이름을 가진 아이디가 있는지 확인하고 없다면 데이터를 저장하는 방법입니다. 하지만 이 방법은 데이터베이스 처리를 두번 해줘야합니다.
2. 데이터베이스 레벨에서 만약 같은 이름을 가진 유저가 있다면 에러를 던져주는 방법입니다. -> 두번째로 할 예정

- 이미 있는 유저를 다시 생성하려 하면 아래와 같이 에러가 나옵니다. 하지만 그냥 500 에러를 던져버립니다.
- 그 이유는 NestJS에서 에러가 발생하고 그걸 try catch 구문인 catch에서 잡아주지 않는다면 이 에러가 controller 레벨에 가서 그냥 500 에러를 던져버립니다.
- 이러한 이유 때문에 try catch 구문으로 에러를 잡아줘야합니다.

## 비밀번호 암호화 하기
- 유저를 생성할 때 현재는 비밀번호가 그대로 데이터베이스에 저장됩니다. 
- 그래서 미밀번호를 암호화 해서 저장을 하는 부분을 구현해주겠습니다.
### bcryptjs
- npm install bcryptjs --save
- import * as bcrypt from 'bcryptjs';

### 비밀번호 데이터에 저장하는 방법
1. 원본 비밀번호를 저장(최악)
2. 비밀번호를 암호화 키(Encryption Key)와 함께 암호화 (양방향)
- 어떠한 암호를 이용해서 비밀번호를 암호화 하고 그 암호를 이용하여 복호화도 가능
- 암호화 키가 노출되면 알고리즘은 대부분 오픈 되어있기 때문에 위험도 높음
3. SHA256등으로 해시(Hash)해서 저장(단방향)
- 레인보우 테이블을 만들어서 암호화된 비밀번호를 비교해서 비밀번호 알아냄
4. 솔트(salt) + 비밀번호(Plain Password)를 해시Hash로 암호화 해서 저장
- 암호화할 때 원래 비밀번호에다 salt를 붙인 후에 해시로 암호화를 한다.

## JWT에 대하여
- 로그인을 할 때 그 로그인한 고유 유저를 위한 토큰은 생성해야 하는데 그 토큰을 생성할 때 JWT라는 모듈을 사용합니다.
- 이 JWT 모듈에 대해서 알아보겠습니다.
### JWT란 무엇인가요?
- JWT(JSON Web Token)는 당사자간에 정보를 JSON 개체로 안전하게 전송하기 위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준입니다.
- 이 정보는 디지털 서명이 되어 있으므로 확인하고 신뢰할 수 있습니다.
- 간단하게 얘기하자면 정보를 안전하게 전할 때 혹은 유저의 권한 같은 것을 체크를 하기 위해서 사용하는데 유용한 모듈입니다.

### JWT 구조
- Header : 토큰에 대한 메타 데이터를 포함하고 있습니다.
- Payload : 유저 정보(issuer), 만료 기간(expiration time), 주제(subject) 등등...
- Verify Signature : JWT의 마지막 세그먼트는 토큰이 보낸 사람에 의해 서명되었으며 어떤 식으로든 변경되지 않았는지 확인하는 데 사용되는 서명입니다. 
- 서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개 키를 사용하여 생성됩니다.

## JWT를 이용해서 토큰 생성하기
- passport 모듈도 함께 사용할 것
### 필요한 모듈들 설치
- @nestjs/jwt , @nestjs/passport , passport, passport-jwt
- => npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save

### 애플리케이션에 JWT 모듈 등록하기
1. auth 모듈 imports에 넣어주기

```
@Module({
    imports: [
        JwtModule.register({
            secret: 'Secret1234',
            signOptions:{
                expiresIn: 60 * 60,
            }
        }),
        TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
```
- Secret : 토큰을 만들 때 이용하는 Secret 텍스트 (아무 텍스트나 넣어줘도 됩니다)
- ExpiresIn : 정해진 시간 이후에는 토큰이 유효하지 않게 됩니다. 60 * 60 은 한시간 이후에는 이 토큰이 더 이상 유효하지 않게 됩니다.

### 애플리케이션에 Passport 모듈 등록하기
- auth 모듈 imports에 넣어주기
- " PassportModule.register({ defaultStrategy: 'jwt' }), " 문구 추가

### 로그인 성공 시 JWT를 이용해서 토큰 생성해주기!!
1. Service 에서 SignIn 메소드에서 생성해주면 됩니다. auth 모듈에 JWT를 등록해주었기 때문에 Service에서 JWT를 가져올 수 있습니다.
2. Token을 만드려면 Secret 과 Payload가 필요합니다. Payload에는 자신이 전달하고자 하는 정보를 넣어주시면 됩니다. Role 정보든, 유저 이름이든,

## Passport, JWT 이용해서 토큰 인증 후 유저 정보 가져왹
- 유저가 로그인 할 때 토큰 생성해줬는데 이제 그 유저가 요청을 보낼 때 그 요청 안에 있는 Header에 토큰을 넣어서 요청을 보내는데 요청 안에 Payload가 있습니다. 그리고 payload 안에 유저 이름을 넣어줬습니다.
- 그리고 토큰이 유효한 토큰인지 서버에서 secret text를 이용해서 알아내면  payload 안에 유저 이름을 이용해서 데이터베이스 안에 있는 유저 이름에 해당하는 유저 정보를 모두 가져올 수 있습니다. 이러한 처리를 쉽게 해주는게 Passport 모듈입니다. 
- 그래서 passport 모듈을 이용해서 이 부분을 구현해보겠습니다

## NestJS에서 Middleware들에 대해서
### Nest JS에는 여러가지 미들웨어가 있습니다
- Pipes, Filters, Guards, Interceptors 등의 미들웨어로 취급되는 것들이 있는데 각각 다른 목적을 가지며 사용되고 있습니다.
- pipes : 파이프는 요청 유효성 검사 및 페이로드 변환을 위해 만들어집니다. 데이터를 예상한 대로 직렬화합니다.
- filters : 필터는 오류 처리 미들웨어입니다. 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성을관리하는 방법을 알 수 있습니다.
- guards : 가드는 인증 미들웨어입니다. 지정한 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려줍니다.
- Interceptors : 인터셉터는 응답 매핑 및 캐시 관리와 함께 요청 로깅과 같은 전후 미들웨어 입니다. 각 요청 전후에 이를 실행하는 기능은 매우 강력하고 유용합니다. 

### 각각의 미들웨어가 불러지는(called) 순서
- middleware -> guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client

## 커스텀 데코레이터 사용
- req.user가 아닌 바로 user 라는 파라미터로 가져올 수 있습니다.

## 인증된 유저만 게시물 보고 쓸 수 있게 만들기
### 유저에게 게시물 접근 권한 주기
1. 인증에 관한 모듈을 board 모듈에서 쓸 수 있어야 하기에 board module에서 인증 모듈 import 해오기 (이렇게 되면 AuthModule에서 export 하는 어떠한 것이든 board Module 에서 사용 가능하게 됩니다.)
2.UseGuards(AuthGuard())를 이용해서 이 사람이 요청을 줄 때 올바른 토큰을 가지고 요청을 주는지 본 후에 게시물에 접근 할 권한을 줍니다. 그리고 이 AuthGuard는 각각의 라우트 별로 줄 수도 있고 한번에 하나의 컨트롤러 안에 들어있는 모든 라우트에 줄 수도 있습니다. 
- board 컨트롤러 안에 있는 모든 라우트에 AuthGoard를 적용해 보겠습니다.

## 유저와 게시물의 관계 형성 해주기 
- 관계를 형성하기 위해서는 엔티티에 서로 간의 필드를 넣어줘야 합니다.

## 게시물 생성할 때 유저 정보 넣어주기
- 게시물 생성 요청 -> 헤더안에 있는 토큰으로 유저 정보-> 유저 정보와 게시물 관계 형성하며 게시물 형성

## 해당 유저의 게시물만 가져오기(getAlllBoards)
- 게시물을 가져올 때 해당 유저가 생성한 게시물만 가져오도록 해주겠습니다.

## 자신이 생성한 게시물을 삭제하기
- 자신이 생성한 게시물만을 삭제 할 수 있게 기능을 구현해보겠습니다.

## 로그에 대해서
- 애플리케이션을 운영할 때 보면 에러가 날 때가 많이 있습니다.
- 그럴 때 어디 부분이 문제인지 빠르고 정확하게 파악하기 위해서는 어떠한 곳에서 에러가 어떻게 나고 있는지 보기 위해서 로그를 보는게 중요합니다.
### 로그의 종류
- Log : 중요한 정보의 범용 로깅
- Warning : 치명적이거나 파괴적이지 않은 처리되지 않은 문제
- Error : 치명적이거나 파괴적인 처리되지 않은 문제
- Debug : 오류 발생시 로직을 디버그하는 데 도움이 되는 유용한 정보입니다. 개발자용
- Verbose : 응용 프로그램의 동작에 대한 통찰력을 제공하는 정보입니다.

### 로그를 처리하기 위해서 사용하는 모듈은...
- 원래 하나하나 개발하면서 넣는게 맞지만 현재는 개발을 다하고 난 후에 로그를 넣고 있습니다.
- nestjs에는 이미 built-in 된 logger 클래스가 있기에 그걸 사용하겠습니다.

## 설정(Configuration)이란?
- 소스 코드안에서 어떠한 코드들은 개발 환경이나 운영 환경에 이러한 환경에 따라서 다르게 코드를 넣어줘야 할 때가 있으며, 남들에게 노출 되지 않아야 하는 코드들도 있습니다. 이러한 코드들을 위해서 설정 파일을 따로 만들어서 보관해주겠습니다.
### 설정 파일은...
- runtime 도중에 바뀌는 것이 아닌 애플리케이션이 시작할 때 로드가 되어서 그 값들을 정의하여 줍니다. 그리고 설정 파일은 여러가지 파일 형식으로 사용할 수 있습니다.
### Codebase VS Enviroment Variables(환경 변수)
- 설정을 할 때 여러가지 형식으로 할 수 있다고 했습니다. 그곳에는 XML, JSON, YAML 같은 경우는 Codebase에 해당합니다.
- 다른 방법은 환경변수로 할 수 있습니다. 
- 주로 이 둘을 나눠서 하는 이유는 비밀 번호와  API Key 같은 남들에게 노출 되면 안되는 정보들을 주로 환경 변수를 이용해서 처리해줍니다.
- Codebase : 일반적으로 Port 같이 노출되어도 상관없는 정보들
- 환경 변수 : 비밀번호나 API Key 같은 노출되면 안되는 정보들

### Config 모듈을 이용한 설정 파일 생성
1. 루트 디렉토리에 config 라는 폴더를 만든 후에 그 폴더 안에 JSON이나 YAML 형식의 파일을 생성합니다. config/default.yaml
2. config 폴더 안에 default.yml, development.yml, 그리고 production.yml 파일을 생성하겠습니다.
- default.yml : 기본설정(개발 환경 설정이나 운영 환경 설정에도 적용됨)
- development.yml : default.yml에서 설정한 것 + 개발 환경에서 필요한 정보
- production.yml : default.yml에서 설정한 것 + 운영 환경에서 필요한 정보




