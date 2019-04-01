import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../../shared/models/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService:HttpClient) { }

  getCategories():Observable<Array<Category>>{
    return this.httpService.get(environment.negocio_url+"catalogos/negocios/categorias")
    .pipe(
      map((categories:Array<Category>) => categories)
    );
  }
}
