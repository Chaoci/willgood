import { ArticlesService } from './articles.service';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { Observable, filter, map } from 'rxjs';
import { Article } from './article';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    RouterOutlet,
    FormsModule,
    ArticleHeaderComponent,
    ArticleBodyComponent
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers:[ArticlesService],
})
export class ArticleListComponent implements OnInit{

  articles$!: Observable<Array<Article>>;

  constructor(){}

  articlesService = inject(ArticlesService);

  ngOnInit(): void {
    this.articles$ = this.articlesService.getArticles()
    // .subscribe((x: any) => {
    //   this.articles$ = x;
    // });
  }

  deleteArticle(targetArticle: any){
    this.articlesService.doDelete(targetArticle).subscribe(result => {
      this.articles$ = this.articles$.pipe(filter((articles:any) => {
        return articles.id!== targetArticle.id
      },(error:any)=> {
        console.log(error);
      }));
    });
  }

  doModify(articlePost: any){
    console.log(articlePost);
    this.articlesService.doModify(articlePost).subscribe(result => {
      this.articles$ = this.articles$.pipe(
        map((articles: any[]) => {
          return articles.map((item: any) => {
            if (item.id == articlePost.id) {
              return Object.assign({}, item, articlePost);
            }
            return item;
          });
        })
      );
    });
  }


}
