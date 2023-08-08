import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  articlesData: any;

  constructor() { }

  http = inject(HttpClient);

  getArticlesData(){
    this.http.get('http://localhost:4200/api/articles.json').subscribe((httpResult => {
      this.articlesData = httpResult;
    }))
    return this.articlesData;
  }


  doDelete(targetArticle : any) {
    // this.articlesData = this.articlesData.filter((articles:any) => {return articles.id!== targetArticle.id});
    return this.http.delete('http://localhost:4200/api/articles/' + targetArticle.id)
  }

  doModify(articlePost: any){
    // this.articlesData = this.articlesData.map((item: any) =>{
    //   if (item.id == articlePost.id) {
    //     return Object.assign({}, item, articlePost);
    //   }
    //   return item;
    // })
    return this.http.put('http://localhost:4200/api/articles/' + articlePost.id, articlePost);
  }

}
