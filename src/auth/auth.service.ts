import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) { }

    async signup(authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authcredentialsDto);
    }
}
