import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signup(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signup(authcredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authcredentialsDto);
    }

    @Post('/authTest')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log('req', req);
    } 

    @Post('/authTest')
    @UseGuards(AuthGuard())
    atest(@GetUser() user: User) {
        console.log('user', user);
    } 
}
