import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {


  apiUrl = 'http://192.168.1.40/curlws/runcurl.php';
  //apiUrl = 'http://192.168.1.40:8282/kettle/executeTrans/?rep=ionic_ws&trans=ws_list_cursos';
  //apiUrl = 'http://192.168.1.112/curlws/runcurl_var.php?rep=ionic_ws&trans=ws_list_cursos';



  reqOpts:any;
  data: any;


  constructor(public http: HttpClient) {
    console.log('constructor Rest Provider');
  }


  getCursos() {


    this.reqOpts = {
      headers: {
        'AuthType':'Basic',
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization':'Basic YWRtaW46cGFzc3dvcmQ=',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization, x-request-with',
        'Access-Control-Allow-Credentials':'true'
        
      },
      params: new HttpParams()
    };

    return new Promise(resolve => {
      this.http.get(this.apiUrl,this.reqOpts)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
      });

   
    }





}
