import { apiInstance } from '..';

interface RegisterUserDto {
  username: string;
  password: string;
  repassword: string;
}

interface LoginUserDto {
  username: string;
  password: string;
}

export const register = (registrUserDto: RegisterUserDto) => {
  return apiInstance.post('/user/register', registrUserDto);
};

export const login = (loginUserDto: LoginUserDto) => {
  return apiInstance.post('/user/login', loginUserDto);
};
