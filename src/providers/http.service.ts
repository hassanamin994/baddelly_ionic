import { Injectable } from "@angular/core";
import { 
    Http, 
    Response, 
    URLSearchParams, 
    RequestMethod, 
    Request, 
    RequestOptions, 
    Headers 
} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { NativeStorage } from '@ionic-native/native-storage'

@Injectable()
export class HttpService {

    rootUrl: string = 'https://baddelly.herokuapp.com/api';

    constructor(
        private http: Http,
        private storage: NativeStorage
    ) {}

    sendRequest(method: RequestMethod, url: string[], params: any, data: any, auth: boolean) {
        let requestHandler: Observable<any> = this.prepareRequest(method, url, params, data, auth);
        console.log(requestHandler)
        return Observable.create(observer => {
            // run the http request by subscribing
            requestHandler.subscribe((request) => {
                request.subscribe((response: Response) => {
                    // Here can tweak the response as needed
                    observer.next(response.json());
                    observer.complete();
                }, error => observer.error(error))
            }, error => {
                console.log(error);
                observer.error(error);
            })
        });
    }


    private prepareRequest(method: RequestMethod, url: string[], params: any, data: any, auth: boolean) {

        return Observable.create( observer => {

            let requestOptions: RequestOptions = new RequestOptions();
            requestOptions.url = this.rootUrl + '/' + url.join('/');
            requestOptions.method = method;
            if (params) {
                requestOptions.params = this.prepareParams(params);
            }
            if (data) {
                requestOptions.body = data;
            }
            
            requestOptions.headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });

            if (auth) {
                this.storage.getItem('token')
                .then( token => {
                    if (token) {
                        requestOptions.headers.set('Authorization', token);
                    }
    
                    observer.next(this.http.request(new Request(requestOptions)));
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error)
                });
            } else {
                observer.next(this.http.request(new Request(requestOptions)));
                observer.complete();
            }
        })
    }

    private prepareParams(params: any) {
        let result = new URLSearchParams();
        if (params) {
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    let value = params[key];
                    if(Array.isArray(value)) {
                        value = value.join(',');
                    }
                    result.set(key, value);
                }
            }
        }

        return result;
    }
}