import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Category } from '../../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService:HttpService) { }

  getCategories():Observable<Array<Category>>{
    return this.httpService.get("catalogos/negocios/categorias")
    .pipe(
      map((categories:Array<Category>) => categories)
    );
  }
}
