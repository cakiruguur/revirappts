import {
  Model,
  Table,
  Column,
  IsEmail,
  Unique,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import Employee from "../Employee/Employee.model";

export interface ICompany {
  code: number;
  title: string;
  address: string;
  phone: string;
  email: string;
  sector_code: string;
  warning_class: string;
  auth_name: string;
  auth_phone: string;
  isg_uzman: string;
  doctor: string;
  dsp: string;
}

@Table({ tableName: "companies" })
export default class Company extends Model<ICompany> implements ICompany {
  @HasMany(() => Employee)
  employees!: Employee[];

  @Unique
  @AllowNull(false)
  @Column
  code!: number;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  address!: string;

  @Column({ allowNull: false })
  phone!: string;

  @IsEmail
  @Unique
  @Column({ allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  sector_code!: string;

  @Column({ allowNull: false })
  warning_class!: string;

  @Column({ allowNull: false })
  auth_name!: string;

  @Column({ allowNull: false })
  auth_phone!: string;

  @Column({ allowNull: false })
  isg_uzman!: string;

  @Column({ allowNull: false })
  doctor!: string;

  @Column({ allowNull: false })
  dsp!: string;
}
