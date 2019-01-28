import randToken from 'rand-token';

class TokenService {

    constructor() {}

     refreshTokenGenerator() {
        return new Promise((resolve ,reject) => {
            var refresh_token = randToken.uid(241);
            resolve(refresh_token);
        })
     }

}

export default new TokenService();