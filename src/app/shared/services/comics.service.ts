import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Comics } from "./entity/comics.entity";
import { Md5 } from "ts-md5";
import { Cart } from "./entity/cart.entity";

@Injectable()
export class ComicsService {
    private comics: Comics = new Comics();
    private md5: Md5 = new Md5();
    private hash: string = '';
    private url: string = environment.api;
    private urlStore: string = environment.apiStore;
    private privateKey: string = environment.privateKey;
    private publicKey: string = environment.publicKey;
    private data: any[] = [];

    constructor(private http: HttpClient,) { }

    getComics() {
        let ts, hash: string = '';
        [ts, hash] = this.hashing();
        const queryParams = {
            'ts': ts,
            'apikey': this.publicKey,
            'hash': hash,
            'limit': 100,
            'format': 'comic',
            'formatType': 'comic'
        };
        return this.http.get<Comics>(`${this.url}`, { params: queryParams });
    }

    hashing() {
        const ts = new Date().getTime().toString();
        this.hash = this.md5.appendStr(ts)
            .appendStr(this.privateKey)
            .appendStr(this.publicKey).end().toString();

        return [ts, this.hash];
    }

    getCart() {
        return this.http.get<Cart>(`${this.urlStore}/cart`);
    }

    postCart(body: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
            })
        };

        console.log(JSON.stringify(body));
        return this.http.post(`${this.urlStore}/cart`, JSON.stringify(body), httpOptions);
    }

    putCart(body: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
            })
        };

        console.log(JSON.stringify(body));
        return this.http.put(`${this.urlStore}/cart`, JSON.stringify(body), httpOptions);
    }

    postOrder(body: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
            })
        };

        console.log(JSON.stringify(body));
        return this.http.post(`${this.urlStore}/order`, JSON.stringify(body), httpOptions);
    }
}