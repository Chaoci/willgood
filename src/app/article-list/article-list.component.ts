import { ArticlesService } from './articles.service';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
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

  articlesData$!: Observable<any>;

  constructor(){}

  articlesService = inject(ArticlesService);

  ngOnInit(): void {
    this.articlesData$ = this.articlesService.getArticlesData()
    // .subscribe((httpResult: any) => {
    //   this.articlesData = httpResult;
    // });
  }

  // deleteArticle(targetArticle: any){
  //   this.articlesService.doDelete(targetArticle).subscribe(result => {
  //     this.articlesData = this.articlesData.filter((articles:any) => {
  //       return articles.id!== targetArticle.id
  //     },(error:any)=> {
  //       console.log(error);
  //     })
  //   });
  // }

  // doModify(articlePost: any){
  //   this.articlesService.doModify(articlePost).subscribe(result => {
  //     this.articlesData = this.articlesData.map((item: any) =>{
  //       if (item.id == articlePost.id) {
  //         return Object.assign({}, item, articlePost);
  //       }
  //       return item;
  //     });
  //   });
  // }

}
