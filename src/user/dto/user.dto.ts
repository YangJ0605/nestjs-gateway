import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: '123' })
  id?: string;

  @ApiProperty({ example: 'cc', description: '名字' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1111@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'cc' })
  @IsNotEmpty()
  username: string;
}
