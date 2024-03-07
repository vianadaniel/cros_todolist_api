import { UserInterface } from '../../interfaces/user';

export default class UserBuilder {
    private user: UserInterface;

    constructor() {
        this.user = {} as UserInterface;
    }

    public withId(id: string): UserBuilder {
        this.user.id = id;
        return this;
    }

    public withName(name: string): UserBuilder {
        this.user.name = name;
        return this;
    }

    public withEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    public withPassword(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    public build(): UserInterface {
        return this.user;
    }
}
