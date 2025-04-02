import { SnackbarService } from './../../shared/services/snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data


  tutorialsRef: AngularFireList<any> | undefined ;

  menbro: Observable<any[]> | undefined;


  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private _snackBarService: SnackbarService,
    private db: AngularFirestore,
    public afs: AngularFirestore
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      console.log(user);

      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.removeItem('user');
      localStorage.removeItem('USER');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        console.log(result);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        this._snackBarService.openSnackBar("E-mail/Senha inválido", 'error')
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        // this.SetUserData(result.user);
        this._snackBarService.openSnackBar("Menbro Validado", 'success')
      })
      .catch((error) => {
        this._snackBarService.openSnackBar("Problema na validação", 'error')
      })
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      // .then(() => {
      //   this.router.navigate(['verify-email-address']);
      // });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this._snackBarService.openSnackBar("E-mail enviado para recuperar senha", 'success')
      })
      .catch((error) => {
        this._snackBarService.openSnackBar("E-mail não encontrado", 'error')
      });
  }
  // Reset Forggot password
  ResetPassword(code:string, password: string) {
    return this.afAuth
      .confirmPasswordReset(code,password)
      .then(() => {
        this._snackBarService.openSnackBar("Senha modificada", 'success')
        this.router.navigate(['login/sing-in']);
      })
      .catch((error) => {
        this._snackBarService.openSnackBar("Senha não modificada", 'error')
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null
  }

  filterNameAndDate(name: string, date:string) {
    this.menbro = this.db.collection('menbros', ref => ref.where('nome','==', name ).where('data_nasc','==', date )).snapshotChanges()

    return this.menbro;
  };

  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('ent');

      localStorage.removeItem('user');
      localStorage.removeItem('USER');
      this.router.navigate(['/login']);
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }



}
