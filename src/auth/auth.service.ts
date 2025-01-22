import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from './auth.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Register a new user
  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create and save the user
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await newUser.save();

    return {
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        id: newUser._id,
        name: newUser.username,
      },
    };
  }

  // Log in an existing user
  async login(loginUserDto: LoginUserDto): Promise<any> {
    // Find the user by email
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate an access token
    const payload = { id: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // (Optional) Generate a refresh token
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return {
      message: 'User logged in successfully',
      accessToken,
      refreshToken, // Include only if using refresh tokens
      user: { id: user._id, email: user.email, name: user.username }, // Avoid sending the password
    };
  }
}
