import { ArticlesService } from './articles.service';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { Observable, filter, lastValueFrom } from 'rxjs';
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
  list: Array<Article> = [];

  constructor(){}

  articlesService = inject(ArticlesService);

  ngOnInit(): void {
    this.getArticles();
  }

  async deleteArticle(targetArticle: Article){

    try{
      const result = this.articlesService.doDelete(targetArticle);
      await lastValueFrom(result);
      this.getArticles();
    }catch (error) {
      console.error("Error:", error);
    }

  }


  async getArticles(){
    this.list = await lastValueFrom(this.articlesService.getArticles());
  }

  async onChangeTitle(article: Article) {

    try {
        const result = this.articlesService.doModify(article);
        await lastValueFrom(result);
        this.getArticles();

    } catch (error) {
        console.error("Error:", error);
    }
}

}
