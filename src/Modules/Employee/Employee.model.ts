import {
  Model,
  Table,
  Column,
  Is,
  IsEmail,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Company from "../Company/Company.model";

export interface IEmployee {
  picture: string;
  tc: bigint;
  name: string;
  surname: string;
  birthday: Date;
  gender: string;
  marital_status: string;
  blood_rh: string;
  birthplace: string;
  title: string;
  phone: bigint;
  email: string;
  city: string;
  district: string;
  address: string;
  working_status: string;
  date_of_start: Date;
  mission: string;
}

@Table({ tableName: "employees", timestamps: true })
export default class Employee extends Model<IEmployee> implements IEmployee {
  @ForeignKey(() => Company)
  @Column
  companyId!: number

  @BelongsTo(() => Company)
  company!: Company;

  @Column
  picture!: string;

  @Is(/^[1-9]{1}[0-9]{9}[02468]{1}$/)
  @Column({
    allowNull: false,
    unique: true,
  })
  tc!: bigint;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  surname!: string;

  @Column({ allowNull: false })
  birthday!: Date;

  @Column
  gender!: string;

  @Column
  marital_status!: string;

  @Column
  blood_rh!: string;

  @Column
  birthplace!: string;

  @Column
  title!: string;

  @Column
  phone!: bigint;

  @IsEmail
  @Column({ allowNull: false })
  email!: string;

  @Column
  city!: string;

  @Column
  district!: string;

  @Column
  address!: string;

  @Column({ defaultValue: "Sözleşmeli Çalışan" })
  working_status!: string;

  @Column({ defaultValue: new Date() })
  date_of_start!: Date;

  @Column
  mission!: string;
    static $get: any;

}
