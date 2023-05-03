import { Model, Table, Column, BeforeSave } from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Jwt, JwtPayload } from "jsonwebtoken";

export interface IUser {
  name: string;
  username: string;
  password: string;
}

@Table({
  timestamps: true,
  tableName: "users",
})
export default class User extends Model<IUser> implements IUser {
  @Column({
    allowNull: false,
  })
  name!: string;

  @Column({
    allowNull: false,
  })
  username!: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  password!: string;
  validPassword!: (password: string) => Promise<boolean>;

  @BeforeSave
  static async hashPass(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}

User.prototype.validPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};