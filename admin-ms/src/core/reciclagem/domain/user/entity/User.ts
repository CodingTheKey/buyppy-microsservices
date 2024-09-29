import { UserValidatorFactory } from "../factory/user-validator.factory"

export class User {
  private _id: string
  private _email: string
  private _password: string
  private _name: string

  private _createdAt?: string | null
  private _updatedAt?: string | null
  private _deletedAt?: string | null

  constructor(
    id: string,
    email: string,
    password: string,
    name: string,

    createdAt: string | null = null,
    updatedAt: string | null = null,
    deletedAt: string | null = null,
  ) {
    this._id = id
    this._email = email
    this._password = password
    this._name = name

    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._deletedAt = deletedAt
  }

  validate() {
		UserValidatorFactory.create().validate(this);
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): string | null | undefined {
    return this._createdAt;
  }

  get updatedAt(): string | null | undefined {
    return this._updatedAt;
  }

  get deletedAt(): string | null | undefined {
    return this._deletedAt;
  }
}