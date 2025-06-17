import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: User | null = null;

    setUSer(user: User) {
        this.user = user;
    }

    getUser(): User | null {
        return this.user;
    }

    isLoggedIn(): boolean {
        return this.user !== null;
    }
    
}