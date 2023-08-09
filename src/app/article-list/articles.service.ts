import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  articlesUrl: string = ' http://localhost:3000/articles';

  constructor() { }

  http = inject(HttpClient);

  getArticles():Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
  }


  doDelete(targetArticle : Article) {
    // this.articlesData = this.articlesData.filter((articles:any) => {return articles.id!== targetArticle.id});
    return this.http.delete(this.articlesUrl + "/"+targetArticle.id)
  }

  doModify(articlePost: Article){
    // this.articlesData = this.articlesData.map((item: any) =>{
    //   if (item.id == articlePost.id) {
    //     return Object.assign({}, item, articlePost);
    //   }
    //   return item;
    // })
    return this.http.put(this.articlesUrl + '/'+articlePost.id, articlePost);
  }

}
