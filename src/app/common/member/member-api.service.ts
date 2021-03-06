import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planning, Plannings } from '../planning/planning';
import { Members, Member } from './member';
import { MemberRepository } from './member-repository';

@Injectable({
    providedIn: 'root'
})
export class MemberApiService implements MemberRepository {

    private static URL: string = environment.serverAddress + 'api/members';


    constructor(private http: HttpClient) { }
    QueryPlanningsFromMember(id: number, onlyGranted: boolean): Observable<Plannings> {
        let intBool = (onlyGranted ? 1 : 0);
        return this.http.get<Plannings>(MemberApiService.URL + '/' + id + '/' + intBool + '/u');
    }
    query(): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL);
    }
    queryFromPlanning(id: number): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL + '/' + id + '/p');
    }
    queryFromGrantedUser(id: number): Observable<Members> {
        return this.http.get<Members>(MemberApiService.URL + '/' + id + '/gu');
    }
    create(member: Member): Observable<any> {
        return this.http.post<Member>(MemberApiService.URL, member);
    }
    get(idUser: number, idPlanning: number): Observable<Member> {
        return this.http.get<Member>(MemberApiService.URL + '/' + idUser + '/' + idPlanning);
    }
}
