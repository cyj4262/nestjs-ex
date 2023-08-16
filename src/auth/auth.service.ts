import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async signup(authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authcredentialsDto);
    }

    async signIn(authcredentialsDto: AuthCredentialsDto): Promise<{accessToken}> {
        const { username, password } = authcredentialsDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 (Secret + Payload)
            const payload = { username }; //여기에 중요 정보는 넣으면 안됨
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
