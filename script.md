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

