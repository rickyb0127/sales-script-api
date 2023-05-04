import { Model } from 'sequelize';

export class DB_User extends Model {
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public phone!: string;
  public address1!: string;
  public address2!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
  public companyName!: string;
  public roles!: JSON;
  public settings!: JSON;
  public isActive!: boolean;
  public paymentStatus!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//TODO add fields
// public lastLogin!: Date
// public isFirstLogin!: boolean
// public company!: string
// public affiliate!: Affiliate
// public avatarUrl!: string